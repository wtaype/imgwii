import './comprimir.css';
import $ from 'jquery';
import Compressor from 'compressorjs';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivos = [];
let archivoActual = null;
let pasteCount = 1;

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
      <div class="comp_left">
        <div class="comp_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-compress-alt"></i>
            <h2>Arrastra tus imágenes aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, WEBP, AVIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/jpg,image/webp,image/avif" multiple hidden>
        </div>
        <div class="comp_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <img id="previewImage" src="" alt="Preview">
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
              <div class="stat_compact quality_input_wrapper">
                <i class="fas fa-star"></i>
                <input type="text" id="qualityInput" value="80">
                <span class="quality_percent">%</span>
              </div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnCompressCurrent"><i class="fas fa-compress-alt"></i><span>Comprimir</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="comp_right">
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
  console.log(`✅ Compresor de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivos(e.target.files));
  $('#btnCompressCurrent').on('click', comprimirActual);
  $('#btnDownloadCurrent').on('click', descargarActual);
  $('#btnClearAll').on('click', limpiarTodo);
  
  // Drag & Drop
  $zone.on('dragover', e => { e.preventDefault(); $zone.addClass('dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('dragover');
    procesarArchivos(e.originalEvent.dataTransfer.files);
  });
  $zone.on('dblclick', e => { e.preventDefault(); $('#fileInput').trigger('click'); });
  
  // Paste event
  $(document).on('paste', handlePaste);
  
  // Load session
  loadSession();
};

/* ==================== PASTE ==================== */
const handlePaste = (e) => {
  const items = e.originalEvent?.clipboardData?.items;
  if (!items) return;
  
  let found = false;
  $.each(items, (_, item) => {
    if (item.type.startsWith('image/')) {
      const blob = item.getAsFile();
      if (!blob) return true;
      
      const file = new File([blob], `Captura_${pasteCount++}.png`, { type: blob.type });
      procesarArchivos([file]);
      found = true;
      
      // Visual feedback
      $('#dropZone, #previewArea').addClass('paste_flash');
      setTimeout(() => {
        $('#dropZone, #previewArea').removeClass('paste_flash');
      }, 300);
      
      return false;
    }
  });
  
  if (!found && e.originalEvent?.clipboardData?.items?.length > 0) {
    Notificacion('No se detectó imagen en portapapeles', 'error', 2000);
  }
};

// 📁 Procesar
function procesarArchivos(files) {
  let agregados = 0;
  
  Array.from(files).forEach(file => {
    if (!file.type.match('image/(png|jpeg|jpg|webp|avif)')) {
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
          isCompressed: false
        });
        
        if (++agregados === files.length) {
          actualizarUI();
          if (archivos.length === agregados) mostrarImagen(0);
          Notificacion(`${agregados} archivo(s) agregado(s)`, 'success', 2000);
          saveSession();
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

  $('.file_item').removeClass('active');
  $(`.file_item[data-id="${archivo.id}"]`).addClass('active');
}

// ✨ Comprimir
async function comprimirActual() {
  if (archivoActual === null) return;
  
  const archivo = archivos[archivoActual];
  const $btn = $('#btnCompressCurrent');
  
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  try {
    const quality = parseInt($('#qualityInput').val()) / 100;

    const inicio = performance.now();
    const compressedFile = await new Promise((resolve, reject) => {
      new Compressor(archivo.file, {
        quality: quality,
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
          const reduccion = (((archivo.original.size - compressedFile.size) / archivo.original.size) * 100).toFixed(1);
          
          archivos.push({
            id: Date.now() + Math.random(),
            file: new File([compressedFile], archivo.original.name, { type: compressedFile.type }),
            original: {
              url: e.target.result,
              size: compressedFile.size,
              width: img.width,
              height: img.height,
              name: archivo.original.name
            },
            isCompressed: true,
            reduccion,
            tiempoCompresion: ((fin - inicio) / 1000).toFixed(2)
          });

          actualizarUI();
          mostrarImagen(archivos.length - 1);
          Notificacion(`¡Comprimida! -${reduccion}%`, 'success', 2000);
          saveSession();
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
  pasteCount = 1;
  $('#fileInput').val('');
  $('#previewArea').fadeOut(200, () => $('#dropZone').fadeIn(300));
  $('#previewStats').addClass('dpn');
  actualizarUI();
  Notificacion('Todo limpiado', 'success', 1500);
  localStorage.removeItem('comprimir_session');
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
      <div class="file_item ${index === archivoActual ? 'active' : ''} ${hasReduction ? 'compressed' : ''}" data-id="${archivo.id}">
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
    saveSession();
  });
}

/* ==================== SESSION PERSISTENCE ==================== */
const saveSession = () => {
  const session = archivos.map(a => ({
    id: a.id,
    name: a.original.name,
    url: a.original.url,
    size: a.original.size,
    width: a.original.width,
    height: a.original.height,
    type: a.type,
    isCompressed: a.isCompressed,
    reduccion: a.reduccion
  }));
  localStorage.setItem('comprimir_session', JSON.stringify(session));
};

const loadSession = () => {
  const saved = localStorage.getItem('comprimir_session');
  if (!saved) return;
  
  try {
    const session = JSON.parse(saved);
    if (!session.length) return;
    
    // Evitar duplicados: solo cargar si el array está vacío
    if (archivos.length > 0) return;
    
    session.forEach(s => {
      archivos.push({
        id: s.id,
        file: null,
        original: {
          url: s.url,
          name: s.name,
          size: s.size,
          width: s.width,
          height: s.height
        },
        type: s.type,
        isCompressed: s.isCompressed,
        reduccion: s.reduccion
      });
    });
    
    actualizarUI();
    if (archivos.length > 0) mostrarImagen(0);
    console.log(`✅ ${archivos.length} archivo(s) restaurados`);
  } catch (e) {
    console.error('Error cargando sesión:', e);
  }
};

// 🧹 Cleanup
export const cleanup = () => {
  saveSession();
  $(document).off('paste');
};
