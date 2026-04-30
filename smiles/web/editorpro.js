import './editorpro.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';
import { formatBytes, formatBytesKB, baseName, cargarImagen, initCargaSistema, canvasToBlob, descargarBlob, estimarTamano, Historial } from './adevs.js';

// ============================================================
// 📊 ESTADO
// ============================================================
let imgData = null; // { file, img, url, name, format, origW, origH }
let canvas = null;
let ctx = null;
let offCanvas = null; 
let offCtx = null;
const historial = new Historial(7); 
let unbindCarga = null;

const FORMATOS = [
  { id: 'webp', label: 'WebP', ext: 'webp', enabled: true },
  { id: 'jpeg', label: 'JPEG', ext: 'jpg', enabled: true },
  { id: 'png',  label: 'PNG',  ext: 'png', enabled: false },
  { id: 'avif', label: 'AVIF', ext: 'avif', enabled: false }
];

const defaultFiltros = { brightness: 100, contrast: 100, saturate: 100, shadows: 0, blur: 0, hueRotate: 0 };
const defaultTransform = { rotate: 0, flipH: 1, flipV: 1 };
let filtros   = { ...defaultFiltros };
let transform = { ...defaultTransform };
let expQuality = 80;
let estimando = false;
let estimarTimeout = null;
let debounceTime = 500; // 500ms debounce to avoid hanging CPU with multiple formats

// Detectar soporte AVIF
async function detectarAVIF() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA==';
  });
}

// ============================================================
// 🎨 RENDER HTML — Layout igual a ConvertirPro
// ============================================================
export const render = () => `
  <div class="epro_container">
    <div class="epro_layout">

      <!-- ═══════════ LEFT PANEL (27%) — Controles ═══════════ -->
      <aside class="epro_left">

        <!-- Card 1: Acciones de edición -->
        <div class="epro_card epro_config">
          <div class="epro_card_header">
            <i class="fas fa-wand-magic-sparkles"></i>
            <h3>Editor Pro</h3>
          </div>

          <!-- Calidad -->
          <div class="epro_quality_row">
            <label for="expQualTxt"><i class="fas fa-sliders-h"></i> Calidad</label>
            <div class="epro_quality_wrap">
              <input type="range" id="expQual" min="10" max="100" value="80">
              <div class="epro_quality_num_wrap">
                <input type="text" id="expQualTxt" value="80">
                <span class="epro_unit">%</span>
              </div>
            </div>
          </div>

          <!-- Botones acción -->
          <div class="epro_actions">
            <button class="epro_btn epro_btn_select" id="eproBtnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="epro_btn epro_btn_delete" id="eproBtnReset" title="Limpiar área de trabajo">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>

          <!-- Toggles de formato -->
          <div class="epro_fmt_toggles" id="eproFmtToggles">
            <span class="epro_toggles_lbl"><i class="fas fa-layer-group"></i> Formatos a exportar:</span>
            <div class="epro_toggles_row" id="eproTogglesRow">
              <!-- Generados dinámicamente -->
            </div>
          </div>

          <input type="file" id="eproFileInput" accept="image/*" hidden>
        </div>

        <!-- Card 2: Ajuste de Color (siempre visible) -->
        <div class="epro_card">
          <div class="epro_card_header">
            <i class="fas fa-palette"></i>
            <h4>Ajuste de Color</h4>
            <button class="epro_reset_filters" id="eproResetFiltros" title="Resetear ajustes"><i class="fas fa-undo"></i></button>
          </div>

          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-sun"></i> Brillo</label><span class="epro_filter_val" id="val_brightness">100</span></div>
            <input type="range" id="f_brightness" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-adjust"></i> Contraste</label><span class="epro_filter_val" id="val_contrast">100</span></div>
            <input type="range" id="f_contrast" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-palette"></i> Saturación</label><span class="epro_filter_val" id="val_saturate">100</span></div>
            <input type="range" id="f_saturate" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-moon"></i> Sombras</label><span class="epro_filter_val" id="val_shadows">0</span></div>
            <input type="range" id="f_shadows" min="-100" max="100" value="0">
          </div>

          <div class="epro_adv_toggle" id="eproAdvToggle"><span>Avanzados</span> <i class="fas fa-chevron-down"></i></div>
          <div class="epro_filters_adv" id="eproAdvFilters" style="display:none;">
            <div class="epro_filter">
              <div class="epro_filter_top"><label><i class="fas fa-droplet"></i> Desenfoque</label><span class="epro_filter_val" id="val_blur">0</span></div>
              <input type="range" id="f_blur" min="0" max="20" value="0">
            </div>
            <div class="epro_filter">
              <div class="epro_filter_top"><label><i class="fas fa-rainbow"></i> Tono</label><span class="epro_filter_val" id="val_hueRotate">0</span></div>
              <input type="range" id="f_hueRotate" min="0" max="360" value="0">
            </div>
          </div>
        </div>


      </aside>

      <!-- ═══════════ RIGHT PANEL (72%) — Canvas + Exportación ═══════════ -->
      <div class="epro_right">

        <!-- Toolbar de edición (oculto hasta que haya imagen) -->
        <div class="epro_toolbar" id="eproToolbar" style="display:none;">
          <div class="epro_tool_group">
            <button id="eproBtnUndo" disabled title="Deshacer (Max 3)"><i class="fas fa-undo"></i> <span>Atrás</span></button>
            <button id="eproBtnRedo" disabled title="Rehacer"><i class="fas fa-redo"></i></button>
          </div>
          <div class="epro_tool_sep"></div>
          <div class="epro_tool_group">
            <button id="eproBtnCrop" title="Recortar"><i class="fas fa-crop-simple"></i> <span>Recortar</span></button>
            <button id="eproBtnRotL" title="Rotar Izquierda"><i class="fas fa-rotate-left"></i></button>
            <button id="eproBtnRotR" title="Rotar Derecha"><i class="fas fa-rotate-right"></i></button>
            <button id="eproBtnFlipH" title="Voltear Horizontal"><i class="fas fa-arrows-alt-h"></i></button>
            <button id="eproBtnFlipV" title="Voltear Vertical"><i class="fas fa-arrows-alt-v"></i></button>
          </div>
        </div>

        <!-- Zona de Drop + Canvas -->
        <div class="epro_canvas_area" id="eproDropzone">
          <div class="epro_placeholder" id="eproPlaceholder">
            <i class="fas fa-magic"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, WEBP, AVIF (máx 50MB)</small>
          </div>

          <div class="epro_canvas_wrap" id="eproCanvasWrap" style="display:none;">
            <canvas id="eproCanvas"></canvas>
            <div id="eproCropOverlay" class="epro_crop_overlay" style="display:none;">
              <div id="eproCropArea" class="epro_crop_area">
                <div class="epro_crop_handle epro_h_nw" data-h="nw"></div>
                <div class="epro_crop_handle epro_h_n" data-h="n"></div>
                <div class="epro_crop_handle epro_h_ne" data-h="ne"></div>
                <div class="epro_crop_handle epro_h_e" data-h="e"></div>
                <div class="epro_crop_handle epro_h_se" data-h="se"></div>
                <div class="epro_crop_handle epro_h_s" data-h="s"></div>
                <div class="epro_crop_handle epro_h_sw" data-h="sw"></div>
                <div class="epro_crop_handle epro_h_w" data-h="w"></div>
                <div class="epro_crop_dims" id="eproCropDims">100 x 100</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra de crop -->
        <div class="epro_crop_bar" id="eproCropBar" style="display:none;">
          <div class="epro_crop_ratios">
            <div class="epro_crop_custom">
              <input type="number" id="eproCropCustomW" placeholder="W" title="Ancho en px">
              <span class="epro_crop_x">×</span>
              <input type="number" id="eproCropCustomH" placeholder="H" title="Alto en px">
            </div>
            <button class="epro_ratio_btn active" data-r="0">Libre</button>
            <button class="epro_ratio_btn" data-r="1">1:1</button>
            <button class="epro_ratio_btn" data-r="1.7777">16:9</button>
            <button class="epro_ratio_btn" data-r="0.5625">9:16</button>
            <button class="epro_ratio_btn" data-r="1.3333">4:3</button>
          </div>
          <div class="epro_crop_actions">
            <button class="epro_crop_cancel" id="eproCropCancel">Cancelar</button>
            <button class="epro_crop_apply" id="eproCropApply"><i class="fas fa-check"></i> Aplicar</button>
          </div>
        </div>

        <!-- Tarjetas de formatos (igual a convertirpro) -->
        <div class="epro_formats_row" id="eproFormatsRow" style="display:none;">
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
  console.log(`✅ EditorPro de ${app} cargado`);
  
  if (await detectarAVIF()) {
    const avifFormat = FORMATOS.find(f => f.id === 'avif');
    if (avifFormat) avifFormat.supported = true;
  } else {
    // Si no está soportado, quitarlo del array
    const idx = FORMATOS.findIndex(f => f.id === 'avif');
    if (idx !== -1) FORMATOS.splice(idx, 1);
  }

  canvas = $('#eproCanvas')[0];
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  offCanvas = document.createElement('canvas');
  offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

  unbindCarga = initCargaSistema({
    dropSel: '#eproDropzone', fileSel: '#eproFileInput',
    clickSel: '#eproPlaceholder', onFile: procesarArchivo
  });

  // Toolbar
  $('#eproBtnReset').on('click', limpiar);
  $('#eproBtnUndo').on('click', undo);
  $('#eproBtnRedo').on('click', redo);
  
  $('#eproBtnRotL').on('click', () => { transform.rotate = (transform.rotate - 90) % 360; saveStateAndRender(); });
  $('#eproBtnRotR').on('click', () => { transform.rotate = (transform.rotate + 90) % 360; saveStateAndRender(); });
  $('#eproBtnFlipH').on('click', () => { transform.flipH *= -1; saveStateAndRender(); });
  $('#eproBtnFlipV').on('click', () => { transform.flipV *= -1; saveStateAndRender(); });

  // Filtros
  ['brightness', 'contrast', 'saturate', 'shadows', 'blur', 'hueRotate'].forEach(f => {
    $(`#f_${f}`).on('input', function() {
      filtros[f] = parseInt($(this).val());
      $(`#val_${f}`).text(filtros[f]);
      renderCanvas(); // render real-time, pero no guarda estado hasta soltar (si queremos)
    }).on('change', () => saveStateAndRender()); // Guarda estado al soltar el slider
  });
  $('#eproResetFiltros').on('click', () => {
    filtros = { ...defaultFiltros };
    transform = { ...defaultTransform };
    actualizarSliders();
    saveStateAndRender();
    Notificacion('Filtros reseteados', 'success', 1500);
  });
  $('#eproAdvToggle').on('click', function() {
    $(this).toggleClass('open');
    $('#eproAdvFilters').slideToggle(200);
  });

  // Toggles y Exportación
  renderToggles();
  $('#eproTogglesRow').on('click', '.epro_toggle_btn', function() {
    const id = $(this).data('fmt');
    activarToggle(id);
  });
  
  $('#eproFormatsRow').on('click', '.epro_fmt_btn_dl', function() {
    const id = $(this).data('fmt');
    descargarFormato(id, this);
  });
  
  $('#expQual').on('input', function() {
    const v = $(this).val();
    $('#expQualTxt').val(v);
    expQuality = parseInt(v);
    scheduleEstimacion();
  });
  $('#expQualTxt').on('input', function() {
    let v = Math.min(100, Math.max(10, parseInt($(this).val()) || 80));
    $(this).val(v); $('#expQual').val(v); expQuality = v; scheduleEstimacion();
  });
  
  // Select button en sidebar
  $('#eproBtnSelect').on('click', () => $('#eproFileInput').trigger('click'));



  initCrop();
};

// ============================================================
// 📂 PROCESAR ARCHIVO
// ============================================================
async function procesarArchivo(file) {
  try {
    imgData = await cargarImagen(file);
    imgData.origW = imgData.width;
    imgData.origH = imgData.height;
    
    // Mostrar canvas y toolbar
    $('#eproPlaceholder').hide();
    $('#eproCanvasWrap').fadeIn(300);
    $('#eproToolbar').fadeIn(200);
    
    // Mostrar tarjetas de info en left panel
    $('#eproInfoCard, #eproFilename').fadeIn(300);
    
    // Mostrar tarjetas de exportación en right panel
    $('#eproFormatsRow').fadeIn(300);
    
    // Rellenar info
    $('#eproOrigSize').text(formatBytes(imgData.size));
    $('#eproOrigDims').text(`${imgData.origW}×${imgData.origH}`);
    $('#eproOrigFmt').text(imgData.format);
    $('#eproFileName').text(imgData.name);
    $('#eproBadges').fadeIn(200);
    
    filtros = { ...defaultFiltros };
    transform = { ...defaultTransform };
    actualizarSliders();
    historial.reset();
    
    // Estado inicial: solo la imagen
    canvas.width = imgData.origW; canvas.height = imgData.origH;
    ctx.drawImage(imgData.img, 0, 0);
    guardarEstado('Inicio');
    scheduleEstimacion();

  } catch (e) { console.error('Error cargando imagen:', e); }
}

// ============================================================
// 🎨 RENDER CANVAS Y FILTROS
// ============================================================
function actualizarSliders() {
  Object.entries(filtros).forEach(([k, v]) => { $(`#f_${k}`).val(v); $(`#val_${k}`).text(v); });
}

function renderCanvas() {
  if (!imgData) return;
  const hState = historial.actual();
  if (!hState) return;

  // Render base
  canvas.width = hState.width;
  canvas.height = hState.height;
  
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(transform.rotate * Math.PI / 180);
  ctx.scale(transform.flipH, transform.flipV);
  
  // Filtros CSS
  let filterStr = `brightness(${filtros.brightness}%) contrast(${filtros.contrast}%) saturate(${filtros.saturate}%) blur(${filtros.blur}px) hue-rotate(${filtros.hueRotate}deg)`;
  ctx.filter = filterStr;
  
  const drawW = transform.rotate % 180 !== 0 ? canvas.height : canvas.width;
  const drawH = transform.rotate % 180 !== 0 ? canvas.width : canvas.height;
  
  // Dibujar desde el estado base (ImageData u original)
  if (hState.imgData) {
    offCanvas.width = hState.imgData.width; offCanvas.height = hState.imgData.height;
    offCtx.putImageData(hState.imgData, 0, 0);
    ctx.drawImage(offCanvas, -drawW/2, -drawH/2, drawW, drawH);
  } else {
    ctx.drawImage(imgData.img, -drawW/2, -drawH/2, drawW, drawH);
  }
  ctx.restore();

  // Procesamiento pesado: Sombras (Shadows)
  if (filtros.shadows !== 0) {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = data.data;
    const factor = filtros.shadows / 100; // -1 a 1
    for (let i = 0; i < pixels.length; i += 4) {
      const luma = 0.299*pixels[i] + 0.587*pixels[i+1] + 0.114*pixels[i+2];
      if (luma < 128) {
        const strength = 1 - (luma/128); // Más fuerte en lo más oscuro
        const mult = 1 + (factor * strength * 0.8);
        pixels[i]   = Math.min(255, pixels[i] * mult);
        pixels[i+1] = Math.min(255, pixels[i+1] * mult);
        pixels[i+2] = Math.min(255, pixels[i+2] * mult);
      }
    }
    ctx.putImageData(data, 0, 0);
  }

  scheduleEstimacion();
}

function saveStateAndRender() {
  renderCanvas();
  // Guardamos el resultado del canvas como un snapshot ImageData si hay transformaciones.
  // Para evitar usar demasiada RAM, solo guardamos al hacer Crop. Filtros se re-aplican on the fly.
  guardarEstado('Ajustes');
}

// ============================================================
// ⏪ HISTORIAL (ATRAS / ADELANTE)
// ============================================================
function guardarEstado(action) {
  // Guardar configuración actual
  const state = {
    width: canvas.width, height: canvas.height,
    filtros: { ...filtros }, transform: { ...transform },
    imgData: ctx.getImageData(0, 0, canvas.width, canvas.height) // Guardar pixeles es lo más robusto
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
  filtros = { ...st.filtros };
  transform = { ...st.transform };
  actualizarSliders();
  canvas.width = st.width; canvas.height = st.height;
  ctx.putImageData(st.imgData, 0, 0);
  scheduleEstimacion();
}
function updateUndoUI() {
  $('#eproBtnUndo').prop('disabled', !historial.canUndo());
  $('#eproBtnRedo').prop('disabled', !historial.canRedo());
}

// ============================================================
// ✂️ RECORTAR (CROP) - Implementación simplificada con resizer absoluto
// ============================================================
let cropActivo = false;
let cRatio = 0;
let $cropArea = null;

function initCrop() {
  $cropArea = $('#eproCropArea');
  
  $('#eproBtnCrop').on('click', () => {
    cropActivo = true;
    $('#eproCropOverlay, #eproCropBar').fadeIn(200);
    $('#eproToolbar').hide();
    resetCropBox();
  });

  $('.epro_ratio_btn').on('click', function() {
    $('.epro_ratio_btn').removeClass('active'); $(this).addClass('active');
    cRatio = parseFloat($(this).data('r'));
    resetCropBox();
  });

  $('#eproCropCustomW').on('change', function() {
    const pxW = parseInt($(this).val());
    const pxH = parseInt($('#eproCropCustomH').val()) || (cRatio ? Math.round(pxW / cRatio) : pxW);
    if (pxW > 0) { setCropBoxPixels(pxW, pxH); $('.epro_ratio_btn').removeClass('active'); $('[data-r="0"]').addClass('active'); cRatio = 0; }
  });
  $('#eproCropCustomH').on('change', function() {
    const pxH = parseInt($(this).val());
    const pxW = parseInt($('#eproCropCustomW').val()) || (cRatio ? Math.round(pxH * cRatio) : pxH);
    if (pxH > 0) { setCropBoxPixels(pxW, pxH); $('.epro_ratio_btn').removeClass('active'); $('[data-r="0"]').addClass('active'); cRatio = 0; }
  });

  $('#eproCropCancel').on('click', cerrarCrop);
  
  $('#eproCropApply').on('click', () => {
    // Calcular coords relativas al canvas
    const cRect = canvas.getBoundingClientRect();
    const aRect = $cropArea[0].getBoundingClientRect();
    const scaleX = canvas.width / cRect.width;
    const scaleY = canvas.height / cRect.height;
    
    const cropX = (aRect.left - cRect.left) * scaleX;
    const cropY = (aRect.top - cRect.top) * scaleY;
    const cropW = aRect.width * scaleX;
    const cropH = aRect.height * scaleY;
    
    const cropped = ctx.getImageData(cropX, cropY, cropW, cropH);
    canvas.width = cropW; canvas.height = cropH;
    ctx.putImageData(cropped, 0, 0);
    
    filtros = { ...defaultFiltros }; transform = { ...defaultTransform }; actualizarSliders();
    
    guardarEstado('Recorte');
    scheduleEstimacion(); // Actualizar pesos en tarjetas de exportación
    cerrarCrop();
    Notificacion('¡Recorte aplicado!', 'success', 1500);
  });

  // Drag handles logic simplificada usando eventos nativos
  let dragging = false, resizing = false, startX, startY, startRect, handleType;
  
  $cropArea.on('mousedown touchstart', e => {
    if (e.target.classList.contains('epro_crop_handle')) {
      resizing = true; handleType = e.target.dataset.h;
    } else {
      dragging = true;
    }
    const evt = e.touches ? e.touches[0] : e;
    startX = evt.clientX; startY = evt.clientY;
    startRect = { left: $cropArea[0].offsetLeft, top: $cropArea[0].offsetTop, width: $cropArea.width(), height: $cropArea.height() };
    e.preventDefault();
  });

  $(window).on('mousemove touchmove', e => {
    if (!dragging && !resizing) return;
    const evt = e.touches ? e.touches[0] : e;
    const dx = evt.clientX - startX; const dy = evt.clientY - startY;
    const pw = $('#eproCropOverlay').width(), ph = $('#eproCropOverlay').height();
    
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
      
      if (cRatio > 0) {
        if (handleType.includes('e') || handleType.includes('w')) nh = nw / cRatio;
        else nw = nh * cRatio;
      }
      
      // Limits
      if (nw > 50 && nh > 50 && nl >= 0 && nt >= 0 && nl+nw <= pw && nt+nh <= ph) {
        $cropArea.css({ width: nw, height: nh, left: nl, top: nt });
      }
    }
    updateCropDims();
  }).on('mouseup touchend', () => { dragging = false; resizing = false; });
}

function resetCropBox() {
  const pw = $('#eproCropOverlay').width();
  const ph = $('#eproCropOverlay').height();
  let w = pw * 0.8, h = ph * 0.8;
  if (cRatio > 0) {
    if (pw/ph > cRatio) w = h * cRatio; else h = w / cRatio;
  }
  $cropArea.css({ width: w, height: h, left: (pw-w)/2, top: (ph-h)/2 });
  updateCropDims();
}

function updateCropDims() {
  const cRect = canvas.getBoundingClientRect();
  const aRect = $cropArea[0].getBoundingClientRect();
  const scale = canvas.width / cRect.width;
  const cw = Math.round(aRect.width * scale);
  const ch = Math.round(aRect.height * scale);
  $('#eproCropDims').text(`${cw} × ${ch}`);
  $('#eproCropCustomW').val(cw);
  $('#eproCropCustomH').val(ch);
}

function setCropBoxPixels(pxW, pxH) {
  const cRect = canvas.getBoundingClientRect();
  const scale = canvas.width / cRect.width;
  const newW = pxW / scale;
  const newH = pxH / scale;
  const pw = $('#eproCropOverlay').width();
  const ph = $('#eproCropOverlay').height();
  const left = Math.max(0, Math.min((pw - newW) / 2, pw - newW));
  const top = Math.max(0, Math.min((ph - newH) / 2, ph - newH));
  $cropArea.css({ width: newW, height: newH, left, top });
  updateCropDims();
}

function cerrarCrop() {
  cropActivo = false;
  $('#eproCropOverlay, #eproCropBar').hide();
  $('#eproToolbar').fadeIn(200);
}

// ============================================================
// 💾 EXPORTACIÓN MÚLTIPLE Y TAMAÑO
// ============================================================

function renderToggles() {
  let html = '';
  FORMATOS.forEach(f => {
    if (f.id === 'avif' && $('#eproFmtAvif').length === 0) return; // Wait, we check if browser supports AVIF
    const cls = f.enabled ? 'epro_toggle_on' : 'epro_toggle_off';
    const icon = f.enabled ? 'fa-check-circle' : 'fa-circle';
    html += `
      <div class="epro_toggle_btn ${cls}" data-fmt="${f.id}">
        <i class="fas ${icon}"></i> ${f.label}
      </div>
    `;
  });
  $('#eproTogglesRow').html(html);
  renderFormatCards();
}

function activarToggle(id) {
  const fmt = FORMATOS.find(f => f.id === id);
  if (fmt) {
    fmt.enabled = !fmt.enabled;
    renderToggles();
    scheduleEstimacion();
  }
}

function renderFormatCards() {
  const $row = $('#eproFormatsRow');
  const activos = FORMATOS.filter(f => f.enabled);
  
  if (activos.length === 0) {
    $row.html('<div style="width:100%; text-align:center; padding:2vh; color:var(--txe);">Selecciona al menos un formato para exportar.</div>');
    return;
  }
  
  let html = '';
  activos.forEach(fmt => {
    html += `
      <div class="epro_fmt_card" id="eproCard_${fmt.id}">
        <div class="epro_fmt_row1">
          <span class="epro_fmt_label">${fmt.label}</span>
          <button class="epro_fmt_btn_dl" data-fmt="${fmt.id}" disabled>
            <i class="fas fa-download"></i> Descargar
          </button>
        </div>
        <div class="epro_fmt_row2" id="eproFmtInfo_${fmt.id}">
          <span class="epro_fmt_orig" id="eproFmtOrig_${fmt.id}">-- KB</span>
          <i class="fas fa-arrow-right epro_fmt_arr"></i>
          <span class="epro_fmt_new" id="eproFmtSize_${fmt.id}"><i class="fas fa-spinner fa-spin"></i></span>
          <span class="epro_fmt_pct" id="eproFmtPct_${fmt.id}"></span>
        </div>
      </div>
    `;
  });
  $row.html(html);
  
  // Ocultar/mostrar calidad si solo hay PNG
  const soloPng = activos.every(f => f.id === 'png');
  if (soloPng) $('#eproQualRow').slideUp(200);
  else $('#eproQualRow').slideDown(200);
}

function scheduleEstimacion() {
  clearTimeout(estimarTimeout);
  $('#eproFormatsRow .epro_fmt_new').html('<i class="fas fa-spinner fa-spin"></i>');
  $('#eproFormatsRow .epro_fmt_pct').text('').removeClass('epro_pct_up epro_pct_dn');
  $('#eproFormatsRow .epro_fmt_btn_dl').prop('disabled', true);
  
  estimarTimeout = setTimeout(() => {
    if (!canvas || !imgData) return;
    const activos = FORMATOS.filter(f => f.enabled);
    
    activos.forEach(fmt => {
      // png doesn't use quality param
      const q = fmt.id === 'png' ? undefined : expQuality / 100;
      estimarTamano(canvas, `image/${fmt.id}`, q, size => {
        if (!size) {
          $(`#eproFmtSize_${fmt.id}`).html('<i class="fas fa-exclamation-triangle"></i> Error');
          return;
        }
        
        const origSize = imgData.size;
        const diff = origSize - size;
        const pct = Math.round(Math.abs(diff) / origSize * 100);
        
        // Fila 2: orig → nuevo → %
        $(`#eproFmtOrig_${fmt.id}`).text(formatBytes(origSize, true));
        $(`#eproFmtSize_${fmt.id}`).text(formatBytes(size, true));
        
        const $pct = $(`#eproFmtPct_${fmt.id}`);
        if (pct === 0) {
          $pct.text('=').removeClass('epro_pct_up epro_pct_dn');
        } else if (diff > 0) {
          $pct.text(`-${pct}%`).removeClass('epro_pct_up').addClass('epro_pct_dn');
        } else {
          $pct.text(`+${pct}%`).removeClass('epro_pct_dn').addClass('epro_pct_up');
        }
        
        $(`#eproCard_${fmt.id} .epro_fmt_btn_dl`).prop('disabled', false);
      });
    });
  }, debounceTime);
}

async function descargarFormato(id, btn) {
  if (!imgData) return;
  const fmt = FORMATOS.find(f => f.id === id);
  if (!fmt) return;
  
  const $btn = $(btn);
  const txt = $btn.html();
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Procesando...');
  
  try {
    const q = fmt.id === 'png' ? undefined : expQuality / 100;
    const blob = await canvasToBlob(canvas, `image/${fmt.id}`, q);
    const name = `${baseName(imgData.name)}_pro.${fmt.ext}`;
    descargarBlob(blob, name);
    Notificacion(`¡${fmt.label} exportado!`, 'success', 2000);
  } catch(e) {
    Notificacion(`Error al exportar ${fmt.label}`, 'error', 2000);
  } finally {
    $btn.prop('disabled', false).html(txt);
  }
}

// ============================================================
// 🧹 CLEANUP
// ============================================================
function limpiar() {
  if (unbindCarga) unbindCarga();
  imgData = null; canvas = null; ctx = null; offCanvas = null; offCtx = null;
  historial.reset();
  $('#eproDropzone').removeClass('epro_dragover epro_paste_flash');
  $('#eproCanvasWrap, #eproToolbar, #eproRight, #eproCropBar, #eproCropOverlay, #eproExportBottom').hide();
  $('#eproPlaceholder').show();
  $('#eproFileInput').val('');
  Notificacion('Área de trabajo limpia', 'info', 1500);
  init(); // reinicia
}

export const cleanup = () => {
  if (unbindCarga) unbindCarga();
  $('#eproBtnReset, #eproBtnUndo, #eproBtnRedo, #eproBtnCrop, #eproCropCancel, #eproCropApply, #eproAdvToggle, #eproBtnDownload, .epro_fmt_btn, .epro_ratio_btn').off();
  $('input[type="range"], input[type="number"], input[type="text"]').off();
  $(window).off('mousemove touchmove mouseup touchend');
};
