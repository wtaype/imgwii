/* empty css              */import{j as e}from"./vendor-BOJxWFg6.js";import{b as i,x as o,y as r}from"./index-gR8PmHRz.js";const t=[{ico:"fa-shield-halved",color:"#0EBEFF",tit:"Cookies Técnicas",desc:"Esenciales para que la plataforma funcione. Permiten la navegación, el uso de herramientas de edición y el cambio de temas visuales.",necesaria:!0},{ico:"fa-chart-pie",color:"#FF5C69",tit:"Análisis y Rendimiento",desc:"Nos ayudan a entender cómo usas nuestras herramientas de imagen (cuáles son las más populares) para mejorar la velocidad y eficiencia.",necesaria:!1},{ico:"fa-user-gear",color:"#29C72E",tit:"Personalización",desc:"Recuerdan tus preferencias, como el último filtro usado o la configuración de compresión favorita, para que no tengas que reconfigurarlas.",necesaria:!1}],_=()=>`
<main id="wimain">
<div class="ac_wrap ck_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ck_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-cookie-bite"></i> Transparencia ante todo</div>
      <h1 class="ac_hero_tit">Política de<br><span class="ac_grad">Cookies 🍪</span></h1>
      <p class="ac_hero_sub">
        En <strong>${i}</strong> usamos cookies para mejorar tu experiencia de edición. 
        No usamos cookies intrusivas ni vendemos tus datos a terceros.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-calendar-check"></i> Revisado: ${r()}</span>
        <span class="tm_chip"><i class="fas fa-user-lock"></i> 100% Seguro</span>
      </div>
    </div>
  </section>

  <!-- ══ CONTENIDO ══ -->
  <section class="ac_sec ck_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-info-circle"></i> Información</div>
      <h2 class="ac_sec_tit">¿Qué cookies <span class="ac_grad">usamos?</span></h2>
    </div>
    <div class="ck_grid">
      ${t.map(a=>`
        <div class="ck_card wi_fadeUp">
          <div class="ck_card_ico" style="background:color-mix(in srgb, ${a.color} 15%, transparent); color: ${a.color}">
            <i class="fas ${a.ico}"></i>
          </div>
          <div class="ck_card_body">
            <h3>${a.tit} ${a.necesaria?'<span class="ck_req">Obligatoria</span>':""}</h3>
            <p>${a.desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- ══ CÓMO GESTIONARLAS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-sliders"></i> Control</div>
      <h2 class="ac_sec_tit">Tu privacidad, <span class="ac_grad">tu elección</span></h2>
    </div>
    <div class="ck_manage wi_fadeUp">
      <p>Puedes configurar o rechazar el uso de cookies en cualquier momento a través de la configuración de tu navegador. Aquí tienes los enlaces directos para los navegadores más populares:</p>
      <div class="ck_nav_links">
        <a href="https://support.google.com/chrome/answer/95647" target="_blank">Chrome</a>
        <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank">Firefox</a>
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank">Safari</a>
        <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63491330-59d2-4916-b785-1f1d79593041" target="_blank">Edge</a>
      </div>
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-cookie-bite"></i></div>
        <h2 class="ac_sec_tit">¿Dudas sobre <span class="ac_grad">privacidad?</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">Consulta nuestra política detallada para saber cómo protegemos tus fotos y datos técnicos.</p>
        <div class="tm_cta_btns">
          <a href="/privacidad" class="ac_btn_p ac_btn_lg"><i class="fas fa-user-shield"></i> Ver Privacidad</a>
          <a href="${o}" class="ac_btn_s ac_btn_lg"><i class="fas fa-house"></i> Volver al Inicio</a>
        </div>
      </div>
    </div>
  </section>

</div></main>
`,p=()=>{const a=new IntersectionObserver(c=>{c.forEach(s=>{s.isIntersecting&&e(s.target).addClass("visible")})},{threshold:.1});e(".wi_fadeUp").each(function(){a.observe(this)}),console.log(`🍪 ${i} Cookies cargadas`)},v=()=>{console.log("🧹 Cookies limpiado")};export{v as cleanup,p as init,_ as render};
