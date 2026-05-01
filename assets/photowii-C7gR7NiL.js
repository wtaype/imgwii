import{j as a}from"./vendor-BOJxWFg6.js";import{b as oa,e as B}from"./index-DfI58Hqs.js";import{initCargaSistema as J,Historial as ra,cargarImagen as pa,canvasToBlob as K,estimarTamano as da,formatBytes as ca,descargarBlob as wa}from"./adevs-yWHJmN4O.js";const W=1200,H=720;let d={width:W,height:H,bg:"#ffffff",quality:80},$=!1,r=null,_=null,f=[],o=null,O=0,P="PhotoWii_Doc";const M=new ra(7);let z=null;const R=[{id:"webp",label:"WebP",ext:"webp",enabled:!0},{id:"jpeg",label:"JPEG",ext:"jpg",enabled:!0},{id:"png",label:"PNG",ext:"png",enabled:!1},{id:"avif",label:"AVIF",ext:"avif",enabled:!1}],aa={brightness:100,contrast:100,saturate:100,shadows:0,blur:0,hueRotate:0};let V=null,G=!1;async function ha(){return new Promise(t=>{const i=new Image;i.onload=()=>t(!0),i.onerror=()=>t(!1),i.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA=="})}const Ra=()=>`
  <div class="pw_container">
    <div class="pw_layout">
      <!-- ═══════════ LEFT PANEL (Controles) ═══════════ -->
      <aside class="pw_left">
        
        <!-- Card 1: Documento -->
        <div class="pw_card" id="pwCardDoc">
          <div class="pw_card_header">
            <i class="fas fa-file-alt"></i>
            <h3>Documento</h3>
            <button class="pw_btn pw_btn_outline" id="pwBtnSaveSize" title="Guardar Medida" style="padding: 0.5vh 1vh; font-size: var(--fz_s4);"><i class="fas fa-check"></i></button>
            <button class="pw_btn pw_btn_danger" id="pwBtnLimpiar" title="Limpiar Todo" style="padding: 0.5vh 1vh; font-size: var(--fz_s4); margin-left: 0.5vh;"><i class="fas fa-trash-alt"></i></button>
          </div>
          
          <div class="pw_saved_sizes" id="pwSavedSizesRow" style="display: flex; gap: 0.5vh; margin-bottom: 1.5vh; overflow-x: auto; padding-bottom: 0.5vh;"></div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <div class="pw_form_row" style="margin:0;">
              <label style="width: auto;">Ancho</label>
              <div class="pw_input_wrap">
                <input type="number" id="pwDocW" value="${W}" min="100" max="8000">
              </div>
            </div>
            <div class="pw_form_row" style="margin:0;">
              <label style="width: auto;">Alto</label>
              <div class="pw_input_wrap">
                <input type="number" id="pwDocH" value="${H}" min="100" max="8000">
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <label class="pw_radio_btn">
              <input type="radio" name="pw_bg" value="transparent">
              <span>Transparente</span>
              <div class="pw_bg_preview pw_bg_trans"></div>
              <div class="pw_radio_bg"></div>
            </label>
            <label class="pw_radio_btn">
              <input type="radio" name="pw_bg" value="color" checked>
              <input type="color" id="pwBgColor" value="#ffffff" style="width: 2.5vh; height: 2.5vh; border: none; padding: 0; cursor: pointer; border-radius: 50%;">
              <span>Color</span>
              <div class="pw_radio_bg"></div>
            </label>
          </div>

          <div class="pw_quality_wrap" style="margin-bottom: 1vh;">
            <label style="font-size: var(--fz_s3); font-weight: 600; color: var(--tx); white-space:nowrap;"><i class="fas fa-sliders-h"></i> Calidad</label>
            <input type="range" id="pwQuality" min="10" max="100" value="80">
            <div class="pw_quality_num_wrap"><input type="number" id="pwQualityTxt" value="80"></div>
          </div>

          <div class="pw_fmt_toggles" id="pwFmtToggles" style="margin-top:0; padding-top:0; border:none;">
            <div class="pw_toggles_row" id="pwTogglesRow"></div>
          </div>
        </div>

        <!-- Card 2: Imágenes y Capas -->
        <div class="pw_card" id="pwCardCapas" style="opacity: 0.5; pointer-events: none;">
          <div class="pw_card_header">
            <i class="fas fa-layer-group"></i>
            <h4>Capas</h4>
            <button class="pw_btn pw_btn_outline" id="pwBtnAdd" style="padding: 0.5vh 1vh; font-size: var(--fz_s4);">
              <i class="fas fa-plus"></i> Img
            </button>
          </div>
          <input type="file" id="pwFileInput" accept="image/*" multiple hidden>
          
          <div class="pw_layers_container" id="pwLayerList">
            <!-- Capas dinámicas -->
          </div>
        </div>

        <!-- Card 4: Ajuste Color -->
        <div class="pw_card" id="pwCardColor" style="display:none;">
          <div class="pw_card_header">
            <i class="fas fa-palette"></i>
            <h4>Ajuste de Color</h4>
            <button class="pw_btn pw_btn_outline" id="pwResetFiltros" style="padding: 0.4vh 1vh; font-size: var(--fz_s4);" title="Resetear ajustes"><i class="fas fa-undo"></i></button>
          </div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-sun"></i> Brillo</label><span class="pw_filter_val" id="val_brightness">100</span></div><input type="range" id="f_brightness" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-adjust"></i> Contraste</label><span class="pw_filter_val" id="val_contrast">100</span></div><input type="range" id="f_contrast" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-palette"></i> Saturación</label><span class="pw_filter_val" id="val_saturate">100</span></div><input type="range" id="f_saturate" min="0" max="200" value="100"></div>
          <div class="pw_filter"><div class="pw_filter_top"><label><i class="fas fa-moon"></i> Sombras</label><span class="pw_filter_val" id="val_shadows">0</span></div><input type="range" id="f_shadows" min="-100" max="100" value="0"></div>
        </div>

        <!-- Card 3: Capa Activa (Transformar Capa) -->
        <div class="pw_card" id="pwCardCapaActiva" style="display:none;">
          <div class="pw_card_header">
            <i class="fas fa-sliders-h"></i>
            <h4>Transformar Capa</h4>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1vh; margin-bottom: 1.5vh;">
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">X</label><div class="pw_input_wrap"><input type="number" id="pwCapaX"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">Y</label><div class="pw_input_wrap"><input type="number" id="pwCapaY"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">W</label><div class="pw_input_wrap"><input type="number" id="pwCapaW"></div></div>
            <div class="pw_form_row" style="margin:0;"><label style="width:auto;margin-right:1vh;">H</label><div class="pw_input_wrap"><input type="number" id="pwCapaH"></div></div>
          </div>
          
          <div class="pw_quality_wrap" style="margin-bottom:0;">
            <label style="font-size: var(--fz_s3); font-weight: 600; color: var(--tx); width: 4vh;"><i class="fas fa-eye"></i></label>
            <input type="range" id="pwCapaOp" min="0" max="100" value="100">
            <div class="pw_quality_num_wrap"><input type="text" id="pwCapaOpTxt" value="100" readonly></div>
          </div>
        </div>

      </aside>

      <!-- ═══════════ RIGHT PANEL (Stage & Export) ═══════════ -->
      <div class="pw_right">
        
        <!-- Toolbar -->
        <div class="pw_toolbar" id="pwToolbar" style="display:none;">
          <div class="pw_tool_group">
            <button id="pwBtnUndo" disabled title="Deshacer (Max 7)"><i class="fas fa-undo"></i> <span>Atrás</span></button>
            <button id="pwBtnRedo" disabled title="Rehacer"><i class="fas fa-redo"></i></button>
          </div>
          <div class="pw_tool_sep"></div>
          <div class="pw_tool_group">
            <button id="pwBtnCrop" title="Recortar Documento"><i class="fas fa-crop-simple"></i> <span>Recortar</span></button>
            <button id="pwBtnRotL" title="Rotar Capa Activa"><i class="fas fa-rotate-left"></i></button>
            <button id="pwBtnRotR" title="Rotar Capa Activa"><i class="fas fa-rotate-right"></i></button>
            <button id="pwBtnFlipH" title="Voltear H"><i class="fas fa-arrows-alt-h"></i></button>
            <button id="pwBtnFlipV" title="Voltear V"><i class="fas fa-arrows-alt-v"></i></button>
          </div>
          <div class="pw_doc_dim_badge" id="pwDocDimBadge">${W} × ${H}</div>
        </div>

        <!-- Crop Bar -->
        <div class="pw_crop_bar" id="pwCropBar" style="display:none;">
          <div style="display:flex; align-items:center; gap: 1vh;">
            <button class="pw_ratio_btn active" data-r="0">Libre</button>
            <button class="pw_ratio_btn" data-r="1">1:1</button>
            <button class="pw_ratio_btn" data-r="1.7777">16:9</button>
            <button class="pw_ratio_btn" data-r="0.5625">9:16</button>
          </div>
          <div style="display:flex; gap: 0.8vh;">
            <button class="pw_btn pw_btn_outline" id="pwCropCancel" style="padding: 0.5vh 1vh;">Cancelar</button>
            <button class="pw_btn pw_btn_primary" id="pwCropApply" style="padding: 0.5vh 1vh;"><i class="fas fa-check"></i> Aplicar</button>
          </div>
        </div>

        <!-- Stage Area -->
        <div class="pw_stage_area" id="pwDropzone">
          <div class="pw_placeholder" id="pwPlaceholder">
            <i class="fas fa-file-signature"></i>
            <h2>Crea tu Documento</h2>
            <p>Configura las dimensiones a la izquierda y presiona Crear.</p>
          </div>

          <div class="pw_stage_scroll" id="pwStageScroll" style="display:none;">
            <div class="pw_stage_inner" id="pwStageInner">
              <canvas id="pwDocCanvas"></canvas>
              <div class="pw_layers_div" id="pwLayersDiv"></div>
              
              <!-- Crop Overlay -->
              <div id="pwCropOverlay" class="pw_crop_overlay" style="display:none;">
                <div id="pwCropArea" class="pw_crop_area">
                  <div class="pw_crop_handle pw_lh_nw" data-h="nw"></div>
                  <div class="pw_crop_handle pw_lh_n" data-h="n"></div>
                  <div class="pw_crop_handle pw_lh_ne" data-h="ne"></div>
                  <div class="pw_crop_handle pw_lh_e" data-h="e"></div>
                  <div class="pw_crop_handle pw_lh_se" data-h="se"></div>
                  <div class="pw_crop_handle pw_lh_s" data-h="s"></div>
                  <div class="pw_crop_handle pw_lh_sw" data-h="sw"></div>
                  <div class="pw_crop_handle pw_lh_w" data-h="w"></div>
                  <div class="pw_crop_dims" id="pwCropDims">100 x 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjetas de formatos (ConvertirPro Style) -->
        <div class="pw_formats_row" id="pwFormatsRow" style="display:none;">
          <!-- Generadas dinámicamente -->
        </div>

      </div>
    </div>
  </div>
`,Ia=async()=>{if(console.log(`✅ PhotoWii de ${oa} cargado`),await ha()){const t=R.find(i=>i.id==="avif");t&&(t.supported=!0)}else{const t=R.findIndex(i=>i.id==="avif");t!==-1&&R.splice(t,1)}sa(),Y(),a("#pwBtnSaveSize").on("click",va),a("#pwBtnLimpiar").on("click",xa),a("#pwSavedSizesRow").on("click",".pw_saved_size_btn",function(){a("#pwDocW").val(a(this).data("w")),a("#pwDocH").val(a(this).data("h")).trigger("input")}),a("#pwSavedSizesRow").on("click",".pw_saved_size_clear",function(){localStorage.removeItem("miswids"),Y(),B("Medidas eliminadas","info")}),a("#pwDocW, #pwDocH").on("input",function(){$&&(d.width=parseInt(a("#pwDocW").val())||800,d.height=parseInt(a("#pwDocH").val())||600,ta(d.width,d.height))}),a('input[name="pw_bg"], #pwBgColor').on("change input",function(t){if($){const i=a('input[name="pw_bg"]:checked').val();d.bg=i==="color"?a("#pwBgColor").val():"transparent",u(),t.type==="change"&&b()}}),a("#pwBtnAdd").on("click",()=>a("#pwFileInput").trigger("click")),a("#pwFileInput").on("change",t=>{t.target.files.length&&X(Array.from(t.target.files)),t.target.value=""}),z=J({dropSel:"#pwDropzone",fileSel:"#pwFileInput",clickSel:null,onFile:t=>X([t]),namespace:"pw"}),a("#pwQuality").on("input",function(){const t=a(this).val();a("#pwQualityTxt").val(t),d.quality=parseInt(t),I()}),a("#pwQualityTxt").on("input",function(){let t=Math.min(100,Math.max(10,parseInt(a(this).val())||80));a(this).val(t),a("#pwQuality").val(t),d.quality=t,I()}),a("#pwTogglesRow").on("click",".pw_toggle_btn",function(){ma(a(this).data("fmt"))}),a("#pwFormatsRow").on("click",".pw_fmt_btn_dl",function(){Aa(a(this).data("fmt"),this)}),a("#pwCapaX, #pwCapaY, #pwCapaW, #pwCapaH").on("change",ua),a("#pwCapaOp").on("input",function(){a("#pwCapaOpTxt").val(a(this).val()+"%"),o&&(o.opacity=parseInt(a(this).val())/100,u())}).on("change",()=>b()),["brightness","contrast","saturate","shadows"].forEach(t=>{a(`#f_${t}`).on("input",function(){o&&(o.filtros[t]=parseInt(a(this).val()),a(`#val_${t}`).text(o.filtros[t]),u())}).on("change",()=>b())}),a("#pwResetFiltros").on("click",()=>{o&&(o.filtros={...aa},F(o.id),u(),b())}),a("#pwBtnUndo").on("click",ya),a("#pwBtnRedo").on("click",Ca),a("#pwBtnRotL").on("click",()=>N(-90)),a("#pwBtnRotR").on("click",()=>N(90)),a("#pwBtnFlipH").on("click",()=>{o&&(o.flipH*=-1,u(),b())}),a("#pwBtnFlipV").on("click",()=>{o&&(o.flipV*=-1,u(),b())}),ga(),_a(),fa()};function Y(){const t=JSON.parse(localStorage.getItem("miswids")||"[]"),i=a("#pwSavedSizesRow");if(t.length===0){i.empty();return}let e="";t.forEach(s=>{e+=`<button class="pw_saved_size_btn" data-w="${s.w}" data-h="${s.h}" title="Aplicar" style="white-space:nowrap; padding: 0.4vh 1vh; font-size: var(--fz_s4); border-radius: 10vh; background: var(--bg1); border: 1.5px solid var(--bg5); color: var(--tx); cursor: pointer; transition: border-color 0.2s;">${s.w} × ${s.h}</button>`}),e+='<button class="pw_saved_size_clear" title="Borrar guardados" style="padding: 0.4vh 1vh; font-size: var(--fz_s4); border-radius: 10vh; background: transparent; border: 1.5px solid var(--error); color: var(--error); cursor: pointer;"><i class="fas fa-times"></i></button>',i.html(e)}function va(){const t=parseInt(a("#pwDocW").val()),i=parseInt(a("#pwDocH").val());if(!t||!i||t<10||i<10)return B("Medida inválida","error");let e=JSON.parse(localStorage.getItem("miswids")||"[]");e.some(s=>s.w===t&&s.h===i)?B("Esta medida ya está guardada","info"):(e.unshift({w:t,h:i}),e.length>6&&e.pop(),localStorage.setItem("miswids",JSON.stringify(e)),Y(),B("Medida guardada","success"))}function fa(){const t=parseInt(a("#pwDocW").val())||800,i=parseInt(a("#pwDocH").val())||600,s=a('input[name="pw_bg"]:checked').val()==="color"?a("#pwBgColor").val():"transparent";if(t<10||i<10||t>8e3||i>8e3)return B("Dimensiones inválidas","error");d.width=t,d.height=i,d.bg=s,r=document.getElementById("pwDocCanvas"),_=r.getContext("2d",{willReadFrequently:!0}),r.width=t,r.height=i,$=!0,f=[],o=null,M.reset(),a("#pwPlaceholder").hide(),a("#pwStageScroll, #pwToolbar, #pwFormatsRow").fadeIn(300),a("#pwCardCapas, #pwCardExport").css({opacity:1,pointerEvents:"all"}),a("#pwBtnLimpiar").prop("disabled",!1),j(),u(),b(),I()}function ta(t,i){r.width=t,r.height=i,j(),u(),b()}function j(){a("#pwDocDimBadge").text(`${r.width} × ${r.height}`),a("#pwDocW").val(r.width),a("#pwDocH").val(r.height)}async function X(t){if(!$)return B("Primero crea el documento","warning");for(let i of t)try{const e=await pa(i);O++;const s={id:`layer_${O}`,img:e.img,file:i,name:e.name,w:e.width,h:e.height,x:0,y:0,opacity:1,visible:!0,rotate:0,flipH:1,flipV:1,filtros:{...aa}};f.length===0&&(P=i.name.replace(/\.[^/.]+$/,""));const n=Math.min(d.width/s.w,d.height/s.h,1);n<1&&(s.w=Math.round(s.w*n),s.h=Math.round(s.h*n)),s.x=Math.round((d.width-s.w)/2),s.y=Math.round((d.height-s.h)/2),f.push(s),ia(s),F(s.id)}catch(e){console.error("Error capa:",e)}T(),u(),b(),I()}function ia(t){const i=`
    <div class="pw_layer_dom" id="dom_${t.id}" data-id="${t.id}">
      <img src="${t.img.src}" draggable="false">
      <div class="pw_layer_handle pw_lh_nw" data-h="nw"></div>
      <div class="pw_layer_handle pw_lh_n" data-h="n"></div>
      <div class="pw_layer_handle pw_lh_ne" data-h="ne"></div>
      <div class="pw_layer_handle pw_lh_e" data-h="e"></div>
      <div class="pw_layer_handle pw_lh_se" data-h="se"></div>
      <div class="pw_layer_handle pw_lh_s" data-h="s"></div>
      <div class="pw_layer_handle pw_lh_sw" data-h="sw"></div>
      <div class="pw_layer_handle pw_lh_w" data-h="w"></div>
    </div>
  `;a("#pwLayersDiv").append(i),E(t)}function E(t){const i=a(`#dom_${t.id}`);if(i.length){if(!t.visible){i.hide();return}i.show().css({left:t.x+"px",top:t.y+"px",width:t.w+"px",height:t.h+"px",zIndex:f.indexOf(t)})}}function T(){const t=a("#pwLayerList").empty();for(let i=f.length-1;i>=0;i--){const e=f[i],s=o&&o.id===e.id,n=e.visible?"fa-eye":"fa-eye-slash hidden";t.append(`
      <div class="pw_layer_item ${s?"active":""}" data-id="${e.id}">
        <i class="fas ${n} pw_layer_eye"></i>
        <img src="${e.img.src}" class="pw_layer_thumb">
        <span class="pw_layer_name">${e.name}</span>
        <i class="fas fa-times pw_layer_del" title="Eliminar"></i>
      </div>
    `)}}a("#pwLayerList").on("click",".pw_layer_item",function(t){const i=a(this).data("id");if(a(t.target).hasClass("pw_layer_eye")){const e=f.find(s=>s.id===i);e&&(e.visible=!e.visible,E(e),u(),T());return}if(a(t.target).hasClass("pw_layer_del")){f=f.filter(e=>e.id!==i),a(`#dom_${i}`).remove(),o&&o.id===i&&F(null),u(),T(),b(),I();return}F(i)});function F(t){if(o=f.find(i=>i.id===t)||null,a(".pw_layer_dom").removeClass("pw_active"),a("#pwCardColor, #pwCardCapaActiva").hide(),o){a(`#dom_${t}`).addClass("pw_active"),a("#pwCardCapaActiva, #pwCardColor").fadeIn(200),a("#pwCapaX").val(o.x),a("#pwCapaY").val(o.y),a("#pwCapaW").val(o.w),a("#pwCapaH").val(o.h),a("#pwCapaOp").val(o.opacity*100),a("#pwCapaOpTxt").val(Math.round(o.opacity*100)+"%");const i=o.filtros;a("#f_brightness").val(i.brightness),a("#val_brightness").text(i.brightness),a("#f_contrast").val(i.contrast),a("#val_contrast").text(i.contrast),a("#f_saturate").val(i.saturate),a("#val_saturate").text(i.saturate),a("#f_shadows").val(i.shadows),a("#val_shadows").text(i.shadows)}T()}function ua(){o&&(o.x=parseInt(a("#pwCapaX").val())||0,o.y=parseInt(a("#pwCapaY").val())||0,o.w=parseInt(a("#pwCapaW").val())||10,o.h=parseInt(a("#pwCapaH").val())||10,E(o),u(),b())}function N(t){o&&(o.rotate=(o.rotate+t)%360,u(),b())}function _a(){let t=!1,i=!1,e,s,n,p,l,c=null;function C(){return r?r.width/r.getBoundingClientRect().width:1}a("#pwLayersDiv").on("mousedown touchstart",".pw_layer_dom",function(h){if(G)return;const x=a(this).data("id");if(l=f.find(w=>w.id===x),!l)return;F(x),a(h.target).hasClass("pw_layer_handle")?(i=!0,p=a(h.target).data("h")):t=!0;const A=h.touches?h.touches[0]:h;e=A.clientX,s=A.clientY,n={x:l.x,y:l.y,w:l.w,h:l.h},h.preventDefault(),h.stopPropagation()}),a(window).on("mousemove.pw touchmove.pw",function(h){if(!t&&!i||!l)return;const x=h.touches?h.touches[0]:h,A=C(),w=(x.clientX-e)*A,v=(x.clientY-s)*A;if(t)l.x=Math.round(n.x+w),l.y=Math.round(n.y+v);else if(i){let g=n.w,m=n.h,k=n.x,L=n.y;const Q=n.w/n.h;if(p.includes("e")&&(g=Math.max(10,n.w+w)),p.includes("s")&&(m=Math.max(10,n.h+v)),p.includes("w")){const S=Math.min(w,n.w-10);g=n.w-S,k=n.x+S}if(p.includes("n")){const S=Math.min(v,n.h-10);m=n.h-S,L=n.y+S}if(p.length===2){const S=Math.abs(g-n.w),la=Math.abs(m-n.h);S>la?m=g/Q:g=m*Q,m=Math.max(10,m),g=Math.max(10,g),p.includes("w")&&(k=n.x+(n.w-g)),p.includes("n")&&(L=n.y+(n.h-m))}l.w=Math.round(g),l.h=Math.round(m),l.x=Math.round(k),l.y=Math.round(L)}E(l),a("#pwCapaX").val(l.x),a("#pwCapaY").val(l.y),a("#pwCapaW").val(l.w),a("#pwCapaH").val(l.h),c&&cancelAnimationFrame(c),c=requestAnimationFrame(()=>u())}).on("mouseup.pw touchend.pw",function(){(t||i)&&(c&&(cancelAnimationFrame(c),c=null),u(),b(),I()),t=!1,i=!1,l=null})}function u(){!$||!_||(_.clearRect(0,0,r.width,r.height),d.bg!=="transparent"&&(_.fillStyle=d.bg,_.fillRect(0,0,r.width,r.height)),f.forEach(t=>{if(!t.visible)return;_.save(),_.globalAlpha=t.opacity,_.translate(t.x+t.w/2,t.y+t.h/2),_.rotate(t.rotate*Math.PI/180),_.scale(t.flipH,t.flipV);const i=t.filtros;_.filter=`brightness(${i.brightness}%) contrast(${i.contrast}%) saturate(${i.saturate}%) blur(${i.blur}px) hue-rotate(${i.hueRotate}deg)`;const e=t.rotate%180!==0?t.h:t.w,s=t.rotate%180!==0?t.w:t.h;_.drawImage(t.img,-e/2,-s/2,e,s),_.restore(),i.shadows}),f.forEach(E))}let y=null,D=0;function ga(){y=a("#pwCropArea"),a("#pwBtnCrop").on("click",()=>{$&&(G=!0,a("#pwCropOverlay, #pwCropBar").fadeIn(200),a("#pwToolbar").hide(),a(".pw_layer_dom").css("pointer-events","none"),U())}),a(".pw_ratio_btn").on("click",function(){a(".pw_ratio_btn").removeClass("active"),a(this).addClass("active"),D=parseFloat(a(this).data("r")),U()}),a("#pwCropCancel").on("click",Z),a("#pwCropApply").on("click",()=>{const l=r.getBoundingClientRect(),c=y[0].getBoundingClientRect(),C=r.width/l.width,h=Math.round((c.left-l.left)*C),x=Math.round((c.top-l.top)*C),A=Math.round(c.width*C),w=Math.round(c.height*C);_.getImageData(h,x,A,w),d.width=A,d.height=w,ta(A,w),f.forEach(v=>{v.x-=h,v.y-=x}),u(),b(),Z()});let t=!1,i=!1,e,s,n,p;y.on("mousedown touchstart",l=>{a(l.target).hasClass("pw_crop_handle")?(i=!0,p=a(l.target).data("h")):t=!0;const c=l.touches?l.touches[0]:l;e=c.clientX,s=c.clientY,n={left:y[0].offsetLeft,top:y[0].offsetTop,width:y.width(),height:y.height()},l.preventDefault()}),a(window).on("mousemove touchmove",l=>{if(!t&&!i)return;const c=l.touches?l.touches[0]:l,C=c.clientX-e,h=c.clientY-s,x=a("#pwCropOverlay").width(),A=a("#pwCropOverlay").height();if(t){let w=n.left+C,v=n.top+h;w=Math.max(0,Math.min(w,x-n.width)),v=Math.max(0,Math.min(v,A-n.height)),y.css({left:w,top:v})}else if(i){let w=n.width,v=n.height,g=n.left,m=n.top;p.includes("e")&&(w+=C),p.includes("s")&&(v+=h),p.includes("w")&&(w-=C,g+=C),p.includes("n")&&(v-=h,m+=h),D>0&&(p.includes("e")||p.includes("w")?v=w/D:w=v*D),w>50&&v>50&&g>=0&&m>=0&&g+w<=x&&m+v<=A&&y.css({width:w,height:v,left:g,top:m})}ea()}).on("mouseup touchend",()=>{t=!1,i=!1})}function U(){const t=a("#pwCropOverlay").width(),i=a("#pwCropOverlay").height();let e=t*.8,s=i*.8;D>0&&(t/i>D?e=s*D:s=e/D),y.css({width:e,height:s,left:(t-e)/2,top:(i-s)/2}),ea()}function ea(){const t=r.getBoundingClientRect(),i=r.width/t.width,e=Math.round(y.width()*i),s=Math.round(y.height()*i);a("#pwCropDims").text(`${e} × ${s}`)}function Z(){G=!1,a("#pwCropOverlay, #pwCropBar").hide(),a("#pwToolbar").fadeIn(200),a(".pw_layer_dom").css("pointer-events","all")}function sa(){let t="";R.forEach(i=>{if(i.id==="avif"&&!i.supported)return;const e=i.enabled?"pw_toggle_on":"pw_toggle_off",s=i.enabled?"fa-check-circle":"fa-circle";t+=`<div class="pw_toggle_btn ${e}" data-fmt="${i.id}"><i class="fas ${s}"></i> ${i.label}</div>`}),a("#pwTogglesRow").html(t),ba()}function ma(t){const i=R.find(e=>e.id===t);i&&(i.enabled=!i.enabled,sa(),I())}function ba(){const t=a("#pwFormatsRow"),i=R.filter(s=>s.enabled);if(i.length===0){t.html('<div style="text-align:center; padding:2vh;">Selecciona formato a exportar.</div>');return}let e="";i.forEach(s=>{e+=`
      <div class="pw_fmt_card" id="pwCard_${s.id}">
        <div class="pw_fmt_top">
          <div class="pw_fmt_left">
            <span class="pw_fmt_label">${s.label}</span>
            <span class="pw_fmt_size" id="pwSize_${s.id}">--</span>
          </div>
          <button class="pw_fmt_btn_dl" data-fmt="${s.id}" disabled>Descargar <i class="fas fa-download"></i></button>
        </div>
        <div class="pw_fmt_bar_wrap"><div class="pw_fmt_bar" id="pwBar_${s.id}"></div></div>
        <div class="pw_fmt_savings" id="pwSav_${s.id}" style="display:none;"></div>
      </div>
    `}),t.html(e)}function I(){clearTimeout(V),!(!$||!r)&&(a("#pwFormatsRow .pw_fmt_size").html('<i class="fas fa-spinner fa-spin"></i>'),a("#pwFormatsRow .pw_fmt_btn_dl").prop("disabled",!0),V=setTimeout(async()=>{const t=R.filter(e=>e.enabled);let i=0;try{i=(await K(r,"image/png")).size}catch{}t.forEach(e=>{const s=e.id==="png"?void 0:d.quality/100;da(r,`image/${e.id}`,s,n=>{if(!n){a(`#pwSize_${e.id}`).text("Error");return}a(`#pwSize_${e.id}`).text(ca(n,!0)),a(`#pwCard_${e.id} .pw_fmt_btn_dl`).prop("disabled",!1);const p=a(`#pwSav_${e.id}`);if(i>0&&e.id!=="png"){const l=i-n,c=Math.round(l/i*100);c>0?p.html(`<i class="fas fa-arrow-down"></i> -${c}%`).removeClass("pw_savings_up").addClass("pw_savings_dn").show():c<0?p.html(`<i class="fas fa-arrow-up"></i> +${Math.abs(c)}%`).removeClass("pw_savings_dn").addClass("pw_savings_up").show():p.hide()}else p.hide()})})},500))}async function Aa(t,i){const e=R.find(p=>p.id===t);if(!e)return;const s=a(i),n=s.html();s.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i>');try{const p=e.id==="png"?void 0:d.quality/100,l=await K(r,`image/${e.id}`,p),c=`${P}.${e.ext}`;wa(l,c),B(`¡${e.label} descargado!`,"success")}catch{B("Error al exportar","error")}finally{s.prop("disabled",!1).html(n)}}function b(t){if(!$)return;const i={w:d.width,h:d.height,bg:d.bg,capas:f.map(e=>({...e,filtros:{...e.filtros}}))};M.guardar(i),q()}function ya(){const t=M.undo();t&&na(t),q()}function Ca(){const t=M.redo();t&&na(t),q()}function na(t){d.width=t.w,d.height=t.h,d.bg=t.bg,r.width=t.w,r.height=t.h,j(),a('input[name="pw_bg"][value="'+(t.bg==="transparent"?"transparent":"color")+'"]').prop("checked",!0),t.bg!=="transparent"&&a("#pwBgColor").val(t.bg),f=t.capas.map(i=>({...i,filtros:{...i.filtros}})),a("#pwLayersDiv").empty(),f.forEach(ia),o?F(o.id):T(),u(),I()}function q(){a("#pwBtnUndo").prop("disabled",!M.canUndo()),a("#pwBtnRedo").prop("disabled",!M.canRedo())}function xa(){z&&z(),$=!1,r=null,_=null,f=[],o=null,O=0,P="PhotoWii_Doc",M.reset(),a("#pwLayersDiv").empty(),a("#pwStageScroll, #pwToolbar, #pwFormatsRow").hide(),a("#pwPlaceholder").show(),a("#pwCardCapas, #pwCardExport").css({opacity:.5,pointerEvents:"none"}),a("#pwCardCapaActiva, #pwCardColor").hide(),a("#pwBtnLimpiar").prop("disabled",!0),a("#pwFileInput").val(""),B("Documento cerrado","info"),z=J({dropSel:"#pwDropzone",fileSel:"#pwFileInput",clickSel:null,onFile:t=>X([t]),namespace:"pw"})}const Sa=()=>{z&&z(),a("#pwBtnCrear, #pwBtnLimpiar, #pwBtnAdd, #pwBtnCrop, #pwCropCancel, #pwCropApply, #pwBtnExport").off(),a("#pwTogglesRow, #pwFormatsRow, #pwLayerList, #pwLayersDiv").off(),a('input[type="range"], input[type="number"], input[type="radio"]').off(),a(window).off("mousemove touchmove mouseup touchend")};export{Sa as cleanup,Ia as init,Ra as render};
