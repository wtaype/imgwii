const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DD2MjuC9.css"])))=>i.map(i=>d[i]);
import{e as $,n as p,_ as T}from"./index-DfI58Hqs.js";import{j as s}from"./vendor-BOJxWFg6.js";import{c as g,a as P,p as S,s as y,g as x,b as A,f as L}from"./devblog-RoWItUsa.js";import"./firebase-Cz-ABH3P.js";import"./firebase-D-ROeyul.js";const u=9,j=[{id:"nuevo",icon:"fa-clock",label:"Recientes"},{id:"vistas",icon:"fa-fire",label:"Populares"}],h="wi_blog_cats",E=(l,n)=>{const o=g(l.categoria);return`
  <article class="bl_card bl_fade" style="--d:${n*.05}s" data-slug="${l.slug||l.id}">
    <div class="bl_card_img">
      <img src="${l.imagen||"https://placehold.co/600x400?text=📖"}" alt="${l.imagenAlt||l.titulo}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=📖'"/>
      <div class="bl_card_over">
        <span class="bl_card_cat" style="--cc:${o.color}"><i class="fas ${o.icon}"></i> ${l.categoria||"—"}</span>
        ${l.destacado?`<span class="bl_card_dest" ${p("Destacada")}><i class="fas fa-star"></i></span>`:""}
      </div>
    </div>
    <div class="bl_card_body">
      <h2 class="bl_card_tit">${l.titulo}</h2>
      <p class="bl_card_res">${l.resumen||""}</p>
      <div class="bl_card_footer">
        <div class="bl_card_meta">
          <span><i class="fas fa-clock"></i> ${l.tiempo_lectura||"—"}</span>
          <span><i class="fas fa-eye"></i> ${l.vistas||0}</span>
        </div>
        <span class="bl_card_leer">Leer <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  </article>`},N=()=>`
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
        <div class="bl_orden">${j.map(l=>`<button class="bl_ord_btn ${l.id==="nuevo"?"active":""}" data-ord="${l.id}"><i class="fas ${l.icon}"></i><span>${l.label}</span></button>`).join("")}</div>
        <button class="bl_icon_btn" id="bl_search_toggle" ${p("Buscar")}><i class="fas fa-search"></i></button>
        <button class="bl_icon_btn" id="bl_refresh" ${p("Actualizar")}><i class="fas fa-rotate"></i></button>
      </div>
    </div>
    <div class="bl_result_bar" id="bl_result_bar"></div>
    <div class="bl_grid" id="bl_grid">${Array(6).fill(y()).join("")}</div>
    <div class="bl_mas_wrap" id="bl_mas_wrap" style="display:none"><button class="bl_mas_btn" id="bl_mas"><i class="fas fa-plus"></i> Ver más</button></div>
    <div class="bl_empty dpvc" id="bl_empty" style="display:none"><i class="fas fa-dove"></i><h3>Sin historias</h3><p>Pronto habrá más 🕊️</p></div>
  </div>`,D=async()=>{let l="todo",n="nuevo",o=0,i=[],b=[],d=!1;const w=a=>T(()=>import("./index-DfI58Hqs.js").then(t=>t.H),__vite__mapDeps([0])).then(t=>t.rutas.navigate(a)),C=a=>{const t=[...new Set(a.map(e=>e.categoria).filter(Boolean))].sort();localStorage.setItem(h,JSON.stringify(t));const c=s("#bl_cats");c.html(`<button class="bl_cat_btn ${l==="todo"?"active":""}" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>`),t.forEach(e=>{const v=g(e);c.append(`<button class="bl_cat_btn ${l===e?"active":""}" data-cat="${e}" style="--cc:${v.color}"><i class="fas ${v.icon}"></i><span>${e}</span></button>`)})},f=(()=>{try{return JSON.parse(localStorage.getItem(h)||"[]")}catch{return[]}})();if(f.length){const a=s("#bl_cats");f.forEach(t=>{const c=g(t);a.append(`<button class="bl_cat_btn" data-cat="${t}" style="--cc:${c.color}"><i class="fas ${c.icon}"></i><span>${t}</span></button>`)})}const r=a=>{const t=s("#bl_grid");a||(t.html(""),o=0);const c=a?o*u:0,e=i.slice(c,c+u);if(!e.length&&!a){s("#bl_empty").show(),s("#bl_mas_wrap").hide();return}s("#bl_empty").hide(),t.append(e.map(E).join("")),L("bl_fade",t[0]),s("#bl_mas_wrap").toggle(c+u<i.length)},_=async(a=!1)=>{if(!d){d=!0,a||s("#bl_grid").html(Array(6).fill(y()).join("")),s("#bl_empty,#bl_mas_wrap").hide(),s("#bl_result_bar").html("");try{const t=await x(l,n,a);i=t.lista,b=i,(!f.length||a)&&C(i),s("#bl_result_bar").html(`<span><strong>${i.length}</strong> historia${i.length!==1?"s":""}</span>${A(t.fromCache)}`),r()}catch(t){console.error("[blog]",t),$("Error","error"),s("#bl_empty").show()}d=!1}};let m;const k=a=>{clearTimeout(m),m=setTimeout(()=>{if(!a.trim()){i=b,r(),s("#bl_result_bar").html(`<span><strong>${i.length}</strong> historias</span>`);return}const t=a.toLowerCase();i=b.filter(c=>c.titulo?.toLowerCase().includes(t)||c.resumen?.toLowerCase().includes(t)||c.categoria?.toLowerCase().includes(t)||(c.tags||[]).some(e=>e.toLowerCase().includes(t))),s("#bl_result_bar").html(`<span><i class="fas fa-search"></i> <strong>${i.length}</strong> resultado${i.length!==1?"s":""} — "<em>${a}</em>"</span>`),r()},280)};await _(),s(document).on("click.blog",".bl_cat_btn",function(){const a=s(this).data("cat");a!==l&&(l=a,o=0,s(".bl_cat_btn").removeClass("active"),s(this).addClass("active"),_())}).on("click.blog",".bl_ord_btn",function(){const a=s(this).data("ord");a!==n&&(n=a,o=0,s(".bl_ord_btn").removeClass("active"),s(this).addClass("active"),_())}).on("click.blog","#bl_refresh",async function(){s(this).html('<i class="fas fa-spinner fa-spin"></i>').prop("disabled",!0),P(),localStorage.removeItem(h),await _(!0),s(this).html('<i class="fas fa-rotate"></i>').prop("disabled",!1),$("Actualizado ✅","success")}).on("click.blog","#bl_search_toggle",function(){const a=s("#bl_search_bar"),t=a.is(":visible");a.stop(!0).slideToggle(180),t?(s("#bl_search_inp").val(""),i=b,r()):setTimeout(()=>s("#bl_search_inp").focus(),200)}).on("click.blog","#bl_search_close",()=>{s("#bl_search_bar").slideUp(160),s("#bl_search_inp").val(""),i=b,r()}).on("input.blog","#bl_search_inp",function(){k(s(this).val())}).on("click.blog","#bl_mas",()=>{o++,r(!0)}).on("click.blog",".bl_card",function(){const a=s(this).data("slug");a&&w(`/${a}`)}).on("mouseenter.blog",".bl_card",function(){S(s(this).data("slug"))})},H=()=>s(document).off(".blog");export{H as cleanup,D as init,N as render};
