const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DD2MjuC9.css"])))=>i.map(i=>d[i]);
import{w as $,b as u,i as b,n as e,z as y,e as w,o as k,_ as A}from"./index-gR8PmHRz.js";import{j as o}from"./vendor-BOJxWFg6.js";import{h as n,d as x,i as _,j as P,k as v,t as R,f as V,e as C,l as E}from"./devblog-CpbUgfND.js";import"./firebase-D2oOpCES.js";import"./firebase-D-ROeyul.js";o("#wiad_styles").length||o('<style id="wiad_styles">').text(`
    .wi_ad_link { max-width:300px; }
    .wi_ad_link:hover { opacity:1!important; transform:scale(1.01); }
    .wi_ad_img { margin-block:4vh 2vh; }
  `).appendTo("head");const j=`
  <div class="lc_ad_side lc_ad_r">
    <a href="https://wtaype.me/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="https://typingwii.web.app/Img1.webp" alt="Ad Right" class="wi_ad_img" />
    </a>
  </div>
`,D=a=>`<a href="/${a.slug}" class="po_rel_card" ${e(a.resumen||a.titulo)}><div class="po_rel_img"><img src="${a.imagen}" alt="${a.imagenAlt||a.titulo}" loading="lazy"/></div><div class="po_rel_info"><span class="po_rel_cat"><i class="fas fa-paw"></i> ${a.categoria}</span><strong>${a.titulo}</strong><span class="po_rel_meta"><i class="fas fa-clock"></i> ${a.tiempo_lectura} · <i class="fas fa-eye"></i> ${a.vistas||0}</span></div></a>`,N=a=>{const s=a&&n(a);return s?`
    <div class="po_wrap"><div class="po_layout">
      <div class="po_content">
        <div class="po_hero po_fade po_visible" style="--d:0s">
          <img src="${s.imagen}" alt="${s.imagenAlt||s.titulo}" class="po_hero_img" loading="eager"/>
          <div class="po_hero_over">
            <a href="/blog" class="po_back" ${e("Volver")}><i class="fas fa-arrow-left"></i> Blog</a>
            <div class="po_hero_badges"><span class="po_cat_badge" ${e(s.categoria)}><i class="fas fa-paw"></i> ${s.categoria}</span></div>
          </div>
        </div>
        <header class="po_header po_fade po_visible" style="--d:0s">
          <h1 class="po_titulo">${s.titulo}</h1>
          <p class="po_resumen">${s.resumen}</p>
          <div class="po_meta">
            <span><i class="fas fa-user-pen"></i> ${s.autor}</span>
            <span><i class="fas fa-calendar"></i> ${v(s.creado,!0)}</span>
            <span><i class="fas fa-clock"></i> ${s.tiempo_lectura}</span>
            <span><i class="fas fa-eye"></i> ${s.vistas||0}</span>
          </div>
        </header>
        <div class="po_contenido po_fade" style="--d:.1s"><div class="po_sk_body">${'<div class="po_sk_p shimmer"></div>'.repeat(6)}</div></div>
      </div>
      <aside class="po_sidebar">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside>
    </div></div>`:`<div class="po_wrap"><div class="po_layout"><div class="po_content"><div class="po_sk_img shimmer"></div><div class="po_sk_body"><div class="po_sk_cat shimmer"></div><div class="po_sk_tit shimmer"></div><div class="po_sk_tit po_sk_t2 shimmer"></div><div class="po_sk_meta shimmer"></div>${'<div class="po_sk_p shimmer"></div>'.repeat(5)}</div></div><aside class="po_sidebar">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside></div></div>`},T=async(a,s=!1)=>{if(a)try{const t=n(a),[d,c]=await Promise.all([x(a,s),t?_(a,t.categoria,s):Promise.resolve([])]);if(!d?.data?.activo){o("#wimain").html('<div class="po_err dpvc"><i class="fas fa-paw"></i><h2>Historia no encontrada</h2><p>No existe o no está disponible 🐾</p><a href="/blog" class="po_back_btn"><i class="fas fa-arrow-left"></i> Ver historias</a></div>');return}const{data:i,fromCache:l}=d;!l&&!s&&P(a);const p=c.length?c:await _(a,i.categoria,s),f=v(i.creado,!0),r=(i.tags||[]).map(g=>`<span class="po_tag">#${g}</span>`).join(""),m=(i.vistas||0)+1,h=$.user?.usuario;o("#wimain").html(`
      <div class="po_wrap"><div class="po_layout">
        <div class="po_content">
          <div class="po_hero po_fade" style="--d:0s">
            <img src="${i.imagen}" alt="${i.imagenAlt||i.titulo}" class="po_hero_img" loading="eager"/>
            <div class="po_hero_over">
              <a href="/blog" class="po_back" ${e("Volver")}><i class="fas fa-arrow-left"></i> Blog</a>
              <div class="po_hero_badges">
                <span class="po_cat_badge" ${e(i.categoria)}><i class="fas fa-paw"></i> ${i.categoria}</span>
                ${i.destacado?`<span class="po_dest_badge" ${e("Destacada")}><i class="fas fa-star"></i> Destacado</span>`:""}
              </div>
            </div>
          </div>
          <header class="po_header po_fade" style="--d:.1s">
            <h1 class="po_titulo">${i.titulo}</h1>
            <p class="po_resumen">${i.resumen}</p>
            <div class="po_meta">
              <span ${e("Autor")}><i class="fas fa-user-pen"></i> ${i.autor}</span>
              <span ${e("Fecha")}><i class="fas fa-calendar"></i> ${f}</span>
              <span ${e("Lectura")}><i class="fas fa-clock"></i> ${i.tiempo_lectura}</span>
              <span ${e("Vistas")}><i class="fas fa-eye"></i> ${m}</span>
              ${l?`<span class="po_cache_badge" ${e("Cache ⚡")}><i class="fas fa-bolt"></i></span>`:""}
            </div>
          </header>
          <div class="po_contenido po_fade" style="--d:.2s">${i.contenido}</div>
          ${r?`<div class="po_tags po_fade" style="--d:.35s">${r}</div>`:""}
          <div class="po_share po_fade" style="--d:.45s">
            <span><i class="fas fa-share-nodes"></i> Comparte</span>
            <div class="po_share_btns">${R(i.titulo)}<button class="po_share_btn po_copy" style="--sc:var(--mco)" ${e("Copiar")}><i class="fas fa-link"></i></button></div>
          </div>
        </div>
        <aside class="po_sidebar">
          <div class="po_side_card po_fade" style="--d:.15s">
            <div class="po_side_title"><i class="fas fa-user-pen"></i> Autor</div>
            <div class="po_autor_box"><div class="po_autor_av"><img src="/imgwii/smile.avif" alt="${i.autor}"/></div><div class="po_autor_info"><strong>${i.autor}</strong><span>${u} <i class="fas ${b}"></i></span></div></div>
            ${h?`<div class="po_admin_actions" style="margin-top:.8vh"><a href="/nuevo?edit=${a}" class="po_admin_btn_edit" ${e("Editar post")}><i class="fas fa-pen"></i> Editar</a><button id="po_refresh" class="po_admin_btn_refresh" data-slug="${a}" data-cat="${i.categoria}" ${e("Recargar")}><i class="fas fa-rotate"></i></button></div>`:""}
          </div>
          <div class="po_ad_sticky po_fade" style="--d:.25s">${j}</div>
          ${p.length?`<div class="po_side_card po_fade" style="--d:.35s"><div class="po_side_title"><i class="fas fa-heart"></i> Te gustará</div><div class="po_relacionados">${p.map(D).join("")}</div></div>`:""}
        </aside>
      </div></div>`),V("po_fade"),y(".po_side_card",null,{anim:"wi_fadeUp",stagger:60})}catch(t){console.error("[post]",t),w("Error al cargar","error")}};o(document).on("click.post",".po_copy, .po_copy2",()=>k(location.href,".po_copy","¡Enlace copiado! 🔗")).on("click.post",".po_rel_card",function(a){a.preventDefault(),A(()=>import("./index-gR8PmHRz.js").then(s=>s.H),__vite__mapDeps([0])).then(s=>s.rutas.navigate(o(this).attr("href")))}).on("click.post","#po_refresh",async function(){const a=o(this);a.html('<i class="fas fa-spinner fa-spin"></i>').prop("disabled",!0),C(a.data("slug")),E(a.data("cat")),await T(a.data("slug"),!0)});export{T as init,N as render};
