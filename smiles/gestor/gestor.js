import './gestor.css';
import $ from 'jquery';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getls, getNombre, Saludar } from '../widev.js';
import { app } from '../wii.js';
import { rutas } from '../rutas.js';

// ── CONFIG & AUTH ─────────────────────────────────────────────────────────────
const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

const getRawLs = (key) => {
  try {
    const r = JSON.parse(localStorage.getItem(key));
    return Array.isArray(r) ? r : (r?.value && Array.isArray(r.value) ? r.value : []);
  } catch { return []; }
};

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => `
  <div class="gs_dash">
    
    <!-- ══ HEADER PREMIUM (Management Style) ══ -->
    <header class="gs_hero wi_fadeUp">
      <div class="gs_hero_glow"></div>
      <div class="gs_hero_content">
        <div class="gs_hero_left">
          <div class="gs_avatar_wrap">
             <div class="gs_avatar" id="gsAvatar"></div>
             <div class="gs_avatar_ring"></div>
          </div>
          <div class="gs_welcome">
            <h1 id="gsSaludo">Cargando...</h1>
            <p id="gsRole"><i class="fas fa-shield-halved"></i> Gestión de ${app}</p>
          </div>
        </div>
        <div class="gs_hero_quote" id="gsQuote">
          <i class="fas fa-quote-left"></i>
          <div class="gs_quote_body">
            <p id="gsQuoteTxt">...</p>
            <span id="gsQuoteRef">...</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ══ DASHBOARD GRID ══ -->
    <main class="gs_main">
      
      <!-- COLUMNA IZQUIERDA: GESTIÓN DE CONTENIDO -->
      <div class="gs_col">
        <div class="gs_sec_head">
          <div class="gs_sec_info">
            <h2><i class="fas fa-grip-horizontal"></i> Centro de Gestión</h2>
            <p>Supervisa y administra el ecosistema de ${app}</p>
          </div>
        </div>
        <div class="gs_tools_grid">
          ${[
            { page:'nuevo',    ico:'fa-pen-nib',      col:'#FF5C69', tit:'Crear Blog',     sub:'Publicar contenido' },
            { page:'usuarios', ico:'fa-users-gear',   col:'#0EBEFF', tit:'Comunidad',      sub:'Gestionar usuarios' },
            { page:'chatwil',  ico:'fa-hands-praying', col:'#29C72E', tit:'Sala Oración',   sub:'Moderación de fe' },
            { page:'mensajes', ico:'fa-paper-plane',  col:'#7000FF', tit:'Mensajería',     sub:'Bandeja de soporte' },
            { page:'perfil',   ico:'fa-user-shield',  col:'#FFB800', tit:'Seguridad',      sub:'Ajustes de cuenta' },
            { page:'biblia',   ico:'fa-book-bible',   col:'#00D1FF', tit:'Recursos',       sub:'Base de datos' }
          ].map((a, i) => `
            <a href="/${a.page}" class="gs_tool_card nv_item" data-page="${a.page}" style="animation-delay: ${i * 0.05}s">
              <div class="gs_tool_ico" style="color: ${a.col}; background: color-mix(in srgb, ${a.col} 12%, transparent);"><i class="fas ${a.ico}"></i></div>
              <div class="gs_tool_txt">
                <h4>${a.tit}</h4>
                <span>${a.sub}</span>
              </div>
              <div class="gs_tool_arr"><i class="fas fa-arrow-right"></i></div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- COLUMNA DERECHA: FLUJO Y ESTADÍSTICAS -->
      <div class="gs_col">
        
        <!-- ACTIVIDAD RECIENTE -->
        <section class="gs_card gs_recent">
          <div class="gs_card_head">
            <h3><i class="fas fa-bolt"></i> Actividad Global</h3>
            <button class="gs_clean_btn" id="gs_refresh"><i class="fas fa-sync-alt"></i></button>
          </div>
          <div class="gs_timeline" id="gsFeed">
             <div class="gs_empty"><i class="fas fa-circle-notch fa-spin"></i><p>Sincronizando...</p></div>
          </div>
        </section>

        <!-- KPI SUMMARY (PRO) -->
        <section class="gs_card gs_impact">
          <h3><i class="fas fa-chart-line"></i> Impacto de Fe</h3>
          <div class="gs_kpi_list" id="gsKpis">
             <!-- KPIs aquí -->
          </div>
        </section>

      </div>

    </main>

  </div>
`;

// ── LOGIC ─────────────────────────────────────────────────────────────────────
export const init = async () => {
  const user = await waitAuth();
  if (!user) return;

  const u = getls('wiSmile');
  if (!u) return setTimeout(() => rutas.navigate('/login'), 100);

  $(document).off('.gs');

  // 1. POBLAR HEADER
  $('.wi_fadeUp').addClass('visible');
  const nombre    = getNombre(u.nombre || u.usuario || 'Gestor');
  const iniciales = `${(u.nombre || '?')[0]}${(u.apellidos || '')[0] || ''}`.toUpperCase();
  
  $('#gsAvatar').text(iniciales);
  $('#gsSaludo').html(`${Saludar()} <strong>${nombre}</strong>`);

  const frases = getRawLs('wiFrases');
  if (frases.length) {
    const f = frases[Math.floor(Math.random() * frases.length)];
    $('#gsQuoteTxt').text(f.cita);
    $('#gsQuoteRef').text(f.libro);
  } else {
    $('#gsQuoteTxt').text("Gestiona con propósito, lidera con el corazón.");
    $('#gsQuoteRef').text(`Liderazgo ${app}`);
  }

  // 2. RENDER DATOS
  _renderTodo();

  // 3. EVENTOS
  $(document)
    .on('click.gs', '#gs_refresh', function () {
      const $i = $(this).find('i').addClass('fa-spin');
      _renderTodo();
      setTimeout(() => $i.removeClass('fa-spin'), 600);
    });

  console.log(`🛡️ ${app} Gestor — ${app} (Ultra Pro)`);
};

export const cleanup = () => {
  $(document).off('.gs');
};

function _renderTodo() {
  const data = {
    notas:   getRawLs('misNotas'),
    blogs:   getRawLs('wi_blog_todo_nuevo'),
    tareas:  getRawLs('tareas'),
    word:    getRawLs('word_docs'),
    links:   getRawLs('links')
  };

  // KPIs
  const kpis = [
    { n: 'Reflexiones', c: data.notas.length, col: '#0EBEFF' },
    { n: 'Artículos',   c: data.blogs.length, col: '#FF5C69' },
    { n: 'Peticiones',  c: data.tareas.length, col: '#29C72E' }
  ];

  $('#gsKpis').html(kpis.map(k => `
    <div class="gs_kpi_item">
      <span>${k.n}</span>
      <strong style="color: ${k.col}">${k.c}</strong>
    </div>
  `).join(''));

  // TIMELINE
  let tl = [];
  data.blogs.forEach(x  => tl.push({ ...x, mod: 'Blog',   i: 'fa-pen-nib',      col: '#FF5C69', url: 'blog' }));
  data.notas.forEach(x  => tl.push({ ...x, mod: 'Notas',  i: 'fa-lightbulb',    col: '#0EBEFF', url: 'notas' }));
  data.tareas.forEach(x => tl.push({ ...x, mod: 'Petic.', i: 'fa-heart',        col: '#29C72E', url: 'tareas' }));
  data.word.forEach(x   => tl.push({ ...x, mod: 'Doc',    i: 'fa-file-word',    col: '#7000FF', url: 'word' }));

  tl.sort((a, b) => (b.actualizado || b.creado || 0) - (a.actualizado || a.creado || 0));
  const recent = tl.slice(0, 6);

  if (recent.length) {
    const timeAgo = (ts) => {
      const diff = Math.floor((Date.now() - ts) / 60000);
      if (diff < 1) return 'Ahora';
      if (diff < 60) return `${diff}m`;
      return `${Math.floor(diff / 1440)}d`;
    };

    $('#gsFeed').html(recent.map((x, i) => `
      <div class="gs_tl_item" style="animation-delay: ${i * 0.05}s">
        <div class="gs_tl_ico" style="color: ${x.col}"><i class="fas ${x.i}"></i></div>
        <div class="gs_tl_body">
          <h4>${x.titulo || 'Sin título'}</h4>
          <span>${x.mod} · ${timeAgo(x.actualizado || x.creado)}</span>
        </div>
        <a href="/${x.url}" class="gs_tl_btn nv_item" data-page="${x.url}"><i class="fas fa-chevron-right"></i></a>
      </div>
    `).join(''));
  } else {
    $('#gsFeed').html('<div class="gs_empty"><i class="fas fa-inbox"></i><p>Sin actividad reciente</p></div>');
  }
}
