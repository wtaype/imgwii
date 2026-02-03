import './convertir.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivoOriginal = null;
let archivoConvertido = null;
let isConverting = false;

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
                  <option value="webp" selected>WebP</option>
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
                <input type="number" id="quality" min="10" max="100" value="85" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>
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

        <div class="conv_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size" id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
                <span class="data_format" id="originalFormat">--</span>
              </div>
            </div>

            <div class="comparison_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>

            <div class="comparison_col">
              <span class="comparison_label">Convertido:</span>
              <div class="comparison_data">
                <span class="data_size success" id="convertedSize">--</span>
                <span class="data_dimensions" id="convertedDimensions">--</span>
                <span class="data_format success" id="convertedFormat">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span id="reductionLabel">Reducción: <strong id="reductionPercent">0%</strong></span>
          </div>
        </div>

        <div class="progress_section" id="progressSection" style="display:none;">
          <div class="progress_header">
            <span>Convirtiendo...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress_bar">
            <div class="progress_fill" id="progressFill"></div>
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

// 🎯 Init
export const init = () => {
  console.log(`✅ Convertir de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivo(e.target.files[0]));
  $('#btnConvert').on('click', convertir);
  $('#btnDownload').on('click', descargar);
  $('#btnSelect').on('click', () => $('#fileInput').trigger('click'));
  $('#btnDelete').on('click', eliminar);
  
  // 🔄 ACTUALIZAR PREVIEW AL CAMBIAR FORMATO/CALIDAD
  $('#formatSelect, #quality').on('change input', () => {
    if (archivoConvertido) {
      // Solo resetear preview si ya fue convertido
      $('#convertedSize, #convertedDimensions, #convertedFormat').text('--');
      $('#reductionDisplay').hide();
    }
  });
  
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

  // 📋 CTRL + V (Paste) - MEJORADO
  $(document).on('paste', e => {
    const items = e.originalEvent.clipboardData?.items;
    if (!items) return;
    
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const ext = item.type.split('/')[1] || 'png';
          const file = new File([blob], `Captura_${Date.now()}.${ext}`, { type: item.type });
          procesarArchivo(file);
          
          // Visual feedback
          $zone.addClass('paste_flash');
          setTimeout(() => $zone.removeClass('paste_flash'), 300);
          
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
      const formatoOriginal = file.type.split('/')[1].toUpperCase();
      
      archivoOriginal = {
        file,
        url: e.target.result,
        size: file.size,
        width: img.width,
        height: img.height,
        name: file.name,
        format: formatoOriginal
      };
      
      archivoConvertido = null;
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
  $('#originalFormat').text(archivoOriginal.format);
  
  $('#fileNameDisplay').text(archivoOriginal.name).attr('title', archivoOriginal.name);
  
  $('#infoSection, #fileNameSection').fadeIn(300);
  $('#convertedSize, #convertedDimensions, #convertedFormat').text('--');
  $('#reductionDisplay').hide();
}

// ✨ Convertir con ImageCompression MEJORADO
async function convertir() {
  if (!archivoOriginal) {
    return Notificacion('Primero carga una imagen', 'warning', 2000);
  }

  if (isConverting) {
    return Notificacion('Ya hay una conversión en progreso', 'warning', 2000);
  }
  
  const formatoDestino = $('#formatSelect').val();
  const $btn = $('#btnConvert');
  
  isConverting = true;
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');
  
  $('#progressSection').fadeIn(300);
  updateProgress(0);

  try {
    const quality = parseInt($('#quality').val()) / 100;

    updateProgress(10);

    const inicio = performance.now();
    
    // 💪 CONFIGURACIÓN MEJORADA POR FORMATO
    const options = {
      maxSizeMB: 50,
      useWebWorker: true,
      fileType: `image/${formatoDestino}`,
      // AJUSTE DINÁMICO DE CALIDAD (1-100% funcional)
      initialQuality: quality,
      alwaysKeepResolution: true
    };

    updateProgress(30);

    // Usar imageCompression para mejor calidad
    let compressedBlob = await imageCompression(archivoOriginal.file, options);

    updateProgress(60);

    // 🎯 CONVERSIÓN ADICIONAL CON CANVAS (Para formatos específicos)
    if (['png', 'jpeg', 'webp', 'bmp'].includes(formatoDestino)) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { 
        alpha: formatoDestino === 'png',
        willReadFrequently: false 
      });
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(compressedBlob);
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      updateProgress(80);

      const mimeType = `image/${formatoDestino === 'jpg' ? 'jpeg' : formatoDestino}`;
      compressedBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, mimeType, quality);
      });
      
      URL.revokeObjectURL(img.src);
    } else {
      updateProgress(80);
    }

    updateProgress(90);

    const fin = performance.now();

    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = e => {
        const img2 = new Image();
        img2.onload = () => {
          // 🔧 FIX: CALCULAR REDUCCIÓN CORRECTAMENTE
          const originalSize = archivoOriginal.size;
          const convertedSize = compressedBlob.size;
          const reduccion = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);
          const esReduccion = parseFloat(reduccion) > 0;
          
          archivoConvertido = {
            blob: compressedBlob,
            url: e.target.result,
            size: convertedSize,
            width: img2.width,
            height: img2.height,
            format: formatoDestino.toUpperCase(),
            reduccion: Math.abs(reduccion),
            esReduccion,
            tiempo: ((fin - inicio) / 1000).toFixed(2)
          };

          $('#previewImage').attr('src', archivoConvertido.url);
          $('#convertedSize').text(formatBytes(archivoConvertido.size));
          $('#convertedDimensions').text(`${archivoConvertido.width}×${archivoConvertido.height}`);
          $('#convertedFormat').text(archivoConvertido.format);
          
          // 🎨 MOSTRAR REDUCCIÓN O AUMENTO
          const $display = $('#reductionDisplay');
          const $icon = $display.find('i');
          const $label = $('#reductionLabel');
          const $percent = $('#reductionPercent');
          
          if (esReduccion) {
            $display.removeClass('warning').addClass('success');
            $icon.removeClass('fa-arrow-up').addClass('fa-chart-pie');
            $label.html(`Reducción: <strong id="reductionPercent">${reduccion}%</strong>`);
            $percent.text(`${reduccion}%`);
          } else {
            $display.removeClass('success').addClass('warning');
            $icon.removeClass('fa-chart-pie').addClass('fa-arrow-up');
            $label.html(`Aumento: <strong id="reductionPercent">${Math.abs(reduccion)}%</strong>`);
            $percent.text(`+${Math.abs(reduccion)}%`);
          }
          
          $display.fadeIn(300);

          updateProgress(100);

          setTimeout(() => {
            $('#progressSection').fadeOut(300);
            
            const mensaje = esReduccion 
              ? `¡Convertido a ${formatoDestino.toUpperCase()}! Reducción: ${reduccion}% en ${archivoConvertido.tiempo}s` 
              : `¡Convertido a ${formatoDestino.toUpperCase()}! Archivo ${Math.abs(reduccion)}% más grande en ${archivoConvertido.tiempo}s`;
            
            Notificacion(mensaje, esReduccion ? 'success' : 'warning', 3000);
          }, 500);

          resolve();
        };
        img2.src = e.target.result;
      };
      reader.readAsDataURL(compressedBlob);
    });
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al convertir la imagen', 'error');
    $('#progressSection').fadeOut(300);
  }

  isConverting = false;
  $btn.prop('disabled', false).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>');
}

// 📊 Actualizar Progreso
function updateProgress(percent) {
  $('#progressFill').css('width', `${percent}%`);
  $('#progressPercent').text(`${percent}%`);
}

// 💾 Descargar
function descargar() {
  if (!archivoConvertido) {
    return Notificacion('Primero convierte la imagen', 'warning', 2000);
  }
  
  const url = URL.createObjectURL(archivoConvertido.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `convertido_${archivoOriginal.name.replace(/\.[^.]+$/, `.${archivoConvertido.format.toLowerCase()}`)}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  wiTip('#btnDownload', '¡Descargado! 🎉', 'success', 1500);
}

// 🗑️ Eliminar
function eliminar() {
  if (!archivoOriginal && !archivoConvertido) {
    return Notificacion('No hay imagen para eliminar', 'warning', 2000);
  }

  archivoOriginal = null;
  archivoConvertido = null;
  
  $('#previewContainer').hide();
  $('#dropPlaceholder').show();
  $('#previewImage').attr('src', '');
  $('#infoSection, #fileNameSection, #progressSection').hide();
  $('#fileInput').val('');
  
  $('#formatSelect').val('webp');
  $('#quality').val(85);
  
  Notificacion('Imagen eliminada correctamente', 'success', 2000);
}

// 🧹 Cleanup
export const cleanup = () => {
  console.log('🧹 Convertir limpiado');
  archivoOriginal = null;
  archivoConvertido = null;
  isConverting = false;
  $('#fileInput, #btnConvert, #btnDownload, #btnSelect, #btnDelete, #dropZone, #formatSelect, #quality').off();
  $(document).off('paste');
};