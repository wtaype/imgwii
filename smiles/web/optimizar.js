import './optimizar.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivoOriginal = null;
let archivoOptimizado = null;

// 🔧 Utilidades
const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// 🎨 HTML
export const render = () => `
  <div class="optimizar_container">
    <div class="opt_layout">
      <!-- LEFT COLUMN (29%) -->
      <div class="opt_left">
        <div class="opt_config_section">
          <div class="config_header">
            <h3><i class="fas fa-sliders-h"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="80" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>

            <div class="config_item">
              <label><i class="fas fa-expand"></i> Max Ancho:</label>
              <div class="input_wrapper">
                <input type="number" id="maxWidth" min="100" max="8000" value="1920" step="100">
                <span class="input_unit">px</span>
              </div>
            </div>
          </div>

          <div class="action_buttons">
            <button class="btn_optimize" id="btnOptimize">
              <i class="fas fa-magic"></i>
              <span>Optimizar</span>
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

        <div class="opt_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size" id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
              </div>
            </div>

            <div class="comparison_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>

            <div class="comparison_col">
              <span class="comparison_label">Optimizado:</span>
              <div class="comparison_data">
                <span class="data_size success" id="optimizedSize">--</span>
                <span class="data_dimensions" id="optimizedDimensions">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span>Reducción: <strong id="reductionPercent">0%</strong></span>
          </div>
        </div>

        <div class="file_name_section" id="fileNameSection" style="display:none;">
          <div class="file_name_header">
            <i class="fas fa-file-image"></i>
            <span>Nombre:</span>
          </div>
          <div class="file_name_display" id="fileNameDisplay" title="">imagen.png</div>
        </div>
      </div>

      <!-- RIGHT COLUMN (70%) -->
      <div class="opt_right">
        <div class="drop_preview_zone" id="dropZone">
          <div class="drop_placeholder" id="dropPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, JPEG, WEBP (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/jpg,image/webp" hidden>

          <div class="preview_container" id="previewContainer" style="display:none;">
            <img id="previewImage" src="" alt="Preview">
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// 🎯 Init
export const init = () => {
  console.log(`✅ Optimizar de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivo(e.target.files[0]));
  $('#btnOptimize').on('click', optimizar);
  $('#btnDownload').on('click', descargar);
  $('#btnSelect').on('click', () => $('#fileInput').trigger('click'));
  $('#btnDelete').on('click', eliminar);
  
  // Drag & Drop
  $zone.on('dragover', e => { e.preventDefault(); $zone.addClass('dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('dragover');
    const file = e.originalEvent.dataTransfer.files[0];
    if (file) procesarArchivo(file);
  });
  $zone.on('dblclick', () => $('#fileInput').trigger('click'));

  // 📋 CTRL + V (Paste)
  $(document).on('paste', e => {
    const items = e.originalEvent.clipboardData?.items;
    if (!items) return;
    
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          procesarArchivo(file);
          Notificacion('¡Imagen pegada desde portapapeles!', 'success', 2000);
        }
        break;
      }
    }
  });
};

// 📂 Procesar Archivo
function procesarArchivo(file) {
  if (!file) return;

  if (!file.type.match('image/(png|jpeg|jpg|webp)')) {
    return Notificacion('Formato no soportado. Usa PNG, JPG o WEBP', 'error', 3000);
  }
  if (file.size > 50 * 1024 * 1024) {
    return Notificacion('Archivo muy grande (máx 50MB)', 'error', 3000);
  }

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      archivoOriginal = {
        file,
        url: e.target.result,
        size: file.size,
        width: img.width,
        height: img.height,
        name: file.name
      };
      
      archivoOptimizado = null;
      mostrarImagen();
      Notificacion(`Imagen cargada: ${file.name}`, 'success', 2000);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 🖼️ Mostrar Imagen
function mostrarImagen() {
  if (!archivoOriginal) return;

  $('#dropPlaceholder').hide();
  $('#previewContainer').show();
  $('#previewImage').attr('src', archivoOriginal.url);
  
  $('#originalSize').text(formatBytes(archivoOriginal.size));
  $('#originalDimensions').text(`${archivoOriginal.width}×${archivoOriginal.height}`);
  
  $('#fileNameDisplay').text(archivoOriginal.name).attr('title', archivoOriginal.name);
  
  $('#infoSection, #fileNameSection').fadeIn(300);
  $('#optimizedSize, #optimizedDimensions').text('--');
  $('#reductionDisplay').hide();
}

// ✨ Optimizar
async function optimizar() {
  if (!archivoOriginal) {
    return Notificacion('Primero carga una imagen', 'warning', 2000);
  }
  
  const $btn = $('#btnOptimize');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  try {
    const quality = parseInt($('#quality').val()) / 100;
    const maxWidth = parseInt($('#maxWidth').val());
    
    const options = {
      maxSizeMB: 50,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
      initialQuality: quality
    };

    const inicio = performance.now();
    const optimizedBlob = await imageCompression(archivoOriginal.file, options);
    const fin = performance.now();

    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const reduccion = (((archivoOriginal.size - optimizedBlob.size) / archivoOriginal.size) * 100).toFixed(1);
          
          archivoOptimizado = {
            blob: optimizedBlob,
            url: e.target.result,
            size: optimizedBlob.size,
            width: img.width,
            height: img.height,
            reduccion,
            tiempo: ((fin - inicio) / 1000).toFixed(2)
          };

          $('#previewImage').attr('src', archivoOptimizado.url);
          $('#optimizedSize').text(formatBytes(archivoOptimizado.size));
          $('#optimizedDimensions').text(`${archivoOptimizado.width}×${archivoOptimizado.height}`);
          $('#reductionPercent').text(`${reduccion}%`);
          $('#reductionDisplay').fadeIn(300);

          Notificacion(`¡Optimizado! Reducción: ${reduccion}% en ${archivoOptimizado.tiempo}s`, 'success', 3000);
          resolve();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(optimizedBlob);
    });
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al optimizar', 'error');
  }

  $btn.prop('disabled', false).html('<i class="fas fa-magic"></i> <span>Optimizar</span>');
}

// 💾 Descargar
function descargar() {
  if (!archivoOptimizado) {
    return Notificacion('Primero optimiza la imagen', 'warning', 2000);
  }
  
  const url = URL.createObjectURL(archivoOptimizado.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `optimizado_${archivoOriginal.name}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  wiTip('#btnDownload', '¡Descargado! 🎉', 'success', 1500);
}

// 🗑️ Eliminar
function eliminar() {
  if (!archivoOriginal && !archivoOptimizado) {
    return Notificacion('No hay imagen para eliminar', 'warning', 2000);
  }

  archivoOriginal = null;
  archivoOptimizado = null;
  
  $('#previewContainer').hide();
  $('#dropPlaceholder').show();
  $('#previewImage').attr('src', '');
  $('#infoSection, #fileNameSection').hide();
  $('#fileInput').val('');
  
  $('#quality').val(80);
  $('#maxWidth').val(1920);
  
  Notificacion('Imagen eliminada correctamente', 'success', 2000);
}

// 🧹 Cleanup
export const cleanup = () => {
  console.log('🧹 Optimizar limpiado');
  archivoOriginal = null;
  archivoOptimizado = null;
  $('#fileInput, #btnOptimize, #btnDownload, #btnSelect, #btnDelete, #dropZone').off();
  $(document).off('paste');
};