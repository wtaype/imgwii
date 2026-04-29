import{e as t,m as p,b as u,o as g,z as f,A as w,_ as y}from"./index-DCciXqAf.js";/* empty css              */import{j as e}from"./vendor-BOJxWFg6.js";const l={pub:void 0,sid:void 0,tid:void 0};w({js:[()=>y(()=>import("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"),[])]});const q=[{ico:"fa-envelope",color:"#0EBEFF",label:"Email",value:"wilder.taype@hotmail.com",copiable:!0},{ico:"fa-map-marker-alt",color:"#FF5C69",label:"Ubicación",value:"Lima, Perú",copiable:!1},{ico:"fa-clock",color:"#29C72E",label:"Respuesta",value:"24/7 Disponible",copiable:!1}],E=["Consulta Técnica","Reportar un Bug","Sugerencia de Función","Plan Pro / Facturación","Alianzas Comerciales","Solicitud de Datos","Otro"],j=[{q:"¿Responden todos los mensajes?",r:"Sí. Nuestro equipo técnico lee cada mensaje. Respondemos en un plazo máximo de 24 a 48 horas hábiles."},{q:"¿Puedo sugerir una nueva herramienta?",r:'¡Claro! Nos encanta escuchar a la comunidad. Usa el asunto "Sugerencia de Función" y cuéntanos tu idea.'},{q:"¿ImgWii es gratis para siempre?",r:"La versión básica de ImgWii es y será siempre gratuita. Los planes Pro nos ayudan a mantener la infraestructura."},{q:"¿Mis imágenes son privadas?",r:"Absolutamente. Como detallamos en nuestra Política de Privacidad, el procesamiento es local y no guardamos tus archivos."}],i=500,v="wi_ct_last",C=60*1e3,S=()=>{const a=parseInt(localStorage.getItem(v)||"0",10);return Date.now()-a>C},$=()=>localStorage.setItem(v,String(Date.now()));let o=[];const A=()=>`
<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-paper-plane"></i> Soporte Técnico</div>
      <h1 class="ac_hero_tit">Escríbenos<br><span class="ac_grad">tu mensaje 💬</span></h1>
      <p class="ac_hero_sub">
        ¿Tienes una duda, problema técnico o sugerencia para mejorar la plataforma?
        <strong>Nuestro equipo está listo para escucharte.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta en 24–48h</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> 100% Seguro</span>
        <span class="tm_chip"><i class="fas fa-bolt"></i> Soporte Directo</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Formulario</div>
          <h2 class="ac_sec_tit">Envíanos un <span class="ac_grad">mensaje</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Nombre</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Tu nombre" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="ct_email" name="email" placeholder="tu@email.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_telefono"><i class="fas fa-phone"></i> Celular (opcional)</label>
            <input type="tel" id="ct_telefono" name="telefono" placeholder="Tu número" maxlength="20">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Asunto</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${E.map(a=>`<option value="${a}">${a}</option>`).join("")}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Mensaje</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Cuéntanos en qué podemos ayudarte…" required maxlength="${i}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${i}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Mensaje</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Información de Contacto</h3>
          <div class="ct_info_items">
            ${q.map(a=>`
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${a.color} 15%,transparent);color:${a.color}">
                  <i class="fas ${a.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${a.label}</span>
                  <span class="ct_info_value">${a.value}</span>
                </div>
                ${a.copiable?`<button class="ct_copy" data-copy="${a.value}" title="Copiar"><i class="fas fa-copy"></i></button>`:""}
              </div>`).join("")}
          </div>
        </div>

        <div class="ct_info_card wi_fadeUp" style="margin-top:3vh">
          <h3><i class="fas fa-share-nodes"></i> También nos encuentras en</h3>
          <div class="ct_redes">
            <a href="https://github.com/wtaype/imgwii" target="_blank" rel="noopener" class="ct_red" style="--rc:#24292e">
              <i class="fab fa-github"></i><span>GitHub</span>
            </a>
            <a href="https://wtaype.github.io/" target="_blank" rel="noopener" class="ct_red" style="--rc:#0EBEFF">
              <i class="fas fa-globe"></i><span>Portfolio</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> FAQ</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${j.map((a,s)=>`
        <div class="ct_faq_item wi_fadeUp" id="faq_${s}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${a.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${a.r}</p></div>
        </div>`).join("")}
    </div>
  </section>

  <!-- ══ CTA PREMIUM ══ -->
  <section class="ac_sec">
    <div class="tm_cta_premium wi_fadeUp">
      <div class="tm_cta_glow"></div>
      <div class="tm_cta_inner">
        <div class="tm_cta_icon"><i class="fas fa-rocket"></i></div>
        <h2 class="ac_sec_tit">¿Necesitas ayuda <span class="ac_grad">urgente?</span></h2>
        <p class="ac_hero_sub" style="margin-bottom:4vh">Escríbenos directamente o abre un issue en nuestro repositorio oficial de GitHub.</p>
        <div class="tm_cta_btns">
          <a href="mailto:wilder.taype@hotmail.com" class="ac_btn_p ac_btn_lg">
            <i class="fas fa-envelope"></i> Enviar email
          </a>
          <a href="https://github.com/wtaype/imgwii/issues" target="_blank" rel="noopener" class="ac_btn_s ac_btn_lg">
            <i class="fab fa-github"></i> GitHub Issues
          </a>
        </div>
      </div>
    </div>
  </section>

</div></main>`,P=()=>{e(document).on("input.contacto","#ct_mensaje",function(){const a=e(this).val();a.length>i&&e(this).val(a.slice(0,i)),e("#ct_count").text(Math.min(a.length,i))}),e(document).on("reset.contacto","#ctForm",()=>{setTimeout(()=>e("#ct_count").text("0"),10)}),e(document).on("submit.contacto","#ctForm",async function(a){if(a.preventDefault(),e("#ct_honey").val())return;if(!S()){t("Espera un momento antes de enviar otro mensaje.","warning");return}const s=e("#ct_nombre").val().trim(),r=e("#ct_email").val().trim(),b=e("#ct_telefono").val().trim()||"No especificado",d=e("#ct_asunto").val(),_=e("#ct_mensaje").val().trim();if(s.length<3)return t("El nombre debe tener al menos 3 caracteres.","error");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return t("Ingresa un email válido.","error");if(!d)return t("Selecciona un asunto.","error");if(_.length<10)return t("El mensaje debe tener al menos 10 caracteres.","error");const m=e("#ct_submit");p(m,!0,"Enviando…");try{typeof window.emailjs>"u"&&await new Promise((n,h)=>{const c=document.createElement("script");c.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",c.onload=n,c.onerror=()=>h(new Error("No se pudo cargar EmailJS")),document.head.appendChild(c)}),window.emailjs.init(l.pub),await window.emailjs.send(l.sid,l.tid,{nombre:s,email:r,telefono:b,asunto:d,mensaje:_,app_name:u}),$(),t("¡Mensaje enviado! Te responderemos pronto.","success",4500),this.reset(),e("#ct_count").text("0")}catch(n){console.error("[contacto] EmailJS error:",n),t("No se pudo enviar el mensaje. Intenta de nuevo.","error")}finally{p(m,!1,"Enviar Mensaje")}}),e(document).on("click.contacto",".ct_copy",function(){g(e(this).data("copy"),this,"¡Copiado!")}),e(document).on("click.contacto",".ct_faq_q",function(){const a=e(this).closest(".ct_faq_item"),s=a.hasClass("active");e(".ct_faq_item").removeClass("active").find(".ct_faq_a").slideUp(280),e(".ct_faq_arr").removeClass("rotated"),s||(a.addClass("active").find(".ct_faq_a").slideDown(280),a.find(".ct_faq_arr").addClass("rotated"))}),o.push(f(".wi_fadeUp",a=>e(a).addClass("visible"))),o.push(f(".ct_faq_item",(a,s)=>setTimeout(()=>e(a).addClass("visible"),s*80))),console.log(`📩 ${u} Contacto cargado`)},T=()=>{e(document).off(".contacto"),o.forEach(a=>a?.disconnect?.()),o=[]};export{T as cleanup,P as init,A as render};
