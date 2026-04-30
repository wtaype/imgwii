import{j as a,i as I}from"./vendor-BOJxWFg6.js";import{b as P,e as _,n as E}from"./index-BawKnUft.js";let t=null,n={},w="webp",b=!1;const B=o=>{if(!o&&o!==0)return"--";if(o===0)return"0 B";const r=1024,i=["B","KB","MB","GB"],e=Math.floor(Math.log(o)/Math.log(r));return`${(o/Math.pow(r,e)).toFixed(1)} ${i[e]}`},k=o=>o.replace(/\.[^/.]+$/,""),d=[{id:"webp",mime:"image/webp",label:"WebP",ext:"webp",quality:.65,enabled:!0},{id:"jpeg",mime:"image/jpeg",label:"JPEG",ext:"jpg",quality:.65,enabled:!0},{id:"png",mime:"image/png",label:"PNG",ext:"png",quality:null,enabled:!1},{id:"avif",mime:"image/avif",label:"AVIF",ext:"avif",quality:.65,enabled:!1}];async function D(){return new Promise(o=>{const r=new Image;r.onload=()=>o(!0),r.onerror=()=>o(!1),r.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA=="})}async function T(o,r,i){let s=await I(o,{maxSizeMB:50,useWebWorker:!0,fileType:r,initialQuality:i??.65,alwaysKeepResolution:!0});return new Promise((p,A)=>{const v=URL.createObjectURL(s),c=new Image;c.onload=()=>{const l=document.createElement("canvas");l.width=c.naturalWidth,l.height=c.naturalHeight;const g=r==="image/png",m=l.getContext("2d",{alpha:g,willReadFrequently:!1});g||(m.fillStyle="#fff",m.fillRect(0,0,l.width,l.height)),m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",m.drawImage(c,0,0),URL.revokeObjectURL(v),l.toBlob(f=>f?p(f):A(new Error("Canvas toBlob falló")),r,i??void 0)},c.onerror=()=>{URL.revokeObjectURL(v),A(new Error("Imagen no cargó"))},c.src=v})}const L=o=>new Promise((r,i)=>{const e=new FileReader;e.onload=s=>r(s.target.result),e.onerror=i,e.readAsDataURL(o)}),M=()=>`
  <div class="cpro_container">
    <div class="cpro_layout">

      <!-- ═══════════ LEFT PANEL (27%) ═══════════ -->
      <aside class="cpro_left">

        <!-- Config -->
        <div class="cpro_card cpro_config">
          <div class="cpro_card_header">
            <i class="fas fa-crown"></i>
            <h3>Convertir Pro</h3>
          </div>

          <div class="cpro_quality_row">
            <label for="cproQuality"><i class="fas fa-sliders-h"></i> Calidad</label>
            <div class="cpro_quality_wrap">
              <input type="range" id="cproQualityRange" min="10" max="100" value="65">
              <div class="cpro_quality_num_wrap">
                <input type="text" id="cproQuality" value="65">
                <span class="cpro_unit">%</span>
              </div>
            </div>
          </div>

          <div class="cpro_actions">
            <button class="cpro_btn cpro_btn_convert" id="cproBtnConvert">
              <i class="fas fa-exchange-alt"></i>
              <span>Convertir</span>
            </button>
            <button class="cpro_btn cpro_btn_select" id="cproBtnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="cpro_btn cpro_btn_delete" id="cproBtnDelete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>

          <!-- Toggles de formato -->
          <div class="cpro_fmt_toggles" id="cproFmtToggles">
            <span class="cpro_toggles_lbl"><i class="fas fa-layer-group"></i> Formatos a convertir:</span>
            <div class="cpro_toggles_row" id="cproTogglesRow">
              <!-- Se generan dinámicamente -->
            </div>
          </div>

          <input type="file" id="cproFileInput" accept="image/*" hidden>
        </div>

        <!-- Info Comparación -->
        <div class="cpro_card cpro_info" id="cproInfo" style="display:none;">
          <div class="cpro_card_header">
            <i class="fas fa-chart-bar"></i>
            <h4>Comparación</h4>
          </div>
          <div class="cpro_compare_grid">
            <div class="cpro_compare_col">
              <span class="cpro_compare_lbl">Original</span>
              <span class="cpro_compare_val" id="cproOrigSize">--</span>
              <span class="cpro_compare_dim" id="cproOrigDim">--</span>
              <span class="cpro_compare_fmt" id="cproOrigFmt">--</span>
            </div>
            <div class="cpro_compare_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="cpro_compare_col">
              <span class="cpro_compare_lbl">Activo</span>
              <span class="cpro_compare_val cpro_val_green" id="cproConvSize">--</span>
              <span class="cpro_compare_dim" id="cproConvDim">--</span>
              <span class="cpro_compare_fmt cpro_val_green" id="cproConvFmt">--</span>
            </div>
          </div>
          <div class="cpro_savings" id="cproSavings" style="display:none;">
            <i class="fas fa-bolt"></i>
            <span id="cproSavingsLabel"></span>
          </div>
          <div class="cpro_badges" id="cproBadges" style="display:none;">
            <span class="cpro_badge cpro_badge_exif"><i class="fas fa-shield-alt"></i> EXIF eliminado</span>
            <span class="cpro_badge cpro_badge_time" id="cproBadgeTime"></span>
          </div>
        </div>

        <!-- Nombre archivo -->
        <div class="cpro_card cpro_filename" id="cproFilename" style="display:none;">
          <i class="fas fa-file-image"></i>
          <span id="cproFilenameTxt"></span>
        </div>

      </aside>

      <!-- ═══════════ RIGHT PANEL (72%) ═══════════ -->
      <div class="cpro_right">

        <!-- Zona de drop + preview -->
        <div class="cpro_dropzone" id="cproDropzone">
          <div class="cpro_placeholder" id="cproPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, WEBP, JPEG (máx 50MB)</small>
          </div>

          <div class="cpro_preview" id="cproPreview" style="display:none;">
            <img id="cproPreviewImg" src="" alt="Preview">
            <!-- Badge formato activo -->
            <div class="cpro_active_badge" id="cproActiveBadge">
              <i class="fas fa-eye"></i>
              <span id="cproActiveBadgeTxt">WebP</span>
            </div>
          </div>
        </div>

        <!-- Tarjetas de formato -->
        <div class="cpro_formats_row" id="cproFormatsRow" style="display:none;">
          <!-- Se generan dinámicamente -->
        </div>

      </div>
    </div>
  </div>
`,U=async()=>{console.log(`✅ ConvertirPro de ${P} cargado`);const o=await D(),r=d.find(e=>e.id==="avif");r&&!o&&(r.enabled=!1),$(),x(),a("#cproQualityRange").on("input",function(){a("#cproQuality").val(a(this).val())}),a("#cproQuality").on("input",function(){let e=Math.min(100,Math.max(10,parseInt(a(this).val())||65));a(this).val(e),a("#cproQualityRange").val(e)}),a("#cproFileInput").on("change",e=>y(e.target.files[0])),a("#cproBtnSelect").on("click",()=>a("#cproFileInput").trigger("click")),a("#cproBtnConvert").on("click",()=>{t&&z()}),a("#cproBtnDelete").on("click",j),a("#cproPlaceholder").on("click",()=>a("#cproFileInput").trigger("click"));const i=a("#cproDropzone");i.on("dragover",e=>{e.preventDefault(),i.addClass("cpro_dragover")}),i.on("dragleave",e=>{e.preventDefault(),i.removeClass("cpro_dragover")}),i.on("drop",e=>{e.preventDefault(),i.removeClass("cpro_dragover");const s=e.originalEvent.dataTransfer.files[0];s&&y(s)}),a(document).on("paste.cpro",e=>{const s=e.originalEvent.clipboardData?.items;if(s){for(let p of s)if(p.type.startsWith("image/")){const A=p.getAsFile();if(A){const v=p.type.split("/")[1]||"png",c=new File([A],`Captura_${Date.now()}.${v}`,{type:p.type});y(c),i.addClass("cpro_paste_flash"),setTimeout(()=>i.removeClass("cpro_paste_flash"),350),_("¡Imagen pegada desde portapapeles!","success",2e3)}break}}})};function $(){const o=a("#cproTogglesRow");o.empty(),d.forEach(r=>{const i=r.enabled;o.append(`
      <button class="cpro_toggle_btn ${i?"cpro_toggle_on":"cpro_toggle_off"}" data-fmtid="${r.id}" title="${i?"Desactivar":"Activar"} ${r.label}">
        <i class="fas ${i?"fa-check-circle":"fa-circle"}"></i>
        ${r.label}
      </button>
    `)}),o.off("click.toggle").on("click.toggle",".cpro_toggle_btn",function(){const r=a(this).data("fmtid"),i=d.find(s=>s.id===r);if(!i)return;const e=d.filter(s=>s.enabled);if(i.enabled&&e.length<=1)return _("Debe haber al menos un formato activo","warning",2e3);if(i.enabled=!i.enabled,$(),x(),!i.enabled&&w===r){const s=d.find(p=>p.enabled);s&&n[s.id]&&h(s.id)}})}function x(){const o=a("#cproFormatsRow");o.empty();const r=d.filter(e=>e.enabled),i=r.find(e=>e.id==="webp")||r[0];r.forEach(e=>{const s=e.id===i?.id;o.append(`
      <div class="cpro_fmt_card ${s?"cpro_fmt_active":""}" id="cproCard_${e.id}" data-fmt="${e.id}">
        <div class="cpro_fmt_top">
          <div class="cpro_fmt_left">
            <span class="cpro_fmt_label">${e.label}</span>
            <span class="cpro_fmt_size" id="cproSize_${e.id}">
              <i class="fas fa-spinner fa-spin" style="display:none;"></i>
              <span class="cpro_size_txt">--</span>
            </span>
          </div>
          <div class="cpro_fmt_actions">
            <button class="cpro_fmt_btn cpro_fmt_btn_dl" data-fmt="${e.id}" title="Descargar ${e.label}" disabled>
              <i class="fas fa-download"></i>
              <span>Descargar</span>
            </button>
          </div>
        </div>
        <div class="cpro_fmt_bar_wrap">
          <div class="cpro_fmt_bar" id="cproBar_${e.id}" style="width:0%"></div>
        </div>
        <div class="cpro_fmt_savings" id="cproFmtSavings_${e.id}" style="display:none;"></div>
      </div>
    `)}),o.on("click.preview",".cpro_fmt_card",function(e){if(a(e.target).closest(".cpro_fmt_btn_dl").length)return;const s=a(this).data("fmt");n[s]&&h(s)}),o.on("click.dl",".cpro_fmt_btn_dl",function(e){e.stopPropagation();const s=a(this).data("fmt");n[s]&&Q(s)})}function y(o){if(!o)return;if(!o.type.startsWith("image/"))return _("Selecciona un archivo de imagen válido","error",3e3);if(o.size>50*1024*1024)return _("Archivo muy grande (máx 50MB)","error",3e3);const r=new FileReader;r.onload=i=>{const e=new Image;e.onload=()=>{const s=o.name.split(".").pop().toLowerCase();t={file:o,url:i.target.result,size:o.size,width:e.naturalWidth,height:e.naturalHeight,name:o.name,format:s==="jpg"?"JPEG":s.toUpperCase()},n={},w="webp",O(),z()},e.src=i.target.result},r.readAsDataURL(o)}function O(){a("#cproPlaceholder").hide(),a("#cproPreview").show(),a("#cproPreviewImg").attr("src",t.url),a("#cproActiveBadgeTxt").text(t.format),a("#cproActiveBadge").removeClass().addClass("cpro_active_badge cpro_badge_orig"),a("#cproOrigSize").text(B(t.size)),a("#cproOrigDim").text(`${t.width}×${t.height}`),a("#cproOrigFmt").text(t.format),a("#cproConvSize").text("--"),a("#cproConvDim").text("--"),a("#cproConvFmt").text("--"),a("#cproSavings, #cproBadges").hide(),a("#cproInfo, #cproFilename").fadeIn(300),a("#cproFilenameTxt").text(t.name),a("#cproFormatsRow").fadeIn(300),d.forEach(o=>{a(`#cproCard_${o.id}`).removeClass("cpro_fmt_active cpro_fmt_done cpro_fmt_error"),a(`#cproSize_${o.id} .cpro_size_txt`).text("--"),a(`#cproSize_${o.id} i`).hide(),a(`#cproBar_${o.id}`).css("width","0%").removeClass("cpro_bar_done"),a(`#cproFmtSavings_${o.id}`).hide(),a(`#cproCard_${o.id} .cpro_fmt_btn_dl`).prop("disabled",!0)}),a("#cproCard_webp").addClass("cpro_fmt_active")}async function z(){if(!t)return;if(b)return _("Ya hay una conversión en progreso","warning",2e3);b=!0,n={};const o=parseInt(a("#cproQuality").val())/100,r=performance.now(),i=a("#cproBtnConvert");i.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');const e=d.filter(c=>c.enabled);e.forEach(c=>{a(`#cproCard_${c.id}`).removeClass("cpro_fmt_done cpro_fmt_error"),a(`#cproSize_${c.id} .cpro_size_txt`).text("..."),a(`#cproSize_${c.id} i`).show(),a(`#cproBar_${c.id}`).css("width","10%").removeClass("cpro_bar_done"),a(`#cproCard_${c.id} .cpro_fmt_btn_dl`).prop("disabled",!0)});const s=e.map(async c=>{try{const l=c.quality!=null?c.quality*o/.65:null,g=await T(t.file,c.mime,l),m=await L(g),f=await new Promise(S=>{const u=new Image;u.onload=()=>S({w:u.naturalWidth,h:u.naturalHeight}),u.src=m});n[c.id]={blob:g,url:m,size:g.size,width:f.w,height:f.h,fmt:c};const C=((t.size-g.size)/t.size*100).toFixed(1),R=parseFloat(C)>0;a(`#cproSize_${c.id} i`).hide(),a(`#cproSize_${c.id} .cpro_size_txt`).text(B(g.size)),a(`#cproBar_${c.id}`).css("width","100%").addClass("cpro_bar_done"),a(`#cproCard_${c.id}`).addClass("cpro_fmt_done").removeClass("cpro_fmt_error"),a(`#cproCard_${c.id} .cpro_fmt_btn_dl`).prop("disabled",!1);const F=a(`#cproFmtSavings_${c.id}`);R?F.html(`<i class="fas fa-arrow-down"></i> −${C}%`).removeClass("cpro_savings_up").addClass("cpro_savings_dn").show():F.html(`<i class="fas fa-arrow-up"></i> +${Math.abs(C)}%`).removeClass("cpro_savings_dn").addClass("cpro_savings_up").show()}catch(l){console.error(`Error convirtiendo ${c.id}:`,l),a(`#cproSize_${c.id} i`).hide(),a(`#cproSize_${c.id} .cpro_size_txt`).text("Error"),a(`#cproBar_${c.id}`).css("width","100%").css("background","var(--error)"),a(`#cproCard_${c.id}`).addClass("cpro_fmt_error")}});await Promise.allSettled(s);const A=((performance.now()-r)/1e3).toFixed(2),v=e.find(c=>n[c.id]);n.webp?h("webp"):v&&h(v.id),a("#cproBadgeTime").html(`<i class="fas fa-clock"></i> ${A}s`),a("#cproBadges").fadeIn(300),_(`¡${Object.keys(n).length} formatos convertidos en ${A}s!`,"success",3e3),b=!1,i.prop("disabled",!1).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>')}function h(o){const r=n[o];if(!r)return;w=o,a("#cproPreviewImg").attr("src",r.url),a("#cproActiveBadgeTxt").text(r.fmt.label),a("#cproActiveBadge").removeClass().addClass(`cpro_active_badge cpro_badge_fmt cpro_badge_${o}`),a(".cpro_fmt_card").removeClass("cpro_fmt_active"),a(`#cproCard_${o}`).addClass("cpro_fmt_active");const i=((t.size-r.size)/t.size*100).toFixed(1),e=parseFloat(i)>0;a("#cproConvSize").text(B(r.size)),a("#cproConvDim").text(`${r.width}×${r.height}`),a("#cproConvFmt").text(r.fmt.label);const s=a("#cproSavings");e?(s.removeClass("cpro_savings_up").addClass("cpro_savings_dn"),a("#cproSavingsLabel").html(`Ahorro: <strong>${i}%</strong> menos que el original`)):(s.removeClass("cpro_savings_dn").addClass("cpro_savings_up"),a("#cproSavingsLabel").html(`Aumento: <strong>+${Math.abs(i)}%</strong> vs el original`)),s.fadeIn(300)}function Q(o){const r=n[o];if(!r)return _("Formato no disponible","warning",2e3);const i=`${k(t.name)}.${r.fmt.ext}`,e=URL.createObjectURL(r.blob),s=document.createElement("a");s.href=e,s.download=i,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(e),E(`#cproCard_${o} .cpro_fmt_btn_dl`,`¡${i} descargado! 🎉`,"success",2e3)}function j(){if(!t)return _("No hay imagen que eliminar","warning",2e3);t=null,n={},w="webp",d.forEach(o=>{o.enabled=o.id==="webp"||o.id==="jpeg"}),a("#cproPreview").hide(),a("#cproPlaceholder").show(),a("#cproPreviewImg").attr("src",""),a("#cproInfo, #cproFilename, #cproFormatsRow").hide(),a("#cproFileInput").val(""),a("#cproQuality, #cproQualityRange").val(65),$(),x(),_("Imagen eliminada","success",2e3)}const q=()=>{console.log("🧹 ConvertirPro limpiado"),t=null,n={},b=!1,a(document).off("paste.cpro"),a("#cproFileInput, #cproBtnSelect, #cproBtnConvert, #cproBtnDelete, #cproDropzone, #cproFormatsRow").off()};export{q as cleanup,U as init,M as render};
