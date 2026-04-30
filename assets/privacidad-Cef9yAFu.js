/* empty css              */import{j as e}from"./vendor-BOJxWFg6.js";import{b as c,x as o}from"./index-gR8PmHRz.js";const t=[{ico:"fa-user-secret",color:"#0EBEFF",num:"01",tit:"Procesamiento Local",desc:"Tus imágenes se procesan en tu navegador usando Web Workers. Tus fotos originales nunca se suben a nuestros servidores permanentes."},{ico:"fa-trash-can",color:"#FF5C69",num:"02",tit:"Cero Almacenamiento",desc:"No guardamos tus imágenes. Una vez que cierras la pestaña o terminas la descarga, los datos temporales se eliminan por completo."},{ico:"fa-eye-slash",color:"#29C72E",num:"03",tit:"Sin Rastreo Invasivo",desc:"No recolectamos datos personales identificables. Solo estadísticas anónimas para mejorar el rendimiento de los algoritmos de IA."},{ico:"fa-handshake",color:"#7000FF",num:"04",tit:"Tus Datos son Tuyos",desc:"No vendemos ni compartimos información con anunciantes. El 100% de la propiedad intelectual de tus resultados te pertenece."}],l=()=>`
<main id="wimain">
<div class="ac_wrap pv_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero pv_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-lock"></i> Tu seguridad es nuestra prioridad</div>
      <h1 class="ac_hero_tit">Política de<br><span class="ac_grad">Privacidad 🛡️</span></h1>
      <p class="ac_hero_sub">
        En <strong>${c}</strong>, creemos que tus fotos son privadas. 
        Por eso hemos construido una plataforma donde el procesamiento ocurre en tu equipo.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-user-check"></i> GDPR Compliant</span>
        <span class="tm_chip"><i class="fas fa-shield-heart"></i> 100% Ético</span>
      </div>
    </div>
  </section>

  <!-- ══ PILARES ══ -->
  <section class="tm_secciones">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-gem"></i> Nuestros Pilares</div>
      <h2 class="ac_sec_tit">Privacidad por <span class="ac_grad">diseño</span></h2>
    </div>
    <div class="tm_secs_grid">
      ${t.map(s=>`
        <div class="tm_sec_card wi_fadeUp">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc: ${s.color}">
              <i class="fas ${s.ico}"></i>
            </div>
            <div class="tm_sec_head_txt">
              <span class="tm_sec_num">${s.num}</span>
              <h3 class="tm_sec_tit">${s.tit}</h3>
            </div>
          </div>
          <div class="tm_sec_body">
            <p>${s.desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
  </section>

  <!-- ══ DETALLES TÉCNICOS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-code"></i> Transparencia Técnica</div>
      <h2 class="ac_sec_tit">¿Cómo manejamos <span class="ac_grad">tus archivos?</span></h2>
    </div>
    <div class="tm_secs_grid">
      <div class="tm_sec_card wi_fadeUp">
        <div class="tm_sec_header">
          <div class="tm_sec_ico" style="--tc: #0EBEFF"><i class="fas fa-microchip"></i></div>
          <h4 class="tm_sec_tit">IA Local</h4>
        </div>
        <div class="tm_sec_body">
          <p>Aprovechamos la potencia de tu tarjeta gráfica y procesador para ejecutar los modelos de IA mediante TensorFlow.js, minimizando el envío de datos a la nube.</p>
        </div>
      </div>
      <div class="tm_sec_card wi_fadeUp">
        <div class="tm_sec_header">
          <div class="tm_sec_ico" style="--tc: #FF5C69"><i class="fas fa-server"></i></div>
          <h4 class="tm_sec_tit">Infraestructura</h4>
        </div>
        <div class="tm_sec_body">
          <p>Cualquier tarea que requiera servidores se realiza en entornos cifrados punto a punto y los archivos se eliminan automáticamente cada hora.</p>
        </div>
      </div>
      <div class="tm_sec_card wi_fadeUp">
        <div class="tm_sec_header">
          <div class="tm_sec_ico" style="--tc: #29C72E"><i class="fas fa-cookie"></i></div>
          <h4 class="tm_sec_tit">Cookies</h4>
        </div>
        <div class="tm_sec_body">
          <p>Usamos herramientas como Google Analytics con anonimización de IP activada para entender patrones de uso técnico sin identificarte personalmente.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-user-lock"></i></div>
        <h2 class="ac_sec_tit">Tus datos <span class="ac_grad">están seguros</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">¿Tienes más preguntas sobre cómo protegemos tu privacidad?</p>
        <div class="tm_cta_btns">
          <a href="/contacto" class="ac_btn_p ac_btn_lg"><i class="fas fa-envelope"></i> Consultar ahora</a>
          <a href="${o}" class="ac_btn_s ac_btn_lg"><i class="fas fa-house"></i> Volver al Inicio</a>
        </div>
      </div>
    </div>
  </section>

</div></main>
`,_=()=>{const s=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&e(a.target).addClass("visible")})},{threshold:.1});e(".wi_fadeUp").each(function(){s.observe(this)}),console.log(`🛡️ ${c} Privacidad cargada con diseño Premium`)},m=()=>{console.log("🧹 Privacidad limpiado")};export{m as cleanup,_ as init,l as render};
