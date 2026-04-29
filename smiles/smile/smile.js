import './smile.css';
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
  <div class="smw_dash">
    
    <!-- ══ HEADER PREMIUM (Glassmorphism Hero) ══ -->
    <header class="smw_hero wi_fadeUp">
      <div class="smw_hero_glow"></div>
      <div class="smw_hero_content">
        <div class="smw_hero_left">
          <div class="smw_avatar_wrap">
             <div class="smw_avatar" id="smwAvatar"></div>
             <div class="smw_avatar_ring"></div>
          </div>
          <div class="smw_welcome">
            <h1 id="smwSaludo">Cargando...</h1>
            <p id="smwRole"><i class="fas fa-dove"></i> Dashboard de Fe</p>
          </div>
        </div>
        <div class="smw_hero_quote" id="smwQuote">
          <i class="fas fa-quote-left"></i>
          <div class="smw_quote_body">
            <p id="smwQuoteTxt">...</p>
            <span id="smwQuoteRef">...</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ══ DASHBOARD DOS COLUMNAS ══ -->
    <main class="smw_main">
      
      <!-- COLUMNA IZQUIERDA: MIS FRASES POSITIVAS -->
      <section class="smw_col smw_phrases">
        <div class="smw_sec_head">
          <div class="smw_sec_info">
            <h2><i class="fas fa-heart"></i> Mis Frases Positivas</h2>
            <p>Tus promesas y versículos atesorados</p>
          </div>
          <a href="/citas" class="smw_add_btn nv_item" data-page="citas">
            <i class="fas fa-plus"></i>
          </a>
        </div>
        <div class="smw_phrases_list" id="smwPhrasesList">
          <!-- Citas de wiFrases -->
        </div>
      </section>

      <!-- COLUMNA DERECHA: ÚLTIMOS BLOGS -->
      <section class="smw_col smw_blogs">
        <div class="smw_sec_head">
          <div class="smw_sec_info">
            <h2><i class="fas fa-newspaper"></i> Últimos Blogs</h2>
            <p>Inspiración y noticias de la comunidad</p>
          </div>
          <a href="/blog" class="smw_add_btn nv_item" data-page="blog">
             <i class="fas fa-arrow-right"></i>
          </a>
        </div>
        <div class="smw_blogs_feed" id="smwBlogsFeed">
          <!-- Posts de wi_blog_todo_nuevo -->
        </div>
      </section>

    </main>

  </div>
`;

// ── LOGIC ─────────────────────────────────────────────────────────────────────
export const init = async () => {
  const user = await waitAuth();
  if (!user) return;

  const wi = getls('wiSmile');
  if (!wi) return setTimeout(() => rutas.navigate('/login'), 100);

  const nombre    = getNombre(wi.nombre || wi.usuario || '');
  const iniciales = `${(wi.nombre || '?')[0]}${(wi.apellidos || '')[0] || ''}`.toUpperCase();

  // 1. UPDATE HERO
  $('.wi_fadeUp').addClass('visible');
  $('#smwAvatar').text(iniciales);
  $('#smwSaludo').html(`${Saludar()} <strong>${nombre}</strong>`);

  // 2. LOAD FRASES POSITIVAS (Left Column)
  const frases = getRawLs('wiFrases');
  if (frases.length) {
    // Para el Hero: una aleatoria
    const fHero = frases[Math.floor(Math.random() * frases.length)];
    $('#smwQuoteTxt').text(fHero.cita);
    $('#smwQuoteRef').text(fHero.libro);

    // Para la lista: las últimas 6
    const list = [...frases].reverse().slice(0, 6);
    $('#smwPhrasesList').html(list.map((f, i) => `
      <div class="smw_phrase_card wi_fadeUp visible" style="animation-delay: ${i * 0.1}s">
        <div class="smw_phrase_ico"><i class="fas fa-star"></i></div>
        <div class="smw_phrase_body">
          <p>"${f.cita}"</p>
          <span>${f.libro}</span>
        </div>
      </div>
    `).join(''));
  } else {
    $('#smwQuoteTxt').text("Dios es nuestro amparo y fortaleza.");
    $('#smwQuoteRef').text("Salmos 46:1");
    $('#smwPhrasesList').html('<div class="smw_empty"><i class="fas fa-seedling"></i><p>Aún no has guardado frases</p></div>');
  }

  // 3. LOAD ÚLTIMOS BLOGS (Right Column)
  const posts = getRawLs('wi_blog_todo_nuevo');
  if (posts.length) {
    const feed = posts.slice(0, 4);
    $('#smwBlogsFeed').html(feed.map((p, i) => `
      <a href="/post/${p.slug}" class="smw_blog_item nv_item" data-page="post" data-id="${p.id}" style="animation-delay: ${i * 0.1}s">
        <div class="smw_blog_img" style="background-image: url('${p.imagen}')"></div>
        <div class="smw_blog_info">
          <h4>${p.titulo}</h4>
          <div class="smw_blog_meta">
            <span><i class="fas fa-tag"></i> ${p.categoria}</span>
            <span><i class="fas fa-clock"></i> ${p.tiempo_lectura || '2 min'}</span>
          </div>
        </div>
      </a>
    `).join(''));
  } else {
    $('#smwBlogsFeed').html('<div class="smw_empty"><i class="fas fa-newspaper"></i><p>No hay blogs recientes</p></div>');
  }

  console.log(`🕊️ WiiHope Dashboard v2 — ${app}`);
};

export const cleanup = () => {};