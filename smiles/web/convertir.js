import './convertir.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivos = [];
let archivoActual = null;
let isConverting = false;
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
  <div class="convert_container">
    <div class="conv_layout">
      <div class="conv_left">
        <div class="conv_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-exchange-alt"></i>
            <h2>Arrastra tus imágenes aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, WEBP, AVIF, BMP, GIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" multiple hidden>
        </div>
        <div class="conv_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <img id="previewImage" src="" alt="Preview">
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
              <div class="stat_compact format_selector">
                <i class="fas fa-file-image"></i>
                <select id="formatSelect">
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                  <option value="avif">AVIF</option>
                  <option value="bmp">BMP</option>
                </select>
              </div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnConvertCurrent"><i class="fas fa-exchange-alt"></i><span>Convertir</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
          <div class="progress_container dpn" id="progressContainer">
            <div class="progress_bar">
              <div class="progress_fill" id="progressFill"></div>
            </div>
            <div class="progress_text" id="progressText">Convirtiendo... 0%</div>
          </div>
        </div>
      </div>
      <div class="conv_right">
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
  console.log(`✅ Convertidor de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivos(e.target.files));
  $('#btnConvertCurrent').on('click', convertirActual);
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
    if (!file.type.startsWith('image/')) {
      return Notificacion(`${file.name}: no es una imagen`, 'error', 2000);
    }
    if (file.size > 50 * 1024 * 1024) {
      return Notificacion(`${file.name}: muy grande (máx 50MB)`, 'error', 2000);
    }

    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const formatoOriginal = file.type.split('/')[1].toUpperCase();
        archivos.push({
          id: Date.now() + Math.random(),
          file,
          original: {
            url: e.target.result,
            size: file.size,
            width: img.width,
            height: img.height,
            name: file.name,
            format: formatoOriginal
          },
          isConverted: false
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

// ✨ Convertir con barra de progreso
async function convertirActual() {
  if (archivoActual === null || isConverting) return;
  
  const archivo = archivos[archivoActual];
  const formatoDestino = $('#formatSelect').val();
  const $btn = $('#btnConvertCurrent');
  const $progress = $('#progressContainer');
  const $fill = $('#progressFill');
  const $text = $('#progressText');
  
  isConverting = true;
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');
  $progress.removeClass('dpn');

  try {
    // Simular progreso
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      $fill.css('width', `${progress}%`);
      $text.text(`Convirtiendo... ${Math.round(progress)}%`);
    }, 100);

    const inicio = performance.now();
    
    // Crear canvas para conversión
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = archivo.original.url;
    });

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Convertir a formato deseado
    const mimeType = `image/${formatoDestino === 'jpg' ? 'jpeg' : formatoDestino}`;
    const quality = formatoDestino === 'jpeg' || formatoDestino === 'webp' ? 0.92 : undefined;
    
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, mimeType, quality);
    });

    clearInterval(progressInterval);
    $fill.css('width', '100%');
    $text.text('Conversión completa! 100%');

    const fin = performance.now();
    const nuevoNombre = archivo.original.name.replace(/\.[^.]+$/, `.${formatoDestino}`);

    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = e => {
        const img2 = new Image();
        img2.onload = () => {
          const cambioTamano = ((blob.size - archivo.original.size) / archivo.original.size * 100).toFixed(1);
          const signo = cambioTamano > 0 ? '+' : '';
          
          archivos.push({
            id: Date.now() + Math.random(),
            file: new File([blob], nuevoNombre, { type: mimeType }),
            original: {
              url: e.target.result,
              size: blob.size,
              width: img2.width,
              height: img2.height,
              name: nuevoNombre,
              format: formatoDestino.toUpperCase()
            },
            isConverted: true,
            cambioTamano,
            tiempoConversion: ((fin - inicio) / 1000).toFixed(2),
            formatoOriginal: archivo.original.format
          });

          actualizarUI();
          mostrarImagen(archivos.length - 1);
          Notificacion(`¡Convertido a ${formatoDestino.toUpperCase()}! ${signo}${cambioTamano}%`, 'success', 2000);
          saveSession();
          
          setTimeout(() => {
            $progress.addClass('dpn');
            $fill.css('width', '0%');
          }, 1500);
          
          resolve();
        };
        img2.src = e.target.result;
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error:', error);
    Notificacion('Error al convertir', 'error');
    $progress.addClass('dpn');
    $fill.css('width', '0%');
  }

  isConverting = false;
  $btn.prop('disabled', false).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>');
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
  $('#progressContainer').addClass('dpn');
  actualizarUI();
  Notificacion('Todo limpiado', 'success', 1500);
  localStorage.removeItem('convertir_session');
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
    const hasConversion = archivo.isConverted;
    const iconClass = hasConversion ? 'fa-check-circle' : 'fa-image';
    const iconColor = hasConversion ? 'var(--success)' : 'var(--mco)';
    
    return `
      <div class="file_item ${index === archivoActual ? 'active' : ''} ${hasConversion ? 'converted' : ''}" data-id="${archivo.id}">
        <div class="file_icon"><i class="fas ${iconClass}" style="color: ${iconColor}"></i></div>
        <div class="file_info">
          <span class="file_name">${archivo.original.name}</span>
          <div class="file_meta">
            <span class="file_format">${archivo.original.format}</span>
            <span class="file_size">${formatBytes(archivo.original.size)}</span>
            ${hasConversion ? `<span class="file_change">${archivo.cambioTamano > 0 ? '+' : ''}${archivo.cambioTamano}%</span>` : ''}
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
    format: a.original.format,
    isConverted: a.isConverted,
    cambioTamano: a.cambioTamano,
    formatoOriginal: a.formatoOriginal
  }));
  localStorage.setItem('convertir_session', JSON.stringify(session));
};

const loadSession = () => {
  const saved = localStorage.getItem('convertir_session');
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
          height: s.height,
          format: s.format
        },
        isConverted: s.isConverted,
        cambioTamano: s.cambioTamano,
        formatoOriginal: s.formatoOriginal
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
