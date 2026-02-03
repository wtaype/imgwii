import{j as e}from"./vendor-gzd0YkcT.js";import{i as I}from"./browser-image-compression-DILJcqf6.js";import{c as z,N as l,w as F}from"./main-BW9oKZ0g.js";import"./main-DPsc1Z-h.js";import"./firebase-xYuwcABI.js";let n=null,t=null,w=!1;const x=a=>{if(!a)return"0 B";const i=1024,s=["B","KB","MB","GB"],o=Math.floor(Math.log(a)/Math.log(i));return`${(a/Math.pow(i,o)).toFixed(1)} ${s[o]}`},j=()=>`
  <div class="convert_container">
    <div class="conv_layout">
      <!-- LEFT COLUMN (29%) -->
      <div class="conv_left">
        <div class="conv_config_section">
          <div class="config_header">
            <h3><i class="fas fa-exchange-alt"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-file-image"></i> Formato:</label>
              <div class="select_wrapper">
                <select id="formatSelect">
                  <option value="webp" selected>WebP</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="avif">AVIF</option>
                  <option value="bmp">BMP</option>
                </select>
              </div>
            </div>

            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="85" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>
          </div>

          <div class="action_buttons">
            <button class="btn_convert" id="btnConvert">
              <i class="fas fa-exchange-alt"></i>
              <span>Convertir</span>
            </button>
            <button class="btn_download" id="btnDownload">
              <i class="fas fa-download"></i>
              <span>Descargar</span>
            </button>
          </div>

          <div class="secondary_buttons">
            <button class="btn_select" id="btnSelect">
              <i class="fas fa-folder-open"></i>
              <span>Seleccionar</span>
            </button>
            <button class="btn_delete" id="btnDelete">
              <i class="fas fa-trash-alt"></i>
              <span>Eliminar</span>
            </button>
          </div>
        </div>

        <div class="conv_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size" id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
                <span class="data_format" id="originalFormat">--</span>
              </div>
            </div>

            <div class="comparison_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>

            <div class="comparison_col">
              <span class="comparison_label">Convertido:</span>
              <div class="comparison_data">
                <span class="data_size success" id="convertedSize">--</span>
                <span class="data_dimensions" id="convertedDimensions">--</span>
                <span class="data_format success" id="convertedFormat">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span id="reductionLabel">Reducción: <strong id="reductionPercent">0%</strong></span>
          </div>
        </div>

        <div class="progress_section" id="progressSection" style="display:none;">
          <div class="progress_header">
            <span>Convirtiendo...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress_bar">
            <div class="progress_fill" id="progressFill"></div>
          </div>
        </div>

        <div class="file_name_section" id="fileNameSection" style="display:none;">
          <div class="file_name_header">
            <i class="fas fa-file-image"></i>
            <span>Nombre:</span>
          </div>
          <div class="file_name_display" id="fileNameDisplay" title="">imagen.png</div>
        </div>
      </div>

      <!-- RIGHT COLUMN (70%) -->
      <div class="conv_right">
        <div class="drop_preview_zone" id="dropZone">
          <div class="drop_placeholder" id="dropPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" hidden>

          <div class="preview_container" id="previewContainer" style="display:none;">
            <img id="previewImage" src="" alt="Preview">
          </div>
        </div>
      </div>
    </div>
  </div>
`,A=()=>{console.log(`✅ Convertir de ${z} cargado`);const a=e("#dropZone");e("#fileInput").on("change",i=>y(i.target.files[0])),e("#btnConvert").on("click",k),e("#btnDownload").on("click",L),e("#btnSelect").on("click",()=>e("#fileInput").trigger("click")),e("#btnDelete").on("click",M),e("#formatSelect, #quality").on("change input",()=>{t&&(e("#convertedSize, #convertedDimensions, #convertedFormat").text("--"),e("#reductionDisplay").hide())}),a.on("dragover",i=>{i.preventDefault(),a.addClass("dragover")}),a.on("dragleave",i=>{i.preventDefault(),a.removeClass("dragover")}),a.on("drop",i=>{i.preventDefault(),a.removeClass("dragover");const s=i.originalEvent.dataTransfer.files[0];s&&y(s)}),a.on("dblclick",()=>e("#fileInput").trigger("click")),e(document).on("paste",i=>{const s=i.originalEvent.clipboardData?.items;if(s){for(let o of s)if(o.type.indexOf("image")!==-1){const m=o.getAsFile();if(m){const p=o.type.split("/")[1]||"png",_=new File([m],`Captura_${Date.now()}.${p}`,{type:o.type});y(_),a.addClass("paste_flash"),setTimeout(()=>a.removeClass("paste_flash"),300),l("¡Imagen pegada desde portapapeles!","success",2e3)}break}}})};function y(a){if(!a)return;if(!a.type.startsWith("image/"))return l("Por favor selecciona un archivo de imagen válido","error",3e3);if(a.size>50*1024*1024)return l("Archivo muy grande (máx 50MB)","error",3e3);const i=new FileReader;i.onload=s=>{const o=new Image;o.onload=()=>{const m=a.type.split("/")[1].toUpperCase();n={file:a,url:s.target.result,size:a.size,width:o.width,height:o.height,name:a.name,format:m},t=null,R(),l(`Imagen cargada: ${a.name}`,"success",2e3)},o.src=s.target.result},i.readAsDataURL(a)}function R(){n&&(e("#dropPlaceholder").hide(),e("#previewContainer").show(),e("#previewImage").attr("src",n.url),e("#originalSize").text(x(n.size)),e("#originalDimensions").text(`${n.width}×${n.height}`),e("#originalFormat").text(n.format),e("#fileNameDisplay").text(n.name).attr("title",n.name),e("#infoSection, #fileNameSection").fadeIn(300),e("#convertedSize, #convertedDimensions, #convertedFormat").text("--"),e("#reductionDisplay").hide())}async function k(){if(!n)return l("Primero carga una imagen","warning",2e3);if(w)return l("Ya hay una conversión en progreso","warning",2e3);const a=e("#formatSelect").val(),i=e("#btnConvert");w=!0,i.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>'),e("#progressSection").fadeIn(300),d(0);try{const s=parseInt(e("#quality").val())/100;d(10);const o=performance.now(),m={maxSizeMB:50,useWebWorker:!0,fileType:`image/${a}`,initialQuality:s,alwaysKeepResolution:!0};d(30);let p=await I(n.file,m);if(d(60),["png","jpeg","webp","bmp"].includes(a)){const v=document.createElement("canvas"),g=v.getContext("2d",{alpha:a==="png",willReadFrequently:!1}),r=new Image;await new Promise((u,c)=>{r.onload=u,r.onerror=c,r.src=URL.createObjectURL(p)}),v.width=r.width,v.height=r.height,g.imageSmoothingEnabled=!0,g.imageSmoothingQuality="high",g.drawImage(r,0,0),d(80);const f=`image/${a==="jpg"?"jpeg":a}`;p=await new Promise(u=>{v.toBlob(u,f,s)}),URL.revokeObjectURL(r.src)}else d(80);d(90);const _=performance.now(),C=new FileReader;await new Promise(v=>{C.onload=g=>{const r=new Image;r.onload=()=>{const f=n.size,u=p.size,c=((f-u)/f*100).toFixed(1),h=parseFloat(c)>0;t={blob:p,url:g.target.result,size:u,width:r.width,height:r.height,format:a.toUpperCase(),reduccion:Math.abs(c),esReduccion:h,tiempo:((_-o)/1e3).toFixed(2)},e("#previewImage").attr("src",t.url),e("#convertedSize").text(x(t.size)),e("#convertedDimensions").text(`${t.width}×${t.height}`),e("#convertedFormat").text(t.format);const b=e("#reductionDisplay"),$=b.find("i"),S=e("#reductionLabel"),D=e("#reductionPercent");h?(b.removeClass("warning").addClass("success"),$.removeClass("fa-arrow-up").addClass("fa-chart-pie"),S.html(`Reducción: <strong id="reductionPercent">${c}%</strong>`),D.text(`${c}%`)):(b.removeClass("success").addClass("warning"),$.removeClass("fa-chart-pie").addClass("fa-arrow-up"),S.html(`Aumento: <strong id="reductionPercent">${Math.abs(c)}%</strong>`),D.text(`+${Math.abs(c)}%`)),b.fadeIn(300),d(100),setTimeout(()=>{e("#progressSection").fadeOut(300);const P=h?`¡Convertido a ${a.toUpperCase()}! Reducción: ${c}% en ${t.tiempo}s`:`¡Convertido a ${a.toUpperCase()}! Archivo ${Math.abs(c)}% más grande en ${t.tiempo}s`;l(P,h?"success":"warning",3e3)},500),v()},r.src=g.target.result},C.readAsDataURL(p)})}catch(s){console.error("Error:",s),l("Error al convertir la imagen","error"),e("#progressSection").fadeOut(300)}w=!1,i.prop("disabled",!1).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>')}function d(a){e("#progressFill").css("width",`${a}%`),e("#progressPercent").text(`${a}%`)}function L(){if(!t)return l("Primero convierte la imagen","warning",2e3);const a=URL.createObjectURL(t.blob),i=document.createElement("a");i.href=a,i.download=`convertido_${n.name.replace(/\.[^.]+$/,`.${t.format.toLowerCase()}`)}`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),F("#btnDownload","¡Descargado! 🎉","success",1500)}function M(){if(!n&&!t)return l("No hay imagen para eliminar","warning",2e3);n=null,t=null,e("#previewContainer").hide(),e("#dropPlaceholder").show(),e("#previewImage").attr("src",""),e("#infoSection, #fileNameSection, #progressSection").hide(),e("#fileInput").val(""),e("#formatSelect").val("webp"),e("#quality").val(85),l("Imagen eliminada correctamente","success",2e3)}const q=()=>{console.log("🧹 Convertir limpiado"),n=null,t=null,w=!1,e("#fileInput, #btnConvert, #btnDownload, #btnSelect, #btnDelete, #dropZone, #formatSelect, #quality").off(),e(document).off("paste")};export{q as cleanup,A as init,j as render};
