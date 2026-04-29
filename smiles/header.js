import $ from 'jquery';
import { app, icon } from './wii.js';
import { rutas, NAV } from './rutas.js';
import { Mensaje, wiAuth } from './widev.js';

// ── LOGO — generado desde wii.js ─────────────────────────────────────────────
const LOGO = `<a href="/"><i class="fa-solid ${icon}"></i> ${app}</a>`;

// ── MOTOR DE RENDERIZADO ──────────────────────────────────────────────────────
const buildNav = (items, wi) => items.map(i => {
  if (i.isBtn) return `<button class="${i.cls}"><i class="fas ${i.ico}"></i><span>${i.txt}</span></button>`;
  if (i.isPerfil) return `<a href="/perfil" class="nv_item" data-page="perfil"><img src="${wi?.avatar || `${import.meta.env.BASE_URL}smile.avif`}" alt="${wi?.nombre}"><span>${wi?.nombre}</span></a>`;
  if (i.isSalir) return `<button class="nv_item bt_salir" data-page="inicio"><i class="fa-solid fa-sign-out-alt"></i> <span>Salir</span></button>`;
  return `<a href="${i.href}" class="nv_item" data-page="${i.page}"><i class="fas ${i.ico}"></i> <span>${i.txt}</span></a>`;
}).join('');

const renderHeader = (wi) => {
  const cfg = NAV[wi?.rol] ?? NAV.todos;
  
  const wilogo = document.querySelector('.wilogo');
  if (wilogo) wilogo.innerHTML = LOGO;
  
  const winav = document.querySelector('.winav');
  if (winav) winav.innerHTML = buildNav(cfg.nvleft, wi);
  
  const nv_right = document.querySelector('.nv_right');
  if (nv_right) nv_right.innerHTML = buildNav(cfg.nvright, wi);
};

// ── AUTH LISTENER ─────────────────────────────────────────────────────────────
wiAuth.on(wi => wi ? renderHeader(wi) : (renderHeader(), rutas.navigate('/')));
const wi = wiAuth.user; wi ? renderHeader(wi) : renderHeader();

// ── EVENTOS GLOBALES ──────────────────────────────────────────────────────────
$(document).on('click', '.bt_salir', async () => {
  const { salir } = await import('./web/login.js');
  salir(['wiTema', 'wiSmart']);
});

$(document).on('mouseenter touchstart', '.bt_auth', () => import('./web/login.js'));
$(document).on('click', '.bt_auth', async function () {
  const { abrirLogin } = await import('./web/login.js');
  abrirLogin($(this).hasClass('registrar') ? 'registrar' : 'login');
});
