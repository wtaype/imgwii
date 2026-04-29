import $ from 'jquery';
import { app, lanzamiento, by, linkme, version, icon } from './wii.js';
import { wiAuth, savels, getls } from './widev.js';

// ── Redes Sociales ───────────────────────────────────────────────────────────
const REDES = [
  { tit: 'YouTube',   ico: 'fab fa-youtube',   url: 'https://www.youtube.com/@wiihope',   bg: '#ff0000' },
  { tit: 'Facebook',  ico: 'fab fa-facebook-f', url: 'https://www.facebook.com/wiihopee', bg: '#1877F2' },
  { tit: 'Instagram', ico: 'fab fa-instagram',  url: 'https://www.instagram.com/WiiHopee',bg: 'linear-gradient(45deg,#f58529,#dd2a7b,#515bd4)' },
  { tit: 'TikTok',    ico: 'fab fa-tiktok',     url: 'https://www.tiktok.com/@wiihope',   bg: '#000'    },
];

export { footer };
function footer(){
  const ahora = new Date();
  return `
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app">${app}</span>
          <span class="foo_ver">${version}</span>
        </div>
        <div class="foo_links">
          <a href="/terminos"   class="foo_link nv_item" data-page="terminos"  ><i class="fas fa-file-contract"></i> Términos</a>
          <a href="/cookies"    class="foo_link nv_item" data-page="cookies"   ><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/privacidad" class="foo_link nv_item" data-page="privacidad"><i class="fas fa-lock"></i> Privacidad</a>
          <a href="/feedback"   class="foo_link nv_item" data-page="feedback"  ><i class="fas fa-comment-dots"></i> Feedback</a>
          <a href="/contacto"   class="foo_link nv_item" data-page="contacto"  ><i class="fas fa-envelope"></i> Contacto</a>
          ${REDES.map(r => `<a href="${r.url}" class="redsscc" target="_blank" rel="noopener noreferrer" title="${r.tit}" style="--rb:${r.bg}"><i class="${r.ico}"></i></a>`).join('')}
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${linkme}" target="_blank"><strong>${by}</strong></a> ${lanzamiento} - ${ahora.getFullYear()}</span>
      </div>
    </div>
  </footer>
  `;
}; $('body').append(footer());  //Actualizar 

$("head").append(`<style>:root{--bgim:url("${import.meta.env.BASE_URL}wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);

// MOBILE DRAWER v4.0
$('body').append(`
<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"></div>
  <div class="movil_nav"></div>
</nav>`);

const syncDrawer = () => setTimeout(() => {
  $('.movil_logo').html($('.wilogo').html() || `<i class="fa-solid ${icon}"></i> ${app}`);
  $('.movil_nav').html(`${$('.winav').html() || ''}${$('.nv_right').html() || ''}`);
}, 50);

wiAuth.on(syncDrawer);
$(syncDrawer); // Carga inicial

const cerrar = () => $('body').removeClass('movil_open');
$(document).on('click', '.wimenu', () => $('body').addClass('movil_open'));
$(document).on('click', '.movil_close, .movil_overlay, .movil_nav .nv_item, .movil_nav button', cerrar);

// ── BANNER COOKIES ────────────────────────────────────────────────────────────
const CK_KEY = 'cookies';

if (!getls(CK_KEY)) {
  $('body').append(`
    <div class="cookiess" id="cookiess" role="dialog" aria-live="polite">
      <i class="fas fa-cookie-bite cookiess_ico"></i>
      <p class="cookiess_txt">
        Usamos cookies para mejorar tu experiencia y mostrarte anuncios relevantes.
        <a href="/cookies" class="cookiess_link nv_item" data-page="cookies">Más info</a>
      </p>
      <div class="cookiess_btns">
        <button class="cookiess_aceptar" id="ck_aceptar"><i class="fas fa-check"></i> Aceptar</button>
        <button class="cookiess_rechazar" id="ck_rechazar">Rechazar</button>
      </div>
    </div>`);

  setTimeout(() => $('#cookiess').addClass('cookiess_show'), 800);

  const cerrarBanner = (val) => {
    savels(CK_KEY, val);
    $('#cookiess').removeClass('cookiess_show');
    setTimeout(() => $('#cookiess').remove(), 400);
  };

  $(document).on('click', '#ck_aceptar',  () => cerrarBanner(true));
  $(document).on('click', '#ck_rechazar', () => cerrarBanner(false));
}