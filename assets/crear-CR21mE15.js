import{g as $,e as u,m as g,s as F}from"./index-BawKnUft.js";import{db as v}from"./firebase-CdDmpH6s.js";import{e as m,d as I,s as L,f as b,q as C,w as A,c as z,j as B,u as y,h as T}from"./firebase-D-ROeyul.js";import"./vendor-BOJxWFg6.js";let k=null,o=$("misProyectosLinkwii")||[],d=o.length>0?o[0].slug:null;const S=[{hex:"#FFFFFF",name:"auto"},{hex:"#FFDA34",name:"Oro"},{hex:"#3cd741",name:"Success"},{hex:"#ffa726",name:"Warning"},{hex:"#00a8e6",name:"Info"},{hex:"#0EBEFF",name:"Cielo"},{hex:"#FF5C69",name:"Dulce"},{hex:"#29C72E",name:"Paz"},{hex:"#7000FF",name:"Mora"},{hex:"#21273B",name:"Futuro"},{hex:"#dddddd",name:"Offline"}],w=["","fas fa-link","fab fa-instagram","fab fa-tiktok","fab fa-youtube","fab fa-whatsapp","fab fa-facebook","fab fa-spotify","fab fa-x-twitter","fab fa-linkedin","fab fa-telegram","fas fa-globe","fas fa-store","fas fa-envelope","fas fa-phone"],h=e=>e?e.includes("instagram.com")?"fab fa-instagram":e.includes("tiktok.com")?"fab fa-tiktok":e.includes("youtube.com")||e.includes("youtu.be")?"fab fa-youtube":e.includes("whatsapp.com")||e.includes("wa.me")?"fab fa-whatsapp":e.includes("facebook.com")||e.includes("fb.me")?"fab fa-facebook":e.includes("spotify.com")?"fab fa-spotify":e.includes("twitter.com")||e.includes("x.com")?"fab fa-x-twitter":e.includes("linkedin.com")?"fab fa-linkedin":e.includes("t.me")||e.includes("telegram")?"fab fa-telegram":e.includes("pinterest.com")?"fab fa-pinterest":"fas fa-link":"",R=async()=>$("wiSmile")?`
    <div class="cr_layout wi_fadeUp wi_visible">
      
      <!-- ── COL IZQUIERDA: Lista de Proyectos ── -->
      <div class="cr_col_left">
        <div class="cr_left_header">
          <div class="cr_left_title">Mis Linkwiis</div>
          <button class="cr_btn_new" id="btn_nuevo_proy">
            <i class="fas fa-plus"></i> Nuevo
          </button>
        </div>

        <div class="cr_slug_form" id="form_nuevo_proy">
          <div class="cr_slug_prefix">linkwii.com/</div>
          <input type="text" id="inp_slug" class="cr_input" placeholder="mi-slug" autocomplete="off">
          <div class="cr_slug_actions">
            <button class="cr_btn_xs" id="btn_cancel_proy">Cancelar</button>
            <button class="cr_btn_xs prim" id="btn_save_proy">Crear</button>
          </div>
        </div>

        <div class="cr_proy_list" id="lista_proyectos_render">
          <div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      </div>

      <!-- ── COL CENTRO: Editor ── -->
      <div class="cr_col_center" id="cr_col_center">
        <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
          <div class="ad_empty">
            <i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>
            Selecciona un proyecto o crea uno nuevo.
          </div>
        </div>
      </div>

      <!-- ── COL DERECHA: Preview Celular ── -->
      <div class="cr_col_right">
        <div style="text-align:center; margin-bottom:2vh;">
          <div style="font-size:0.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--tx3);">Vista Previa</div>
        </div>
        <div class="cr_phone">
          <div class="cr_phone_notch"></div>
          <div class="cr_phone_content" id="cr_phone_render">
            <div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);">
              <i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>
              En vivo
            </div>
          </div>
        </div>
      </div>

    </div>
  `:"<h1>Acceso Denegado</h1>",E=()=>{const e=document.getElementById("lista_proyectos_render");if(e){if(o.length===0){e.innerHTML='<div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">Sin proyectos aún.</div>';return}e.innerHTML=o.map(i=>`
    <div class="cr_proy_item ${i.slug===d?"activo":""}" onclick="window.crSeleccionar('${i.slug}')">
      <div>
        <div class="cr_pt1">/${i.slug}</div>
        <div class="cr_pt2">${i.links?.length||0} enlaces</div>
      </div>
      <i class="fas fa-chevron-right" style="font-size:0.75rem; color:var(--tx3);"></i>
    </div>
  `).join("")}},x=()=>{const e=document.getElementById("cr_col_center");if(!e)return;const i=o.find(t=>t.slug===d);if(!i){e.innerHTML=`
      <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
        <div class="ad_empty"><i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>Selecciona un proyecto.</div>
      </div>
    `;return}const a=i.color||"#FFFFFF",s=S.map(t=>`
    <div class="cr_swatch ${a===t.hex?"selected":""}"
         style="background:${t.hex};"
         data-color="${t.hex}"
         title="${t.name}"
         onclick="window.crElegirColor(this)"></div>
  `).join(""),c=i.links||[],n=c.map((t,l)=>`
      <div class="cr_link_card">
        <div class="cr_link_card_header">
          <div style="display:flex; align-items:center; gap:1vh;">
            <span class="cr_link_num">Enlace ${l+1}</span>
            <div class="cr_icon_btn" onclick="window.crCicloIcono(${l})" title="Haz clic para cambiar el ícono">
              <i class="${t.icon||h(t.url)||"fas fa-link"}" id="icon_prev_${l}"></i>
            </div>
          </div>
          <button class="cr_link_del btn_rm_link" data-index="${l}" title="Eliminar"><i class="fas fa-times"></i></button>
        </div>
        <input type="text" class="cr_input arr_inp_titulo" data-idx="${l}" placeholder="Título" value="${t.titulo}" oninput="window.crPreviewEnlace(this, 'titulo')">
        <input type="url" class="cr_input arr_inp_url" data-idx="${l}" placeholder="https://..." value="${t.url}" oninput="window.crPreviewEnlace(this, 'url')">
      </div>
    `).join("");e.innerHTML=`
    <!-- BARRA COMPACTA DEL PROYECTO -->
    <div class="cr_proyect_bar">
      <div class="cr_proyect_slug"><span>linkwii.com/</span>${i.slug}</div>
      <div class="cr_bar_actions">
        <button class="cr_action_btn" onclick="window.crCopiar('${i.slug}')"><i class="far fa-copy"></i> Copiar</button>
        <a class="cr_action_btn" href="/${i.slug}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver</a>
        <button class="cr_action_btn danger" id="btn_del_main"><i class="fas fa-trash"></i></button>
      </div>
    </div>

    <!-- APARIENCIA -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-paint-roller" style="margin-right:0.5vh;"></i> Apariencia</span>
        <button class="cr_btn_save" id="btn_update_info" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>
      </div>
      <div class="cr_apariencia_grid">
        <div class="cr_field">
          <div class="cr_label">Bio / Descripción</div>
          <textarea id="edit_desc" class="cr_input" rows="4" placeholder="Escribe algo sobre ti..." oninput="window.crPreviewApariencia(this, 'desc')">${i.desc||""}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; gap:1.5vh;">
          <div class="cr_field">
            <div class="cr_label">URL del Avatar</div>
            <input type="url" id="edit_logo" class="cr_input" placeholder="https://..." value="${i.logo||""}" oninput="window.crPreviewApariencia(this, 'logo')">
          </div>
          <div class="cr_field">
            <div class="cr_swatches">
              ${s}
              <input type="hidden" id="edit_color" value="${a}">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ENLACES EN GRID 2 COLUMNAS -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-link" style="margin-right:0.5vh;"></i> Mis Enlaces</span>
        <div style="display:flex; gap:0.8vh;">
          <button class="cr_action_btn" id="btn_add_link_arr"><i class="fas fa-plus"></i> Añadir</button>
          ${c.length>0?'<button class="cr_btn_save" id="btn_save_links" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>':""}
        </div>
      </div>
      ${c.length>0?`<div class="cr_links_grid">${n}</div>`:'<div class="ad_empty" style="padding:3vh 0; font-size:0.88rem;">Sin enlaces. Añade uno.</div>'}
    </div>
  `,document.getElementById("btn_update_info")?.addEventListener("click",async t=>{const l=t.currentTarget;g(l,!0,"Guardando");try{await y(m(v,"linkwiis",i.slug),{desc:document.getElementById("edit_desc").value,logo:document.getElementById("edit_logo").value,color:document.getElementById("edit_color").value,actualizado:b()}),u("Apariencia guardada ✨","success")}catch{u("Error al guardar")}g(l,!1,'<i class="fas fa-save"></i> Guardar')}),document.getElementById("btn_add_link_arr")?.addEventListener("click",async()=>{const t=[...i.links||[],{titulo:"",url:"",icon:""}];await y(m(v,"linkwiis",i.slug),{links:t})}),document.querySelectorAll(".btn_rm_link").forEach(t=>{t.addEventListener("click",async l=>{if(!confirm("¿Estás seguro de eliminar este enlace? Esta acción no se puede deshacer."))return;const f=parseInt(l.currentTarget.dataset.index),_=[...i.links||[]];_.splice(f,1);try{await y(m(v,"linkwiis",i.slug),{links:_}),u("Enlace eliminado ✨","success")}catch{u("Error al eliminar")}})}),document.getElementById("btn_save_links")?.addEventListener("click",async t=>{const l=t.currentTarget;g(l,!0,"Guardando");const f=i.links.filter(_=>_.titulo.trim()||_.url.trim());f.push({titulo:"",url:"",icon:""});try{await y(m(v,"linkwiis",i.slug),{links:f,actualizado:b()}),u("Enlaces guardados ✨","success")}catch{u("Error al guardar enlaces")}g(l,!1,'<i class="fas fa-save"></i> Guardar')});const r=async()=>{if(confirm(`¿Eliminar definitivamente el proyecto /${i.slug}? Esta acción no se puede deshacer.`))try{await T(m(v,"linkwiis",i.slug)),d=null,u("Proyecto eliminado ✨","success")}catch{u("Error al eliminar")}};document.getElementById("btn_del_main")?.addEventListener("click",r)},P={instagram:"linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",tiktok:"#000",youtube:"#ff0000",whatsapp:"#25D366",facebook:"#1877F2",twitter:"#000",linkedin:"#0077b5",telegram:"#0088cc",onlyfans:"#00aff0",pinterest:"#E60023",web:"#00a8e6",link:"#FFDA34"},D=e=>e?e.includes("instagram.com")?"instagram":e.includes("tiktok.com")?"tiktok":e.includes("youtube.com")||e.includes("youtu.be")?"youtube":/whatsapp|wa\.me/.test(e)?"whatsapp":e.includes("facebook.com")||e.includes("fb.me")?"facebook":/twitter\.com|x\.com/.test(e)?"twitter":e.includes("linkedin.com")?"linkedin":/t\.me|telegram/.test(e)?"telegram":e.includes("onlyfans.com")?"onlyfans":e.includes("pinterest.com")?"pinterest":/\.(com|net|org|co|info|es|app|io|me)/.test(e)?"web":"link":"link",p=()=>{const e=document.getElementById("cr_phone_render");if(!e)return;const i=o.find(n=>n.slug===d);if(!i){e.innerHTML='<div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);"><i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>En vivo</div>';return}const a=i.color||"#FFFFFF",c=(i.links||[]).filter(n=>n.titulo).map(n=>{const r=n.icon||h(n.url);let t=a;(!t||t.toLowerCase()==="#ffffff")&&(t=P[D(n.url)]);const l=t&&t.includes("gradient");return`
      <div class="cr_phone_btn" style="${t?`background:${t}; color:#fff; border-color:transparent; box-shadow:0 4px 14px ${l?"rgba(0,0,0,0.2)":t+"40"};`:""}">
        ${r?`<span style="position:absolute; left:14px; font-size:15px;"><i class="${r}"></i></span>`:""}
        ${n.titulo}
      </div>
    `}).join("");e.innerHTML=`
    <img src="${i.logo||"/smile.avif"}" class="cr_phone_avatar" alt="">
    <div class="cr_phone_title">@${i.slug}</div>
    <div class="cr_phone_bio">${i.desc||""}</div>
    <div style="width:100%;">${c}</div>
    <div style="margin-top:auto; padding-top:24px; font-size:11px; font-weight:600; color:#aaa; display:flex; align-items:center; gap:4px;">
      <img src="/smile.avif" style="height:14px; border-radius:50%; opacity:0.4;"> Crea tu Linkwii gratis
    </div>
  `};window.crCicloIcono=e=>{const i=o.find(t=>t.slug===d);if(!i)return;const a=i.links[e];let s=a.icon||"",c=w.indexOf(s);c===-1&&(c=0);let n=w[(c+1)%w.length];a.icon=n;const r=document.getElementById(`icon_prev_${e}`);r&&(r.className=n||h(a.url)||"fas fa-link"),p()};window.crPreviewEnlace=(e,i)=>{const a=parseInt(e.dataset.idx),s=o.find(n=>n.slug===d);if(!s)return;let c=e.value;if(i==="url"&&c&&!c.startsWith("http")&&(c="https://"+c),s.links[a][i]=c,i==="url"&&!s.links[a].icon){const n=document.getElementById(`icon_prev_${a}`);n&&(n.className=h(c)||"fas fa-link")}p()};window.crPreviewApariencia=(e,i)=>{const a=o.find(s=>s.slug===d);a&&(a[i]=e.value,p())};window.crSeleccionar=e=>{d=e,E(),x(),p()};window.crCopiar=e=>{navigator.clipboard.writeText(`${window.location.origin}/${e}`).then(()=>u("Enlace copiado 📋","success"))};window.crElegirColor=e=>{document.querySelectorAll(".cr_swatch").forEach(s=>s.classList.remove("selected")),e.classList.add("selected");const i=e.dataset.color;document.getElementById("edit_color").value=i;const a=o.find(s=>s.slug===d);a&&(a.color=i),p()};const G=()=>{const e=$("wiSmile");if(!e)return;const i=document.getElementById("btn_nuevo_proy"),a=document.getElementById("form_nuevo_proy"),s=document.getElementById("inp_slug");i?.addEventListener("click",()=>{a.style.display="block",s.focus()}),document.getElementById("btn_cancel_proy")?.addEventListener("click",()=>{a.style.display="none",s.value=""}),document.getElementById("btn_save_proy")?.addEventListener("click",async n=>{let r=s.value.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(!r)return u("Ingresa un slug válido");const t=n.currentTarget,l=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin"></i>',t.disabled=!0;try{const f=m(v,"linkwiis",r);if((await I(f)).exists())return u("Ese slug ya está ocupado. Elige otro.");await L(f,{slug:r,usuario:e.usuario,email:e.email,estado:!0,vistas:0,desc:"¡Bienvenido a mi Linkwii!",logo:e.avatar||"",color:"#FFFFFF",links:[],creado:b(),actualizado:b()}),u("Proyecto creado 🎉","success"),a.style.display="none",s.value="",window.crSeleccionar(r)}catch(f){console.error(f),u("Error al crear")}finally{t.innerHTML=l,t.disabled=!1}});const c=C(z(v,"linkwiis"),A("usuario","==",e.usuario));o.length>0&&(E(),x(),p()),k=B(c,n=>{o=n.docs.map(r=>({slug:r.id,...r.data()})),F("misProyectosLinkwii",o),!d&&o.length>0?d=o[0].slug:d&&!o.find(r=>r.slug===d)&&(d=o.length>0?o[0].slug:null),E(),x(),p()})},j=()=>{k&&k(),delete window.crSeleccionar,delete window.crCopiar,delete window.crElegirColor};export{j as cleanup,G as init,R as render};
