import './comun.css';
import $ from 'jquery';
import { app, version, linkweb } from '../../wii.js';
import { year } from '../../widev.js';

// ── DATOS ─────────────────────────────────────────────────────────────────
const SECCIONES = [
  {
    ico: 'fa-user-shield', color: '#0EBEFF', num: '01',
    tit: 'Uso de la Plataforma',
    body: `<p>${app} es una herramienta digital de edición y optimización de imágenes. Al usar nuestra aplicación, te comprometes a:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> No utilizar las herramientas para procesar contenido ilegal o que infringa derechos de autor.</li>
      <li><i class="fas fa-check"></i> No intentar vulnerar la seguridad de la infraestructura o saturar los recursos del sistema.</li>
      <li><i class="fas fa-check"></i> Hacer un uso responsable de las funciones de inteligencia artificial.</li>
      <li><i class="fas fa-check"></i> Respetar los límites establecidos para tu tipo de cuenta (Gratis o Pro).</li>
    </ul>`
  },
  {
    ico: 'fa-lock', color: '#FF5C69', num: '02',
    tit: 'Propiedad Intelectual',
    body: `<p>Todo el software, diseño y algoritmos de <strong>${app}</strong> son propiedad exclusiva de sus creadores. Sin embargo:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> Tú mantienes la propiedad total sobre las imágenes que procesas.</li>
      <li><i class="fas fa-check"></i> No almacenamos tus imágenes originales ni procesadas de forma permanente.</li>
      <li><i class="fas fa-check"></i> No puedes revender el acceso a nuestras herramientas sin una licencia comercial.</li>
    </ul>`
  },
  {
    ico: 'fa-circle-exclamation', color: '#FFDA34', num: '03',
    tit: 'Limitación de Responsabilidad',
    body: `<p>Trabajamos para ofrecer la mejor calidad, pero debes tener en cuenta que:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> Los resultados de la IA pueden variar según la calidad de la imagen original.</li>
      <li><i class="fas fa-check"></i> No nos hacemos responsables por pérdidas de datos si no tienes copias de seguridad.</li>
      <li><i class="fas fa-check"></i> El servicio se ofrece "tal cual" y puede tener interrupciones por mantenimiento.</li>
    </ul>`
  },
  {
    ico: 'fa-file-contract', color: '#29C72E', num: '04',
    tit: 'Modificaciones',
    body: `<p>Nos reservamos el derecho de actualizar estos términos para adaptarnos a nuevas funciones o leyes. Te avisaremos de cambios importantes a través de la plataforma.</p>`
  }
];

const PREGUNTAS = [
  { q: '¿Es realmente gratis?', a: 'Sí, la versión gratuita te permite optimizar y editar imágenes con límites generosos y sin letras pequeñas.' },
  { q: '¿Qué pasa con mis datos?', a: 'Procesamos todo localmente siempre que es posible o en servidores temporales cifrados que borran todo tras el proceso.' },
  { q: '¿Uso comercial?', a: 'Absolutamente. Todas las imágenes que proceses con nuestras herramientas pueden ser utilizadas en proyectos comerciales sin restricciones.' },
  { q: '¿Necesito cuenta?', a: 'Para las funciones básicas no es necesario, pero una cuenta te permite guardar preferencias y acceder a herramientas Pro.' }
];

// ── RENDER ────────────────────────────────────────────────────────────────
export const render = () => `
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-balance-scale"></i> Legal & Transparente</div>
      <h1 class="ac_hero_tit">Términos de<br><span class="ac_grad">Servicio ⚖️</span></h1>
      <p class="ac_hero_sub">
        Queremos que uses <strong>${app}</strong> con total confianza. 
        Aquí te explicamos las reglas claras para nuestra comunidad.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Actualizado: ${year()}</span>
        <span class="tm_chip"><i class="fas fa-code-branch"></i> Versión: ${version}</span>
        <span class="tm_chip"><i class="fas fa-globe"></i> Global</span>
      </div>
    </div>
  </section>

  <!-- ══ CONTENIDO ══ -->
  <section class="tm_secciones">
    <div class="tm_secs_grid">
      ${SECCIONES.map(sec => `
        <div class="tm_sec_card wi_fadeUp">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc: ${sec.color}">
              <i class="fas ${sec.ico}"></i>
            </div>
            <div class="tm_sec_head_txt">
              <span class="tm_sec_num">${sec.num}</span>
              <h2 class="tm_sec_tit">${sec.tit}</h2>
            </div>
          </div>
          <div class="tm_sec_body">${sec.body}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- ══ ACLARACIONES PREMIUM ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-question-circle"></i> FAQ</div>
      <h2 class="ac_sec_tit">Dudas <span class="ac_grad">comunes</span></h2>
      <p class="ac_sec_sub">Resolvemos tus inquietudes legales de forma rápida.</p>
    </div>
    <div class="tm_faq">
      ${PREGUNTAS.map(p => `
        <div class="tm_faq_card wi_fadeUp">
          <div class="tm_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${p.q}</h3>
          </div>
          <p class="tm_faq_a">${p.a}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-shield-halved"></i></div>
        <h2 class="ac_sec_tit">¿Aún tienes <span class="ac_grad">dudas?</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">Si hay algo que no está claro, nuestro equipo legal y técnico está para ayudarte.</p>
        <div class="tm_cta_btns">
          <a href="/contacto" class="ac_btn_p ac_btn_lg"><i class="fas fa-paper-plane"></i> Escríbenos ahora</a>
          <a href="${linkweb}" class="ac_btn_s ac_btn_lg"><i class="fas fa-house"></i> Volver al Inicio</a>
        </div>
      </div>
    </div>
  </section>

</div></main>
`;

export const init = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) $(entry.target).addClass('visible');
    });
  }, { threshold: 0.1 });

  $('.wi_fadeUp').each(function() { observer.observe(this); });

  console.log(`⚖️ ${app} Términos cargados con diseño Premium`);
};

export const cleanup = () => {
  console.log('🧹 Términos limpiado');
};
