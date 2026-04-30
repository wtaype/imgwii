import{j as e}from"./vendor-BOJxWFg6.js";import{auth as c,db as d}from"./firebase-DBQLZhAw.js";import{v as h,d as _,e as m,g as x,q as G,w as T,c as U,G as V,x as q,s as k,f as E,k as z,y as B,z as W,A as H,B as Q,C as X}from"./firebase-D-ROeyul.js";import{w as y,r as L,F as Y,b as f,n as l,M as g,g as Z,s as J,G as K,m as P}from"./index-DJF3AyiR.js";let aa="si";const M={smile:"/word",gestor:"/gestor",empresa:"/empresa",admin:"/admin"},N={smile:"creador",gestor:"negocio",empresa:"empresa"},S={"auth/email-already-in-use":"Email ya registrado","auth/weak-password":"Contraseña débil (mín. 6)","auth/invalid-credential":"Contraseña incorrecta","auth/invalid-email":"Email no válido","auth/missing-email":"Usuario no registrado","auth/too-many-requests":"Demasiados intentos"},A=a=>a.replace(/[<>="'`;/\\$}{]/g,"").replace(/\s+/g," ").trim(),ea=a=>a.replace(/[<>="'`;/\\$}{ ]/g,"").toLowerCase().trim(),ia=a=>a.toLowerCase().replace(/[^a-z0-9_-]/g,"").trim(),R={regEmail:[ea,a=>/^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(a)||"Email inválido"],regUsuario:[ia,a=>a.length>=4||"Mínimo 4 caracteres"],regNombre:[A,a=>a.length>0||"Ingresa tu nombre"],regApellidos:[A,a=>a.length>0||"Ingresa tus apellidos"],regPassword:[a=>a,a=>a.length>=6||"Mínimo 6 caracteres"],regPassword1:[a=>a,a=>a===e("#regPassword").val()||"No coinciden"]},n=(a,i,o,s,t=!1)=>`<div class="wilg_grupo"><i class="fas fa-${a}"></i><input type="${i}" id="${o}" placeholder="${s}" autocomplete="off">${t?'<i class="fas fa-eye wilg_ojo"></i>':""}</div>`,I=(a="smile")=>a==="smile"?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_info_badge wilg_badge_smile">
        <i class="fas fa-rocket"></i> Ideal para influencers, freelancers y marca personal.
      </div>
    </div>`:a==="gestor"?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-store"></i> Información del Negocio</div>
      <div class="wilg_extra_field" id="extraField">
        ${n("store","text","regEmpresaNombre","Nombre de tu negocio o tienda")}
      </div>
      <div class="wilg_info_badge wilg_badge_gestor">
        <i class="fas fa-bolt"></i> Activación inmediata. Herramientas de catálogo y WhatsApp.
      </div>
    </div>`:a==="empresa"?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-building"></i> Datos Corporativos</div>
      <div class="wilg_extra_field wilg_extra_2col" id="extraField">
        ${n("id-card","text","regRuc","RUC (Opcional)")}
        ${n("building","text","regEmpresaNombre","Nombre de la empresa")}
      </div>
      <div class="wilg_info_badge wilg_badge_empresa">
        <i class="fas fa-users-cog"></i> Cuenta para gestionar múltiples perfiles y equipos.
      </div>
    </div>`:"",C={login:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/imgwii/smile.avif" alt="${f}"></div>
      <h2>Bienvenido</h2><p>Inicia sesión en tu cuenta</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    ${n("envelope","text","email","Email o usuario")}
    ${n("lock","password","password","Contraseña",!0)}
    <button type="button" id="Login" class="wilg_btn inactivo"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
    <div class="wilg_links">
      <span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>
      <span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>
    </div>`,registrar:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/imgwii/smile.avif" alt="${f}"></div>
      <h2>Crear Cuenta</h2><p>Únete a la comunidad</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    <div class="wilg_grid">
      ${[["envelope","email","regEmail","Email"],["user","text","regUsuario","Usuario"],["user-tie","text","regNombre","Nombre"],["user-tie","text","regApellidos","Apellidos"]].map(([a,i,o,s])=>n(a,i,o,s)).join("")}
      ${n("lock","password","regPassword","Contraseña",!0)}
      ${n("lock","password","regPassword1","Confirmar contraseña",!0)}
    </div>

    <!-- ── SELECTOR DE ROL ─────────────────── -->
    <div class="wilg_rol_selector">
      <div class="wilg_rol_label"><i class="fas fa-id-badge"></i> Tipo de cuenta</div>
      <div class="wilg_rol_tabs">
        <button type="button" class="wilg_rol_tab active" data-rol="smile">
          <i class="fas fa-user-circle"></i>
          <span>Creador</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="gestor">
          <i class="fas fa-store"></i>
          <span>Negocio</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="empresa">
          <i class="fas fa-building"></i>
          <span>Empresa</span>
        </button>
      </div>
    </div>
    ${I("smile")}
    <!-- ─────────────────────────────────────── -->

    <div class="wilg_check">
      <label><input type="checkbox" id="regTerminos">
      <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="Registrar" class="wilg_btn inactivo"><i class="fas fa-user-plus"></i> Registrarme</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`,restablecer:()=>`
    <div class="wilg_head">
      <div class="wilg_logo wilg_logo_sm"><img src="/imgwii/smile.avif" alt="${f}"></div>
      <h2>Recuperar</h2><p>Te enviaremos un enlace a tu email</p>
    </div>
    ${n("envelope","text","recEmail","Email o usuario")}
    <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`,username:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/imgwii/smile.avif" alt="${f}"></div>
      <h2>¡Casi listo!</h2><p>Completa tus datos de acceso</p>
    </div>
    ${n("user","text","regUsuarioGoogle","Ingresa un usuario (ej: marcos)")}
    ${n("lock","password","regPasswordGoogle","Crea una contraseña segura",!0)}
    
    <div class="wilg_rol_selector" style="margin-top: 1.5vh;">
      <div class="wilg_rol_label"><i class="fas fa-id-badge"></i> ¿Para qué lo usarás?</div>
      <div class="wilg_rol_tabs">
        <button type="button" class="wilg_rol_tab active" data-rol="smile">
          <i class="fas fa-user-circle"></i><span>Creador</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="gestor">
          <i class="fas fa-store"></i><span>Negocio</span>
        </button>
      </div>
    </div>
    <div class="wilg_check" style="margin-top: 1.5vh;">
      <label><input type="checkbox" id="regTerminosGoogle">
      <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="CompletarGoogle" class="wilg_btn inactivo" style="margin-top: 1.5vh;"><i class="fas fa-rocket"></i> Completar Registro</button>
  `},sa=(a,i="")=>`<div id="wilg_modal" class="wiModal wilg_mod ${i}"><div class="modalBody"><button class="modalX">&times;</button>
   <form id="liForm">${C[a]()}</form></div></div>`,oa=(a="login")=>{e("#wilg_modal").remove();const i=a==="registrar"?"wilg_mod_reg":"";e("body").append(sa(a,i)),setTimeout(()=>{Y("wilg_modal"),e("#liForm input:first").focus()},50)},ta=a=>{const i=a==="registrar"?"wilg_mod_reg":"";e("#wilg_modal").toggleClass("wilg_mod_reg",i==="wilg_mod_reg"),e("#liForm").html(C[a]()).attr("data-vista",a),setTimeout(()=>e("#liForm input:first").focus(),30)},ma=()=>y.user?"":'<div class="wilg_wrap"><div class="wilg_card"><form id="liForm"></form></div></div>',pa=()=>{const a=y.user;if(a){setTimeout(()=>L.navigate(M[a.rol]||"/"),0);return}j("login")},j=a=>{e("#liForm").html(C[a]()).attr("data-vista",a),setTimeout(()=>e("#liForm input:first").focus(),30)},r=a=>e(`#${a}`).val().trim(),O=()=>e("#wilg_modal.active").length>0,p=a=>O()?ta(a):j(a),v=async(a,i,o)=>{P(a,!0,i);try{await o()}catch(s){g(S[s.code]||s.message,"error")}finally{P(a,!1)}},F=async a=>{if(a.includes("@"))return{email:a,wi:null};const i=await _(m(d,"smiles",a));if(!i.exists())throw new Error("Usuario no encontrado");return{email:i.data().email,wi:i.data()}},ra=a=>{if(!a)return;const[i,o]=a.split("|");document.documentElement.dataset.theme=i,e('meta[name="theme-color"]').attr("content",o),e(".tema").removeClass("mtha").filter(`[data-ths="${a}"]`).addClass("mtha")},la=a=>{const i=M[a?.rol]||"/";L.navigate(i)},b=a=>{y.login(a,7,["wiSmart"]),a?.tema&&(localStorage.wiTema=a.tema,ra(a.tema)),O()&&K(),g(`<i class="fa-solid fa-hand-wave"></i> Bienvenido ${a?.nombre||""}`,"success"),la(a)};e(document).on("submit.wi","#liForm",a=>a.preventDefault()).on("click.wi",".wilg_ojo",function(){const a=e(this).siblings("input");a.attr("type",a.attr("type")==="password"?"text":"password"),e(this).toggleClass("fa-eye fa-eye-slash")}).on("input.wi","#email, #recEmail, #regEmail",function(){e(this).val(e(this).val().replace(/[<>="'`;/\\$}{ ]/g,"").toLowerCase())}).on("input.wi","#regUsuario, #regUsuarioGoogle",function(){e(this).val(e(this).val().toLowerCase().replace(/[^a-z0-9_-]/g,""))}).on("input.wi","#regNombre, #regApellidos",function(){e(this).val(e(this).val().replace(/[<>="'`;/\\$}{]/g,""))}).on("click.wi",".wilg_reg",()=>{p("registrar")}).on("click.wi",".wilg_rec",()=>{p("restablecer")}).on("click.wi",".wilg_log",()=>p("login")).on("input.wi keyup.wi","#password",a=>{e("#Login").removeClass("inactivo"),a.key==="Enter"&&e("#Login").click()}).on("input.wi keyup.wi","#regPassword1",a=>{e("#Registrar").removeClass("inactivo"),a.key==="Enter"&&e("#Registrar").click()}).on("input.wi keyup.wi","#recEmail",a=>{a.key==="Enter"&&e("#Recuperar").trigger("click")}).on("blur.wi",Object.keys(R).map(a=>`#${a}`).join(","),function(){const a=e(this).val();if(!a)return;const[i,o]=R[this.id],s=i(a);e(this).val(s);const t=o(s);t!==!0&&l(this,t,"error",2500)}).on("blur.wi","#regUsuario",async function(){const a=r("regUsuario");if(!a||a.length<3)return;if(a.includes("@"))return e(this).data("ok",!1),l(this,"No puede contener @","error",2500);const i=!(await _(m(d,"smiles",a))).exists();e(this).data("ok",i),l(this,`Usuario ${i?'disponible <i class="fa-solid fa-check-circle"></i>':'no disponible <i class="fa-solid fa-times-circle"></i>'}`,i?"success":"error",3e3)}).on("blur.wi","#regEmail",async function(){const a=r("regEmail");if(!a||!a.includes("@"))return;const i=(await x(G(U(d,"smiles"),T("email","==",a)))).empty;e(this).data("ok",i),l(this,`Email ${i?'disponible <i class="fa-solid fa-check-circle"></i>':'no disponible <i class="fa-solid fa-times-circle"></i>'}`,i?"success":"error",3e3)}).on("click.wi","#btnGoogle",async function(){if(e(this).data("busy"))return;e(this).data("busy",!0);const a=e(this).html();e(this).html('<i class="fas fa-circle-notch fa-spin"></i> Conectando...');try{const i=new V,s=(await q(c,i)).user,t=await x(G(U(d,"smiles"),T("uid","==",s.uid)));if(t.empty)window.wiTempGoogleUser=s,p("username");else{const u=t.docs[0].data();if(u.estado==="pendiente")throw await h(c),new Error("Tu cuenta está pendiente de activación.");b(u)}}catch(i){i.code!=="auth/popup-closed-by-user"&&i.code!=="auth/cancelled-popup-request"&&g(S[i.code]||i.message,"error"),e(this).html(a).data("busy",!1)}}).on("input.wi keyup.wi","#regUsuarioGoogle, #regPasswordGoogle",function(a){e("#regUsuarioGoogle").val().length>=4&&e("#regPasswordGoogle").val().length>=6?(e("#CompletarGoogle").removeClass("inactivo"),a.key==="Enter"&&e("#CompletarGoogle").click()):e("#CompletarGoogle").addClass("inactivo")}).on("blur.wi","#regUsuarioGoogle",async function(){const a=r("regUsuarioGoogle");if(!a||a.length<3)return;if(a.includes("@"))return e(this).data("ok",!1),l(this,"No puede contener @","error",2500);const i=!(await _(m(d,"smiles",a))).exists();e(this).data("ok",i),l(this,`Usuario ${i?'disponible <i class="fa-solid fa-check-circle"></i>':'no disponible <i class="fa-solid fa-times-circle"></i>'}`,i?"success":"error",3e3)}).on("click.wi","#CompletarGoogle",async function(){if(e(this).data("busy"))return;if(!e("#regTerminosGoogle").is(":checked"))return l(e("#regTerminosGoogle")[0],"Acepta los términos","error",2500);const a=r("regUsuarioGoogle");if(!a||!e("#regUsuarioGoogle").data("ok"))return l(e("#regUsuarioGoogle")[0],"Verifica el usuario","error",2500);const i=r("regPasswordGoogle");if(!i||i.length<6)return l(e("#regPasswordGoogle")[0],"Mínimo 6 caracteres","error",2500);const o=window.wiTempGoogleUser;if(!o)return g("Error de sesión con Google. Intenta de nuevo.","error");const s=e(".wilg_rol_tab.active").data("rol")||"smile";e(this).data("busy",!0),await v(this,"Finalizando",async()=>{try{await z(o,i)}catch(w){console.warn("Aviso Auth Password:",w)}const t=o.displayName?o.displayName.split(" "):["Usuario",""],u={usuario:a,email:o.email,nombre:t[0],apellidos:t.slice(1).join(" ")||"",rol:s,estado:"activo",uid:o.uid,terminos:!0,tema:localStorage.wiTema||"Cielo|#0EBEFF",avatar:o.photoURL||"",bio:"",plan:"free",segmento:N[s]||"creador",verificado:!1,registradoPor:"google"};await k(m(d,"smiles",a),{...u,creado:E()}),b(u),g('<i class="fa-solid fa-rocket"></i> ¡Tu cuenta está lista!',"success")}),e(this).data("busy",!1)}).on("click.wi",".wilg_rol_tab",function(){const a=e(this).data("rol");e(".wilg_rol_tab").removeClass("active"),e(this).addClass("active"),e("#rolExtra").replaceWith(I(a)),na()}).on("change.wi",'input[name="regExtra"]',function(){const a=e(this).val();e(".wilg_extra_opt").removeClass("active"),e(this).closest(".wilg_extra_opt").addClass("active");const i=e("#extraField");a==="personal"||a==="crear"?i.addClass("hidden"):(i.removeClass("hidden"),i.find("input:first").focus())}).on("click.wi","#Login",async function(){await v(this,"Iniciando",async()=>{const a=r("email"),i=r("password"),{email:o,wi:s}=await F(a);await B(c,o,i);const t=s??(await _(m(d,"smiles",c.currentUser.displayName||a))).data();if(t.status==="pendiente")throw await h(c),new Error("Tu cuenta está pendiente de activación. Te notificaremos por email.");b(t)})}).on("click.wi","#Registrar",async function(){if(e(this).data("busy"))return;const a=e(".wilg_rol_tab.active").data("rol")||"smile",o=[[!e("#regTerminos").is(":checked"),"#regTerminos","Acepta los términos"],[!e("#regUsuario").data("ok"),"#regUsuario","Verifica el usuario"],[!e("#regEmail").data("ok"),"#regEmail","Verifica el email"]].find(([s])=>s);if(o)return l(e(o[1])[0],o[2],"error",2500);e(this).data("busy",!0),await v(this,"Registrando",async()=>{const s={email:r("regEmail"),usuario:r("regUsuario"),nombre:r("regNombre"),apellidos:r("regApellidos"),password:r("regPassword")},{user:t}=await W(c,s.email,s.password);await Promise.all([H(t,{displayName:s.usuario}),Q(t)]);const u=a==="empresa",w=a,D=u?"pendiente":"activo",$={usuario:s.usuario,email:s.email,nombre:s.nombre,apellidos:s.apellidos,rol:w,estado:D,uid:t.uid,terminos:!0,tema:localStorage.wiTema||"Cielo|#0EBEFF",avatar:"",bio:"",plan:"free",segmento:N[w]||"creador",verificado:!1,registradoPor:"correo",...a==="empresa"&&{ruc:r("regRuc"),empresaNombre:r("regEmpresaNombre")},...a==="gestor"&&{empresaNombre:r("regEmpresaNombre")}};await k(m(d,"smiles",s.usuario),{...$,creado:E()}),u?(await h(c),g('<i class="fa-solid fa-clock"></i> Registro enviado. Tu cuenta será activada pronto.',"success"),setTimeout(()=>p("login"),2500)):(b($),g('<i class="fa-solid fa-check-circle"></i> ¡Cuenta creada! Verifica tu email',"success"))}),e(this).data("busy",!1)}).on("click.wi","#Recuperar",async function(){const a=r("recEmail");if(!a)return l(this,"Ingresa tu email o usuario","error",2500);await v(this,"Enviando",async()=>{const{email:i}=await F(a);await X(c,i),g('<i class="fa-solid fa-check-circle"></i> Email enviado, revisa tu bandeja',"success"),setTimeout(()=>p("login"),2e3)})}).on("click.wi",".tema",async function(){const a=Z("wiSmile");a?.usuario&&setTimeout(async()=>{const i=localStorage.wiTema;if(i)try{await k(m(d,"smiles",a.usuario),{tema:i,actualizado:E()},{merge:!0}),J("wiSmile",{...a,tema:i},7),g(`Tema ${i.split("|")[0]} guardado <i class="fas fa-check-circle"></i>`,"success")}catch(o){console.error("tema:",o)}},0)});function na(){const a=e('input[name="regExtra"]:checked').val();(a==="personal"||a==="crear")&&e("#extraField").addClass("hidden")}const wa=(a="login")=>{oa(a==="registrar"&&aa==="si"?"registrar":"login")},fa=async(a=[])=>{try{await h(c)}catch(i){console.error("signOut:",i)}y.logout(a)},va=()=>{e(document).off(".wi")};export{wa as abrirLogin,c as auth,va as cleanup,pa as init,ma as render,fa as salir,h as signOut};
