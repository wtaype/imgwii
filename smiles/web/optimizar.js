import './optimizar.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivos = [];
let archivoActual = null;

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
      <div class="opt_left">
        <div class="opt_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Optimiza tus imágenes aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, JPEG, WEBP (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/jpg,image/webp" multiple hidden>
        </div>
        <div class="opt_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <img id="previewImage" src="" alt="Preview">
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
              <div class="stat_compact"><i class="fas fa-layer-group"></i><span id="statOptimizaciones">-</span></div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnOptimizeCurrent"><i class="fas fa-magic"></i><span>Optimizar</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="opt_right">
        <div class="config_section">
          <h3><i class="fas fa-sliders-h"></i> Configuración</h3>
          <div class="config_item">
            <label for="quality"><i class="fas fa-star"></i> Calidad</label>
            <input type="range" id="quality" value="80" min="10" max="100" step="5">
            <div class="quality_display"><span id="qualityValue">80</span>%</div>
          </div>
        </div>
        <div class="files_section">
          <div class="files_header">
            <h3><i class="fas fa-images"></i> Archivos (<span id="filesCount">0</span>)</h3>
            <button class="btn_clear_all" id="btnClearAll" title="Limpiar todo"><i class="fas fa-trash"></i></button>
          </div>
          <div class="files_list" id="filesList">
            <div class="files_empty"><i class="fas fa-folder-open"></i><p>Sin archivos</p></div>
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
  $('#fileInput').on('change', e => procesarArchivos(e.target.files));
  $('#btnOptimizeCurrent').on('click', optimizarActual);
  $('#btnDownloadCurrent').on('click', descargarActual);
  $('#btnClearAll').on('click', limpiarTodo);
  $('#quality').on('input', function() { $('#qualityValue').text($(this).val()); });
  
  // Drag & Drop
  $zone.on('dragover', e => { e.preventDefault(); $zone.addClass('dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('dragover');
    procesarArchivos(e.originalEvent.dataTransfer.files);
  });
  $zone.on('dblclick', e => { e.preventDefault(); $('#fileInput').trigger('click'); });
};

//  Procesar
function procesarArchivos(files) {
  let agregados = 0;
  
  Array.from(files).forEach(file => {
    if (!file.type.match('image/(png|jpeg|jpg|webp)')) {
      return Notificacion(`${file.name}: formato no soportado`, 'error', 2000);
    }
    if (file.size > 50 * 1024 * 1024) {
      return Notificacion(`${file.name}: muy grande (máx 50MB)`, 'error', 2000);
    }

    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        archivos.push({
          id: Date.now() + Math.random(),
          file,
          original: {
            url: e.target.result,
            size: file.size,
            width: img.width,
            height: img.height,
            name: file.name
          },
          optimizationCount: 0
        });
        
        if (++agregados === files.length) {
          actualizarUI();
          if (archivos.length === agregados) mostrarImagen(0);
          Notificacion(`${agregados} archivo(s) agregado(s)`, 'success', 2000);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// 🖼️ Mostrar
function mostrarImagen(index) {
  if (index < 0 || index >= archivos.length) return;
  
  archivoActual = index;
  const archivo = archivos[index];

  if ($('#dropZone').is(':visible')) {
    $('#dropZone').fadeOut(200, () => $('#previewArea').removeClass('dpn').hide().fadeIn(300));
  }

  $('#previewImage').attr('src', archivo.original.url);
  $('#previewStats').removeClass('dpn').hide().fadeIn(200);
  $('#statNombre').text(archivo.original.name);
  $('#statDimensiones').text(`${archivo.original.width}×${archivo.original.height}`);
  $('#statTamano').text(formatBytes(archivo.original.size));
  $('#statOptimizaciones').text(archivo.optimizationCount > 0 ? `${archivo.optimizationCount}×` : '0×');

  $('.file_item').removeClass('active');
  $(`.file_item[data-id="${archivo.id}"]`).addClass('active');
}

// ✨ Optimizar
async function optimizarActual() {
  if (archivoActual === null) return;
  
  const archivo = archivos[archivoActual];
  const $btn = $('#btnOptimizeCurrent');
  
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  try {
    const quality = parseInt($('#quality').val()) / 100;
    const options = {
      maxSizeMB: 50,
      maxWidthOrHeight: Math.max(archivo.original.width, archivo.original.height),
      useWebWorker: true,
      initialQuality: quality
    };

    const inicio = performance.now();
    const optimizedBlob = await imageCompression(archivo.file, options);
    const fin = performance.now();

    archivo.optimizationCount++;

    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const reduccion = (((archivo.original.size - optimizedBlob.size) / archivo.original.size) * 100).toFixed(1);
          
          archivos.push({
            id: Date.now() + Math.random(),
            file: new File([optimizedBlob], archivo.original.name, { type: optimizedBlob.type }),
            original: {
              url: e.target.result,
              size: optimizedBlob.size,
              width: img.width,
              height: img.height,
              name: archivo.original.name
            },
            optimizationCount: 0,
            reduccion,
            tiempoCompresion: ((fin - inicio) / 1000).toFixed(2)
          });

          actualizarUI();
          mostrarImagen(archivos.length - 1);
          Notificacion(`¡Optimizado! -${reduccion}%`, 'success', 2000);
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

// � Descargar
function descargarActual() {
  if (archivoActual === null) return;
  
  const archivo = archivos[archivoActual];
  const url = URL.createObjectURL(archivo.file);
  const a = document.createElement('a');
  a.href = url;
  a.download = archivo.original.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  wiTip('#btnDownloadCurrent', '¡Descargado! 🎉', 'success', 1500);
}

// 🧹 Limpiar
function limpiarTodo() {
  if (!archivos.length) return;
  
  archivos = [];
  archivoActual = null;
  $('#fileInput').val('');
  $('#previewArea').fadeOut(200, () => $('#dropZone').fadeIn(300));
  $('#previewStats').addClass('dpn');
  actualizarUI();
  Notificacion('Todo limpiado', 'success', 1500);
}

// 🔄 UI
function actualizarUI() {
  $('#filesCount').text(archivos.length);
  actualizarListaArchivos();
}

function actualizarListaArchivos() {
  const $lista = $('#filesList');
  
  if (!archivos.length) {
    return $lista.html('<div class="files_empty"><i class="fas fa-folder-open"></i><p>Sin archivos</p></div>');
  }

  $lista.html(archivos.map((archivo, index) => {
    const hasReduction = archivo.reduccion !== undefined;
    const iconClass = hasReduction ? 'fa-check-circle' : 'fa-image';
    const iconColor = hasReduction ? 'var(--success)' : 'var(--mco)';
    
    return `
      <div class="file_item ${index === archivoActual ? 'active' : ''} ${hasReduction ? 'optimized' : ''}" data-id="${archivo.id}">
        <div class="file_icon"><i class="fas ${iconClass}" style="color: ${iconColor}"></i></div>
        <div class="file_info">
          <span class="file_name">${archivo.original.name}</span>
          <div class="file_meta">
            <span class="file_size">${formatBytes(archivo.original.size)}</span>
            ${hasReduction ? `<span class="file_reduction">-${archivo.reduccion}%</span>` : ''}
          </div>
        </div>
        <button class="btn_file_delete" data-id="${archivo.id}"><i class="fas fa-times"></i></button>
      </div>
    `;
  }).join(''));

  $('.file_item').on('click', function(e) {
    if ($(e.target).closest('.btn_file_delete').length) return;
    const index = archivos.findIndex(a => a.id === $(this).data('id'));
    if (index !== -1) mostrarImagen(index);
  });

  $('.btn_file_delete').on('click', function(e) {
    e.stopPropagation();
    const index = archivos.findIndex(a => a.id === $(this).data('id'));
    if (index === -1) return;

    archivos.splice(index, 1);
    if (!archivos.length) return limpiarTodo();
    
    if (archivoActual >= archivos.length) archivoActual = archivos.length - 1;
    mostrarImagen(archivoActual);
    actualizarUI();
  });
}

// 🧹 Cleanup
export const cleanup = () => {
  console.log('🧹 Optimizar limpiado');
  archivos = [];
  archivoActual = null;
  $('#fileInput, #btnOptimizeCurrent, #btnDownloadCurrent, #btnClearAll, #dropZone, #quality').off();
  $('.file_item, .btn_file_delete').off();
};
