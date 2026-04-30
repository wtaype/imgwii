const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DD2MjuC9.css"])))=>i.map(i=>d[i]);
import{w as m,g as T,e as d,m as E,M as q,_ as z,B as V,n as f,D as R}from"./index-DJF3AyiR.js";import{j as a}from"./vendor-BOJxWFg6.js";import{db as h}from"./firebase-DBQLZhAw.js";import{d as L,e as w,u as B,f as S,s as I,q as N,c as O,a as G,l as Q,g as U}from"./firebase-D-ROeyul.js";import{d as F,C as b,e as K,a as j}from"./devblog-CqMIcvcf.js";const W=o=>o.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\b(el|la|los|las|de|del|en|un|una|y|a|con|por|para|que|es|se)\b/g," ").replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").replace(/_{2,}/g,"_").replace(/^_|_$/g,"").slice(0,50),H=o=>{const i=o.replace(/<[^>]*>/g," ").split(/\s+/).filter(Boolean);return{words:i.length,min:Math.max(1,Math.ceil(i.length/200))}},M=()=>R.params()?.edit||new URLSearchParams(location.search).get("edit")||null,ta=()=>{const o=m.user?.usuario?m.user:T("wiSmile")||{};if(!o.email)return'<div class="nu_err dpvc"><i class="fas fa-lock"></i><h2>Acceso restringido</h2><p>Inicia sesión para crear historias</p></div>';const i=M();return`
  <div class="nu_wrap">
    <div class="nu_head">
      <div class="nu_head_left"><h1><i class="fas fa-${i?"pen":"pen-fancy"}"></i> ${i?"Editar historia":"Nueva historia"}</h1><p>${i?`Editando: <strong>${i}</strong> ✏️`:""}</p></div>
      <div class="nu_head_right">
        ${i?`<a href="/${i}" class="nu_btn_outline" ${f("Ver post")}><i class="fas fa-eye"></i> Ver</a>`:`<button type="button" id="nu_preview_pg" class="nu_btn_outline" ${f("Preview")}><i class="fas fa-eye"></i> Preview</button>`}
        <button type="submit" form="nu_form" id="nu_submit" class="nu_btn_submit"><i class="fas fa-${i?"save":"paper-plane"}"></i> ${i?"Guardar":"Publicar"}</button>
      </div>
    </div>
    <form id="nu_form" autocomplete="off"><div class="nu_layout">
      <div class="nu_left">
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-heading"></i> Título</div>
          <input id="nu_titulo" type="text" class="nu_titulo_inp" placeholder="Historias que inspiren y con mucho valor" maxlength="100" required/>
          <div class="nu_slug_box">
            <span class="nu_slug_label"><i class="fas fa-link"></i> ${V}.web.app/</span>
            <input id="nu_slug_inp" type="text" placeholder="mi_historia" maxlength="50" spellcheck="false" ${i?"readonly":""}/>
            ${i?"":`<button type="button" id="nu_slug_reset" class="nu_slug_btn" ${f("Regenerar")}><i class="fas fa-rotate"></i></button>`}
          </div>
          <div id="nu_slug_status" class="nu_slug_status">${i?'<span class="ok"><i class="fas fa-lock"></i> Slug bloqueado (edición)</span>':""}</div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-align-left"></i> Resumen</div>
          <textarea id="nu_resumen" rows="3" maxlength="160" placeholder="Describe en pocas palabras..."></textarea>
          <div class="nu_counter"><span id="nu_resumen_cnt">0</span>/160</div>
        </div>
        <div class="nu_card nu_card_editor">
          <div class="nu_card_title_row">
            <span><i class="fas fa-code"></i> Contenido HTML</span>
            <div class="nu_editor_tabs">
              <button type="button" class="nu_tab active" data-tab="edit"><i class="fas fa-code"></i> Editor</button>
              <button type="button" class="nu_tab" data-tab="prev"><i class="fas fa-eye"></i> Preview</button>
            </div>
          </div>
          <div class="nu_toolbar">${[["fa-bold","<strong>texto</strong>"],["fa-italic","<em>texto</em>"],["fa-heading","<h2>Título</h2>"],["fa-quote-left","<blockquote>cita</blockquote>"],["fa-list-ul",`<ul>
  <li>item</li>
</ul>`],["fa-image",'<img src="url" alt="desc"/>'],["fa-link",'<a href="url">texto</a>']].map(([e,y])=>`<button type="button" class="nu_tool" data-tag='${y}' ${f(e)}><i class="fas ${e}"></i></button>`).join("")}</div>
          <textarea id="nu_contenido" class="nu_code" rows="18" placeholder="<p>Había una vez...</p>"></textarea>
          <div id="nu_prev_html" class="nu_html_prev dpn"></div>
          <div class="nu_content_footer"><span id="nu_palabras" class="nu_hint"><i class="fas fa-font"></i> 0 palabras</span><span id="nu_lectura" class="nu_hint"><i class="fas fa-clock"></i> 1 min</span></div>
        </div>
      </div>
      <div class="nu_right">
        <div class="nu_card nu_card_publish">
          <div class="nu_card_title"><i class="fas fa-rocket"></i> ${i?"Actualizar":"Publicar"}</div>
          <div class="nu_publish_opts">
            <label class="nu_check_l"><input type="checkbox" id="nu_activo" checked/><span><i class="fas fa-eye"></i> Visible</span></label>
            <label class="nu_check_l"><input type="checkbox" id="nu_destacado"/><span><i class="fas fa-star"></i> Destacado</span></label>
          </div>
          <button type="submit" form="nu_form" class="nu_btn_submit nu_btn_full"><i class="fas fa-${i?"save":"paper-plane"}"></i> ${i?"Guardar cambios":"Publicar"}</button>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-folder"></i> Categoría</div>
          <input id="nu_cat_inp" type="text" placeholder="Ej: Esperanza, Salud..." maxlength="30" required/>
          <div id="nu_cat_sug" class="nu_sug_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-tags"></i> Tags</div>
          <input id="nu_tags_inp" type="text" placeholder="Escribe y presiona Enter"/>
          <div id="nu_tag_sug" class="nu_sug_box"></div>
          <div id="nu_tags_box" class="nu_tags_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-image"></i> Imagen</div>
          <input id="nu_img" type="url" placeholder="https://cdn.pixabay.com/..."/>
          <div id="nu_img_prev" class="nu_img_prev dpn"><img id="nu_img_el" src="" alt=""/><button type="button" id="nu_img_clear" class="nu_img_clear" ${f("Quitar")}><i class="fas fa-xmark"></i></button></div>
        </div>
        <div class="nu_card nu_card_autor">
          <div class="nu_card_title"><i class="fas fa-user-pen"></i> Autor</div>
          <div class="nu_autor_info"><div class="nu_autor_av"><i class="fas fa-user-circle"></i></div><div><strong>${o?.nombre||o?.usuario||"Anónimo"}</strong><span>${o?.email||""}</span></div></div>
        </div>
      </div>
    </div></form>
  </div>`},ia=async()=>{if(!(m.user?.usuario?m.user:T("wiSmile")||{}).email)return;const i=M();let e=[],y,A,P,g=!!i;const D=()=>W(a("#nu_titulo").val()),$=()=>{const{words:t,min:s}=H(a("#nu_contenido").val());a("#nu_palabras").html(`<i class="fas fa-font"></i> ${t} palabras`),a("#nu_lectura").html(`<i class="fas fa-clock"></i> ${s} min`)},k=()=>a("#nu_tags_box").html(e.map((t,s)=>`<span class="nu_tag_chip">#${t} <i class="fas fa-xmark nu_tag_rm" data-i="${s}"></i></span>`).join(""));if((async()=>{try{const t=N(O(h,b),G("creado","desc"),Q(15)),s=await U(t),n=new Set,u=new Set;s.forEach(r=>{const l=r.data();l.categoria&&n.add(l.categoria),l.tags&&Array.isArray(l.tags)&&l.tags.forEach(c=>u.add(c))}),n.size>0&&a("#nu_cat_sug").html(Array.from(n).map(r=>`<span class="nu_sug_chip cat_sug">${r}</span>`).join("")),u.size>0&&a("#nu_tag_sug").html(Array.from(u).map(r=>`<span class="nu_sug_chip tag_sug">#${r}</span>`).join(""))}catch{console.warn("No se pudieron cargar sugerencias")}})(),g)try{const t=await F(i,!0);if(!t?.data){d("Post no encontrado","error");return}const s=t.data;a("#nu_titulo").val(s.titulo),a("#nu_slug_inp").val(s.slug||s.id),a("#nu_resumen").val(s.resumen||"").trigger("input"),a("#nu_contenido").val(s.contenido||""),a("#nu_img").val(s.imagen||""),a("#nu_activo").prop("checked",s.activo!==!1),a("#nu_destacado").prop("checked",!!s.destacado),a("#nu_cat_inp").val(s.categoria||""),e=Array.isArray(s.tags)?[...s.tags]:[],k(),s.imagen&&(a("#nu_img_el").attr("src",s.imagen),a("#nu_img_prev").removeClass("dpn")),a("#nu_resumen_cnt").text((s.resumen||"").length),$()}catch(t){console.error("edit load:",t),d("Error cargando post","error")}g||(a("#nu_titulo").on("input",function(){clearTimeout(y),y=setTimeout(()=>{a("#nu_slug_inp").data("m")||a("#nu_slug_inp").val(D()).trigger("input")},400)}),a("#nu_slug_inp").on("input",function(){a(this).data("m",!0),a(this).val(a(this).val().replace(/[^a-z0-9_]/gi,n=>n===" "?"_":"").toLowerCase().replace(/_{2,}/g,"_")),clearTimeout(P);const t=a(this).val(),s=a("#nu_slug_status");if(!t)return s.html("").removeClass("ok err");s.html('<i class="fas fa-spinner fa-spin"></i>').removeClass("ok err"),P=setTimeout(async()=>{if(t.length<3)return s.html('<i class="fas fa-exclamation"></i> Muy corto').addClass("err").removeClass("ok");(await L(w(h,b,t)).catch(()=>null))?.exists()?s.html('<i class="fas fa-xmark"></i> Ya existe').addClass("err").removeClass("ok"):s.html('<i class="fas fa-check"></i> OK').addClass("ok").removeClass("err")},600)}),a("#nu_slug_reset").on("click",()=>{a("#nu_slug_inp").removeData("m").val(D()).trigger("input")})),a("#nu_resumen").on("input",function(){a("#nu_resumen_cnt").text(a(this).val().length)}),a("#nu_img").on("input",function(){clearTimeout(A),A=setTimeout(()=>{const t=a(this).val().trim();if(!t)return a("#nu_img_prev").addClass("dpn");a("#nu_img_el").attr("src",t).off("load error").on("load",()=>a("#nu_img_prev").removeClass("dpn")).on("error",()=>a("#nu_img_prev").addClass("dpn"))},600)}),a("#nu_img_clear").on("click",()=>{a("#nu_img").val(""),a("#nu_img_prev").addClass("dpn")}),a("#nu_contenido").on("input",$),a("#nu_tags_inp").on("keydown",function(t){if(t.key!=="Enter"&&t.key!==",")return;t.preventDefault();const s=a(this).val().trim().toLowerCase().replace(/\s+/g,"_");s&&!e.includes(s)&&e.length<8&&(e.push(s),k()),a(this).val("")}),a(document).on("click.nuevo",".nu_tool",function(){const t=a(this).data("tag"),s=a("#nu_contenido"),n=s[0],u=n.selectionStart,r=n.selectionEnd,l=n.value.substring(u,r)||"texto",c=t.replace("texto",l).replace("cita",l);s.val(n.value.substring(0,u)+c+n.value.substring(r)),n.focus(),n.selectionStart=u,n.selectionEnd=u+c.length,$()}).on("click.nuevo",".nu_tab",function(){const t=a(this).data("tab");a(".nu_tab").removeClass("active"),a(this).addClass("active"),t==="prev"?(a("#nu_prev_html").html(a("#nu_contenido").val()).removeClass("dpn"),a("#nu_contenido").addClass("dpn")):(a("#nu_contenido").removeClass("dpn"),a("#nu_prev_html").addClass("dpn"))}).on("click.nuevo",".nu_tag_rm",function(){e.splice(+a(this).data("i"),1),k()}).on("click.nuevo",".cat_sug",function(){a("#nu_cat_inp").val(a(this).text())}).on("click.nuevo",".tag_sug",function(){const t=a(this).text().replace("#","");t&&!e.includes(t)&&e.length<8&&(e.push(t),k())}),a("#nu_form").on("submit",async function(t){t.preventDefault();const s=a("#nu_submit,.nu_btn_full"),n=m.user?.usuario?m.user:T("wiSmile")||{};let u=a("#nu_cat_inp").val().trim();u&&(u=u.charAt(0).toUpperCase()+u.slice(1).toLowerCase());const[r,l,c,C,v,_]=[a("#nu_titulo").val().trim(),a("#nu_resumen").val().trim(),u,a("#nu_img").val().trim(),a("#nu_contenido").val().trim(),a("#nu_slug_inp").val().trim()];if(!r||!l||!c||!C||!v)return d("Completa todos los campos","warning");if(v.length<50)return d("Contenido muy corto","warning");if(!_||_.length<3)return d("Slug inválido","warning");if(!g&&a("#nu_slug_status").hasClass("err"))return d("Slug no disponible","error");E(s,!0,g?"Guardando...":"Publicando...");try{const x=`${H(v).min} min`;if(g)await B(w(h,b,i),{activo:a("#nu_activo").is(":checked"),destacado:a("#nu_destacado").is(":checked"),titulo:r,resumen:l,categoria:c,contenido:v,imagen:C,imagenAlt:r,tags:e,tiempo_lectura:x,actualizado:S()}),K(i),j(),q("¡Historia actualizada! 🐾✨","success"),setTimeout(()=>z(()=>import("./index-DJF3AyiR.js").then(p=>p.H),__vite__mapDeps([0])).then(p=>p.rutas.navigate(`/${i}`)),1200);else{if((await L(w(h,b,_))).exists())return E(s,!1),d("Slug existente","warning");await I(w(h,b,_),{id:_,slug:_,activo:a("#nu_activo").is(":checked"),destacado:a("#nu_destacado").is(":checked"),usuario:n.usuario,email:n.email,autor:n.nombre||n.usuario,titulo:r,resumen:l,categoria:c,contenido:v,imagen:C,imagenAlt:r,tags:e,vistas:0,tiempo_lectura:x,creado:S(),actualizado:S()}),j(),q("¡Historia publicada! 🐾✨","success"),setTimeout(()=>z(()=>import("./index-DJF3AyiR.js").then(p=>p.H),__vite__mapDeps([0])).then(p=>p.rutas.navigate(`/${_}`)),1200)}}catch(x){console.error("nuevo:",x),d(g?"Error al guardar":"Error al publicar","error"),E(s,!1)}})},na=()=>{a("#nu_form,#nu_slug_inp,#nu_titulo,#nu_resumen,#nu_img,#nu_contenido").off(),a(document).off(".nuevo")};export{na as cleanup,ia as init,ta as render};
