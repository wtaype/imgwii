import{j as a}from"./vendor-BOJxWFg6.js";import{b as e,v as c,l,j as n,k as r,w as d,g as v,i as f,s as m}from"./index-D-jC5gH6.js";const k=[{tit:"YouTube",ico:"fab fa-youtube",url:"https://www.youtube.com/@wiihope",bg:"#ff0000"},{tit:"Facebook",ico:"fab fa-facebook-f",url:"https://www.facebook.com/wiihopee",bg:"#1877F2"},{tit:"Instagram",ico:"fab fa-instagram",url:"https://www.instagram.com/WiiHopee",bg:"linear-gradient(45deg,#f58529,#dd2a7b,#515bd4)"},{tit:"TikTok",ico:"fab fa-tiktok",url:"https://www.tiktok.com/@wiihope",bg:"#000"}];function p(){const s=new Date;return`
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app">${e}</span>
          <span class="foo_ver">${c}</span>
        </div>
        <div class="foo_links">
          <a href="/terminos"   class="foo_link nv_item" data-page="terminos"  ><i class="fas fa-file-contract"></i> Términos</a>
          <a href="/cookies"    class="foo_link nv_item" data-page="cookies"   ><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/privacidad" class="foo_link nv_item" data-page="privacidad"><i class="fas fa-lock"></i> Privacidad</a>
          <a href="/feedback"   class="foo_link nv_item" data-page="feedback"  ><i class="fas fa-comment-dots"></i> Feedback</a>
          <a href="/contacto"   class="foo_link nv_item" data-page="contacto"  ><i class="fas fa-envelope"></i> Contacto</a>
          ${k.map(o=>`<a href="${o.url}" class="redsscc" target="_blank" rel="noopener noreferrer" title="${o.tit}" style="--rb:${o.bg}"><i class="${o.ico}"></i></a>`).join("")}
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${l}" target="_blank"><strong>${n}</strong></a> ${r} - ${s.getFullYear()}</span>
      </div>
    </div>
  </footer>
  `}a("body").append(p());a("head").append('<style>:root{--bgim:url("/imgwii/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>');a("body").append(`
<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"></div>
  <div class="movil_nav"></div>
</nav>`);const t=()=>setTimeout(()=>{a(".movil_logo").html(a(".wilogo").html()||`<i class="fa-solid ${f}"></i> ${e}`),a(".movil_nav").html(`${a(".winav").html()||""}${a(".nv_right").html()||""}`)},50);d.on(t);a(t);const b=()=>a("body").removeClass("movil_open");a(document).on("click",".wimenu",()=>a("body").addClass("movil_open"));a(document).on("click",".movil_close, .movil_overlay, .movil_nav .nv_item, .movil_nav button",b);const i="cookies";if(!v(i)){a("body").append(`
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
    </div>`),setTimeout(()=>a("#cookiess").addClass("cookiess_show"),800);const s=o=>{m(i,o),a("#cookiess").removeClass("cookiess_show"),setTimeout(()=>a("#cookiess").remove(),400)};a(document).on("click","#ck_aceptar",()=>s(!0)),a(document).on("click","#ck_rechazar",()=>s(!1))}export{p as footer};
