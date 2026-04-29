import './comun.css';
import $ from 'jquery';
import { app, linkweb } from '../../wii.js';
import { Notificacion, wiSpin, wiVista, wicopy, wiSmart } from '../../widev.js';

// ── Configuración EmailJS ──────────
const EJS = {
  pub: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  sid: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tid: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
wiSmart({
  js: [() => import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js')],
});

// ── Datos de contacto ─────────────────────────────────────────────────────────
const INFO = [
  { ico: 'fa-envelope',     color: '#0EBEFF', label: 'Email',     value: 'wilder.taype@hotmail.com', copiable: true  },
  { ico: 'fa-map-marker-alt', color: '#FF5C69', label: 'Ubicación', value: 'Lima, Perú',              copiable: false },
  { ico: 'fa-clock',        color: '#29C72E', label: 'Respuesta', value: '24/7 Disponible',           copiable: false },
];

const ASUNTOS = [
  'Consulta Técnica',
  'Reportar un Bug',
  'Sugerencia de Función',
  'Plan Pro / Facturación',
  'Alianzas Comerciales',
  'Solicitud de Datos',
  'Otro',
];

const FAQ = [
  { q: '¿Responden todos los mensajes?',       r: 'Sí. Nuestro equipo técnico lee cada mensaje. Respondemos en un plazo máximo de 24 a 48 horas hábiles.' },
  { q: '¿Puedo sugerir una nueva herramienta?', r: '¡Claro! Nos encanta escuchar a la comunidad. Usa el asunto "Sugerencia de Función" y cuéntanos tu idea.' },
  { q: '¿ImgWii es gratis para siempre?',      r: 'La versión básica de ImgWii es y será siempre gratuita. Los planes Pro nos ayudan a mantener la infraestructura.' },
  { q: '¿Mis imágenes son privadas?',          r: 'Absolutamente. Como detallamos en nuestra Política de Privacidad, el procesamiento es local y no guardamos tus archivos.' },
];

const MAX_CHARS = 500;

// ── Anti-spam ──────────────────────
const SPAM_KEY  = 'wi_ct_last';
const SPAM_WAIT = 60 * 1000; 

const puedeEnviar = () => {
  const last = parseInt(localStorage.getItem(SPAM_KEY) || '0', 10);
  return Date.now() - last > SPAM_WAIT;
};
const marcarEnvio = () => localStorage.setItem(SPAM_KEY, String(Date.now()));

// ── Estado ─────────────────────────────────────────────────────────────────────
let _obs = [];

// ── Render ─────────────────────────────────────────────────────────────────────
export const render = () => `
<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-paper-plane"></i> Soporte Técnico</div>
      <h1 class="ac_hero_tit">Escríbenos<br><span class="ac_grad">tu mensaje 💬</span></h1>
      <p class="ac_hero_sub">
        ¿Tienes una duda, problema técnico o sugerencia para mejorar la plataforma?
        <strong>Nuestro equipo está listo para escucharte.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta en 24–48h</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> 100% Seguro</span>
        <span class="tm_chip"><i class="fas fa-bolt"></i> Soporte Directo</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Formulario</div>
          <h2 class="ac_sec_tit">Envíanos un <span class="ac_grad">mensaje</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Nombre</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Tu nombre" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="ct_email" name="email" placeholder="tu@email.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_telefono"><i class="fas fa-phone"></i> Celular (opcional)</label>
            <input type="tel" id="ct_telefono" name="telefono" placeholder="Tu número" maxlength="20">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Asunto</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${ASUNTOS.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Mensaje</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Cuéntanos en qué podemos ayudarte…" required maxlength="${MAX_CHARS}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${MAX_CHARS}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Mensaje</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Información de Contacto</h3>
          <div class="ct_info_items">
            ${INFO.map(it => `
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${it.color} 15%,transparent);color:${it.color}">
                  <i class="fas ${it.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${it.label}</span>
                  <span class="ct_info_value">${it.value}</span>
                </div>
                ${it.copiable ? `<button class="ct_copy" data-copy="${it.value}" title="Copiar"><i class="fas fa-copy"></i></button>` : ''}
              </div>`).join('')}
          </div>
        </div>

        <div class="ct_info_card wi_fadeUp" style="margin-top:3vh">
          <h3><i class="fas fa-share-nodes"></i> También nos encuentras en</h3>
          <div class="ct_redes">
            <a href="https://github.com/wtaype/imgwii" target="_blank" rel="noopener" class="ct_red" style="--rc:#24292e">
              <i class="fab fa-github"></i><span>GitHub</span>
            </a>
            <a href="https://wtaype.github.io/" target="_blank" rel="noopener" class="ct_red" style="--rc:#0EBEFF">
              <i class="fas fa-globe"></i><span>Portfolio</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> FAQ</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${FAQ.map((f, i) => `
        <div class="ct_faq_item wi_fadeUp" id="faq_${i}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${f.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${f.r}</p></div>
        </div>`).join('')}
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-rocket"></i></div>
        <h2 class="ac_sec_tit">¿Necesitas ayuda <span class="ac_grad">urgente?</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">Escríbenos directamente o abre un issue en nuestro repositorio oficial de GitHub.</p>
        <div class="tm_cta_btns">
          <a href="mailto:wilder.taype@hotmail.com" class="ac_btn_p ac_btn_lg">
            <i class="fas fa-envelope"></i> Enviar email
          </a>
          <a href="https://github.com/wtaype/imgwii/issues" target="_blank" rel="noopener" class="ac_btn_s ac_btn_lg">
            <i class="fab fa-github"></i> GitHub Issues
          </a>
        </div>
      </div>
    </div>
  </section>

</div></main>`;

// ── Init ──────────────────────────────────────────────────────────────────────
export const init = () => {
  $(document).on('input.contacto', '#ct_mensaje', function () {
    const v = $(this).val();
    if (v.length > MAX_CHARS) $(this).val(v.slice(0, MAX_CHARS));
    $('#ct_count').text(Math.min(v.length, MAX_CHARS));
  });

  $(document).on('reset.contacto', '#ctForm', () => {
    setTimeout(() => $('#ct_count').text('0'), 10);
  });

  $(document).on('submit.contacto', '#ctForm', async function (e) {
    e.preventDefault();
    if ($('#ct_honey').val()) return; 
    if (!puedeEnviar()) {
      Notificacion('Espera un momento antes de enviar otro mensaje.', 'warning');
      return;
    }

    const nombre   = $('#ct_nombre').val().trim();
    const email    = $('#ct_email').val().trim();
    const telefono = $('#ct_telefono').val().trim() || 'No especificado';
    const asunto   = $('#ct_asunto').val();
    const mensaje  = $('#ct_mensaje').val().trim();

    if (nombre.length < 3) return Notificacion('El nombre debe tener al menos 3 caracteres.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Notificacion('Ingresa un email válido.', 'error');
    if (!asunto) return Notificacion('Selecciona un asunto.', 'error');
    if (mensaje.length < 10) return Notificacion('El mensaje debe tener al menos 10 caracteres.', 'error');

    const $btn = $('#ct_submit');
    wiSpin($btn, true, 'Enviando…');

    try {
      if (typeof window.emailjs === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('No se pudo cargar EmailJS'));
          document.head.appendChild(script);
        });
      }
      
      window.emailjs.init(EJS.pub);

      await window.emailjs.send(EJS.sid, EJS.tid, {
        nombre:   nombre,
        email:    email,
        telefono: telefono,
        asunto:   asunto,
        mensaje:  mensaje,
        app_name: app,
      });

      marcarEnvio();
      Notificacion('¡Mensaje enviado! Te responderemos pronto.', 'success', 4500);
      this.reset();
      $('#ct_count').text('0');
    } catch (err) {
      console.error('[contacto] EmailJS error:', err);
      Notificacion('No se pudo enviar el mensaje. Intenta de nuevo.', 'error');
    } finally {
      wiSpin($btn, false, 'Enviar Mensaje');
    }
  });

  $(document).on('click.contacto', '.ct_copy', function () {
    wicopy($(this).data('copy'), this, '¡Copiado!');
  });

  $(document).on('click.contacto', '.ct_faq_q', function () {
    const $item = $(this).closest('.ct_faq_item');
    const isOpen = $item.hasClass('active');
    $('.ct_faq_item').removeClass('active').find('.ct_faq_a').slideUp(280);
    $('.ct_faq_arr').removeClass('rotated');
    if (!isOpen) {
      $item.addClass('active').find('.ct_faq_a').slideDown(280);
      $item.find('.ct_faq_arr').addClass('rotated');
    }
  });

  _obs.push(wiVista('.wi_fadeUp', (el) => $(el).addClass('visible')));
  _obs.push(wiVista('.ct_faq_item', (el, i) => setTimeout(() => $(el).addClass('visible'), i * 80)));

  console.log(`📩 ${app} Contacto cargado`);
};

export const cleanup = () => {
  $(document).off('.contacto');
  _obs.forEach(o => o?.disconnect?.()); _obs = [];
};
