/* empty css              */import{j as i}from"./vendor-BOJxWFg6.js";import{b as c}from"./index-DJF3AyiR.js";const o=[{ico:"fa-github",color:"#24292e",bg:"#24292e",txt:"#fff",tit:"GitHub Issues",desc:"Reporta errores técnicos o solicita nuevas funciones en nuestro repositorio oficial.",url:"https://github.com/wtaype/imgwii/issues",cta:"Abrir un Issue"},{ico:"fa-envelope",color:"#0EBEFF",bg:"var(--wb)",txt:"var(--tx)",tit:"Correo Directo",desc:"Escríbenos con tus dudas, propuestas comerciales o feedback general sobre la app.",url:"mailto:wilder.taype@hotmail.com",cta:"Enviar correo"}],t=[{ico:"fa-bug",color:"#FF5C69",tit:"Reportar un error",desc:"Algo no funciona como debería en las herramientas."},{ico:"fa-lightbulb",color:"#FFDA34",tit:"Sugerir una idea",desc:"Tienes una función que mejoraría la edición."},{ico:"fa-star",color:"#0EBEFF",tit:"Dejar una opinión",desc:"Cuéntanos cómo ha sido tu experiencia con la IA."},{ico:"fa-briefcase",color:"#29C72E",tit:"Alianza Comercial",desc:"Interés en integrar nuestra tecnología en tu empresa."}],d=()=>`
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div><div class="ac_hero_orb ac_orb2"></div><div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-heart-pulse"></i> Tu opinión nos importa</div>
      <h1 class="ac_hero_tit">Feedback &<br><span class="ac_grad">Soporte 💬</span></h1>
      <p class="ac_hero_sub">
        <strong>${c}</strong> crece gracias a tus ideas. Tu feedback nos ayuda a crear 
        herramientas de edición <strong>cada vez más potentes y profesionales.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-bolt"></i> Respuesta rápida</span>
        <span class="tm_chip"><i class="fas fa-rocket"></i> Innovación constante</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> 100% Confidencial</span>
      </div>
    </div>
  </section>

  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Canales</div>
      <h2 class="ac_sec_tit">¿Cómo quieres <span class="ac_grad">contactarnos?</span></h2>
      <p class="ac_sec_sub">Elige el canal que más te acomode para enviarnos tu mensaje</p>
    </div>
    <div class="fb_canales">
      ${o.map(a=>`
        <a href="${a.url}" target="_blank" rel="noopener" class="fb_canal wi_fadeUp" style="--cc:${a.color}">
          <div class="fb_canal_ico" style="background:${a.bg};color:${a.txt}"><i class="fab ${a.ico}"></i></div>
          <div class="fb_canal_info">
            <strong>${a.tit}</strong>
            <span>${a.desc}</span>
          </div>
          <div class="fb_canal_cta" style="color:${a.color}">${a.cta} <i class="fas fa-arrow-right"></i></div>
        </a>`).join("")}
    </div>
  </section>

  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-layer-group"></i> Categorías</div>
      <h2 class="ac_sec_tit">¿Sobre qué es tu <span class="ac_grad">mensaje?</span></h2>
      <p class="ac_sec_sub">Cuéntanos qué tipo de feedback tienes para nosotros</p>
    </div>
    <div class="ac_feat_grid">
      ${t.map(a=>`
        <div class="ac_feat_card wi_fadeUp" style="--sc:${a.color}">
          <div class="ac_feat_ico"><i class="fas ${a.ico}"></i></div>
          <h3>${a.tit}</h3><p>${a.desc}</p>
        </div>`).join("")}
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-comments"></i></div>
        <h2 class="ac_sec_tit">¡Gracias por ayudarnos <span class="ac_grad">a mejorar!</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">Cada mensaje que recibimos nos motiva a seguir construyendo ${c} con pasión.</p>
        <div class="tm_cta_btns">
          <a href="https://github.com/wtaype/imgwii/issues" target="_blank" rel="noopener" class="ac_btn_p ac_btn_lg">
            <i class="fab fa-github"></i> GitHub Issues
          </a>
          <a href="mailto:wilder.taype@hotmail.com" class="ac_btn_s ac_btn_lg">
            <i class="fas fa-envelope"></i> Enviar correo
          </a>
        </div>
      </div>
    </div>
  </section>
</div></main>`;let s=null;const _=()=>{s=new IntersectionObserver(a=>a.forEach(e=>{e.isIntersecting&&i(e.target).addClass("visible")}),{threshold:.1}),i(".wi_fadeUp").each(function(){s.observe(this)}),console.log(`💬 ${c} Feedback cargado`)},p=()=>{s?.disconnect?.(),s=null};export{p as cleanup,_ as init,d as render};
