import './editar.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { Notificacion, wiTip } from '../widev.js';

// 📊 Estado
let archivos = [];
let archivoActual = null;
let pasteCount = 1;

// Filtros actuales
let filtros = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  rotate: 0,
  flipH: 1,
  flipV: 1
};

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
  <div class="edit_container">
    <div class="edit_layout">
      <div class="edit_left">
        <div class="edit_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-magic"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, WEBP, AVIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" hidden>
        </div>
        <div class="edit_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <canvas id="editCanvas"></canvas>
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnResetFilters"><i class="fas fa-undo"></i><span>Resetear</span></button>
              <button class="btn_stat_control" id="btnApplyFilters"><i class="fas fa-check"></i><span>Aplicar</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="edit_right">
        <div class="filters_section">
          <div class="filters_header">
            <h3><i class="fas fa-sliders-h"></i> Ajustes</h3>
          </div>
          <div class="filters_list" id="filtersList">
            <div class="filter_group">
              <label><i class="fas fa-sun"></i> Brillo</label>
              <input type="range" id="brightness" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="brightnessValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-adjust"></i> Contraste</label>
              <input type="range" id="contrast" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="contrastValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-palette"></i> Saturación</label>
              <input type="range" id="saturate" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="saturateValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-blur"></i> Desenfoque</label>
              <input type="range" id="blur" min="0" max="10" value="0" step="0.5">
              <span class="filter_value" id="blurValue">0px</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-circle-half-stroke"></i> Escala de grises</label>
              <input type="range" id="grayscale" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="grayscaleValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-camera-retro"></i> Sepia</label>
              <input type="range" id="sepia" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="sepiaValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-rainbow"></i> Tono</label>
              <input type="range" id="hueRotate" min="0" max="360" value="0" step="1">
              <span class="filter_value" id="hueRotateValue">0°</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-exchange-alt"></i> Invertir</label>
              <input type="range" id="invert" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="invertValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-eye"></i> Opacidad</label>
              <input type="range" id="opacity" min="0" max="100" value="100" step="1">
              <span class="filter_value" id="opacityValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-redo"></i> Rotación</label>
              <input type="range" id="rotate" min="0" max="360" value="0" step="90">
              <span class="filter_value" id="rotateValue">0°</span>
            </div>
          </div>
          <div class="transform_buttons">
            <button class="btn_transform" id="btnFlipH"><i class="fas fa-arrows-alt-h"></i> Voltear H</button>
            <button class="btn_transform" id="btnFlipV"><i class="fas fa-arrows-alt-v"></i> Voltear V</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// 🎯 Init
export const init = () => {
  console.log(`✅ Editor de ${app} cargado`);

  const $zone = $('#dropZone');
  
  // Events
  $('#fileInput').on('change', e => procesarArchivo(e.target.files[0]));
  $('#btnResetFilters').on('click', resetearFiltros);
  $('#btnApplyFilters').on('click', aplicarFiltros);
  $('#btnDownloadCurrent').on('click', descargarActual);
  $('#btnFlipH').on('click', () => voltear('h'));
  $('#btnFlipV').on('click', () => voltear('v'));
  
  // Drag & Drop
  $zone.on('dragover', e => { e.preventDefault(); $zone.addClass('dragover'); });
  $zone.on('dragleave', e => { e.preventDefault(); $zone.removeClass('dragover'); });
  $zone.on('drop', e => {
    e.preventDefault();
    $zone.removeClass('dragover');
    const files = e.originalEvent.dataTransfer.files;
    if (files.length) procesarArchivo(files[0]);
  });
  $zone.on('dblclick', e => { e.preventDefault(); $('#fileInput').trigger('click'); });
  
  // Paste event
  $(document).on('paste', handlePaste);
  
  // Filter events
  setupFilterEvents();
  
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
      procesarArchivo(file);
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

/* ==================== PROCESAR ARCHIVO ==================== */
function procesarArchivo(file) {
  if (!file) return;
  
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
      archivoActual = {
        file,
        original: {
          url: e.target.result,
          size: file.size,
          width: img.width,
          height: img.height,
          name: file.name
        },
        img: img
      };
      
      mostrarImagen();
      resetearFiltros();
      Notificacion('Imagen cargada', 'success', 1500);
      saveSession();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* ==================== MOSTRAR IMAGEN ==================== */
function mostrarImagen() {
  if (!archivoActual) return;
  
  if ($('#dropZone').is(':visible')) {
    $('#dropZone').fadeOut(200, () => $('#previewArea').removeClass('dpn').hide().fadeIn(300));
  }

  const canvas = $('#editCanvas')[0];
  const ctx = canvas.getContext('2d');
  const img = archivoActual.img;
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  aplicarFiltrosCanvas();
  
  $('#previewStats').removeClass('dpn').hide().fadeIn(200);
  $('#statNombre').text(archivoActual.original.name);
  $('#statDimensiones').text(`${archivoActual.original.width}×${archivoActual.original.height}`);
  $('#statTamano').text(formatBytes(archivoActual.original.size));
}

/* ==================== FILTROS ==================== */
function setupFilterEvents() {
  const filterIds = ['brightness', 'contrast', 'saturate', 'blur', 'grayscale', 'sepia', 'hueRotate', 'invert', 'opacity', 'rotate'];
  
  filterIds.forEach(id => {
    $(`#${id}`).on('input', function() {
      const value = $(this).val();
      filtros[id] = parseFloat(value);
      
      let displayValue = value;
      if (id === 'blur') displayValue = `${value}px`;
      else if (id === 'rotate' || id === 'hueRotate') displayValue = `${value}°`;
      else displayValue = `${value}%`;
      
      $(`#${id}Value`).text(displayValue);
      aplicarFiltrosCanvas();
    });
  });
}

function aplicarFiltrosCanvas() {
  if (!archivoActual) return;
  
  const canvas = $('#editCanvas')[0];
  const ctx = canvas.getContext('2d');
  const img = archivoActual.img;
  
  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aplicar transformaciones
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((filtros.rotate * Math.PI) / 180);
  ctx.scale(filtros.flipH, filtros.flipV);
  
  // Aplicar filtros CSS
  ctx.filter = `
    brightness(${filtros.brightness}%)
    contrast(${filtros.contrast}%)
    saturate(${filtros.saturate}%)
    blur(${filtros.blur}px)
    grayscale(${filtros.grayscale}%)
    sepia(${filtros.sepia}%)
    hue-rotate(${filtros.hueRotate}deg)
    invert(${filtros.invert}%)
    opacity(${filtros.opacity}%)
  `;
  
  ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
  ctx.restore();
}

function resetearFiltros() {
  filtros = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    rotate: 0,
    flipH: 1,
    flipV: 1
  };
  
  $('#brightness').val(100); $('#brightnessValue').text('100%');
  $('#contrast').val(100); $('#contrastValue').text('100%');
  $('#saturate').val(100); $('#saturateValue').text('100%');
  $('#blur').val(0); $('#blurValue').text('0px');
  $('#grayscale').val(0); $('#grayscaleValue').text('0%');
  $('#sepia').val(0); $('#sepiaValue').text('0%');
  $('#hueRotate').val(0); $('#hueRotateValue').text('0°');
  $('#invert').val(0); $('#invertValue').text('0%');
  $('#opacity').val(100); $('#opacityValue').text('100%');
  $('#rotate').val(0); $('#rotateValue').text('0°');
  
  aplicarFiltrosCanvas();
  Notificacion('Filtros reseteados', 'info', 1500);
}

function voltear(direccion) {
  if (direccion === 'h') {
    filtros.flipH *= -1;
  } else {
    filtros.flipV *= -1;
  }
  aplicarFiltrosCanvas();
}

/* ==================== APLICAR Y DESCARGAR ==================== */
function aplicarFiltros() {
  if (!archivoActual) return;
  
  const canvas = $('#editCanvas')[0];
  canvas.toBlob((blob) => {
    const newFile = new File([blob], archivoActual.original.name, { type: 'image/png' });
    archivoActual.file = newFile;
    archivoActual.original.size = blob.size;
    
    Notificacion('¡Filtros aplicados!', 'success', 2000);
    saveSession();
  }, 'image/png');
}

function descargarActual() {
  if (!archivoActual) return;
  
  const canvas = $('#editCanvas')[0];
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = archivoActual.original.name.replace(/\.[^.]+$/, '_editado.png');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    wiTip('#btnDownloadCurrent', '¡Descargado! 🎉', 'success', 1500);
  }, 'image/png');
}

/* ==================== SESSION PERSISTENCE ==================== */
const saveSession = () => {
  if (!archivoActual) return;
  
  const session = {
    name: archivoActual.original.name,
    url: archivoActual.original.url,
    size: archivoActual.original.size,
    width: archivoActual.original.width,
    height: archivoActual.original.height,
    filtros: filtros
  };
  localStorage.setItem('editar_session', JSON.stringify(session));
};

const loadSession = () => {
  const saved = localStorage.getItem('editar_session');
  if (!saved || archivoActual) return;
  
  try {
    const session = JSON.parse(saved);
    
    const img = new Image();
    img.onload = () => {
      archivoActual = {
        file: null,
        original: {
          url: session.url,
          name: session.name,
          size: session.size,
          width: session.width,
          height: session.height
        },
        img: img
      };
      
      filtros = session.filtros || filtros;
      mostrarImagen();
      
      // Actualizar sliders
      Object.keys(filtros).forEach(key => {
        if ($(`#${key}`).length) {
          $(`#${key}`).val(filtros[key]);
          let displayValue = filtros[key];
          if (key === 'blur') displayValue = `${filtros[key]}px`;
          else if (key === 'rotate' || key === 'hueRotate') displayValue = `${filtros[key]}°`;
          else displayValue = `${filtros[key]}%`;
          $(`#${key}Value`).text(displayValue);
        }
      });
      
      console.log('✅ Imagen restaurada');
    };
    img.src = session.url;
  } catch (e) {
    console.error('Error cargando sesión:', e);
  }
};

// 🧹 Cleanup
export const cleanup = () => {
  saveSession();
  $(document).off('paste');
};
