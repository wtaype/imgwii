import './convertirpro.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// ============================================================
// 📊 ESTADO
// ============================================================
let archivoOriginal = null;
let resultados      = {};   // { webp: {blob, url, size}, png: {...}, jpeg: {...} }
let formatoActivo   = 'webp';
let isConverting    = false;

// ============================================================
// 🔧 UTILIDADES
// ============================================================
const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return '--';
  if (bytes === 0) return '0 B';
  const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};
const baseName = (name) => name.replace(/\.[^/.]+$/, '');

// ============================================================
// 🎯 FORMATOS A PROCESAR (BMP y AVIF ocultos según config)
// ============================================================
const FORMATOS = [
  { id: 'webp', mime: 'image/webp', label: 'WebP', ext: 'webp', quality: 0.65, enabled: true  },
  { id: 'jpeg', mime: 'image/jpeg', label: 'JPEG', ext: 'jpg',  quality: 0.65, enabled: true  },
  { id: 'png',  mime: 'image/png',  label: 'PNG',  ext: 'png',  quality: null,  enabled: false },
  { id: 'avif', mime: 'image/avif', label: 'AVIF', ext: 'avif', quality: 0.65, enabled: false },
];

// Detectar soporte AVIF y añadirlo dinámicamente
async function detectarAVIF() {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA==';
  });
}

// ============================================================
// 🧹 STRIP EXIF + CONVERSIÓN POR CANVAS
// ============================================================
async function convertirConCanvas(sourceFile, mime, quality) {
  // Paso 1: comprimir con browser-image-compression
  const options = {
    maxSizeMB: 50,
    useWebWorker: true,
    fileType: mime,
    initialQuality: quality ?? 0.65,
    alwaysKeepResolution: true,
  };
  let blob = await imageCompression(sourceFile, options);

  // Paso 2: re-dibujar en canvas limpio (elimina EXIF 100%)
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const isPng = mime === 'image/png';
      const ctx   = canvas.getContext('2d', { alpha: isPng, willReadFrequently: false });
      if (!isPng) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        r => r ? resolve(r) : reject(new Error('Canvas toBlob falló')),
        mime,
        quality ?? undefined
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagen no cargó')); };
    img.src = url;
  });
}

// Blob → dataURL
const blobToDataURL = (blob) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload  = e => res(e.target.result);
  r.onerror = rej;
  r.readAsDataURL(blob);
});

// ============================================================
// 🎨 HTML — RENDER
// ============================================================
export const render = () => `
  <div class="cpro_container">
    <div class="cpro_layout">

      <!-- ═══════════ LEFT PANEL (27%) ═══════════ -->
      <aside class="cpro_left">

        <!-- Config -->
        <div class="cpro_card cpro_config">
          <div class="cpro_card_header">
            <i class="fas fa-crown"></i>
            <h3>Convertir Pro</h3>
          </div>

          <div class="cpro_quality_row">
            <label for="cproQuality"><i class="fas fa-sliders-h"></i> Calidad</label>
            <div class="cpro_quality_wrap">
              <input type="range" id="cproQualityRange" min="10" max="100" value="65">
              <div class="cpro_quality_num_wrap">
                <input type="text" id="cproQuality" value="65">
                <span class="cpro_unit">%</span>
              </div>
            </div>
          </div>

          <div class="cpro_actions">
            <button class="cpro_btn cpro_btn_convert" id="cproBtnConvert">
              <i class="fas fa-exchange-alt"></i>
              <span>Convertir</span>
            </button>
            <button class="cpro_btn cpro_btn_select" id="cproBtnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="cpro_btn cpro_btn_delete" id="cproBtnDelete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>

          <!-- Toggles de formato -->
          <div class="cpro_fmt_toggles" id="cproFmtToggles">
            <span class="cpro_toggles_lbl"><i class="fas fa-layer-group"></i> Formatos a convertir:</span>
            <div class="cpro_toggles_row" id="cproTogglesRow">
              <!-- Se generan dinámicamente -->
            </div>
          </div>

          <input type="file" id="cproFileInput" accept="image/*" hidden>
        </div>

        <!-- Info Comparación -->
        <div class="cpro_card cpro_info" id="cproInfo" style="display:none;">
          <div class="cpro_card_header">
            <i class="fas fa-chart-bar"></i>
            <h4>Comparación</h4>
          </div>
          <div class="cpro_compare_grid">
            <div class="cpro_compare_col">
              <span class="cpro_compare_lbl">Original</span>
              <span class="cpro_compare_val" id="cproOrigSize">--</span>
              <span class="cpro_compare_dim" id="cproOrigDim">--</span>
              <span class="cpro_compare_fmt" id="cproOrigFmt">--</span>
            </div>
            <div class="cpro_compare_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="cpro_compare_col">
              <span class="cpro_compare_lbl">Activo</span>
              <span class="cpro_compare_val cpro_val_green" id="cproConvSize">--</span>
              <span class="cpro_compare_dim" id="cproConvDim">--</span>
              <span class="cpro_compare_fmt cpro_val_green" id="cproConvFmt">--</span>
            </div>
          </div>
          <div class="cpro_savings" id="cproSavings" style="display:none;">
            <i class="fas fa-bolt"></i>
            <span id="cproSavingsLabel"></span>
          </div>
          <div class="cpro_badges" id="cproBadges" style="display:none;">
            <span class="cpro_badge cpro_badge_exif"><i class="fas fa-shield-alt"></i> EXIF eliminado</span>
            <span class="cpro_badge cpro_badge_time" id="cproBadgeTime"></span>
          </div>
        </div>

        <!-- Nombre archivo -->
        <div class="cpro_card cpro_filename" id="cproFilename" style="display:none;">
          <i class="fas fa-file-image"></i>
          <span id="cproFilenameTxt"></span>
        </div>

      </aside>

      <!-- ═══════════ RIGHT PANEL (72%) ═══════════ -->
      <div class="cpro_right">

        <!-- Zona de drop + preview -->
        <div class="cpro_dropzone" id="cproDropzone">
          <div class="cpro_placeholder" id="cproPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, WEBP, JPEG (máx 50MB)</small>
          </div>

          <div class="cpro_preview" id="cproPreview" style="display:none;">
            <img id="cproPreviewImg" src="" alt="Preview">
            <!-- Badge formato activo -->
            <div class="cpro_active_badge" id="cproActiveBadge">
              <i class="fas fa-eye"></i>
              <span id="cproActiveBadgeTxt">WebP</span>
            </div>
          </div>
        </div>

        <!-- Tarjetas de formato -->
        <div class="cpro_formats_row" id="cproFormatsRow" style="display:none;">
          <!-- Se generan dinámicamente -->
        </div>

      </div>
    </div>
  </div>
`;

// ============================================================
// 🎯 INIT
// ============================================================
export const init = async () => {
  console.log(`✅ ConvertirPro de ${app} cargado`);

  // Detectar soporte AVIF y actualizar su enabled según disponibilidad
  const avifOk = await detectarAVIF();
  const avifFmt = FORMATOS.find(f => f.id === 'avif');
  if (avifFmt && !avifOk) avifFmt.enabled = false; // ocultar si no soportado

  // Renderizar toggles y tarjetas
  renderToggleButtons();
  renderFormatCards();

  // Sincronizar range ↔ number
  $('#cproQualityRange').on('input', function () {
    $('#cproQuality').val($(this).val());
  });
  $('#cproQuality').on('input', function () {
    let v = Math.min(100, Math.max(10, parseInt($(this).val()) || 65));
    $(this).val(v);
    $('#cproQualityRange').val(v);
  });

  // Botones
  $('#cproFileInput').on('change', e => procesarArchivo(e.target.files[0]));
  $('#cproBtnSelect').on('click', () => $('#cproFileInput').trigger('click'));
  $('#cproBtnConvert').on('click', () => { if (archivoOriginal) convertirTodos(); });
  $('#cproBtnDelete').on('click', eliminar);

  // Drop zone click
  $('#cproPlaceholder').on('click', () => $('#cproFileInput').trigger('click'));

  // Drag & Drop
  const $zone = $('#cproDropzone');
  $zone.on('dragover',  e => { e.preventDefault(); $zone.addClass('cpro_dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('cpro_dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('cpro_dragover');
    const file = e.originalEvent.dataTransfer.files[0];
    if (file) procesarArchivo(file);
  });

  // Ctrl + V
  $(document).on('paste.cpro', e => {
    const items = e.originalEvent.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          const ext  = item.type.split('/')[1] || 'png';
          const file = new File([blob], `Captura_${Date.now()}.${ext}`, { type: item.type });
          procesarArchivo(file);
          $zone.addClass('cpro_paste_flash');
          setTimeout(() => $zone.removeClass('cpro_paste_flash'), 350);
          Notificacion('¡Imagen pegada desde portapapeles!', 'success', 2000);
        }
        break;
      }
    }
  });
};

// ============================================================
// 🃏 RENDERIZAR TARJETAS DE FORMATO
// ============================================================
function renderToggleButtons() {
  const $row = $('#cproTogglesRow');
  $row.empty();
  FORMATOS.forEach(fmt => {
    const on = fmt.enabled;
    $row.append(`
      <button class="cpro_toggle_btn ${on ? 'cpro_toggle_on' : 'cpro_toggle_off'}" data-fmtid="${fmt.id}" title="${on ? 'Desactivar' : 'Activar'} ${fmt.label}">
        <i class="fas ${on ? 'fa-check-circle' : 'fa-circle'}"></i>
        ${fmt.label}
      </button>
    `);
  });

  $row.off('click.toggle').on('click.toggle', '.cpro_toggle_btn', function () {
    const id  = $(this).data('fmtid');
    const fmt = FORMATOS.find(f => f.id === id);
    if (!fmt) return;

    // No permitir desactivar el último habilitado
    const activos = FORMATOS.filter(f => f.enabled);
    if (fmt.enabled && activos.length <= 1) {
      return Notificacion('Debe haber al menos un formato activo', 'warning', 2000);
    }

    fmt.enabled = !fmt.enabled;
    renderToggleButtons();
    renderFormatCards();
    // Si se quitó el formato activo en preview, resetear
    if (!fmt.enabled && formatoActivo === id) {
      const primerOn = FORMATOS.find(f => f.enabled);
      if (primerOn && resultados[primerOn.id]) activarFormato(primerOn.id);
    }
  });
}

function renderFormatCards() {
  const $row = $('#cproFormatsRow');
  $row.empty();
  const formatosActivos = FORMATOS.filter(f => f.enabled);
  const defaultFmt = formatosActivos.find(f => f.id === 'webp') || formatosActivos[0];

  formatosActivos.forEach(fmt => {
    const isActive = fmt.id === (defaultFmt?.id);
    $row.append(`
      <div class="cpro_fmt_card ${isActive ? 'cpro_fmt_active' : ''}" id="cproCard_${fmt.id}" data-fmt="${fmt.id}">
        <div class="cpro_fmt_top">
          <div class="cpro_fmt_left">
            <span class="cpro_fmt_label">${fmt.label}</span>
            <span class="cpro_fmt_size" id="cproSize_${fmt.id}">
              <i class="fas fa-spinner fa-spin" style="display:none;"></i>
              <span class="cpro_size_txt">--</span>
            </span>
          </div>
          <div class="cpro_fmt_actions">
            <button class="cpro_fmt_btn cpro_fmt_btn_dl" data-fmt="${fmt.id}" title="Descargar ${fmt.label}" disabled>
              <i class="fas fa-download"></i>
              <span>Descargar</span>
            </button>
          </div>
        </div>
        <div class="cpro_fmt_bar_wrap">
          <div class="cpro_fmt_bar" id="cproBar_${fmt.id}" style="width:0%"></div>
        </div>
        <div class="cpro_fmt_savings" id="cproFmtSavings_${fmt.id}" style="display:none;"></div>
      </div>
    `);
  });

  // Click en la card = cambiar preview (excepto si clickean el botón descargar)
  $row.on('click.preview', '.cpro_fmt_card', function (e) {
    if ($(e.target).closest('.cpro_fmt_btn_dl').length) return;
    const fmt = $(this).data('fmt');
    if (resultados[fmt]) activarFormato(fmt);
  });
  $row.on('click.dl', '.cpro_fmt_btn_dl', function (e) {
    e.stopPropagation();
    const fmt = $(this).data('fmt');
    if (resultados[fmt]) descargar(fmt);
  });
}

// ============================================================
// 📂 PROCESAR ARCHIVO
// ============================================================
function procesarArchivo(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    return Notificacion('Selecciona un archivo de imagen válido', 'error', 3000);
  }
  if (file.size > 50 * 1024 * 1024) {
    return Notificacion('Archivo muy grande (máx 50MB)', 'error', 3000);
  }

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const ext = file.name.split('.').pop().toLowerCase();
      archivoOriginal = {
        file,
        url:    e.target.result,
        size:   file.size,
        width:  img.naturalWidth,
        height: img.naturalHeight,
        name:   file.name,
        format: ext === 'jpg' ? 'JPEG' : ext.toUpperCase(),
      };
      resultados   = {};
      formatoActivo = 'webp';
      mostrarImagenOriginal();
      convertirTodos();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ============================================================
// 🖼️ MOSTRAR IMAGEN ORIGINAL EN PREVIEW
// ============================================================
function mostrarImagenOriginal() {
  $('#cproPlaceholder').hide();
  $('#cproPreview').show();
  $('#cproPreviewImg').attr('src', archivoOriginal.url);
  $('#cproActiveBadgeTxt').text(archivoOriginal.format);
  $('#cproActiveBadge').removeClass().addClass('cpro_active_badge cpro_badge_orig');

  $('#cproOrigSize').text(formatBytes(archivoOriginal.size));
  $('#cproOrigDim').text(`${archivoOriginal.width}×${archivoOriginal.height}`);
  $('#cproOrigFmt').text(archivoOriginal.format);
  $('#cproConvSize').text('--');
  $('#cproConvDim').text('--');
  $('#cproConvFmt').text('--');
  $('#cproSavings, #cproBadges').hide();
  $('#cproInfo, #cproFilename').fadeIn(300);
  $('#cproFilenameTxt').text(archivoOriginal.name);
  $('#cproFormatsRow').fadeIn(300);

  // Reset tarjetas
  FORMATOS.forEach(fmt => {
    $(`#cproCard_${fmt.id}`).removeClass('cpro_fmt_active cpro_fmt_done cpro_fmt_error');
    $(`#cproSize_${fmt.id} .cpro_size_txt`).text('--');
    $(`#cproSize_${fmt.id} i`).hide();
    $(`#cproBar_${fmt.id}`).css('width', '0%').removeClass('cpro_bar_done');
    $(`#cproFmtSavings_${fmt.id}`).hide();
    $(`#cproCard_${fmt.id} .cpro_fmt_btn_dl`).prop('disabled', true);
  });

  // Marcar webp como activo por defecto
  $(`#cproCard_webp`).addClass('cpro_fmt_active');
}

// ============================================================
// ✨ CONVERTIR TODOS LOS FORMATOS EN PARALELO
// ============================================================
async function convertirTodos() {
  if (!archivoOriginal) return;
  if (isConverting) return Notificacion('Ya hay una conversión en progreso', 'warning', 2000);

  isConverting = true;
  resultados   = {};
  const quality = parseInt($('#cproQuality').val()) / 100;
  const inicio  = performance.now();

  const $btn = $('#cproBtnConvert');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  // Solo procesar los formatos habilitados
  const formatosActivos = FORMATOS.filter(f => f.enabled);

  // Mostrar spinners solo en tarjetas habilitadas
  formatosActivos.forEach(fmt => {
    $(`#cproCard_${fmt.id}`).removeClass('cpro_fmt_done cpro_fmt_error');
    $(`#cproSize_${fmt.id} .cpro_size_txt`).text('...');
    $(`#cproSize_${fmt.id} i`).show();
    $(`#cproBar_${fmt.id}`).css('width', '10%').removeClass('cpro_bar_done');
    $(`#cproCard_${fmt.id} .cpro_fmt_btn_dl`).prop('disabled', true);
  });

  // Convertir solo los habilitados en paralelo
  const promesas = formatosActivos.map(async (fmt) => {
    try {
      const q    = fmt.quality != null ? (fmt.quality * quality / 0.65) : null; // proporcional
      const blob = await convertirConCanvas(archivoOriginal.file, fmt.mime, q);
      const url  = await blobToDataURL(blob);

      // Dimensiones del resultado
      const dims = await new Promise(res => {
        const i = new Image();
        i.onload = () => res({ w: i.naturalWidth, h: i.naturalHeight });
        i.src = url;
      });

      resultados[fmt.id] = { blob, url, size: blob.size, width: dims.w, height: dims.h, fmt };

      const reduccion = (((archivoOriginal.size - blob.size) / archivoOriginal.size) * 100).toFixed(1);
      const esReduccion = parseFloat(reduccion) > 0;

      // Actualizar tarjeta
      $(`#cproSize_${fmt.id} i`).hide();
      $(`#cproSize_${fmt.id} .cpro_size_txt`).text(formatBytes(blob.size));
      $(`#cproBar_${fmt.id}`).css('width', '100%').addClass('cpro_bar_done');
      $(`#cproCard_${fmt.id}`).addClass('cpro_fmt_done').removeClass('cpro_fmt_error');
      $(`#cproCard_${fmt.id} .cpro_fmt_btn_dl`).prop('disabled', false);

      const savEl = $(`#cproFmtSavings_${fmt.id}`);
      if (esReduccion) {
        savEl.html(`<i class="fas fa-arrow-down"></i> −${reduccion}%`).removeClass('cpro_savings_up').addClass('cpro_savings_dn').show();
      } else {
        savEl.html(`<i class="fas fa-arrow-up"></i> +${Math.abs(reduccion)}%`).removeClass('cpro_savings_dn').addClass('cpro_savings_up').show();
      }

    } catch (err) {
      console.error(`Error convirtiendo ${fmt.id}:`, err);
      $(`#cproSize_${fmt.id} i`).hide();
      $(`#cproSize_${fmt.id} .cpro_size_txt`).text('Error');
      $(`#cproBar_${fmt.id}`).css('width', '100%').css('background', 'var(--error)');
      $(`#cproCard_${fmt.id}`).addClass('cpro_fmt_error');
    }
  });

  await Promise.allSettled(promesas);

  const fin    = performance.now();
  const tiempo = ((fin - inicio) / 1000).toFixed(2);

  // Activar webp por defecto si existe, si no el primero disponible
  const primerActivo = formatosActivos.find(f => resultados[f.id]);
  if (resultados['webp']) {
    activarFormato('webp');
  } else if (primerActivo) {
    activarFormato(primerActivo.id);
  }

  // Badge de tiempo
  $('#cproBadgeTime').html(`<i class="fas fa-clock"></i> ${tiempo}s`);
  $('#cproBadges').fadeIn(300);

  Notificacion(`¡${Object.keys(resultados).length} formatos convertidos en ${tiempo}s!`, 'success', 3000);

  isConverting = false;
  $btn.prop('disabled', false).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>');
}

// ============================================================
// 👁️ ACTIVAR FORMATO EN PREVIEW
// ============================================================
function activarFormato(fmtId) {
  const res = resultados[fmtId];
  if (!res) return;
  formatoActivo = fmtId;

  // Actualizar preview
  $('#cproPreviewImg').attr('src', res.url);

  // Badge activo
  $('#cproActiveBadgeTxt').text(res.fmt.label);
  $('#cproActiveBadge').removeClass().addClass(`cpro_active_badge cpro_badge_fmt cpro_badge_${fmtId}`);

  // Resaltar tarjeta
  $('.cpro_fmt_card').removeClass('cpro_fmt_active');
  $(`#cproCard_${fmtId}`).addClass('cpro_fmt_active');

  // Panel de comparación
  const reduccion   = (((archivoOriginal.size - res.size) / archivoOriginal.size) * 100).toFixed(1);
  const esReduccion = parseFloat(reduccion) > 0;

  $('#cproConvSize').text(formatBytes(res.size));
  $('#cproConvDim').text(`${res.width}×${res.height}`);
  $('#cproConvFmt').text(res.fmt.label);

  const $sav = $('#cproSavings');
  if (esReduccion) {
    $sav.removeClass('cpro_savings_up').addClass('cpro_savings_dn');
    $('#cproSavingsLabel').html(`Ahorro: <strong>${reduccion}%</strong> menos que el original`);
  } else {
    $sav.removeClass('cpro_savings_dn').addClass('cpro_savings_up');
    $('#cproSavingsLabel').html(`Aumento: <strong>+${Math.abs(reduccion)}%</strong> vs el original`);
  }
  $sav.fadeIn(300);
}

// ============================================================
// 💾 DESCARGAR
// ============================================================
function descargar(fmtId) {
  const res = resultados[fmtId];
  if (!res) return Notificacion('Formato no disponible', 'warning', 2000);

  const nombre = `${baseName(archivoOriginal.name)}.${res.fmt.ext}`;
  const url    = URL.createObjectURL(res.blob);
  const a      = document.createElement('a');
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  wiTip(`#cproCard_${fmtId} .cpro_fmt_btn_dl`, `¡${nombre} descargado! 🎉`, 'success', 2000);
}

// ============================================================
// 🗑️ ELIMINAR
// ============================================================
function eliminar() {
  if (!archivoOriginal) return Notificacion('No hay imagen que eliminar', 'warning', 2000);

  archivoOriginal = null;
  resultados      = {};
  formatoActivo   = 'webp';

  // Resetear enabled a valores por defecto
  FORMATOS.forEach(fmt => {
    fmt.enabled = (fmt.id === 'webp' || fmt.id === 'jpeg');
  });

  $('#cproPreview').hide();
  $('#cproPlaceholder').show();
  $('#cproPreviewImg').attr('src', '');
  $('#cproInfo, #cproFilename, #cproFormatsRow').hide();
  $('#cproFileInput').val('');
  $('#cproQuality, #cproQualityRange').val(65);

  renderToggleButtons();
  renderFormatCards();
  Notificacion('Imagen eliminada', 'success', 2000);
}

// ============================================================
// 🧹 CLEANUP
// ============================================================
export const cleanup = () => {
  console.log('🧹 ConvertirPro limpiado');
  archivoOriginal = null;
  resultados      = {};
  isConverting    = false;
  $(document).off('paste.cpro');
  $('#cproFileInput, #cproBtnSelect, #cproBtnConvert, #cproBtnDelete, #cproDropzone, #cproFormatsRow').off();
};
