import './post.css';
import $ from 'jquery';
import { app, icon} from '../../wii.js';
import { wiAuth, wiVista, Notificacion, wicopy, wiTip } from '../../widev.js';
import { getPost, getPreview, getRelacionados, addView, superDate, tplShare, fade, clearPostCache, clearRelCache } from './devblog.js';
import { adRight } from './wiad.js';

const tplRel = r => `<a href="/${r.slug}" class="po_rel_card" ${wiTip(r.resumen||r.titulo)}><div class="po_rel_img"><img src="${r.imagen}" alt="${r.imagenAlt||r.titulo}" loading="lazy"/></div><div class="po_rel_info"><span class="po_rel_cat"><i class="fas fa-paw"></i> ${r.categoria}</span><strong>${r.titulo}</strong><span class="po_rel_meta"><i class="fas fa-clock"></i> ${r.tiempo_lectura} · <i class="fas fa-eye"></i> ${r.vistas||0}</span></div></a>`;

// ── RENDER: skeleton O preview instantáneo ────────────────────
export const render = (slug) => {
  const p = slug && getPreview(slug);
  if (p) return `
    <div class="po_wrap"><div class="po_layout">
      <div class="po_content">
        <div class="po_hero po_fade po_visible" style="--d:0s">
          <img src="${p.imagen}" alt="${p.imagenAlt||p.titulo}" class="po_hero_img" loading="eager"/>
          <div class="po_hero_over">
            <a href="/blog" class="po_back" ${wiTip('Volver')}><i class="fas fa-arrow-left"></i> Blog</a>
            <div class="po_hero_badges"><span class="po_cat_badge" ${wiTip(p.categoria)}><i class="fas fa-paw"></i> ${p.categoria}</span></div>
          </div>
        </div>
        <header class="po_header po_fade po_visible" style="--d:0s">
          <h1 class="po_titulo">${p.titulo}</h1>
          <p class="po_resumen">${p.resumen}</p>
          <div class="po_meta">
            <span><i class="fas fa-user-pen"></i> ${p.autor}</span>
            <span><i class="fas fa-calendar"></i> ${superDate(p.creado,true)}</span>
            <span><i class="fas fa-clock"></i> ${p.tiempo_lectura}</span>
            <span><i class="fas fa-eye"></i> ${p.vistas||0}</span>
          </div>
        </header>
        <div class="po_contenido po_fade" style="--d:.1s"><div class="po_sk_body">${'<div class="po_sk_p shimmer"></div>'.repeat(6)}</div></div>
      </div>
      <aside class="po_sidebar">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside>
    </div></div>`;

  return `<div class="po_wrap"><div class="po_layout"><div class="po_content"><div class="po_sk_img shimmer"></div><div class="po_sk_body"><div class="po_sk_cat shimmer"></div><div class="po_sk_tit shimmer"></div><div class="po_sk_tit po_sk_t2 shimmer"></div><div class="po_sk_meta shimmer"></div>${'<div class="po_sk_p shimmer"></div>'.repeat(5)}</div></div><aside class="po_sidebar">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside></div></div>`;
};

// ── INIT ──────────────────────────────────────────────────────
export const init = async (slug, force = false) => {
  if (!slug) return;
  try {
    // Paralelo: post + relacionados (categoria del preview si existe)
    const preview = getPreview(slug);
    const [result, relacionados] = await Promise.all([
      getPost(slug, force),
      preview ? getRelacionados(slug, preview.categoria, force) : Promise.resolve([])
    ]);

    if (!result?.data?.activo) {
      $('#wimain').html(`<div class="po_err dpvc"><i class="fas fa-paw"></i><h2>Historia no encontrada</h2><p>No existe o no está disponible 🐾</p><a href="/blog" class="po_back_btn"><i class="fas fa-arrow-left"></i> Ver historias</a></div>`);
      return;
    }

    const { data: p, fromCache } = result;
    if (!fromCache && !force) addView(slug);

    // Si no teníamos preview, buscamos relacionados ahora
    const rels = relacionados.length ? relacionados : await getRelacionados(slug, p.categoria, force);
    const fecha = superDate(p.creado, true);
    const tags = (p.tags||[]).map(t=>`<span class="po_tag">#${t}</span>`).join('');
    const vistas = (p.vistas||0)+1;
    const isAdmin = wiAuth.user?.usuario;

    $('#wimain').html(`
      <div class="po_wrap"><div class="po_layout">
        <div class="po_content">
          <div class="po_hero po_fade" style="--d:0s">
            <img src="${p.imagen}" alt="${p.imagenAlt||p.titulo}" class="po_hero_img" loading="eager"/>
            <div class="po_hero_over">
              <a href="/blog" class="po_back" ${wiTip('Volver')}><i class="fas fa-arrow-left"></i> Blog</a>
              <div class="po_hero_badges">
                <span class="po_cat_badge" ${wiTip(p.categoria)}><i class="fas fa-paw"></i> ${p.categoria}</span>
                ${p.destacado?`<span class="po_dest_badge" ${wiTip('Destacada')}><i class="fas fa-star"></i> Destacado</span>`:''}
              </div>
            </div>
          </div>
          <header class="po_header po_fade" style="--d:.1s">
            <h1 class="po_titulo">${p.titulo}</h1>
            <p class="po_resumen">${p.resumen}</p>
            <div class="po_meta">
              <span ${wiTip('Autor')}><i class="fas fa-user-pen"></i> ${p.autor}</span>
              <span ${wiTip('Fecha')}><i class="fas fa-calendar"></i> ${fecha}</span>
              <span ${wiTip('Lectura')}><i class="fas fa-clock"></i> ${p.tiempo_lectura}</span>
              <span ${wiTip('Vistas')}><i class="fas fa-eye"></i> ${vistas}</span>
              ${fromCache?`<span class="po_cache_badge" ${wiTip('Cache ⚡')}><i class="fas fa-bolt"></i></span>`:''}
            </div>
          </header>
          <div class="po_contenido po_fade" style="--d:.2s">${p.contenido}</div>
          ${tags?`<div class="po_tags po_fade" style="--d:.35s">${tags}</div>`:''}
          <div class="po_share po_fade" style="--d:.45s">
            <span><i class="fas fa-share-nodes"></i> Comparte</span>
            <div class="po_share_btns">${tplShare(p.titulo)}<button class="po_share_btn po_copy" style="--sc:var(--mco)" ${wiTip('Copiar')}><i class="fas fa-link"></i></button></div>
          </div>
        </div>
        <aside class="po_sidebar">
          <div class="po_side_card po_fade" style="--d:.15s">
            <div class="po_side_title"><i class="fas fa-user-pen"></i> Autor</div>
            <div class="po_autor_box"><div class="po_autor_av"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${p.autor}"/></div><div class="po_autor_info"><strong>${p.autor}</strong><span>${app} <i class="fas ${icon}"></i></span></div></div>
            ${isAdmin?`<div class="po_admin_actions" style="margin-top:.8vh"><a href="/nuevo?edit=${slug}" class="po_admin_btn_edit" ${wiTip('Editar post')}><i class="fas fa-pen"></i> Editar</a><button id="po_refresh" class="po_admin_btn_refresh" data-slug="${slug}" data-cat="${p.categoria}" ${wiTip('Recargar')}><i class="fas fa-rotate"></i></button></div>`:''}
          </div>
          <div class="po_ad_sticky po_fade" style="--d:.25s">${adRight}</div>
          ${rels.length?`<div class="po_side_card po_fade" style="--d:.35s"><div class="po_side_title"><i class="fas fa-heart"></i> Te gustará</div><div class="po_relacionados">${rels.map(tplRel).join('')}</div></div>`:''}
        </aside>
      </div></div>`);

    fade('po_fade');
    wiVista('.po_side_card', null, { anim:'wi_fadeUp', stagger: 60 });

  } catch(e) { console.error('[post]',e); Notificacion('Error al cargar','error'); }
};

// ── EVENTOS GLOBALES (1 sola vez) ──────────────────────────────
$(document)
  .on('click.post', '.po_copy, .po_copy2', () => wicopy(location.href, '.po_copy', '¡Enlace copiado! 🔗'))
  .on('click.post', '.po_rel_card', function(e) { e.preventDefault(); import('../../rutas.js').then(m => m.rutas.navigate($(this).attr('href'))); })
  .on('click.post', '#po_refresh', async function() {
    const $b = $(this);
    $b.html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
    clearPostCache($b.data('slug'));
    clearRelCache($b.data('cat'));
    await init($b.data('slug'), true);
  });