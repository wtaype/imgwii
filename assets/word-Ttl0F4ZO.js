const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DD2MjuC9.css"])))=>i.map(i=>d[i]);
import{w as l,S as k,e as h,q as E,b as I,v as j,n,s as L,g as O,t as z,d as D,u as F,_ as N}from"./index-DJF3AyiR.js";import{j as o}from"./vendor-BOJxWFg6.js";const g="word_docs",M=()=>"wd"+Date.now(),P=[{id:"ej1",titulo:"Documento de Ejemplo",contenido:"<p>Este es un documento de ejemplo. <b>Prueba a editar el texto</b> y usar las herramientas de la barra superior para darle estilo.</p>",pin:!0,creado:Date.now(),actualizado:Date.now(),synced:!1}],f={get:()=>{const e=localStorage.getItem(g);return e===null&&!l.user?[...P]:O(g)||(e?.startsWith("[")?JSON.parse(e):[])},set:e=>L(g,e,8760)},V=()=>`
<div class="wd_wrap">
  <!-- RIBBON -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" ${n("Archivos")}><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" ${n("Fuente",void 0,"bottom")}>
          <option value="'Segoe UI', system-ui" selected>Segoe UI</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Outfit', sans-serif">Outfit</option>
          <option value="'Rubik', sans-serif">Rubik</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
        <div class="wd_tool_sep"></div>
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" ${n("Tamaño (Enter para aplicar)",void 0,"bottom")} autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" ${n("Negrita",void 0,"bottom")}><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" ${n("Cursiva",void 0,"bottom")}><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" ${n("Subrayado",void 0,"bottom")}><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" ${n("Tachado",void 0,"bottom")}><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" ${n("Alinear Izquierda",void 0,"bottom")}><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" ${n("Centrar",void 0,"bottom")}><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" ${n("Alinear Derecha",void 0,"bottom")}><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" ${n("Justificar",void 0,"bottom")}><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" ${n("Viñetas",void 0,"bottom")}><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" ${n("Numeración",void 0,"bottom")}><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width:60px;" ${n("Interlineado",void 0,"bottom")}>
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div ${n("Color Texto",void 0,"bottom")} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div ${n("Color Resaltado",void 0,"bottom")} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
      </div>

      <!-- Metadata Group (Integrated in Ribbon) -->
      <div class="wd_tool_sep wd_meta_sep_main" style="display:none"></div>
      <div id="wd_meta" class="wd_tool_group wd_meta_group" style="display:none; padding: 0 1.5vh; gap: 2vh; border: none; background: transparent;">
        <span class="wd_meta_item" id="wd_meta_rel" ${n("Actividad reciente")}><i class="fas fa-clock"></i> <span>—</span></span>
        <span class="wd_meta_item" id="wd_meta_cre" ${n("Fecha de creación")}><i class="fas fa-calendar-plus"></i> <span>—</span></span>
        <span class="wd_meta_item" id="wd_meta_upd" ${n("Última edición")}><i class="fas fa-pen-nib"></i> <span>—</span></span>
      </div>
    </div>
  </header>

  <!-- WORKSPACE -->
  <div class="wd_workspace">
    <!-- SIDEBAR -->
    <aside id="wd_sidebar" class="wd_sidebar">
      <div class="wd_sb_actions_panel">
        <input type="text" id="wd_in_tit" class="wd_doc_title_sb" placeholder="Título del documento..." autocomplete="off">
        <div style="display:flex; gap:1vh; margin-top:1.5vh;">
          <button id="wd_btn_save" class="wd_btn_main" style="flex:1; justify-content:center;"><i class="fas fa-save"></i> Guardar</button>
          <button id="wd_btn_del" class="wd_btn_sec wd_btn_del_doc" ${n("Eliminar",void 0,"error")}><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      <div class="wd_sb_head">
        <h3 id="wd_saludo">Archivos</h3>
        <div style="display:flex; gap: 5px;">
          <button id="wd_btn_refresh" class="wd_sb_btn" style="display:none" ${n("Actualizar")}><i class="fas fa-rotate-right"></i></button>
          <button id="wd_btn_new" class="wd_sb_btn" ${n("Nuevo Documento")}><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div id="wd_sb_list" class="wd_sb_list">
        <div class="wd_skeleton"></div><div class="wd_skeleton"></div>
      </div>
    </aside>
    
    <!-- CANVAS -->
    <main class="wd_canvas">
      <div class="wd_page">
        <div id="wd_editor" class="wd_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false"></div>
      </div>
    </main>
  </div>
</div>`,y=async()=>{const{db:e}=await N(async()=>{const{db:i}=await import("./firebase-DBQLZhAw.js");return{db:i}},__vite__mapDeps([0]));return{db:e,...await N(()=>import("./firebase-D-ROeyul.js").then(i=>i.D),[])}},G=async e=>{const i=l.user;if(i?.email)try{const{db:s,doc:r,setDoc:u,serverTimestamp:w}=await y();await u(r(s,"word",e.id),{id:e.id,usuario:i.usuario||i.email,email:i.email,titulo:String(e.titulo||""),contenido:String(e.contenido||""),pin:!!e.pin,creado:w(),actualizado:w()})}catch(s){console.error("[word] guardarNube:",s)}},A=async e=>{const i=l.user;if(i?.email)try{const{db:s,doc:r,setDoc:u,serverTimestamp:w}=await y();await u(r(s,"word",e.id),{id:e.id,usuario:i.usuario||i.email,email:i.email,titulo:String(e.titulo||""),contenido:String(e.contenido||""),pin:!!e.pin,actualizado:w()},{merge:!0})}catch(s){console.error("[word] actualizarNube:",s)}},W=async e=>{if(l.user?.email)try{const{db:s,doc:r,deleteDoc:u}=await y();await u(r(s,"word",e))}catch{}},T=async()=>{const e=l.user;if(!e?.email)return null;try{const{db:i,collection:s,getDocs:r,query:u,where:w}=await y();return(await r(u(s(i,"word"),w("email","==",e.email)))).docs.map(b=>{const c=b.data();return{id:b.id,titulo:c.titulo||"",contenido:c.contenido||"",pin:!!c.pin,creado:c.creado?.toMillis?.()||Date.now(),actualizado:c.actualizado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},$=e=>{const i=document.createElement("div");return i.innerHTML=e||"",i.textContent||i.innerText||""},q=(e,i)=>{const s=$(e.contenido),r=s.length>50?s.substring(0,50)+"...":s||"Sin contenido...",u=e.id===i?"active":"",w=e.titulo||"Documento sin título";return`
    <div class="wd_doc_item ${u}${e.pin?" wd_pinned":""}" data-id="${e.id}">
      <div class="wd_doc_head">
        <h4>${w}</h4>
        <div class="wd_doc_acts">
          <button class="wd_act_pin${e.pin?" active":""}" data-id="${e.id}" ${n(e.pin?"Desanclar":"Fijar",void 0,"right")}><i class="fas fa-thumbtack"></i></button>
          <i class="fas ${e.synced?"fa-cloud wd_cloud_ok":"fa-cloud-arrow-up wd_cloud_pen"}" ${n(e.synced?"En nube":"Local",void 0,"right")}></i>
        </div>
      </div>
      <p>${r}</p>
    </div>`};let R=null,S=null;const B=async()=>{let e=f.get(),i=null,s=null;l.user&&o("#wd_saludo").text(`${k()}${l.user.nombre||l.user.usuario}`);const r=t=>{if(!l.user||!t){o("#wd_meta, .wd_meta_sep_main").hide();return}o("#wd_meta, .wd_meta_sep_main").css("display","flex"),o("#wd_meta_rel span").text(z(t.actualizado||t.creado)),o("#wd_meta_cre span").text(D(t.creado)),o("#wd_meta_upd span").text(D(t.actualizado))},u=t=>{clearInterval(S),!(!l.user||!t)&&(S=setInterval(()=>{o("#wd_meta_rel span").text(z(t.actualizado||t.creado))},6e4))},w=()=>o("#wd_sb_list").html('<div class="wd_skeleton"></div>'.repeat(3)),p=()=>[...e].sort((t,a)=>t.pin&&!a.pin?-1:!t.pin&&a.pin?1:(a.actualizado||0)-(t.actualizado||0)),b=async()=>{const t=p();await F("#wd_sb_list",t.length?t.map(a=>q(a,i?.id)).join(""):'<div class="wd_empty">No tienes documentos. Crea uno nuevo.</div>',80)},c=t=>{i=t,o("#wd_in_tit").val(t.titulo||""),o("#wd_editor").html(t.contenido||""),b(),r(t),u(t)},m=()=>{e=e.filter(a=>!a.id.startsWith("ej"));const t={id:M(),titulo:"",contenido:"",pin:!1,creado:Date.now(),actualizado:Date.now(),synced:!1};e.unshift(t),f.set(e),c(t),setTimeout(()=>{o("#wd_editor").focus(),document.execCommand("fontName",!1,"'Segoe UI', system-ui")},50)},x=()=>{if(!i)return;i.titulo=o("#wd_in_tit").val().trim(),i.contenido=o("#wd_editor").html(),i.actualizado=Date.now(),f.set(e);const t=o(`#wd_sb_list .wd_doc_item[data-id="${i.id}"]`);if(t.length){t.find("h4").text(i.titulo||"Documento sin título");const a=$(i.contenido);t.find("p").text(a.length>50?a.substring(0,50)+"...":a||"Sin contenido..."),t.find(".fa-cloud.wd_cloud_ok").removeClass("fa-cloud wd_cloud_ok").addClass("fa-cloud-arrow-up wd_cloud_pen").attr("data-witip","Local (Cambios sin guardar)")}},C=()=>{o(".wd_btn_tool[data-cmd]").each(function(){try{o(this).toggleClass("active",document.queryCommandState(o(this).data("cmd")))}catch{}});try{const t=window.getSelection();if(!t.anchorNode)return;const a=t.anchorNode.nodeType===3?t.anchorNode.parentNode:t.anchorNode;if(o(a).closest(".wd_editor").length){const d=window.getComputedStyle(a);if(d.fontSize&&o("#wd_f_sz").val(parseInt(d.fontSize)),d.fontFamily){const v=d.fontFamily.split(",")[0].replace(/['"]/g,"");o("#wd_f_fam option").filter(function(){return o(this).text()===v||o(this).val().includes(v)}).prop("selected",!0)}const _=o(a).closest("p, div, h1, h2, h3, h4, h5, h6, li");_.length&&_[0].style.lineHeight&&o("#wd_l_ht").val(_[0].style.lineHeight)}}catch{}};o(document).on("click.word","#wd_btn_menu",()=>o("#wd_sidebar").toggleClass("closed")).on("click.word","#wd_btn_new",m).on("click.word","#wd_btn_refresh",async function(){const t=o(this).find("i");if(t.hasClass("wd_spin"))return;t.addClass("wd_spin");const a=await T();a&&(e=a,f.set(e),e.length?c(p()[0]):m(),h("Sincronizado ✓","success")),t.removeClass("wd_spin")}).on("click.word",".wd_doc_item",function(t){if(o(t.target).closest(".wd_doc_acts").length)return;const a=e.find(d=>d.id===o(this).data("id"));a&&a.id!==i?.id&&c(a)}).on("click.word",".wd_btn_del_doc",function(){!i||!confirm("¿Eliminar este documento permanentemente?")||(e=e.filter(t=>t.id!==i.id),f.set(e),l.user&&i.synced&&W(i.id),h("Documento eliminado","success"),e.length?c(p()[0]):m())}).on("click.word","#wd_btn_save",function(){if(!i)return;x();const t=i.titulo||$(i.contenido).trim().length>0;if(l.user&&t){const a=o(this).find("i").removeClass("fa-save").addClass("fa-spinner wd_spin");(i.synced?A(i):G(i)).then(()=>{i.synced=!0,i.actualizado=Date.now(),f.set(e),o(`#wd_sb_list .wd_doc_item[data-id="${i.id}"] .fa-cloud-arrow-up`).removeClass("fa-cloud-arrow-up wd_cloud_pen").addClass("fa-cloud wd_cloud_ok").attr("data-witip","En nube"),r(i),a.removeClass("fa-spinner wd_spin").addClass("fa-save"),h("¡Guardado con éxito!","success")}).catch(()=>{a.removeClass("fa-spinner wd_spin").addClass("fa-save"),h("Error al guardar en la nube","error")})}else l.user&&!t?h("Agrega un título o contenido primero","warning"):h("Guardado localmente ✓","success")}).on("click.word",".wd_act_pin",function(t){t.stopPropagation();const a=o(this).data("id"),d=e.find(_=>_.id===a);d&&(d.pin=!d.pin,f.set(e),b(),l.user&&d.synced&&A(d))}).on("input.word","#wd_editor",()=>{C(),x()}).on("input.word","#wd_in_tit",x).on("mouseup.word keyup.word","#wd_editor",function(){C();const t=window.getSelection();t.rangeCount>0&&(s=t.getRangeAt(0))}).on("click.word",".wd_btn_tool[data-cmd]",function(t){t.preventDefault(),document.execCommand(o(this).data("cmd"),!1,null),C(),o("#wd_editor").focus()}).on("change.word","#wd_f_fam",function(){if(s){const t=window.getSelection();t.removeAllRanges(),t.addRange(s)}document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontName",!1,o(this).val()),o("#wd_editor").focus().trigger("input")}).on("keydown.word","#wd_f_sz",function(t){if(t.key!=="Enter")return;t.preventDefault();const a=Math.max(8,Math.min(100,parseInt(o(this).val())||16));if(o(this).val(a),s){const d=window.getSelection();d.removeAllRanges(),d.addRange(s)}document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontSize",!1,"7"),o('.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]').removeAttr("size").css("font-size",a+"px"),o("#wd_editor").focus().trigger("input")}).on("change.word","#wd_l_ht",function(){if(s){const a=window.getSelection();a.removeAllRanges(),a.addRange(s)}const t=window.getSelection();if(t.rangeCount){const d=t.getRangeAt(0).commonAncestorContainer,_=d.nodeType===3?d.parentNode:d;let v=o(_).hasClass("wd_editor")?o(_).children().filter(function(){return t.containsNode(this,!0)}):o(_).closest("p, div, h1, h2, h3, h4, h5, h6, li");!v.length&&o(_).hasClass("wd_editor")&&(v=o(_)),v.css("line-height",o(this).val())}o("#wd_editor").focus().trigger("input")}).on("input.word","#wd_c_txt",function(){document.execCommand("foreColor",!1,o(this).val()),o("#wd_editor").focus()}).on("input.word","#wd_c_bg",function(){document.execCommand("hiliteColor",!1,o(this).val()),o("#wd_editor").focus()}),E([".wd_ribbon",".wd_sidebar",".wd_page"],50),e.length?c(p()[0]):m(),R=l.on(async t=>{o("#wd_btn_refresh").toggle(!!t),t?(o("#wd_saludo").text(`${k()}${t.nombre||t.usuario}`),e.length===0&&w(),e=await T()||[],f.set(e),e.length?c(p()[0]):m()):(o("#wd_saludo").text("Archivos"),localStorage.removeItem(g),e=f.get(),e.length?c(p()[0]):m())}),console.log(`📝 ${I} ${j} · Word OK`)},K=()=>{o(document).off(".word"),clearInterval(S),R?.()};export{K as cleanup,B as init,V as render};
