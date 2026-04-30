import{j as e}from"./vendor-BOJxWFg6.js";import{b as L,e as F}from"./index-BawKnUft.js";import{initCargaSistema as N,Historial as U,canvasToBlob as X,baseName as Z,descargarBlob as K,estimarTamano as J,formatBytes as W,cargarImagen as ee}from"./adevs-ELdnDJ-h.js";let d=null,n=null,c=null,R=null,H=null;const C=new U(7);let I=null;const w=[{id:"webp",label:"WebP",ext:"webp",enabled:!0},{id:"jpeg",label:"JPEG",ext:"jpg",enabled:!0},{id:"png",label:"PNG",ext:"png",enabled:!1},{id:"avif",label:"AVIF",ext:"avif",enabled:!1}],E={brightness:100,contrast:100,saturate:100,shadows:0,blur:0,hueRotate:0},k={rotate:0,flipH:1,flipV:1};let u={...E},f={...k},D=80,j=null,te=500;async function ae(){return new Promise(t=>{const a=new Image;a.onload=()=>t(!0),a.onerror=()=>t(!1),a.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA=="})}const _e=()=>`
  <div class="epro_container">
    <div class="epro_layout">

      <!-- ═══════════ LEFT PANEL (27%) — Controles ═══════════ -->
      <aside class="epro_left">

        <!-- Card 1: Acciones de edición -->
        <div class="epro_card epro_config">
          <div class="epro_card_header">
            <i class="fas fa-wand-magic-sparkles"></i>
            <h3>Editor Pro</h3>
          </div>

          <!-- Calidad -->
          <div class="epro_quality_row">
            <label for="expQualTxt"><i class="fas fa-sliders-h"></i> Calidad</label>
            <div class="epro_quality_wrap">
              <input type="range" id="expQual" min="10" max="100" value="80">
              <div class="epro_quality_num_wrap">
                <input type="text" id="expQualTxt" value="80">
                <span class="epro_unit">%</span>
              </div>
            </div>
          </div>

          <!-- Botones acción -->
          <div class="epro_actions">
            <button class="epro_btn epro_btn_select" id="eproBtnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="epro_btn epro_btn_delete" id="eproBtnReset" title="Limpiar área de trabajo">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>

          <!-- Toggles de formato -->
          <div class="epro_fmt_toggles" id="eproFmtToggles">
            <span class="epro_toggles_lbl"><i class="fas fa-layer-group"></i> Formatos a exportar:</span>
            <div class="epro_toggles_row" id="eproTogglesRow">
              <!-- Generados dinámicamente -->
            </div>
          </div>

          <input type="file" id="eproFileInput" accept="image/*" hidden>
        </div>

        <!-- Card 2: Ajuste de Color (siempre visible) -->
        <div class="epro_card">
          <div class="epro_card_header">
            <i class="fas fa-palette"></i>
            <h4>Ajuste de Color</h4>
            <button class="epro_reset_filters" id="eproResetFiltros" title="Resetear ajustes"><i class="fas fa-undo"></i></button>
          </div>

          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-sun"></i> Brillo</label><span class="epro_filter_val" id="val_brightness">100</span></div>
            <input type="range" id="f_brightness" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-adjust"></i> Contraste</label><span class="epro_filter_val" id="val_contrast">100</span></div>
            <input type="range" id="f_contrast" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-palette"></i> Saturación</label><span class="epro_filter_val" id="val_saturate">100</span></div>
            <input type="range" id="f_saturate" min="0" max="200" value="100">
          </div>
          <div class="epro_filter">
            <div class="epro_filter_top"><label><i class="fas fa-moon"></i> Sombras</label><span class="epro_filter_val" id="val_shadows">0</span></div>
            <input type="range" id="f_shadows" min="-100" max="100" value="0">
          </div>

          <div class="epro_adv_toggle" id="eproAdvToggle"><span>Avanzados</span> <i class="fas fa-chevron-down"></i></div>
          <div class="epro_filters_adv" id="eproAdvFilters" style="display:none;">
            <div class="epro_filter">
              <div class="epro_filter_top"><label><i class="fas fa-droplet"></i> Desenfoque</label><span class="epro_filter_val" id="val_blur">0</span></div>
              <input type="range" id="f_blur" min="0" max="20" value="0">
            </div>
            <div class="epro_filter">
              <div class="epro_filter_top"><label><i class="fas fa-rainbow"></i> Tono</label><span class="epro_filter_val" id="val_hueRotate">0</span></div>
              <input type="range" id="f_hueRotate" min="0" max="360" value="0">
            </div>
          </div>
        </div>


      </aside>

      <!-- ═══════════ RIGHT PANEL (72%) — Canvas + Exportación ═══════════ -->
      <div class="epro_right">

        <!-- Toolbar de edición (oculto hasta que haya imagen) -->
        <div class="epro_toolbar" id="eproToolbar" style="display:none;">
          <div class="epro_tool_group">
            <button id="eproBtnUndo" disabled title="Deshacer (Max 3)"><i class="fas fa-undo"></i> <span>Atrás</span></button>
            <button id="eproBtnRedo" disabled title="Rehacer"><i class="fas fa-redo"></i></button>
          </div>
          <div class="epro_tool_sep"></div>
          <div class="epro_tool_group">
            <button id="eproBtnCrop" title="Recortar"><i class="fas fa-crop-simple"></i> <span>Recortar</span></button>
            <button id="eproBtnRotL" title="Rotar Izquierda"><i class="fas fa-rotate-left"></i></button>
            <button id="eproBtnRotR" title="Rotar Derecha"><i class="fas fa-rotate-right"></i></button>
            <button id="eproBtnFlipH" title="Voltear Horizontal"><i class="fas fa-arrows-alt-h"></i></button>
            <button id="eproBtnFlipV" title="Voltear Vertical"><i class="fas fa-arrows-alt-v"></i></button>
          </div>
        </div>

        <!-- Zona de Drop + Canvas -->
        <div class="epro_canvas_area" id="eproDropzone">
          <div class="epro_placeholder" id="eproPlaceholder">
            <i class="fas fa-magic"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, WEBP, AVIF (máx 50MB)</small>
          </div>

          <div class="epro_canvas_wrap" id="eproCanvasWrap" style="display:none;">
            <canvas id="eproCanvas"></canvas>
            <div id="eproCropOverlay" class="epro_crop_overlay" style="display:none;">
              <div id="eproCropArea" class="epro_crop_area">
                <div class="epro_crop_handle epro_h_nw" data-h="nw"></div>
                <div class="epro_crop_handle epro_h_n" data-h="n"></div>
                <div class="epro_crop_handle epro_h_ne" data-h="ne"></div>
                <div class="epro_crop_handle epro_h_e" data-h="e"></div>
                <div class="epro_crop_handle epro_h_se" data-h="se"></div>
                <div class="epro_crop_handle epro_h_s" data-h="s"></div>
                <div class="epro_crop_handle epro_h_sw" data-h="sw"></div>
                <div class="epro_crop_handle epro_h_w" data-h="w"></div>
                <div class="epro_crop_dims" id="eproCropDims">100 x 100</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra de crop -->
        <div class="epro_crop_bar" id="eproCropBar" style="display:none;">
          <div class="epro_crop_ratios">
            <div class="epro_crop_custom">
              <input type="number" id="eproCropCustomW" placeholder="W" title="Ancho en px">
              <span class="epro_crop_x">×</span>
              <input type="number" id="eproCropCustomH" placeholder="H" title="Alto en px">
            </div>
            <button class="epro_ratio_btn active" data-r="0">Libre</button>
            <button class="epro_ratio_btn" data-r="1">1:1</button>
            <button class="epro_ratio_btn" data-r="1.7777">16:9</button>
            <button class="epro_ratio_btn" data-r="0.5625">9:16</button>
            <button class="epro_ratio_btn" data-r="1.3333">4:3</button>
          </div>
          <div class="epro_crop_actions">
            <button class="epro_crop_cancel" id="eproCropCancel">Cancelar</button>
            <button class="epro_crop_apply" id="eproCropApply"><i class="fas fa-check"></i> Aplicar</button>
          </div>
        </div>

        <!-- Tarjetas de formatos (igual a convertirpro) -->
        <div class="epro_formats_row" id="eproFormatsRow" style="display:none;">
          <!-- Generadas dinámicamente -->
        </div>

      </div>
    </div>
  </div>
`,oe=async()=>{if(console.log(`✅ EditorPro de ${L} cargado`),await ae()){const t=w.find(a=>a.id==="avif");t&&(t.supported=!0)}else{const t=w.findIndex(a=>a.id==="avif");t!==-1&&w.splice(t,1)}n=e("#eproCanvas")[0],c=n.getContext("2d",{willReadFrequently:!0}),R=document.createElement("canvas"),H=R.getContext("2d",{willReadFrequently:!0}),I=N({dropSel:"#eproDropzone",fileSel:"#eproFileInput",clickSel:"#eproPlaceholder",onFile:re}),e("#eproBtnReset").on("click",ce),e("#eproBtnUndo").on("click",ie),e("#eproBtnRedo").on("click",se),e("#eproBtnRotL").on("click",()=>{f.rotate=(f.rotate-90)%360,y()}),e("#eproBtnRotR").on("click",()=>{f.rotate=(f.rotate+90)%360,y()}),e("#eproBtnFlipH").on("click",()=>{f.flipH*=-1,y()}),e("#eproBtnFlipV").on("click",()=>{f.flipV*=-1,y()}),["brightness","contrast","saturate","shadows","blur","hueRotate"].forEach(t=>{e(`#f_${t}`).on("input",function(){u[t]=parseInt(e(this).val()),e(`#val_${t}`).text(u[t]),V()}).on("change",()=>y())}),e("#eproResetFiltros").on("click",()=>{u={...E},f={...k},M(),y(),F("Filtros reseteados","success",1500)}),e("#eproAdvToggle").on("click",function(){e(this).toggleClass("open"),e("#eproAdvFilters").slideToggle(200)}),Y(),e("#eproTogglesRow").on("click",".epro_toggle_btn",function(){const t=e(this).data("fmt");le(t)}),e("#eproFormatsRow").on("click",".epro_fmt_btn_dl",function(){const t=e(this).data("fmt");de(t,this)}),e("#expQual").on("input",function(){const t=e(this).val();e("#expQualTxt").val(t),D=parseInt(t),x()}),e("#expQualTxt").on("input",function(){let t=Math.min(100,Math.max(10,parseInt(e(this).val())||80));e(this).val(t),e("#expQual").val(t),D=t,x()}),e("#eproBtnSelect").on("click",()=>e("#eproFileInput").trigger("click")),ne()};async function re(t){try{d=await ee(t),d.origW=d.width,d.origH=d.height,e("#eproPlaceholder").hide(),e("#eproCanvasWrap").fadeIn(300),e("#eproToolbar").fadeIn(200),e("#eproInfoCard, #eproFilename").fadeIn(300),e("#eproFormatsRow").fadeIn(300),e("#eproOrigSize").text(W(d.size)),e("#eproOrigDims").text(`${d.origW}×${d.origH}`),e("#eproOrigFmt").text(d.format),e("#eproFileName").text(d.name),e("#eproBadges").fadeIn(200),u={...E},f={...k},M(),C.reset(),n.width=d.origW,n.height=d.origH,c.drawImage(d.img,0,0),P("Inicio"),x()}catch(a){console.error("Error cargando imagen:",a)}}function M(){Object.entries(u).forEach(([t,a])=>{e(`#f_${t}`).val(a),e(`#val_${t}`).text(a)})}function V(){if(!d)return;const t=C.actual();if(!t)return;n.width=t.width,n.height=t.height,c.save(),c.translate(n.width/2,n.height/2),c.rotate(f.rotate*Math.PI/180),c.scale(f.flipH,f.flipV);let a=`brightness(${u.brightness}%) contrast(${u.contrast}%) saturate(${u.saturate}%) blur(${u.blur}px) hue-rotate(${u.hueRotate}deg)`;c.filter=a;const s=f.rotate%180!==0?n.height:n.width,p=f.rotate%180!==0?n.width:n.height;if(t.imgData?(R.width=t.imgData.width,R.height=t.imgData.height,H.putImageData(t.imgData,0,0),c.drawImage(R,-s/2,-p/2,s,p)):c.drawImage(d.img,-s/2,-p/2,s,p),c.restore(),u.shadows!==0){const o=c.getImageData(0,0,n.width,n.height),l=o.data,r=u.shadows/100;for(let i=0;i<l.length;i+=4){const A=.299*l[i]+.587*l[i+1]+.114*l[i+2];if(A<128){const m=1-A/128,b=1+r*m*.8;l[i]=Math.min(255,l[i]*b),l[i+1]=Math.min(255,l[i+1]*b),l[i+2]=Math.min(255,l[i+2]*b)}}c.putImageData(o,0,0)}x()}function y(){V(),P()}function P(t){const a={width:n.width,height:n.height,filtros:{...u},transform:{...f},imgData:c.getImageData(0,0,n.width,n.height)};C.guardar(a),S()}function ie(){const t=C.undo();t&&q(t),S()}function se(){const t=C.redo();t&&q(t),S()}function q(t){u={...t.filtros},f={...t.transform},M(),n.width=t.width,n.height=t.height,c.putImageData(t.imgData,0,0),x()}function S(){e("#eproBtnUndo").prop("disabled",!C.canUndo()),e("#eproBtnRedo").prop("disabled",!C.canRedo())}let v=0,g=null;function ne(){g=e("#eproCropArea"),e("#eproBtnCrop").on("click",()=>{e("#eproCropOverlay, #eproCropBar").fadeIn(200),e("#eproToolbar").hide(),G()}),e(".epro_ratio_btn").on("click",function(){e(".epro_ratio_btn").removeClass("active"),e(this).addClass("active"),v=parseFloat(e(this).data("r")),G()}),e("#eproCropCustomW").on("change",function(){const r=parseInt(e(this).val()),i=parseInt(e("#eproCropCustomH").val())||(v?Math.round(r/v):r);r>0&&(Q(r,i),e(".epro_ratio_btn").removeClass("active"),e('[data-r="0"]').addClass("active"),v=0)}),e("#eproCropCustomH").on("change",function(){const r=parseInt(e(this).val()),i=parseInt(e("#eproCropCustomW").val())||(v?Math.round(r*v):r);r>0&&(Q(i,r),e(".epro_ratio_btn").removeClass("active"),e('[data-r="0"]').addClass("active"),v=0)}),e("#eproCropCancel").on("click",z),e("#eproCropApply").on("click",()=>{const r=n.getBoundingClientRect(),i=g[0].getBoundingClientRect(),A=n.width/r.width,m=n.height/r.height,b=(i.left-r.left)*A,$=(i.top-r.top)*m,h=i.width*A,_=i.height*m,B=c.getImageData(b,$,h,_);n.width=h,n.height=_,c.putImageData(B,0,0),u={...E},f={...k},M(),P(),x(),z(),F("¡Recorte aplicado!","success",1500)});let t=!1,a=!1,s,p,o,l;g.on("mousedown touchstart",r=>{r.target.classList.contains("epro_crop_handle")?(a=!0,l=r.target.dataset.h):t=!0;const i=r.touches?r.touches[0]:r;s=i.clientX,p=i.clientY,o={left:g[0].offsetLeft,top:g[0].offsetTop,width:g.width(),height:g.height()},r.preventDefault()}),e(window).on("mousemove touchmove",r=>{if(!t&&!a)return;const i=r.touches?r.touches[0]:r,A=i.clientX-s,m=i.clientY-p,b=e("#eproCropOverlay").width(),$=e("#eproCropOverlay").height();if(t){let h=o.left+A,_=o.top+m;h=Math.max(0,Math.min(h,b-o.width)),_=Math.max(0,Math.min(_,$-o.height)),g.css({left:h,top:_})}else if(a){let h=o.width,_=o.height,B=o.left,T=o.top;l.includes("e")&&(h+=A),l.includes("s")&&(_+=m),l.includes("w")&&(h-=A,B+=A),l.includes("n")&&(_-=m,T+=m),v>0&&(l.includes("e")||l.includes("w")?_=h/v:h=_*v),h>50&&_>50&&B>=0&&T>=0&&B+h<=b&&T+_<=$&&g.css({width:h,height:_,left:B,top:T})}O()}).on("mouseup touchend",()=>{t=!1,a=!1})}function G(){const t=e("#eproCropOverlay").width(),a=e("#eproCropOverlay").height();let s=t*.8,p=a*.8;v>0&&(t/a>v?s=p*v:p=s/v),g.css({width:s,height:p,left:(t-s)/2,top:(a-p)/2}),O()}function O(){const t=n.getBoundingClientRect(),a=g[0].getBoundingClientRect(),s=n.width/t.width,p=Math.round(a.width*s),o=Math.round(a.height*s);e("#eproCropDims").text(`${p} × ${o}`),e("#eproCropCustomW").val(p),e("#eproCropCustomH").val(o)}function Q(t,a){const s=n.getBoundingClientRect(),p=n.width/s.width,o=t/p,l=a/p,r=e("#eproCropOverlay").width(),i=e("#eproCropOverlay").height(),A=Math.max(0,Math.min((r-o)/2,r-o)),m=Math.max(0,Math.min((i-l)/2,i-l));g.css({width:o,height:l,left:A,top:m}),O()}function z(){e("#eproCropOverlay, #eproCropBar").hide(),e("#eproToolbar").fadeIn(200)}function Y(){let t="";w.forEach(a=>{if(a.id==="avif"&&e("#eproFmtAvif").length===0)return;const s=a.enabled?"epro_toggle_on":"epro_toggle_off",p=a.enabled?"fa-check-circle":"fa-circle";t+=`
      <div class="epro_toggle_btn ${s}" data-fmt="${a.id}">
        <i class="fas ${p}"></i> ${a.label}
      </div>
    `}),e("#eproTogglesRow").html(t),pe()}function le(t){const a=w.find(s=>s.id===t);a&&(a.enabled=!a.enabled,Y(),x())}function pe(){const t=e("#eproFormatsRow"),a=w.filter(o=>o.enabled);if(a.length===0){t.html('<div style="width:100%; text-align:center; padding:2vh; color:var(--txe);">Selecciona al menos un formato para exportar.</div>');return}let s="";a.forEach(o=>{s+=`
      <div class="epro_fmt_card" id="eproCard_${o.id}">
        <div class="epro_fmt_row1">
          <span class="epro_fmt_label">${o.label}</span>
          <button class="epro_fmt_btn_dl" data-fmt="${o.id}" disabled>
            <i class="fas fa-download"></i> Descargar
          </button>
        </div>
        <div class="epro_fmt_row2" id="eproFmtInfo_${o.id}">
          <span class="epro_fmt_orig" id="eproFmtOrig_${o.id}">-- KB</span>
          <i class="fas fa-arrow-right epro_fmt_arr"></i>
          <span class="epro_fmt_new" id="eproFmtSize_${o.id}"><i class="fas fa-spinner fa-spin"></i></span>
          <span class="epro_fmt_pct" id="eproFmtPct_${o.id}"></span>
        </div>
      </div>
    `}),t.html(s),a.every(o=>o.id==="png")?e("#eproQualRow").slideUp(200):e("#eproQualRow").slideDown(200)}function x(){clearTimeout(j),e("#eproFormatsRow .epro_fmt_new").html('<i class="fas fa-spinner fa-spin"></i>'),e("#eproFormatsRow .epro_fmt_pct").text("").removeClass("epro_pct_up epro_pct_dn"),e("#eproFormatsRow .epro_fmt_btn_dl").prop("disabled",!0),j=setTimeout(()=>{if(!n||!d)return;w.filter(a=>a.enabled).forEach(a=>{const s=a.id==="png"?void 0:D/100;J(n,`image/${a.id}`,s,p=>{if(!p){e(`#eproFmtSize_${a.id}`).html('<i class="fas fa-exclamation-triangle"></i> Error');return}const o=d.size,l=o-p,r=Math.round(Math.abs(l)/o*100);e(`#eproFmtOrig_${a.id}`).text(W(o,!0)),e(`#eproFmtSize_${a.id}`).text(W(p,!0));const i=e(`#eproFmtPct_${a.id}`);r===0?i.text("=").removeClass("epro_pct_up epro_pct_dn"):l>0?i.text(`-${r}%`).removeClass("epro_pct_up").addClass("epro_pct_dn"):i.text(`+${r}%`).removeClass("epro_pct_dn").addClass("epro_pct_up"),e(`#eproCard_${a.id} .epro_fmt_btn_dl`).prop("disabled",!1)})})},te)}async function de(t,a){if(!d)return;const s=w.find(l=>l.id===t);if(!s)return;const p=e(a),o=p.html();p.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> Procesando...');try{const l=s.id==="png"?void 0:D/100,r=await X(n,`image/${s.id}`,l),i=`${Z(d.name)}_pro.${s.ext}`;K(r,i),F(`¡${s.label} exportado!`,"success",2e3)}catch{F(`Error al exportar ${s.label}`,"error",2e3)}finally{p.prop("disabled",!1).html(o)}}function ce(){I&&I(),d=null,n=null,c=null,R=null,H=null,C.reset(),e("#eproDropzone").removeClass("epro_dragover epro_paste_flash"),e("#eproCanvasWrap, #eproToolbar, #eproRight, #eproCropBar, #eproCropOverlay, #eproExportBottom").hide(),e("#eproPlaceholder").show(),e("#eproFileInput").val(""),F("Área de trabajo limpia","info",1500),oe()}const ve=()=>{I&&I(),e("#eproBtnReset, #eproBtnUndo, #eproBtnRedo, #eproBtnCrop, #eproCropCancel, #eproCropApply, #eproAdvToggle, #eproBtnDownload, .epro_fmt_btn, .epro_ratio_btn").off(),e('input[type="range"], input[type="number"], input[type="text"]').off(),e(window).off("mousemove touchmove mouseup touchend")};export{ve as cleanup,oe as init,_e as render};
