import './blog.css';
import $ from 'jquery';
import { wiTip, Notificacion, getls } from '../../widev.js';
import { getPosts, catInfo, skCard, fade, srcBadge, prefetchPost, clearBlogCache } from './devblog.js';

const POR_PAG = 9;
const ORDEN   = [{ id:'nuevo', icon:'fa-clock', label:'Recientes' }, { id:'vistas', icon:'fa-fire', label:'Populares' }];
const CAT_LS  = 'wi_blog_cats'; // clave local para guardar cats

// ── TEMPLATE CARD ─────────────────────────────────────────────
const tplCard = (p, i) => { const c = catInfo(p.categoria); return `
  <article class="bl_card bl_fade" style="--d:${i*.05}s" data-slug="${p.slug||p.id}">
    <div class="bl_card_img">
      <img src="${p.imagen||'https://placehold.co/600x400?text=📖'}" alt="${p.imagenAlt||p.titulo}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=📖'"/>
      <div class="bl_card_over">
        <span class="bl_card_cat" style="--cc:${c.color}"><i class="fas ${c.icon}"></i> ${p.categoria||'—'}</span>
        ${p.destacado?`<span class="bl_card_dest" ${wiTip('Destacada')}><i class="fas fa-star"></i></span>`:''}
      </div>
    </div>
    <div class="bl_card_body">
      <h2 class="bl_card_tit">${p.titulo}</h2>
      <p class="bl_card_res">${p.resumen||''}</p>
      <div class="bl_card_footer">
        <div class="bl_card_meta">
          <span><i class="fas fa-clock"></i> ${p.tiempo_lectura||'—'}</span>
          <span><i class="fas fa-eye"></i> ${p.vistas||0}</span>
        </div>
        <span class="bl_card_leer">Leer <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  </article>`; };

// ── RENDER HTML ───────────────────────────────────────────────
export const render = () => `
  <div class="bl_wrap">
    <div class="bl_hero bl_fade bl_visible" style="--d:0s">
      <h1 class="bl_hero_tit">Historias que <span class="bl_grad">inspiran</span> 🕊️</h1>
      <p class="bl_hero_sub">Reflexiones, fe y palabras que tocan el corazón</p>
    </div>
    <div class="bl_search_bar" id="bl_search_bar" style="display:none">
      <div class="bl_search_inner">
        <i class="fas fa-search bl_search_ico"></i>
        <input id="bl_search_inp" type="text" placeholder="Buscar historias..." autocomplete="off" spellcheck="false"/>
        <button id="bl_search_close" class="bl_search_close"><i class="fas fa-xmark"></i></button>
      </div>
    </div>
    <div class="bl_bar">
      <div class="bl_cats" id="bl_cats">
        <button class="bl_cat_btn active" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>
      </div>
      <div class="bl_bar_right">
        <div class="bl_orden">${ORDEN.map(o=>`<button class="bl_ord_btn ${o.id==='nuevo'?'active':''}" data-ord="${o.id}"><i class="fas ${o.icon}"></i><span>${o.label}</span></button>`).join('')}</div>
        <button class="bl_icon_btn" id="bl_search_toggle" ${wiTip('Buscar')}><i class="fas fa-search"></i></button>
        <button class="bl_icon_btn" id="bl_refresh" ${wiTip('Actualizar')}><i class="fas fa-rotate"></i></button>
      </div>
    </div>
    <div class="bl_result_bar" id="bl_result_bar"></div>
    <div class="bl_grid" id="bl_grid">${Array(6).fill(skCard()).join('')}</div>
    <div class="bl_mas_wrap" id="bl_mas_wrap" style="display:none"><button class="bl_mas_btn" id="bl_mas"><i class="fas fa-plus"></i> Ver más</button></div>
    <div class="bl_empty dpvc" id="bl_empty" style="display:none"><i class="fas fa-dove"></i><h3>Sin historias</h3><p>Pronto habrá más 🕊️</p></div>
  </div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = async () => {
  let cat='todo', ord='nuevo', pag=0, lista=[], allPosts=[], busy=false;
  const nav = s => import('../../rutas.js').then(m => m.rutas.navigate(s));

  // ── Construir chips de categorías SOLO desde lista local ──
  const buildCats = (posts) => {
    const uniq = [...new Set(posts.map(p=>p.categoria).filter(Boolean))].sort();
    localStorage.setItem(CAT_LS, JSON.stringify(uniq)); // persistir cats
    const $c = $('#bl_cats');
    $c.html(`<button class="bl_cat_btn ${cat==='todo'?'active':''}" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>`);
    uniq.forEach(c => {
      const info = catInfo(c);
      $c.append(`<button class="bl_cat_btn ${cat===c?'active':''}" data-cat="${c}" style="--cc:${info.color}"><i class="fas ${info.icon}"></i><span>${c}</span></button>`);
    });
  };

  // ── Cargar cats inmediato desde localStorage (sin Firestore) ──
  const cachedCats = (() => { try { return JSON.parse(localStorage.getItem(CAT_LS)||'[]'); } catch{return [];} })();
  if (cachedCats.length) {
    const $c = $('#bl_cats');
    cachedCats.forEach(c => {
      const info = catInfo(c);
      $c.append(`<button class="bl_cat_btn" data-cat="${c}" style="--cc:${info.color}"><i class="fas ${info.icon}"></i><span>${c}</span></button>`);
    });
  }

  // ── Grid render ────────────────────────────────────────────
  const grid = (append) => {
    const $g = $('#bl_grid');
    if (!append) { $g.html(''); pag=0; }
    const desde = append ? pag*POR_PAG : 0, slice = lista.slice(desde, desde+POR_PAG);
    if (!slice.length && !append) { $('#bl_empty').show(); $('#bl_mas_wrap').hide(); return; }
    $('#bl_empty').hide();
    $g.append(slice.map(tplCard).join(''));
    fade('bl_fade', $g[0]);
    $('#bl_mas_wrap').toggle(desde+POR_PAG < lista.length);
  };

  // ── Cargar posts (cache-first, 1 sola lectura Firestore) ──
  const cargar = async (force=false) => {
    if (busy) return; busy=true;
    if (!force) { $('#bl_grid').html(Array(6).fill(skCard()).join('')); }
    $('#bl_empty,#bl_mas_wrap').hide(); $('#bl_result_bar').html('');
    try {
      const r = await getPosts(cat, ord, force);
      lista = r.lista; allPosts = lista;
      // Construir cats solo si había cache (no hace fetch extra)
      if (!cachedCats.length || force) buildCats(lista);
      $('#bl_result_bar').html(`<span><strong>${lista.length}</strong> historia${lista.length!==1?'s':''}</span>${srcBadge(r.fromCache)}`);
      grid();
    } catch(e) { console.error('[blog]',e); Notificacion('Error','error'); $('#bl_empty').show(); }
    busy=false;
  };

  // ── Búsqueda local (cero Firestore) ───────────────────────
  let sT;
  const doSearch = q => {
    clearTimeout(sT);
    sT = setTimeout(() => {
      if (!q.trim()) { lista=allPosts; grid(); $('#bl_result_bar').html(`<span><strong>${lista.length}</strong> historias</span>`); return; }
      const s=q.toLowerCase();
      lista = allPosts.filter(p=>
        p.titulo?.toLowerCase().includes(s)||
        p.resumen?.toLowerCase().includes(s)||
        p.categoria?.toLowerCase().includes(s)||
        (p.tags||[]).some(t=>t.toLowerCase().includes(s))
      );
      $('#bl_result_bar').html(`<span><i class="fas fa-search"></i> <strong>${lista.length}</strong> resultado${lista.length!==1?'s':''} — "<em>${q}</em>"</span>`);
      grid();
    }, 280);
  };

  await cargar();

  $(document)
    .on('click.blog','.bl_cat_btn', function(){
      const c=$(this).data('cat'); if(c===cat)return;
      cat=c; pag=0; $('.bl_cat_btn').removeClass('active');$(this).addClass('active'); cargar();
    })
    .on('click.blog','.bl_ord_btn', function(){
      const o=$(this).data('ord'); if(o===ord)return;
      ord=o; pag=0; $('.bl_ord_btn').removeClass('active');$(this).addClass('active'); cargar();
    })
    .on('click.blog','#bl_refresh', async function(){
      $(this).html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled',true);
      clearBlogCache(); localStorage.removeItem(CAT_LS);
      await cargar(true);
      $(this).html('<i class="fas fa-rotate"></i>').prop('disabled',false);
      Notificacion('Actualizado ✅','success');
    })
    .on('click.blog','#bl_search_toggle', function(){
      const $b=$('#bl_search_bar'), vis=$b.is(':visible');
      $b.stop(true).slideToggle(180);
      if (!vis) setTimeout(()=>$('#bl_search_inp').focus(), 200);
      else { $('#bl_search_inp').val(''); lista=allPosts; grid(); }
    })
    .on('click.blog','#bl_search_close', ()=>{ $('#bl_search_bar').slideUp(160); $('#bl_search_inp').val(''); lista=allPosts; grid(); })
    .on('input.blog','#bl_search_inp', function(){ doSearch($(this).val()); })
    .on('click.blog','#bl_mas', ()=>{ pag++; grid(true); })
    .on('click.blog','.bl_card', function(){ const s=$(this).data('slug'); s&&nav(`/${s}`); })
    .on('mouseenter.blog','.bl_card', function(){ prefetchPost($(this).data('slug')); });
};

export const cleanup = () => $(document).off('.blog');