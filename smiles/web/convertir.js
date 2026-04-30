import './convertir.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// ============================================================
// 📊 ESTADO GLOBAL
// ============================================================
let archivoOriginal  = null;
let archivoConvertido = null;
let isConverting      = false;

// ============================================================
// 🔧 UTILIDADES
// ============================================================
const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// Quita extensión y devuelve nombre limpio
const baseName = (name) => name.replace(/\.[^/.]+$/, '');

// ============================================================
// 🎯 PERFILES DE CALIDAD ÓPTIMOS POR FORMATO (como TinyPNG+)
// ============================================================
const QUALITY_PROFILES = {
  webp:  { default: 65, canvas: 0.65, label: 'WebP' },
  avif:  { default: 65, canvas: 0.65, label: 'AVIF' },
  jpeg:  { default: 65, canvas: 0.65, label: 'JPEG' },
  jpg:   { default: 65, canvas: 0.65, label: 'JPEG' },
  png:   { default: 65, canvas: null,  label: 'PNG'  }, // lossless
  bmp:   { default: 65, canvas: null,  label: 'BMP'  },
};

// ============================================================
// 🧹 STRIP EXIF — dibuja en canvas limpio (elimina todos los metadatos)
// ============================================================
async function stripExifViaCanvas(blob, mimeType, qualityValue) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const isPng = mimeType === 'image/png' || mimeType === 'image/bmp';
      const ctx = canvas.getContext('2d', {
        alpha: isPng,
        willReadFrequently: false,
      });

      // Fondo blanco solo para JPEG (no soporta transparencia)
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.imageSmoothingEnabled  = true;
      ctx.imageSmoothingQuality  = 'high';
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const q = qualityValue != null ? qualityValue : undefined;
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error('Canvas toBlob failed')),
        mimeType,
        q
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}

// ============================================================
// 🔄 COMPRESIÓN MULTI-PASADA ADAPTATIVA
// (reduce calidad iterativamente hasta alcanzar el tamaño objetivo)
// ============================================================
async function multiPassCompress(blob, mimeType, targetSizeBytes, startQuality) {
  const isPng = mimeType === 'image/png' || mimeType === 'image/bmp';
  if (isPng) return blob; // lossless, no aplica

  let quality   = startQuality;
  let result    = blob;
  let iteration = 0;
  const MAX_ITER = 6;
  const MIN_Q    = 0.30;

  while (result.size > targetSizeBytes && quality > MIN_Q && iteration < MAX_ITER) {
    quality   -= 0.08;
    quality    = Math.max(quality, MIN_Q);
    result     = await stripExifViaCanvas(blob, mimeType, quality);
    iteration++;
  }
  return result;
}

// ============================================================
// 🎨 HTML — RENDER
// ============================================================
export const render = () => `
  <div class="convert_container">
    <div class="conv_layout">

      <!-- LEFT COLUMN (29%) -->
      <div class="conv_left">
        <div class="conv_config_section">
          <div class="config_header">
            <h3><i class="fas fa-exchange-alt"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-file-image"></i> Formato:</label>
              <div class="select_wrapper">
                <select id="formatSelect">
                  <option value="webp"  selected>WebP</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="avif">AVIF</option>
                  <option value="bmp">BMP</option>
                </select>
              </div>
            </div>

            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="65" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>
          </div>

          <!-- TAMAÑO OBJETIVO (NUEVO) -->
          <div class="target_size_row">
            <label class="target_size_label">
              <i class="fas fa-bullseye"></i>
              Tamaño máximo objetivo:
            </label>
            <div class="target_size_inputs">
              <div class="input_wrapper target_input_wrap">
                <input type="number" id="targetSize" min="10" max="50000" placeholder="Auto" step="10">
              </div>
              <div class="select_wrapper target_unit_wrap">
                <select id="targetUnit">
                  <option value="kb" selected>KB</option>
                  <option value="mb">MB</option>
                </select>
              </div>
              <button class="btn_target_clear" id="btnTargetClear" title="Limpiar objetivo">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <span class="target_hint">Deja vacío para compresión automática</span>
          </div>

          <div class="action_buttons">
            <button class="btn_convert" id="btnConvert">
              <i class="fas fa-exchange-alt"></i>
              <span>Convertir</span>
            </button>
            <button class="btn_download" id="btnDownload">
              <i class="fas fa-download"></i>
              <span>Descargar</span>
            </button>
          </div>

          <div class="secondary_buttons">
            <button class="btn_select" id="btnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="btn_delete" id="btnDelete">
              <i class="fas fa-trash-alt"></i>
              <span>Eliminar</span>
            </button>
          </div>
        </div>

        <!-- INFO / COMPARACIÓN -->
        <div class="conv_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size"     id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
                <span class="data_format"   id="originalFormat">--</span>
              </div>
            </div>

            <div class="comparison_arrow"><i class="fas fa-arrow-right"></i></div>

            <div class="comparison_col">
              <span class="comparison_label">Convertido:</span>
              <div class="comparison_data">
                <span class="data_size success"   id="convertedSize">--</span>
                <span class="data_dimensions"     id="convertedDimensions">--</span>
                <span class="data_format success" id="convertedFormat">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span id="reductionLabel">Reducción: <strong id="reductionPercent">0%</strong></span>
          </div>

          <!-- BADGES PRO -->
          <div class="pro_badges" id="proBadges" style="display:none;">
            <span class="badge badge_exif"><i class="fas fa-shield-alt"></i> EXIF eliminado</span>
            <span class="badge badge_time" id="badgeTime"></span>
          </div>
        </div>

        <!-- PROGRESO -->
        <div class="progress_section" id="progressSection" style="display:none;">
          <div class="progress_header">
            <span id="progressLabel">Procesando...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress_bar">
            <div class="progress_fill" id="progressFill"></div>
          </div>
          <div class="progress_detail" id="progressDetail"></div>
        </div>

        <!-- NOMBRE ARCHIVO -->
        <div class="file_name_section" id="fileNameSection" style="display:none;">
          <div class="file_name_header">
            <i class="fas fa-file-image"></i>
            <span>Nombre:</span>
          </div>
          <div class="file_name_display" id="fileNameDisplay" title="">imagen.png</div>
        </div>
      </div>

      <!-- RIGHT COLUMN (70%) -->
      <div class="conv_right">
        <div class="drop_preview_zone" id="dropZone">
          <div class="drop_placeholder" id="dropPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" hidden>

          <div class="preview_container" id="previewContainer" style="display:none;">
            <img id="previewImage" src="" alt="Preview">
          </div>
        </div>
      </div>

    </div>
  </div>
`;

// ============================================================
// 🎯 INIT
// ============================================================
export const init = () => {
  console.log(`✅ Convertir PRO de ${app} cargado`);

  const $zone = $('#dropZone');

  // Calidad auto al cambiar formato
  $('#formatSelect').on('change', () => {
    const fmt    = $('#formatSelect').val();
    const perfil = QUALITY_PROFILES[fmt] || QUALITY_PROFILES.webp;
    $('#quality').val(perfil.default);
    resetConvertedUI();
  });

  $('#quality').on('input', () => { if (archivoConvertido) resetConvertedUI(); });

  $('#fileInput').on('change',  e => procesarArchivo(e.target.files[0]));
  $('#btnConvert').on('click',  convertir);
  $('#btnDownload').on('click', descargar);
  $('#btnSelect').on('click',   () => $('#fileInput').trigger('click'));
  $('#btnDelete').on('click',   eliminar);
  $('#btnTargetClear').on('click', () => { $('#targetSize').val(''); });

  // Drag & Drop
  $zone.on('dragover',  e => { e.preventDefault(); $zone.addClass('dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('dragover');
    const file = e.originalEvent.dataTransfer.files[0];
    if (file) procesarArchivo(file);
  });
  // Un solo click en el placeholder abre el selector
  $('#dropPlaceholder').on('click', () => $('#fileInput').trigger('click'));

  // Ctrl + V
  $(document).on('paste', e => {
    const items = e.originalEvent.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const ext  = item.type.split('/')[1] || 'png';
          const file = new File([blob], `Captura_${Date.now()}.${ext}`, { type: item.type });
          procesarArchivo(file);
          $zone.addClass('paste_flash');
          setTimeout(() => $zone.removeClass('paste_flash'), 300);
          Notificacion('¡Imagen pegada desde portapapeles!', 'success', 2000);
        }
        break;
      }
    }
  });
};

// ============================================================
// 📂 PROCESAR ARCHIVO
// ============================================================
function procesarArchivo(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    return Notificacion('Por favor selecciona un archivo de imagen válido', 'error', 3000);
  }
  if (file.size > 50 * 1024 * 1024) {
    return Notificacion('Archivo muy grande (máx 50MB)', 'error', 3000);
  }

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const ext    = file.name.split('.').pop().toLowerCase();
      const format = ext === 'jpg' ? 'JPEG' : ext.toUpperCase();

      archivoOriginal = {
        file,
        url:    e.target.result,
        size:   file.size,
        width:  img.width,
        height: img.height,
        name:   file.name,
        format,
      };
      archivoConvertido = null;

      // Auto-ajustar calidad al formato actual
      const fmtSel = $('#formatSelect').val();
      const perfil = QUALITY_PROFILES[fmtSel] || QUALITY_PROFILES.webp;
      $('#quality').val(perfil.default);

      mostrarImagen();
      Notificacion(`Imagen cargada: ${file.name}`, 'success', 2000);
      // Auto-convertir inmediatamente
      convertir();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ============================================================
// 🖼️ MOSTRAR IMAGEN
// ============================================================
function mostrarImagen() {
  if (!archivoOriginal) return;
  $('#dropPlaceholder').hide();
  $('#previewContainer').show();
  $('#previewImage').attr('src', archivoOriginal.url);
  $('#originalSize').text(formatBytes(archivoOriginal.size));
  $('#originalDimensions').text(`${archivoOriginal.width}×${archivoOriginal.height}`);
  $('#originalFormat').text(archivoOriginal.format);
  $('#fileNameDisplay').text(archivoOriginal.name).attr('title', archivoOriginal.name);
  $('#infoSection, #fileNameSection').fadeIn(300);
  resetConvertedUI();
}

function resetConvertedUI() {
  $('#convertedSize, #convertedDimensions, #convertedFormat').text('--');
  $('#reductionDisplay, #proBadges').hide();
}

// ============================================================
// ✨ CONVERTIR — Motor PRO
// ============================================================
async function convertir() {
  if (!archivoOriginal)  return Notificacion('Primero carga una imagen', 'warning', 2000);
  if (isConverting)      return Notificacion('Ya hay una conversión en progreso', 'warning', 2000);

  const formatoDestino = $('#formatSelect').val();
  const mimeType       = `image/${formatoDestino === 'jpg' ? 'jpeg' : formatoDestino}`;
  const perfil         = QUALITY_PROFILES[formatoDestino] || QUALITY_PROFILES.webp;
  const qualityPct     = parseInt($('#quality').val());
  const qualityRatio   = qualityPct / 100;

  // Tamaño objetivo
  const targetVal  = parseFloat($('#targetSize').val());
  const targetUnit = $('#targetUnit').val();
  const targetBytes = !isNaN(targetVal) && targetVal > 0
    ? (targetUnit === 'mb' ? targetVal * 1024 * 1024 : targetVal * 1024)
    : null;

  const $btn = $('#btnConvert');
  isConverting = true;
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');
  $('#progressSection').fadeIn(300);
  updateProgress(0, 'Iniciando motor PRO...');

  try {
    const inicio = performance.now();

    // ── PASO 1: Compresión inicial con browser-image-compression ──────────
    updateProgress(15, 'Comprimiendo con motor principal...');
    const compressionOptions = {
      maxSizeMB:             50,
      useWebWorker:          true,
      fileType:              mimeType,
      initialQuality:        qualityRatio,
      alwaysKeepResolution:  true,
    };
    let resultBlob = await imageCompression(archivoOriginal.file, compressionOptions);

    // ── PASO 2: Strip EXIF + refinado por Canvas ───────────────────────────
    updateProgress(45, 'Eliminando metadatos EXIF...');
    const canvasQuality = perfil.canvas != null
      ? (perfil.canvas * (qualityPct / perfil.default))   // ajuste proporcional al slider
      : null;
    resultBlob = await stripExifViaCanvas(resultBlob, mimeType, canvasQuality);

    // ── PASO 3: Multi-pasada si hay tamaño objetivo ────────────────────────
    if (targetBytes && resultBlob.size > targetBytes) {
      updateProgress(65, `Ajustando al objetivo (${formatBytes(targetBytes)})...`);
      resultBlob = await multiPassCompress(resultBlob, mimeType, targetBytes, canvasQuality ?? qualityRatio);
    }

    updateProgress(85, 'Leyendo resultado...');

    // ── PASO 4: Leer resultado y actualizar UI ────────────────────────────
    await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img2 = new Image();
        img2.onload = () => {
          const fin          = performance.now();
          const origSize     = archivoOriginal.size;
          const convSize     = resultBlob.size;
          const reduccion    = (((origSize - convSize) / origSize) * 100).toFixed(1);
          const esReduccion  = parseFloat(reduccion) > 0;
          const tiempoSeg    = ((fin - inicio) / 1000).toFixed(2);

          archivoConvertido = {
            blob:       resultBlob,
            url:        ev.target.result,
            size:       convSize,
            width:      img2.width,
            height:     img2.height,
            format:     perfil.label,
            extension:  formatoDestino === 'jpeg' ? 'jpg' : formatoDestino,
            reduccion:  Math.abs(reduccion),
            esReduccion,
            tiempo:     tiempoSeg,
          };

          // Actualizar preview con imagen convertida
          $('#previewImage').attr('src', archivoConvertido.url);
          $('#convertedSize').text(formatBytes(convSize));
          $('#convertedDimensions').text(`${img2.width}×${img2.height}`);
          $('#convertedFormat').text(perfil.label);

          // Badge reducción/aumento
          const $display = $('#reductionDisplay');
          const $label   = $('#reductionLabel');
          if (esReduccion) {
            $display.removeClass('warning').addClass('success');
            $display.find('i').attr('class', 'fas fa-chart-pie');
            $label.html(`Reducción: <strong id="reductionPercent">${reduccion}%</strong>`);
          } else {
            $display.removeClass('success').addClass('warning');
            $display.find('i').attr('class', 'fas fa-arrow-up');
            $label.html(`Aumento: <strong id="reductionPercent">+${Math.abs(reduccion)}%</strong>`);
          }
          $display.fadeIn(300);

          // Badges PRO
          $('#badgeTime').html(`<i class="fas fa-clock"></i> ${tiempoSeg}s`);
          $('#proBadges').fadeIn(300);

          updateProgress(100, '¡Listo!');

          setTimeout(() => {
            $('#progressSection').fadeOut(300);
            const msg = esReduccion
              ? `¡Convertido a ${perfil.label}! Ahorro: ${reduccion}% en ${tiempoSeg}s`
              : `¡Convertido a ${perfil.label}! Archivo ${Math.abs(reduccion)}% más grande en ${tiempoSeg}s`;
            Notificacion(msg, esReduccion ? 'success' : 'warning', 3500);
          }, 600);

          resolve();
        };
        img2.src = ev.target.result;
      };
      reader.readAsDataURL(resultBlob);
    });

  } catch (error) {
    console.error('Error conversión PRO:', error);
    Notificacion('Error al convertir la imagen: ' + error.message, 'error');
    $('#progressSection').fadeOut(300);
  }

  isConverting = false;
  $btn.prop('disabled', false).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>');
}

// ============================================================
// 📊 BARRA DE PROGRESO
// ============================================================
function updateProgress(percent, label = '') {
  $('#progressFill').css('width', `${percent}%`);
  $('#progressPercent').text(`${percent}%`);
  if (label) $('#progressLabel').text(label);
}

// ============================================================
// 💾 DESCARGAR — con el mismo nombre del archivo original
// ============================================================
function descargar() {
  if (!archivoConvertido) {
    return Notificacion('Primero convierte la imagen', 'warning', 2000);
  }

  // Mismo nombre base + nueva extensión
  const nombreBase = baseName(archivoOriginal.name);
  const extension  = archivoConvertido.extension;
  const nombreFinal = `${nombreBase}.${extension}`;

  const url = URL.createObjectURL(archivoConvertido.blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = nombreFinal;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  wiTip('#btnDownload', `¡Descargado como ${nombreFinal}! 🎉`, 'success', 2000);
}

// ============================================================
// 🗑️ ELIMINAR
// ============================================================
function eliminar() {
  if (!archivoOriginal && !archivoConvertido) {
    return Notificacion('No hay imagen para eliminar', 'warning', 2000);
  }
  archivoOriginal  = null;
  archivoConvertido = null;

  $('#previewContainer').hide();
  $('#dropPlaceholder').show();
  $('#previewImage').attr('src', '');
  $('#infoSection, #fileNameSection, #progressSection').hide();
  $('#fileInput').val('');
  $('#formatSelect').val('webp');
  $('#quality').val(65);
  $('#targetSize').val('');
  resetConvertedUI();

  Notificacion('Imagen eliminada correctamente', 'success', 2000);
}

// ============================================================
// 🧹 CLEANUP
// ============================================================
export const cleanup = () => {
  console.log('🧹 Convertir PRO limpiado');
  archivoOriginal   = null;
  archivoConvertido = null;
  isConverting      = false;
  $('#fileInput, #btnConvert, #btnDownload, #btnSelect, #btnDelete, #dropZone, #formatSelect, #quality, #targetSize, #targetUnit, #btnTargetClear').off();
  $(document).off('paste');
};