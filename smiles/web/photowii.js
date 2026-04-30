import './photowii.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { Notificacion } from '../widev.js';
import { formatBytes, baseName, cargarImagen, initCargaSistema, canvasToBlob, descargarBlob, estimarTamano, Historial } from './adevs.js';

// ============================================================
// 📐 CONFIGURACIÓN INICIAL DEL DOCUMENTO
// ============================================================
const inicioWd = 1200; // Ancho por defecto del documento
const inicioHg = 720;  // Alto por defecto del documento

// ============================================================
// 📊 ESTADO GLOBAL
// ============================================================
let docConfig = { width: inicioWd, height: inicioHg, bg: '#ffffff', quality: 80 };
let docCreado = false;
let canvas = null, ctx = null;

let capas = [];
let capaActiva = null;
let layerIdCount = 0;
let nombreBase = 'PhotoWii_Doc'; // Nombre base del archivo de salida (primer imagen)

const historial = new Historial(7);
let unbindCarga = null;

const FORMATOS = [
  { id: 'webp', label: 'WebP', ext: 'webp', enabled: true },
  { id: 'jpeg', label: 'JPEG', ext: 'jpg', enabled: true },
  { id: 'png',  label: 'PNG',  ext: 'png', enabled: false },
  { id: 'avif', label: 'AVIF', ext: 'avif', enabled: false }
];

const defaultFiltros = { brightness: 100, contrast: 100, saturate: 100, shadows: 0, blur: 0, hueRotate: 0 };
let estimarTimeout = null;
let cropActivo = false; // Estado del modo recorte — accesible desde todo el módulo

// Detectar AVIF
async function detectarAVIF() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA==';
  });
}

// ============================================================
// 🎨 RENDER HTML
// ============================================================
export const render = () => `
  <div class="pw_container">
    <div class="pw_layout">
      <!-- ═══════════ LEFT PANEL (Controles) ═══════════ -->
      <aside class="pw_left">
        
        <!-- Card 1: Documento -->
        <div class="pw_card" id="pwCardDoc">
          <div class="pw_card_header">
            <i class="fas fa-file-alt"></i>
            <h3>Documento</h3>
            <button class="pw_btn pw_btn_outline" id="pwBtnSaveSize" title="Guardar Medida" style="padding: 0.5vh 1vh; font-size: var(--fz_s4);"><i class="fas fa-check"></i></button>
            <button class="pw_btn pw_btn_danger" id="pwBtnLimpiar" title="Limpiar Todo" style="padding: 0.5vh 1vh; font-size: var(--fz_s4); margin-left: 0.5vh;"><i class="fas fa-trash-alt"></i></button>
          </div>
          
          <div class="pw_saved_sizes" id="pwSavedSizesRow" style="display: flex; gap: 0.5vh; margin-bottom: 1.5vh; overflow-x: auto; padding-bottom: 0.5vh;"></div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <div class="pw_form_row" style="margin:0;">
              <label style="width: auto;">Ancho</label>
              <div class="pw_input_wrap">
                <input type="number" id="pwDocW" value="${inicioWd}" min="100" max="8000">
              </div>
            </div>
            <div class="pw_form_row" style="margin:0;">
              <label style="width: auto;">Alto</label>
              <div class="pw_input_wrap">
                <input type="number" id="pwDocH" value="${inicioHg}" min="100" max="8000">
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <label class="pw_radio_btn">
              <input type="radio" name="pw_bg" value="transparent">
              <span>Transparente</span>
              <div class="pw_bg_preview pw_bg_trans"></div>
              <div class="pw_radio_bg"></div>
            </label>
            <label class="pw_radio_btn">
              <input type="radio" name="pw_bg" value="color" checked>
              <input type="color" id="pwBgColor" value="#ffffff" style="width: 2.5vh; height: 2.5vh; border: none; padding: 0; cursor: pointer; border-radius: 50%;">
              <span>Color</span>
              <div class="pw_radio_bg"></div>
            </label>
          </div>

          <div class="pw_quality_wrap" style="margin-bottom: 1vh;">
            <label style="font-size: var(--fz_s3); font-weight: 600; color: var(--tx); white-space:nowrap;"><i class="fas fa-sliders-h"></i> Calidad</label>
            <input type="range" id="pwQuality" min="10" max="100" value="80">
            <div class="pw_quality_num_wrap"><input type="number" id="pwQualityTxt" value="80"></div>
          </div>

          <div class="pw_fmt_toggles" id="pwFmtToggles" style="margin-top:0; padding-top:0; border:none;">
            <div class="pw_toggles_row" id="pwTogglesRow"></div>
          </div>
        </div>

        <!-- Card 2: Imágenes y Capas -->
        <div class="pw_card" id="pwCardCapas" style="opacity: 0.5; pointer-events: none;">
          <div class="pw_card_header">
            <i class="fas fa-layer-group"></i>
            <h4>Capas</h4>
            <button class="pw_btn pw_btn_outline" id="pwBtnAdd" style="padding: 0.5vh 1vh; font-size: var(--fz_s4);">
              <i class="fas fa-plus"></i> Img
            </button>
          </div>
          <input type="file" id="pwFileInput" accept="image/*" multiple hidden>
          
          <div class="pw_layers_container" id="pwLayerList">
            <!-- Capas dinámicas -->
          </div>
        </div>

        <!-- Card 4: Ajuste Color -->
        <div class="pw_card" id="pwCardColor" style="display:none;">
          <div class="pw_card_header">
            <i class="fas fa-palette"></i>
            <h4>Ajuste de Color</h4>
            <button class="pw_btn pw_btn_outline" id="pwResetFiltros" style="padding: 0.4vh 1vh; font-size: var(--fz_s4);" title="Resetear ajustes"><i class="fas fa-undo"></i></button>
          </div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-sun"></i> Brillo</label><span class="pw_filter_val" id="val_brightness">100</span></div><input type="range" id="f_brightness" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-adjust"></i> Contraste</label><span class="pw_filter_val" id="val_contrast">100</span></div><input type="range" id="f_contrast" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-palette"></i> Saturación</label><span class="pw_filter_val" id="val_saturate">100</span></div><input type="range" id="f_saturate" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-moon"></i> Sombras</label><span class="pw_filter_val" id="val_shadows">0</span></div><input type="range" id="f_shadows" min="-100" max="100" value="0"></div>
        </div>

        <!-- Card 3: Capa Activa (Transformar Capa) -->
        <div class="pw_card" id="pwCardCapaActiva" style="display:none;">
          <div class="pw_card_header">
            <i class="fas fa-sliders-h"></i>
            <h4>Transformar Capa</h4>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">X</label><div class="pw_input_wrap"><input type="number" id="pwCapaX"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">Y</label><div class="pw_input_wrap"><input type="number" id="pwCapaY"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">W</label><div class="pw_input_wrap"><input type="number" id="pwCapaW"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">H</label><div class="pw_input_wrap"><input type="number" id="pwCapaH"></div></div>
          </div>
          
          <div class="pw_quality_wrap" style="margin-bottom:0;">
            <label style="font-size: var(--fz_s3); font-weight: 600; color: var(--tx); width: 4vh;"><i class="fas fa-eye"></i></label>
            <input type="range" id="pwCapaOp" min="0" max="100" value="100">
            <div class="pw_quality_num_wrap"><input type="text" id="pwCapaOpTxt" value="100" readonly></div>
          </div>
        </div>

      </aside>

      <!-- ═══════════ RIGHT PANEL (Stage & Export) ═══════════ -->
      <div class="pw_right">
        
        <!-- Toolbar -->
        <div class="pw_toolbar" id="pwToolbar" style="display:none;">
          <div class="pw_tool_group">
            <button id="pwBtnUndo" disabled title="Deshacer (Max 7)"><i class="fas fa-undo"></i> <span>Atrás</span></button>
            <button id="pwBtnRedo" disabled title="Rehacer"><i class="fas fa-redo"></i></button>
          </div>
          <div class="pw_tool_sep"></div>
          <div class="pw_tool_group">
            <button id="pwBtnCrop" title="Recortar Documento"><i class="fas fa-crop-simple"></i> <span>Recortar</span></button>
            <button id="pwBtnRotL" title="Rotar Capa Activa"><i class="fas fa-rotate-left"></i></button>
            <button id="pwBtnRotR" title="Rotar Capa Activa"><i class="fas fa-rotate-right"></i></button>
            <button id="pwBtnFlipH" title="Voltear H"><i class="fas fa-arrows-alt-h"></i></button>
            <button id="pwBtnFlipV" title="Voltear V"><i class="fas fa-arrows-alt-v"></i></button>
          </div>
          <div class="pw_doc_dim_badge" id="pwDocDimBadge">${inicioWd} × ${inicioHg}</div>
        </div>

        <!-- Crop Bar -->
        <div class="pw_crop_bar" id="pwCropBar" style="display:none;">
          <div style="display:flex; align-items:center; gap: 1vh;">
            <button class="pw_ratio_btn active" data-r="0">Libre</button>
            <button class="pw_ratio_btn" data-r="1">1:1</button>
            <button class="pw_ratio_btn" data-r="1.7777">16:9</button>
            <button class="pw_ratio_btn" data-r="0.5625">9:16</button>
          </div>
          <div style="display:flex; gap: 0.8vh;">
            <button class="pw_btn pw_btn_outline" id="pwCropCancel" style="padding: 0.5vh 1vh;">Cancelar</button>
            <button class="pw_btn pw_btn_primary" id="pwCropApply" style="padding: 0.5vh 1vh;"><i class="fas fa-check"></i> Aplicar</button>
          </div>
        </div>

        <!-- Stage Area -->
        <div class="pw_stage_area" id="pwDropzone">
          <div class="pw_placeholder" id="pwPlaceholder">
            <i class="fas fa-file-signature"></i>
            <h2>Crea tu Documento</h2>
            <p>Configura las dimensiones a la izquierda y presiona Crear.</p>
          </div>

          <div class="pw_stage_scroll" id="pwStageScroll" style="display:none;">
            <div class="pw_stage_inner" id="pwStageInner">
              <canvas id="pwDocCanvas"></canvas>
              <div class="pw_layers_div" id="pwLayersDiv"></div>
              
              <!-- Crop Overlay -->
              <div id="pwCropOverlay" class="pw_crop_overlay" style="display:none;">
                <div id="pwCropArea" class="pw_crop_area">
                  <div class="pw_crop_handle pw_lh_nw" data-h="nw"></div>
                  <div class="pw_crop_handle pw_lh_n" data-h="n"></div>
                  <div class="pw_crop_handle pw_lh_ne" data-h="ne"></div>
                  <div class="pw_crop_handle pw_lh_e" data-h="e"></div>
                  <div class="pw_crop_handle pw_lh_se" data-h="se"></div>
                  <div class="pw_crop_handle pw_lh_s" data-h="s"></div>
                  <div class="pw_crop_handle pw_lh_sw" data-h="sw"></div>
                  <div class="pw_crop_handle pw_lh_w" data-h="w"></div>
                  <div class="pw_crop_dims" id="pwCropDims">100 x 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjetas de formatos (ConvertirPro Style) -->
        <div class="pw_formats_row" id="pwFormatsRow" style="display:none;">
          <!-- Generadas dinámicamente -->
        </div>

      </div>
    </div>
  </div>
`;

// ============================================================
// 🎯 INIT
// ============================================================
export const init = async () => {
  console.log(`✅ PhotoWii de ${app} cargado`);
  
  if (await detectarAVIF()) {
    const avifFmt = FORMATOS.find(f => f.id === 'avif');
    if (avifFmt) avifFmt.supported = true;
  } else {
    const idx = FORMATOS.findIndex(f => f.id === 'avif');
    if (idx !== -1) FORMATOS.splice(idx, 1);
  }

  renderToggles();

  // Documento y Medidas Guardadas
  renderSavedSizes();
  $('#pwBtnSaveSize').on('click', guardarMedida);
  $('#pwBtnLimpiar').on('click', limpiar);
  
  $('#pwSavedSizesRow').on('click', '.pw_saved_size_btn', function() {
    $('#pwDocW').val($(this).data('w'));
    $('#pwDocH').val($(this).data('h')).trigger('input');
  });
  
  $('#pwSavedSizesRow').on('click', '.pw_saved_size_clear', function() {
    localStorage.removeItem('miswids');
    renderSavedSizes();
    Notificacion('Medidas eliminadas', 'info');
  });

  $('#pwDocW, #pwDocH').on('input', function() {
    if (docCreado) {
      docConfig.width = parseInt($('#pwDocW').val()) || 800;
      docConfig.height = parseInt($('#pwDocH').val()) || 600;
      redimensionarDocumento(docConfig.width, docConfig.height);
    }
  });

  $('input[name="pw_bg"], #pwBgColor').on('change input', function(e) {
    if (docCreado) {
      const type = $('input[name="pw_bg"]:checked').val();
      docConfig.bg = type === 'color' ? $('#pwBgColor').val() : 'transparent';
      renderCanvas();
      if (e.type === 'change') guardarEstado('Fondo cambiado');
    }
  });

  // Capas
  $('#pwBtnAdd').on('click', () => $('#pwFileInput').trigger('click'));
  $('#pwFileInput').on('change', e => {
    if (e.target.files.length) agregarCapas(Array.from(e.target.files));
    e.target.value = '';
  });

  // D&D Global y portapapeles (mediante adevs initCargaSistema)
  unbindCarga = initCargaSistema({
    dropSel: '#pwDropzone', fileSel: '#pwFileInput',
    clickSel: null, onFile: f => agregarCapas([f]), namespace: 'pw'
  });

  // Exportar & Calidad
  $('#pwQuality').on('input', function() {
    const v = $(this).val();
    $('#pwQualityTxt').val(v);
    docConfig.quality = parseInt(v);
    scheduleEstimacion();
  });
  $('#pwQualityTxt').on('input', function() {
    let v = Math.min(100, Math.max(10, parseInt($(this).val()) || 80));
    $(this).val(v); $('#pwQuality').val(v); docConfig.quality = v; scheduleEstimacion();
  });

  $('#pwTogglesRow').on('click', '.pw_toggle_btn', function() { activarToggle($(this).data('fmt')); });
  $('#pwFormatsRow').on('click', '.pw_fmt_btn_dl', function() { descargarFormato($(this).data('fmt'), this); });

  // Transformaciones de capa (Card 3)
  $('#pwCapaX, #pwCapaY, #pwCapaW, #pwCapaH').on('change', actualizarCapaDesdeInputs);
  $('#pwCapaOp').on('input', function() {
    $('#pwCapaOpTxt').val($(this).val() + '%');
    if (capaActiva) {
      capaActiva.opacity = parseInt($(this).val()) / 100;
      renderCanvas();
    }
  }).on('change', () => guardarEstado('Opacidad cambiada'));

  // Filtros (Card 4)
  ['brightness', 'contrast', 'saturate', 'shadows'].forEach(f => {
    $(`#f_${f}`).on('input', function() {
      if (capaActiva) {
        capaActiva.filtros[f] = parseInt($(this).val());
        $(`#val_${f}`).text(capaActiva.filtros[f]);
        renderCanvas();
      }
    }).on('change', () => guardarEstado('Filtro modificado'));
  });
  $('#pwResetFiltros').on('click', () => {
    if (capaActiva) {
      capaActiva.filtros = { ...defaultFiltros };
      actualizarCapaActiva(capaActiva.id);
      renderCanvas();
      guardarEstado('Filtros reseteados');
    }
  });

  // Toolbar
  $('#pwBtnUndo').on('click', undo);
  $('#pwBtnRedo').on('click', redo);
  $('#pwBtnRotL').on('click', () => rotarCapaActiva(-90));
  $('#pwBtnRotR').on('click', () => rotarCapaActiva(90));
  $('#pwBtnFlipH').on('click', () => { if(capaActiva) { capaActiva.flipH *= -1; renderCanvas(); guardarEstado('FlipH'); } });
  $('#pwBtnFlipV').on('click', () => { if(capaActiva) { capaActiva.flipV *= -1; renderCanvas(); guardarEstado('FlipV'); } });

  initCrop();
  initLayerDragAndResize();

  // ── Auto-crear el documento con las dimensiones por defecto al cargar ──
  crearDocumento();
};

// ============================================================
// 📄 DOCUMENTO BASE & MEDIDAS
// ============================================================
function renderSavedSizes() {
  const guardados = JSON.parse(localStorage.getItem('miswids') || '[]');
  const $cont = $('#pwSavedSizesRow');
  if (guardados.length === 0) { $cont.empty(); return; }
  
  let html = '';
  guardados.forEach(sz => {
    html += `<button class="pw_saved_size_btn" data-w="${sz.w}" data-h="${sz.h}" title="Aplicar" style="white-space:nowrap; padding: 0.4vh 1vh; font-size: var(--fz_s4); border-radius: 10vh; background: var(--bg1); border: 1.5px solid var(--bg5); color: var(--tx); cursor: pointer; transition: border-color 0.2s;">${sz.w} × ${sz.h}</button>`;
  });
  html += `<button class="pw_saved_size_clear" title="Borrar guardados" style="padding: 0.4vh 1vh; font-size: var(--fz_s4); border-radius: 10vh; background: transparent; border: 1.5px solid var(--error); color: var(--error); cursor: pointer;"><i class="fas fa-times"></i></button>`;
  $cont.html(html);
}

function guardarMedida() {
  const w = parseInt($('#pwDocW').val());
  const h = parseInt($('#pwDocH').val());
  if (!w || !h || w < 10 || h < 10) return Notificacion('Medida inválida', 'error');
  
  let guardados = JSON.parse(localStorage.getItem('miswids') || '[]');
  if (!guardados.some(s => s.w === w && s.h === h)) {
    guardados.unshift({w, h});
    if (guardados.length > 6) guardados.pop(); // Max 6 medidas
    localStorage.setItem('miswids', JSON.stringify(guardados));
    renderSavedSizes();
    Notificacion('Medida guardada', 'success');
  } else {
    Notificacion('Esta medida ya está guardada', 'info');
  }
}

function crearDocumento() {
  const w = parseInt($('#pwDocW').val()) || 800;
  const h = parseInt($('#pwDocH').val()) || 600;
  const bgType = $('input[name="pw_bg"]:checked').val();
  const bg = bgType === 'color' ? $('#pwBgColor').val() : 'transparent';
  
  if (w < 10 || h < 10 || w > 8000 || h > 8000) return Notificacion('Dimensiones inválidas', 'error');

  docConfig.width = w; docConfig.height = h; docConfig.bg = bg;
  
  canvas = document.getElementById('pwDocCanvas');
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = w; canvas.height = h;
  
  docCreado = true;
  capas = []; capaActiva = null;
  historial.reset();

  $('#pwPlaceholder').hide();
  $('#pwStageScroll, #pwToolbar, #pwFormatsRow').fadeIn(300);
  
  $('#pwCardCapas, #pwCardExport').css({ opacity: 1, pointerEvents: 'all' });
  $('#pwBtnLimpiar').prop('disabled', false);
  
  actualizarDimensionesBadge();
  renderCanvas();
  guardarEstado('Documento Creado');
  scheduleEstimacion();
}

function redimensionarDocumento(w, h) {
  canvas.width = w; canvas.height = h;
  actualizarDimensionesBadge();
  renderCanvas();
  guardarEstado('Dimensiones cambiadas');
}

function actualizarDimensionesBadge() {
  $('#pwDocDimBadge').text(`${canvas.width} × ${canvas.height}`);
  $('#pwDocW').val(canvas.width); $('#pwDocH').val(canvas.height);
}

// ============================================================
// 🖼️ CAPAS LOGICA
// ============================================================
async function agregarCapas(files) {
  if (!docCreado) return Notificacion('Primero crea el documento', 'warning');
  
  for (let file of files) {
    try {
      const data = await cargarImagen(file);
      layerIdCount++;
      const capa = {
        id: `layer_${layerIdCount}`,
        img: data.img, file: file, name: data.name,
        w: data.width, h: data.height, x: 0, y: 0,
        opacity: 1, visible: true,
        rotate: 0, flipH: 1, flipV: 1,
        filtros: { ...defaultFiltros }
      };

      // Guardar nombre de la primera imagen como nombre base del archivo de salida
      if (capas.length === 0) {
        nombreBase = file.name.replace(/\.[^/.]+$/, ''); // Quitar extensión
      }

      // Fit dentro del documento
      const ratio = Math.min(docConfig.width / capa.w, docConfig.height / capa.h, 1);
      if (ratio < 1) { capa.w = Math.round(capa.w * ratio); capa.h = Math.round(capa.h * ratio); }
      
      // Centrar
      capa.x = Math.round((docConfig.width - capa.w) / 2);
      capa.y = Math.round((docConfig.height - capa.h) / 2);
      
      capas.push(capa);
      crearCapaDOM(capa);
      
      actualizarCapaActiva(capa.id);
    } catch(e) { console.error('Error capa:', e); }
  }
  
  renderListaCapas();
  renderCanvas();
  guardarEstado('Capa agregada');
  scheduleEstimacion();
}

function crearCapaDOM(capa) {
  const html = `
    <div class="pw_layer_dom" id="dom_${capa.id}" data-id="${capa.id}">
      <img src="${capa.img.src}" draggable="false">
      <div class="pw_layer_handle pw_lh_nw" data-h="nw"></div>
      <div class="pw_layer_handle pw_lh_n" data-h="n"></div>
      <div class="pw_layer_handle pw_lh_ne" data-h="ne"></div>
      <div class="pw_layer_handle pw_lh_e" data-h="e"></div>
      <div class="pw_layer_handle pw_lh_se" data-h="se"></div>
      <div class="pw_layer_handle pw_lh_s" data-h="s"></div>
      <div class="pw_layer_handle pw_lh_sw" data-h="sw"></div>
      <div class="pw_layer_handle pw_lh_w" data-h="w"></div>
    </div>
  `;
  $('#pwLayersDiv').append(html);
  sincronizarCapaDOM(capa);
}

function sincronizarCapaDOM(capa) {
  const $dom = $(`#dom_${capa.id}`);
  if (!$dom.length) return;
  
  if (!capa.visible) { $dom.hide(); return; }
  
  $dom.show().css({
    left: capa.x + 'px', top: capa.y + 'px',
    width: capa.w + 'px', height: capa.h + 'px',
    zIndex: capas.indexOf(capa)
  });
}

function renderListaCapas() {
  const $list = $('#pwLayerList').empty();
  // Mostrar invertido para que el top sea el primero
  for (let i = capas.length - 1; i >= 0; i--) {
    const c = capas[i];
    const isAct = capaActiva && capaActiva.id === c.id;
    const eye = c.visible ? 'fa-eye' : 'fa-eye-slash hidden';
    $list.append(`
      <div class="pw_layer_item ${isAct ? 'active' : ''}" data-id="${c.id}">
        <i class="fas ${eye} pw_layer_eye"></i>
        <img src="${c.img.src}" class="pw_layer_thumb">
        <span class="pw_layer_name">${c.name}</span>
        <i class="fas fa-times pw_layer_del" title="Eliminar"></i>
      </div>
    `);
  }
}

// ============================================================
// 🎛️ CAPA ACTIVA Y DOM EVENT LOGIC
// ============================================================
$('#pwLayerList').on('click', '.pw_layer_item', function(e) {
  const id = $(this).data('id');
  
  if ($(e.target).hasClass('pw_layer_eye')) {
    const capa = capas.find(c => c.id === id);
    if(capa) { capa.visible = !capa.visible; sincronizarCapaDOM(capa); renderCanvas(); renderListaCapas(); }
    return;
  }
  
  if ($(e.target).hasClass('pw_layer_del')) {
    capas = capas.filter(c => c.id !== id);
    $(`#dom_${id}`).remove();
    if(capaActiva && capaActiva.id === id) actualizarCapaActiva(null);
    renderCanvas(); renderListaCapas(); guardarEstado('Capa eliminada'); scheduleEstimacion();
    return;
  }
  
  actualizarCapaActiva(id);
});

function actualizarCapaActiva(id) {
  capaActiva = capas.find(c => c.id === id) || null;
  $('.pw_layer_dom').removeClass('pw_active');
  $('#pwCardColor, #pwCardCapaActiva').hide();
  
  if (capaActiva) {
    $(`#dom_${id}`).addClass('pw_active');
    $('#pwCardCapaActiva, #pwCardColor').fadeIn(200);
    
    // Llenar inputs Card 3
    $('#pwCapaX').val(capaActiva.x); $('#pwCapaY').val(capaActiva.y);
    $('#pwCapaW').val(capaActiva.w); $('#pwCapaH').val(capaActiva.h);
    $('#pwCapaOp').val(capaActiva.opacity * 100); $('#pwCapaOpTxt').val(Math.round(capaActiva.opacity * 100) + '%');
    
    // Llenar filtros Card 4
    const f = capaActiva.filtros;
    $('#f_brightness').val(f.brightness); $('#val_brightness').text(f.brightness);
    $('#f_contrast').val(f.contrast); $('#val_contrast').text(f.contrast);
    $('#f_saturate').val(f.saturate); $('#val_saturate').text(f.saturate);
    $('#f_shadows').val(f.shadows); $('#val_shadows').text(f.shadows);
  }
  renderListaCapas();
}

function actualizarCapaDesdeInputs() {
  if (!capaActiva) return;
  capaActiva.x = parseInt($('#pwCapaX').val()) || 0;
  capaActiva.y = parseInt($('#pwCapaY').val()) || 0;
  capaActiva.w = parseInt($('#pwCapaW').val()) || 10;
  capaActiva.h = parseInt($('#pwCapaH').val()) || 10;
  sincronizarCapaDOM(capaActiva);
  renderCanvas();
  guardarEstado('Ajuste de dimensiones capa');
}

function rotarCapaActiva(deg) {
  if(!capaActiva) return;
  capaActiva.rotate = (capaActiva.rotate + deg) % 360;
  renderCanvas(); guardarEstado('Rotación');
}

// ── DRAG & RESIZE DOM — Transformación tipo Photoshop ──
function initLayerDragAndResize() {
  let dragging = false, resizing = false;
  let startX, startY, startRect, handleType, targetCapa;
  let rafId = null; // requestAnimationFrame para render fluido
  
  // Función para obtener la escala real del canvas (display vs real)
  function getCanvasScale() {
    if (!canvas) return 1;
    return canvas.width / canvas.getBoundingClientRect().width;
  }

  $('#pwLayersDiv').on('mousedown touchstart', '.pw_layer_dom', function(e) {
    if (cropActivo) return;
    const id = $(this).data('id');
    targetCapa = capas.find(c => c.id === id);
    if (!targetCapa) return;
    
    actualizarCapaActiva(id);
    
    if ($(e.target).hasClass('pw_layer_handle')) {
      resizing = true;
      handleType = $(e.target).data('h');
    } else {
      dragging = true;
    }
    
    const evt = e.touches ? e.touches[0] : e;
    startX = evt.clientX;
    startY = evt.clientY;
    startRect = { x: targetCapa.x, y: targetCapa.y, w: targetCapa.w, h: targetCapa.h };
    e.preventDefault();
    e.stopPropagation();
  });

  $(window).on('mousemove.pw touchmove.pw', function(e) {
    if (!dragging && !resizing) return;
    if (!targetCapa) return;
    
    const evt = e.touches ? e.touches[0] : e;
    const scale = getCanvasScale();
    
    // Delta en coordenadas del documento (px reales del canvas)
    const dx = (evt.clientX - startX) * scale;
    const dy = (evt.clientY - startY) * scale;
    
    if (dragging) {
      // MOVER: libre sin restricción — puede salir del documento igual que Photoshop
      targetCapa.x = Math.round(startRect.x + dx);
      targetCapa.y = Math.round(startRect.y + dy);
    } else if (resizing) {
      let nw = startRect.w, nh = startRect.h, nx = startRect.x, ny = startRect.y;
      const ratio = startRect.w / startRect.h;
      
      // Aplicar delta según el handle
      if (handleType.includes('e')) nw = Math.max(10, startRect.w + dx);
      if (handleType.includes('s')) nh = Math.max(10, startRect.h + dy);
      if (handleType.includes('w')) { const d = Math.min(dx, startRect.w - 10); nw = startRect.w - d; nx = startRect.x + d; }
      if (handleType.includes('n')) { const d = Math.min(dy, startRect.h - 10); nh = startRect.h - d; ny = startRect.y + d; }
      
      // Esquinas: mantener proporción. Laterales: libre.
      if (handleType.length === 2) {
        // Proporcional desde esquinas — toma el mayor delta como referencia
        const absDx = Math.abs(nw - startRect.w);
        const absDy = Math.abs(nh - startRect.h);
        if (absDx > absDy) { nh = nw / ratio; } else { nw = nh * ratio; }
        nh = Math.max(10, nh); nw = Math.max(10, nw);
        // Reposicionar si se arrastra desde lado opuesto
        if (handleType.includes('w')) nx = startRect.x + (startRect.w - nw);
        if (handleType.includes('n')) ny = startRect.y + (startRect.h - nh);
      }
      
      targetCapa.w = Math.round(nw);
      targetCapa.h = Math.round(nh);
      targetCapa.x = Math.round(nx);
      targetCapa.y = Math.round(ny);
    }
    
    // Sincronizar div DOM inmediatamente (fluido)
    sincronizarCapaDOM(targetCapa);
    
    // Actualizar inputs Card 3
    $('#pwCapaX').val(targetCapa.x);
    $('#pwCapaY').val(targetCapa.y);
    $('#pwCapaW').val(targetCapa.w);
    $('#pwCapaH').val(targetCapa.h);
    
    // Render del canvas con rAF para no saturar el hilo principal
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => renderCanvas());
    
  }).on('mouseup.pw touchend.pw', function() {
    if (dragging || resizing) {
      // Render final limpio
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      renderCanvas();
      guardarEstado('Transformar capa');
      scheduleEstimacion();
    }
    dragging = false;
    resizing = false;
    targetCapa = null;
  });
}

// ============================================================
// 🎨 RENDERIZAR CANVAS DOCUMENTO
// ============================================================
function renderCanvas() {
  if (!docCreado || !ctx) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (docConfig.bg !== 'transparent') {
    ctx.fillStyle = docConfig.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  capas.forEach(c => {
    if (!c.visible) return;
    
    ctx.save();
    ctx.globalAlpha = c.opacity;
    
    // Transformaciones
    ctx.translate(c.x + c.w/2, c.y + c.h/2);
    ctx.rotate(c.rotate * Math.PI / 180);
    ctx.scale(c.flipH, c.flipV);
    
    // Filtros css
    const f = c.filtros;
    ctx.filter = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) blur(${f.blur}px) hue-rotate(${f.hueRotate}deg)`;
    
    // Dibujar offset para centro
    const drawW = c.rotate % 180 !== 0 ? c.h : c.w;
    const drawH = c.rotate % 180 !== 0 ? c.w : c.h;
    
    ctx.drawImage(c.img, -drawW/2, -drawH/2, drawW, drawH);
    ctx.restore();
    
    // Sombras (proceso pesado)
    if (f.shadows !== 0) aplicarSombraACapa(c);
  });
  
  // Sincronizar todos los divs DOM
  capas.forEach(sincronizarCapaDOM);
}

function aplicarSombraACapa(capa) {
  // Simplificado para performance: las sombras se aplicarían sobre un ImageData temporal 
  // si el filtro shadows se usa de verdad. Aquí evitamos loop de píxeles entero del canvas
  // para no matar el CPU en documentos grandes.
}

// ============================================================
// ✂️ RECORTAR DOCUMENTO COMPLETO
// ============================================================
let $cropArea = null;
let cRatio = 0;

function initCrop() {
  $cropArea = $('#pwCropArea');
  
  $('#pwBtnCrop').on('click', () => {
    if (!docCreado) return;
    cropActivo = true; // Usa la variable global declarada en el estado
    $('#pwCropOverlay, #pwCropBar').fadeIn(200);
    $('#pwToolbar').hide();
    $('.pw_layer_dom').css('pointer-events', 'none');
    resetCropBox();
  });

  $('.pw_ratio_btn').on('click', function() {
    $('.pw_ratio_btn').removeClass('active'); $(this).addClass('active');
    cRatio = parseFloat($(this).data('r'));
    resetCropBox();
  });

  $('#pwCropCancel').on('click', cerrarCrop);
  
  $('#pwCropApply').on('click', () => {
    const cRect = canvas.getBoundingClientRect();
    const aRect = $cropArea[0].getBoundingClientRect();
    const scale = canvas.width / cRect.width;
    
    const cropX = Math.round((aRect.left - cRect.left) * scale);
    const cropY = Math.round((aRect.top - cRect.top) * scale);
    const cropW = Math.round(aRect.width * scale);
    const cropH = Math.round(aRect.height * scale);
    
    // Snapshot del canvas actual
    const snap = ctx.getImageData(cropX, cropY, cropW, cropH);
    
    // Redimensionar doc
    docConfig.width = cropW; docConfig.height = cropH;
    redimensionarDocumento(cropW, cropH);
    
    // Opcion 1: Ajustar coordenadas de capas existentes
    capas.forEach(c => { c.x -= cropX; c.y -= cropY; });
    
    renderCanvas();
    guardarEstado('Recorte Documento');
    cerrarCrop();
  });

  // Handles de crop
  let dragging = false, resizing = false, startX, startY, startRect, handleType;
  $cropArea.on('mousedown touchstart', e => {
    if ($(e.target).hasClass('pw_crop_handle')) { resizing = true; handleType = $(e.target).data('h'); } 
    else { dragging = true; }
    const evt = e.touches ? e.touches[0] : e;
    startX = evt.clientX; startY = evt.clientY;
    startRect = { left: $cropArea[0].offsetLeft, top: $cropArea[0].offsetTop, width: $cropArea.width(), height: $cropArea.height() };
    e.preventDefault();
  });

  $(window).on('mousemove touchmove', e => {
    if (!dragging && !resizing) return;
    const evt = e.touches ? e.touches[0] : e;
    const dx = evt.clientX - startX; const dy = evt.clientY - startY;
    const pw = $('#pwCropOverlay').width(), ph = $('#pwCropOverlay').height();
    
    if (dragging) {
      let nx = startRect.left + dx, ny = startRect.top + dy;
      nx = Math.max(0, Math.min(nx, pw - startRect.width));
      ny = Math.max(0, Math.min(ny, ph - startRect.height));
      $cropArea.css({ left: nx, top: ny });
    } else if (resizing) {
      let nw = startRect.width, nh = startRect.height, nl = startRect.left, nt = startRect.top;
      if (handleType.includes('e')) nw += dx;
      if (handleType.includes('s')) nh += dy;
      if (handleType.includes('w')) { nw -= dx; nl += dx; }
      if (handleType.includes('n')) { nh -= dy; nt += dy; }
      if (cRatio > 0) { if (handleType.includes('e') || handleType.includes('w')) nh = nw / cRatio; else nw = nh * cRatio; }
      
      if (nw > 50 && nh > 50 && nl >= 0 && nt >= 0 && nl+nw <= pw && nt+nh <= ph) {
        $cropArea.css({ width: nw, height: nh, left: nl, top: nt });
      }
    }
    updateCropDims();
  }).on('mouseup touchend', () => { dragging = false; resizing = false; });
}

function resetCropBox() {
  const pw = $('#pwCropOverlay').width(); const ph = $('#pwCropOverlay').height();
  let w = pw * 0.8, h = ph * 0.8;
  if (cRatio > 0) { if (pw/ph > cRatio) w = h * cRatio; else h = w / cRatio; }
  $cropArea.css({ width: w, height: h, left: (pw-w)/2, top: (ph-h)/2 });
  updateCropDims();
}

function updateCropDims() {
  const cRect = canvas.getBoundingClientRect();
  const scale = canvas.width / cRect.width;
  const cw = Math.round($cropArea.width() * scale);
  const ch = Math.round($cropArea.height() * scale);
  $('#pwCropDims').text(`${cw} × ${ch}`);
}

function cerrarCrop() {
  cropActivo = false; // Resetea el estado global
  $('#pwCropOverlay, #pwCropBar').hide();
  $('#pwToolbar').fadeIn(200);
  $('.pw_layer_dom').css('pointer-events', 'all');
}


// ============================================================
// 💾 EXPORTACIÓN MULTI-FORMATO (ConvertirPro Style)
// ============================================================
function renderToggles() {
  let html = '';
  FORMATOS.forEach(f => {
    if (f.id === 'avif' && !f.supported) return;
    const cls = f.enabled ? 'pw_toggle_on' : 'pw_toggle_off';
    const icon = f.enabled ? 'fa-check-circle' : 'fa-circle';
    html += `<div class="pw_toggle_btn ${cls}" data-fmt="${f.id}"><i class="fas ${icon}"></i> ${f.label}</div>`;
  });
  $('#pwTogglesRow').html(html);
  renderFormatCards();
}

function activarToggle(id) {
  const fmt = FORMATOS.find(f => f.id === id);
  if (fmt) { fmt.enabled = !fmt.enabled; renderToggles(); scheduleEstimacion(); }
}

function renderFormatCards() {
  const $row = $('#pwFormatsRow');
  const activos = FORMATOS.filter(f => f.enabled);
  
  if (activos.length === 0) { $row.html('<div style="text-align:center; padding:2vh;">Selecciona formato a exportar.</div>'); return; }
  
  let html = '';
  activos.forEach(fmt => {
    html += `
      <div class="pw_fmt_card" id="pwCard_${fmt.id}">
        <div class="pw_fmt_top">
          <div class="pw_fmt_left">
            <span class="pw_fmt_label">${fmt.label}</span>
            <span class="pw_fmt_size" id="pwSize_${fmt.id}">--</span>
          </div>
          <button class="pw_fmt_btn_dl" data-fmt="${fmt.id}" disabled>Descargar <i class="fas fa-download"></i></button>
        </div>
        <div class="pw_fmt_bar_wrap"><div class="pw_fmt_bar" id="pwBar_${fmt.id}"></div></div>
        <div class="pw_fmt_savings" id="pwSav_${fmt.id}" style="display:none;"></div>
      </div>
    `;
  });
  $row.html(html);
}

function scheduleEstimacion() {
  clearTimeout(estimarTimeout);
  if (!docCreado || !canvas) return;
  
  $('#pwFormatsRow .pw_fmt_size').html('<i class="fas fa-spinner fa-spin"></i>');
  $('#pwFormatsRow .pw_fmt_btn_dl').prop('disabled', true);
  
  estimarTimeout = setTimeout(async () => {
    const activos = FORMATOS.filter(f => f.enabled);
    
    // Usaremos PNG como base para calcular ahorros
    let baseSize = 0;
    try {
      const blobBase = await canvasToBlob(canvas, 'image/png');
      baseSize = blobBase.size;
    } catch(e) {}

    activos.forEach(fmt => {
      const q = fmt.id === 'png' ? undefined : docConfig.quality / 100;
      estimarTamano(canvas, `image/${fmt.id}`, q, size => {
        if (!size) { $(`#pwSize_${fmt.id}`).text('Error'); return; }
        
        $(`#pwSize_${fmt.id}`).text(formatBytes(size, true));
        $(`#pwCard_${fmt.id} .pw_fmt_btn_dl`).prop('disabled', false);
        
        // Calcular ahorro vs PNG base
        const $sav = $(`#pwSav_${fmt.id}`);
        if (baseSize > 0 && fmt.id !== 'png') {
          const diff = baseSize - size;
          const pct = Math.round((diff / baseSize) * 100);
          if (pct > 0) { $sav.html(`<i class="fas fa-arrow-down"></i> -${pct}%`).removeClass('pw_savings_up').addClass('pw_savings_dn').show(); }
          else if (pct < 0) { $sav.html(`<i class="fas fa-arrow-up"></i> +${Math.abs(pct)}%`).removeClass('pw_savings_dn').addClass('pw_savings_up').show(); }
          else { $sav.hide(); }
        } else { $sav.hide(); }
      });
    });
  }, 500);
}



async function descargarFormato(id, btn) {
  const fmt = FORMATOS.find(f => f.id === id);
  if (!fmt) return;
  
  const $btn = $(btn);
  const txt = $btn.html();
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
  
  try {
    const q = fmt.id === 'png' ? undefined : docConfig.quality / 100;
    const blob = await canvasToBlob(canvas, `image/${fmt.id}`, q);
    const name = `${nombreBase}.${fmt.ext}`; // Usa el nombre de la primera imagen
    descargarBlob(blob, name);
    Notificacion(`¡${fmt.label} descargado!`, 'success');
  } catch(e) {
    Notificacion(`Error al exportar`, 'error');
  } finally {
    $btn.prop('disabled', false).html(txt);
  }
}

// ============================================================
// ⏪ HISTORIAL
// ============================================================
function guardarEstado(action) {
  if (!docCreado) return;
  const state = {
    w: docConfig.width, h: docConfig.height, bg: docConfig.bg,
    capas: capas.map(c => ({ ...c, filtros: { ...c.filtros } })) // Deep copy
  };
  historial.guardar(state);
  updateUndoUI();
}

function undo() {
  const st = historial.undo();
  if (st) aplicarEstado(st);
  updateUndoUI();
}

function redo() {
  const st = historial.redo();
  if (st) aplicarEstado(st);
  updateUndoUI();
}

function aplicarEstado(st) {
  docConfig.width = st.w; docConfig.height = st.h; docConfig.bg = st.bg;
  canvas.width = st.w; canvas.height = st.h;
  actualizarDimensionesBadge();
  $('input[name="pw_bg"][value="' + (st.bg === 'transparent' ? 'transparent' : 'color') + '"]').prop('checked', true);
  if (st.bg !== 'transparent') $('#pwBgColor').val(st.bg);
  
  capas = st.capas.map(c => ({ ...c, filtros: { ...c.filtros } })); // Restore copy
  
  $('#pwLayersDiv').empty();
  capas.forEach(crearCapaDOM);
  
  if (capaActiva) actualizarCapaActiva(capaActiva.id);
  else renderListaCapas();
  
  renderCanvas();
  scheduleEstimacion();
}

function updateUndoUI() {
  $('#pwBtnUndo').prop('disabled', !historial.canUndo());
  $('#pwBtnRedo').prop('disabled', !historial.canRedo());
}

// ============================================================
// 🧹 CLEANUP
// ============================================================
function limpiar() {
  if (unbindCarga) unbindCarga();
  docCreado = false; canvas = null; ctx = null; capas = []; capaActiva = null; layerIdCount = 0;
  nombreBase = 'PhotoWii_Doc'; // Resetear nombre al limpiar
  historial.reset();
  
  $('#pwLayersDiv').empty();
  $('#pwStageScroll, #pwToolbar, #pwFormatsRow').hide();
  $('#pwPlaceholder').show();
  $('#pwCardCapas, #pwCardExport').css({ opacity: 0.5, pointerEvents: 'none' });
  $('#pwCardCapaActiva, #pwCardColor').hide();
  $('#pwBtnLimpiar').prop('disabled', true);
  $('#pwFileInput').val('');
  
  Notificacion('Documento cerrado', 'info');
  // Re-bind file events
  unbindCarga = initCargaSistema({
    dropSel: '#pwDropzone', fileSel: '#pwFileInput',
    clickSel: null, onFile: f => agregarCapas([f]), namespace: 'pw'
  });
}

export const cleanup = () => {
  if (unbindCarga) unbindCarga();
  $('#pwBtnCrear, #pwBtnLimpiar, #pwBtnAdd, #pwBtnCrop, #pwCropCancel, #pwCropApply, #pwBtnExport').off();
  $('#pwTogglesRow, #pwFormatsRow, #pwLayerList, #pwLayersDiv').off();
  $('input[type="range"], input[type="number"], input[type="radio"]').off();
  $(window).off('mousemove touchmove mouseup touchend');
};
