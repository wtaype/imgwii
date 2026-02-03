import './comprimir.css';
import $ from 'jquery';
import Compressor from 'compressorjs';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivoOriginal = null;
let archivoComprimido = null;

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
  <div class="compress_container">
    <div class="comp_layout">
      <!-- LEFT COLUMN (29%) -->
      <div class="comp_left">
        <div class="comp_config_section">
          <div class="config_header">
            <h3><i class="fas fa-compress-alt"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="70" step="5">
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
            <button class="btn_compress" id="btnCompress">
              <i class="fas fa-compress-alt"></i>
              <span>Comprimir</span>
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

        <div class="comp_info_section" id="infoSection" style="display:none;">
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
              <span class="comparison_label">Comprimido:</span>
              <div class="comparison_data">
                <span class="data_size success" id="compressedSize">--</span>
                <span class="data_dimensions" id="compressedDimensions">--</span>
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
      <div class="comp_right">
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
  console.log(`✅ Comprimir de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivo(e.target.files[0]));
  $('#btnCompress').on('click', comprimir);
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
      
      archivoComprimido = null;
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
  $('#compressedSize, #compressedDimensions').text('--');
  $('#reductionDisplay').hide();
}

// ✨ Comprimir
async function comprimir() {
  if (!archivoOriginal) {
    return Notificacion('Primero carga una imagen', 'warning', 2000);
  }
  
  const $btn = $('#btnCompress');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  try {
    const quality = parseInt($('#quality').val()) / 100;
    const maxWidth = parseInt($('#maxWidth').val());
    const maxHeight = parseInt($('#maxWidth').val()); // Mantener proporción

    const inicio = performance.now();
    
    const compressedFile = await new Promise((resolve, reject) => {
      new Compressor(archivoOriginal.file, {
        quality: quality,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        convertSize: 5000000, // Convertir a JPEG si > 5MB
        mimeType: archivoOriginal.file.type === 'image/png' && archivoOriginal.file.size > 5000000 ? 'image/jpeg' : undefined,
        success: resolve,
        error: reject
      });
    });

    const fin = performance.now();

    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const reduccion = (((archivoOriginal.size - compressedFile.size) / archivoOriginal.size) * 100).toFixed(1);
          
          archivoComprimido = {
            blob: compressedFile,
            url: e.target.result,
            size: compressedFile.size,
            width: img.width,
            height: img.height,
            reduccion,
            tiempo: ((fin - inicio) / 1000).toFixed(2)
          };

          $('#previewImage').attr('src', archivoComprimido.url);
          $('#compressedSize').text(formatBytes(archivoComprimido.size));
          $('#compressedDimensions').text(`${archivoComprimido.width}×${archivoComprimido.height}`);
          $('#reductionPercent').text(`${reduccion}%`);
          $('#reductionDisplay').fadeIn(300);

          Notificacion(`¡Comprimida! Reducción: ${reduccion}% en ${archivoComprimido.tiempo}s`, 'success', 3000);
          resolve();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al comprimir', 'error');
  }

  $btn.prop('disabled', false).html('<i class="fas fa-compress-alt"></i> <span>Comprimir</span>');
}

// 💾 Descargar
function descargar() {
  if (!archivoComprimido) {
    return Notificacion('Primero comprime la imagen', 'warning', 2000);
  }
  
  const url = URL.createObjectURL(archivoComprimido.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `comprimido_${archivoOriginal.name}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  wiTip('#btnDownload', '¡Descargado! 🎉', 'success', 1500);
}

// 🗑️ Eliminar
function eliminar() {
  if (!archivoOriginal && !archivoComprimido) {
    return Notificacion('No hay imagen para eliminar', 'warning', 2000);
  }

  archivoOriginal = null;
  archivoComprimido = null;
  
  $('#previewContainer').hide();
  $('#dropPlaceholder').show();
  $('#previewImage').attr('src', '');
  $('#infoSection, #fileNameSection').hide();
  $('#fileInput').val('');
  
  $('#quality').val(70);
  $('#maxWidth').val(1920);
  
  Notificacion('Imagen eliminada correctamente', 'success', 2000);
}

// 🧹 Cleanup
export const cleanup = () => {
  console.log('🧹 Comprimir limpiado');
  archivoOriginal = null;
  archivoComprimido = null;
  $('#fileInput, #btnCompress, #btnDownload, #btnSelect, #btnDelete, #dropZone').off();
  $(document).off('paste');
};