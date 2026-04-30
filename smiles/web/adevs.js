/**
 * adevs.js — Utilidades compartidas para herramientas de imagen (EditorPro, ConvertirPro, etc.)
 */
import $ from 'jquery';
import { Notificacion } from '../widev.js';

// ── Formateo ──
export const formatBytes = (bytes, minKB = false) => {
  if (!bytes && bytes !== 0) return '--';
  if (bytes === 0) return '0 KB';
  const k = 1024, sizes = ['B','KB','MB','GB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  if (minKB && i === 0) i = 1; // Forzar mínimo KB
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// Versión siempre en KB (para savings/diffs)
export const formatBytesKB = (bytes) => {
  if (!bytes) return '< 0.1 KB';
  if (Math.abs(bytes) < 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return formatBytes(Math.abs(bytes), true);
};
export const baseName = (name) => name.replace(/\.[^/.]+$/, '');

// ── Blob ↔ DataURL ──
export const blobToDataURL = (blob) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = e => res(e.target.result);
  r.onerror = rej;
  r.readAsDataURL(blob);
});

// ── Cargar imagen como Image + metadata ──
export function cargarImagen(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject('No file');
    if (!file.type.startsWith('image/')) {
      Notificacion('Selecciona un archivo de imagen válido', 'error', 3000);
      return reject('Not image');
    }
    if (file.size > 50 * 1024 * 1024) {
      Notificacion('Archivo muy grande (máx 50MB)', 'error', 3000);
      return reject('Too large');
    }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const ext = file.name.split('.').pop().toLowerCase();
        resolve({
          file, img,
          url:    e.target.result,
          size:   file.size,
          width:  img.naturalWidth,
          height: img.naturalHeight,
          name:   file.name,
          format: ext === 'jpg' ? 'JPEG' : ext.toUpperCase(),
        });
      };
      img.onerror = () => reject('Image load failed');
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── Sistema de carga: Drag/Drop/Paste/Click ──
export function initCargaSistema({ dropSel, fileSel, clickSel, onFile, namespace = 'adev' }) {
  const $zone = $(dropSel);

  // File input
  $(fileSel).on(`change.${namespace}`, e => { if (e.target.files[0]) onFile(e.target.files[0]); });

  // Click en zona o botón
  if (clickSel) $(clickSel).on(`click.${namespace}`, () => $(fileSel).trigger('click'));
  else $zone.find('.epro_placeholder, .cpro_placeholder').on(`click.${namespace}`, () => $(fileSel).trigger('click'));

  // Drag & Drop
  $zone.on(`dragover.${namespace}`, e => { e.preventDefault(); $zone.addClass('epro_dragover cpro_dragover'); });
  $zone.on(`dragleave.${namespace}`, e => { e.preventDefault(); $zone.removeClass('epro_dragover cpro_dragover'); });
  $zone.on(`drop.${namespace}`, e => {
    e.preventDefault();
    $zone.removeClass('epro_dragover cpro_dragover');
    const f = e.originalEvent.dataTransfer.files[0];
    if (f) onFile(f);
  });

  // Ctrl+V
  $(document).on(`paste.${namespace}`, e => {
    const items = e.originalEvent.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          const ext = item.type.split('/')[1] || 'png';
          const file = new File([blob], `Captura_${Date.now()}.${ext}`, { type: item.type });
          onFile(file);
          $zone.addClass('epro_paste_flash cpro_paste_flash');
          setTimeout(() => $zone.removeClass('epro_paste_flash cpro_paste_flash'), 350);
          Notificacion('¡Imagen pegada!', 'success', 2000);
        }
        break;
      }
    }
  });

  return () => {
    $(fileSel).off(`.${namespace}`);
    $zone.off(`.${namespace}`);
    $(document).off(`paste.${namespace}`);
  };
}

// ── Canvas → Blob con formato ──
export function canvasToBlob(canvas, mime = 'image/webp', quality = 0.8) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('toBlob failed')),
      mime,
      mime === 'image/png' ? undefined : quality
    );
  });
}

// ── Descargar blob ──
export function descargarBlob(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Estimar tamaño sin descargar (debounced) ──
export function estimarTamano(canvas, mime, quality, callback) {
  canvasToBlob(canvas, mime, quality)
    .then(blob => callback(blob.size))
    .catch(() => callback(null));
}

// ── Historial (Undo/Redo) con máximo configurable ──
export class Historial {
  constructor(max = 3) { this.stack = []; this.idx = -1; this.max = max; }

  guardar(state) {
    // Eliminar estados futuros si estamos en medio del historial
    this.stack = this.stack.slice(0, this.idx + 1);
    this.stack.push(state);
    if (this.stack.length > this.max) this.stack.shift();
    this.idx = this.stack.length - 1;
  }

  undo() {
    if (this.idx <= 0) return null;
    return this.stack[--this.idx];
  }

  redo() {
    if (this.idx >= this.stack.length - 1) return null;
    return this.stack[++this.idx];
  }

  canUndo() { return this.idx > 0; }
  canRedo() { return this.idx < this.stack.length - 1; }
  reset()   { this.stack = []; this.idx = -1; }
  actual()  { return this.stack[this.idx] ?? null; }
}
