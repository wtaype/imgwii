import './optimizar.css';
import $ from 'jquery';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado global
let archivos = []; // Array de { id, file, original, isOptimized, optimizationCount, selected }
let archivoActual = null;

// 🔧 Utilidades
const formatBytes = (bytes, decimals = 1) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Generar nombre con contador
const getOptimizedName = (originalName, count) => {
  const ext = originalName.match(/\.(png|jpg|jpeg|webp)$/i);
  const baseName = originalName.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  return `${baseName}${count}${ext ? ext[0] : '.png'}`;
};

// 🎨 Render del HTML
export const render = () => `
  <div class="optimizar_container">
    <div class="opt_layout">
      <!-- LEFT: DRAG & DROP + PREVIEW -->
      <div class="opt_left">
        <!-- ZONA DE CARGA -->
        <div class="opt_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Optimiza tus imágenes aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, JPEG, WEBP (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/jpg,image/webp" multiple hidden>
        </div>

        <!-- PREVIEW SIMPLE -->
        <div class="opt_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <img id="previewImage" src="" alt="Preview">
          </div>

          <!-- STATS + CONTROLES -->
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact">
                <i class="fas fa-file-alt"></i>
                <span id="statNombre">-</span>
              </div>
              <div class="stat_compact">
                <i class="fas fa-expand-arrows-alt"></i>
                <span id="statDimensiones">-</span>
              </div>
              <div class="stat_compact">
                <i class="fas fa-weight-hanging"></i>
                <span id="statTamano">-</span>
              </div>
              <div class="stat_compact">
                <i class="fas fa-layer-group"></i>
                <span id="statOptimizaciones">-</span>
              </div>
            </div>
            
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnOptimizeCurrent">
                <i class="fas fa-magic"></i>
                <span>Optimizar</span>
              </button>
              <button class="btn_stat_control" id="btnDownloadCurrent">
                <i class="fas fa-download"></i>
                <span>Descargar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: CONFIGURACIÓN + ACCIONES -->
      <div class="opt_right">
        <!-- CONFIGURACIÓN -->
        <div class="config_section">
          <h3><i class="fas fa-sliders-h"></i> Configuración</h3>
          
          <div class="config_item">
            <label for="quality">
              <i class="fas fa-star"></i> Calidad
            </label>
            <input type="range" id="quality" value="80" min="10" max="100" step="5">
            <div class="quality_display">
              <span id="qualityValue">80</span>%
            </div>
          </div>
        </div>

        <!-- LISTA DE ARCHIVOS -->
        <div class="files_section">
          <div class="files_header">
            <h3>
              <input type="checkbox" id="selectAll" title="Seleccionar todos">
              <i class="fas fa-images"></i> 
              Archivos (<span id="filesCount">0</span>)
            </h3>
            <button class="btn_clear_all" id="btnClearAll" title="Limpiar todo">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="files_list" id="filesList">
            <div class="files_empty">
              <i class="fas fa-folder-open"></i>
              <p>Sin archivos</p>
            </div>
          </div>
        </div>

        <!-- ACCIONES BATCH -->
        <div class="actions_section">
          <button class="btn_action btn_optimize" id="btnOptimizeSelected" disabled>
            <i class="fas fa-magic"></i>
            <span>Optimizar Seleccionados</span>
          </button>
          <button class="btn_action btn_download" id="btnDownloadZip" disabled>
            <i class="fas fa-file-archive"></i>
            <span>Descargar ZIP</span>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

// 🎯 Inicialización
export const init = () => {
  console.log(`✅ Optimizar de ${app} cargado`);

  // Event Listeners
  $('#fileInput').on('change', handleFileSelect);
  $('#btnOptimizeCurrent').on('click', optimizarActual);
  $('#btnDownloadCurrent').on('click', descargarActual);
  $('#btnOptimizeSelected').on('click', optimizarSeleccionados);
  $('#btnDownloadZip').on('click', descargarZip);
  $('#btnClearAll').on('click', limpiarTodo);
  $('#selectAll').on('change', toggleSelectAll);
  
  // Drag & Drop + Double Click
  const $zone = $('#dropZone');
  
  $zone.on('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $zone.addClass('dragover');
  });
  
  $zone.on('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $zone.removeClass('dragover');
  });
  
  $zone.on('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $zone.removeClass('dragover');
    const files = e.originalEvent.dataTransfer.files;
    if (files.length) procesarArchivos(files);
  });
  
  // Double click para abrir selector
  $zone.on('dblclick', function(e) {
    e.preventDefault();
    $('#fileInput').trigger('click');
  });

  // Quality slider
  $('#quality').on('input', function() {
    $('#qualityValue').text($(this).val());
  });
};

// 📁 Manejar selección de archivos
function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length) procesarArchivos(files);
}

// 🔍 Procesar archivos
function procesarArchivos(files) {
  let agregados = 0;
  const totalFiles = files.length;
  
  Array.from(files).forEach(file => {
    // Validar tipo
    if (!file.type.match('image/(png|jpeg|jpg|webp)')) {
      Notificacion(`${file.name}: formato no soportado`, 'error', 2000);
      return;
    }

    // Validar tamaño
    if (file.size > 50 * 1024 * 1024) {
      Notificacion(`${file.name}: muy grande (máx 50MB)`, 'error', 2000);
      return;
    }

    const id = Date.now() + Math.random();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const archivo = {
          id,
          file,
          original: {
            url: e.target.result,
            size: file.size,
            width: img.width,
            height: img.height,
            name: file.name
          },
          isOptimized: false,
          optimizationCount: 0,
          selected: false
        };

        archivos.push(archivo);
        agregados++;
        
        if (agregados === totalFiles) {
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

// 🖼️ Mostrar imagen en preview
function mostrarImagen(index) {
  if (index < 0 || index >= archivos.length) return;
  
  archivoActual = index;
  const archivo = archivos[index];

  // Mostrar preview area
  if ($('#dropZone').is(':visible')) {
    $('#dropZone').fadeOut(200, () => {
      $('#previewArea').removeClass('dpn').hide().fadeIn(300);
    });
  }

  // Mostrar imagen
  $('#previewImage').attr('src', archivo.original.url);

  // Mostrar stats
  $('#previewStats').removeClass('dpn').hide().fadeIn(200);

  // Actualizar stats
  $('#statNombre').text(archivo.original.name);
  $('#statDimensiones').text(`${archivo.original.width}×${archivo.original.height}`);
  $('#statTamano').text(formatBytes(archivo.original.size));
  $('#statOptimizaciones').text(archivo.optimizationCount > 0 ? `${archivo.optimizationCount}×` : '0×');

  // Actualizar selección en lista
  $('.file_item').removeClass('active');
  $(`.file_item[data-id="${archivo.id}"]`).addClass('active');
}

// ✨ Optimizar actual (permite optimizar cualquier imagen, incluso las ya optimizadas)
async function optimizarActual() {
  if (archivoActual === null) return;
  
  const archivo = archivos[archivoActual];
  const $btn = $('#btnOptimizeCurrent');
  
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');

  const quality = parseInt($('#quality').val()) / 100;

  try {
    const options = {
      maxSizeMB: 50,
      maxWidthOrHeight: Math.max(archivo.original.width, archivo.original.height),
      useWebWorker: true,
      initialQuality: quality
    };

    const inicio = performance.now();
    const optimizedBlob = await imageCompression(archivo.file, options);
    const fin = performance.now();

    // Incrementar contador
    archivo.optimizationCount++;

    // Crear nuevo archivo optimizado
    const newFileName = getOptimizedName(archivo.original.name, archivo.optimizationCount);
    const newFile = new File([optimizedBlob], newFileName, { type: optimizedBlob.type });

    const reader = new FileReader();
    await new Promise((resolve) => {
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const nuevoArchivo = {
            id: Date.now() + Math.random(),
            file: newFile,
            original: {
              url: e.target.result,
              size: optimizedBlob.size,
              width: img.width,
              height: img.height,
              name: newFileName
            },
            isOptimized: true,
            optimizationCount: 0,
            selected: false,
            reduccion: (((archivo.original.size - optimizedBlob.size) / archivo.original.size) * 100).toFixed(1),
            tiempoCompresion: ((fin - inicio) / 1000).toFixed(2)
          };

          archivos.push(nuevoArchivo);
          actualizarUI();
          
          // Mostrar el nuevo archivo optimizado
          mostrarImagen(archivos.length - 1);
          
          Notificacion(`¡Optimizado! -${nuevoArchivo.reduccion}%`, 'success', 2000);
          resolve();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(optimizedBlob);
    });

  } catch (error) {
    console.error('Error optimizando:', error);
    Notificacion(`Error al optimizar`, 'error');
  }

  $btn.prop('disabled', false).html('<i class="fas fa-magic"></i> <span>Optimizar</span>');
}

// 💾 Descargar actual
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

// ✨ Optimizar seleccionados (solo originales no optimizados)
async function optimizarSeleccionados() {
  const seleccionados = archivos.filter(a => a.selected && !a.isOptimized);
  
  if (seleccionados.length === 0) {
    Notificacion('Selecciona archivos originales para optimizar', 'warning', 2000);
    return;
  }

  const $btn = $('#btnOptimizeSelected');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Optimizando...</span>');

  const quality = parseInt($('#quality').val()) / 100;
  let optimizados = 0;

  for (let archivo of seleccionados) {
    try {
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
      const newFileName = getOptimizedName(archivo.original.name, archivo.optimizationCount);
      const newFile = new File([optimizedBlob], newFileName, { type: optimizedBlob.type });

      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const nuevoArchivo = {
              id: Date.now() + Math.random(),
              file: newFile,
              original: {
                url: e.target.result,
                size: optimizedBlob.size,
                width: img.width,
                height: img.height,
                name: newFileName
              },
              isOptimized: true,
              optimizationCount: 0,
              selected: false,
              reduccion: (((archivo.original.size - optimizedBlob.size) / archivo.original.size) * 100).toFixed(1),
              tiempoCompresion: ((fin - inicio) / 1000).toFixed(2)
            };

            archivos.push(nuevoArchivo);
            optimizados++;
            actualizarUI();
            resolve();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(optimizedBlob);
      });

    } catch (error) {
      console.error('Error optimizando:', error);
      Notificacion(`Error en ${archivo.original.name}`, 'error');
    }
  }

  $btn.prop('disabled', false).html('<i class="fas fa-magic"></i> <span>Optimizar Seleccionados</span>');
  Notificacion(`¡${optimizados} optimizada(s)!`, 'success', 2000);
}

// 📦 Descargar ZIP
async function descargarZip() {
  const seleccionados = archivos.filter(a => a.selected);
  
  if (seleccionados.length === 0) {
    Notificacion('Selecciona archivos para descargar', 'warning', 2000);
    return;
  }

  const $btn = $('#btnDownloadZip');
  $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> <span>Creando ZIP...</span>');

  try {
    const zip = new JSZip();
    
    // Agregar archivos al ZIP
    seleccionados.forEach(archivo => {
      zip.file(archivo.original.name, archivo.file);
    });

    // Generar ZIP
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Descargar
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imagenes_optimizadas_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    wiTip('#btnDownloadZip', `¡${seleccionados.length} archivos descargados! 🎉`, 'success', 2000);
  } catch (error) {
    console.error('Error creando ZIP:', error);
    Notificacion('Error al crear ZIP', 'error');
  }

  $btn.prop('disabled', false).html('<i class="fas fa-file-archive"></i> <span>Descargar ZIP</span>');
}

// ☑️ Toggle select all
function toggleSelectAll() {
  const checked = $('#selectAll').is(':checked');
  archivos.forEach(a => a.selected = checked);
  actualizarUI();
}

// 🧹 Limpiar todo
function limpiarTodo() {
  if (!archivos.length) return;
  
  archivos = [];
  archivoActual = null;
  $('#fileInput').val('');
  $('#selectAll').prop('checked', false);
  
  $('#previewArea').fadeOut(200, () => {
    $('#dropZone').fadeIn(300);
  });
  
  $('#previewStats').addClass('dpn');
  
  actualizarUI();
  Notificacion('Todo limpiado', 'success', 1500);
}

// 🔄 Actualizar UI
function actualizarUI() {
  $('#filesCount').text(archivos.length);
  
  const seleccionados = archivos.filter(a => a.selected);
  const optimizables = seleccionados.filter(a => !a.isOptimized);
  
  $('#btnOptimizeSelected').prop('disabled', optimizables.length === 0);
  $('#btnDownloadZip').prop('disabled', seleccionados.length === 0);
  
  // Update select all checkbox
  const allSelected = archivos.length > 0 && archivos.every(a => a.selected);
  $('#selectAll').prop('checked', allSelected);
  
  actualizarListaArchivos();
}

// 📋 Actualizar lista de archivos
function actualizarListaArchivos() {
  const $lista = $('#filesList');
  
  if (!archivos.length) {
    $lista.html(`
      <div class="files_empty">
        <i class="fas fa-folder-open"></i>
        <p>Sin archivos</p>
      </div>
    `);
    return;
  }

  $lista.html(archivos.map((archivo, index) => {
    const iconClass = archivo.isOptimized ? 'fa-check-circle' : 'fa-image';
    const iconColor = archivo.isOptimized ? 'var(--success)' : 'var(--mco)';
    
    return `
      <div class="file_item ${index === archivoActual ? 'active' : ''} ${archivo.isOptimized ? 'optimized' : ''}" data-id="${archivo.id}">
        <div class="file_checkbox">
          <input type="checkbox" ${archivo.selected ? 'checked' : ''} data-id="${archivo.id}">
        </div>
        <div class="file_icon">
          <i class="fas ${iconClass}" style="color: ${iconColor}"></i>
        </div>
        <div class="file_info">
          <span class="file_name">${archivo.original.name}</span>
          <div class="file_meta">
            <span class="file_size">${formatBytes(archivo.original.size)}</span>
            ${archivo.isOptimized ? `<span class="file_reduction">-${archivo.reduccion}%</span>` : ''}
          </div>
        </div>
        <button class="btn_file_delete" data-id="${archivo.id}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }).join(''));

  // Event listeners para items
  $('.file_item').on('click', function(e) {
    if ($(e.target).is('input[type="checkbox"]') || $(e.target).closest('.btn_file_delete').length) return;
    
    const id = $(this).data('id');
    const index = archivos.findIndex(a => a.id === id);
    if (index !== -1) mostrarImagen(index);
  });

  // Checkboxes
  $('.file_checkbox input').on('change', function(e) {
    e.stopPropagation();
    const id = $(this).data('id');
    const archivo = archivos.find(a => a.id === id);
    if (archivo) {
      archivo.selected = $(this).is(':checked');
      actualizarUI();
    }
  });

  $('.btn_file_delete').on('click', function(e) {
    e.stopPropagation();
    const id = $(this).data('id');
    eliminarArchivo(id);
  });
}

// 🗑️ Eliminar archivo
function eliminarArchivo(id) {
  const index = archivos.findIndex(a => a.id === id);
  if (index === -1) return;

  archivos.splice(index, 1);

  if (archivos.length === 0) {
    limpiarTodo();
  } else {
    if (archivoActual >= archivos.length) {
      archivoActual = archivos.length - 1;
    }
    mostrarImagen(archivoActual);
    actualizarUI();
  }
}

// 🧹 Cleanup
export const cleanup = () => {
  console.log('🧹 Optimizar limpiado');
  archivos = [];
  archivoActual = null;
  $('#fileInput, #btnOptimizeCurrent, #btnDownloadCurrent, #btnOptimizeSelected, #btnDownloadZip, #btnClearAll, #dropZone, #quality, #selectAll').off();
  $('.file_item, .btn_file_delete, .file_checkbox input').off();
};
