import{j as e,C as b}from"./vendor-BOJxWFg6.js";import{b as w,e as r,n as _}from"./index-D-jC5gH6.js";let s=null,t=null;const v=i=>{if(!i)return"0 B";const a=1024,n=["B","KB","MB","GB"],o=Math.floor(Math.log(i)/Math.log(a));return`${(i/Math.pow(a,o)).toFixed(1)} ${n[o]}`},P=()=>`
  <div class="compress_container">
    <div class="comp_layout">
      <!-- LEFT COLUMN (29%) -->
      <div class="comp_left">
        <div class="comp_config_section">
          <div class="config_header">
            <h3><i class="fas fa-compress-alt"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="70" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>

            <div class="config_item">
              <label><i class="fas fa-expand"></i> Max Ancho:</label>
              <div class="input_wrapper">
                <input type="number" id="maxWidth" min="100" max="8000" value="1920" step="100">
                <span class="input_unit">px</span>
              </div>
            </div>
          </div>

          <div class="action_buttons">
            <button class="btn_compress" id="btnCompress">
              <i class="fas fa-compress-alt"></i>
              <span>Comprimir</span>
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

        <div class="comp_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size" id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
              </div>
            </div>

            <div class="comparison_arrow">
              <i class="fas fa-arrow-right"></i>
            </div>

            <div class="comparison_col">
              <span class="comparison_label">Comprimido:</span>
              <div class="comparison_data">
                <span class="data_size success" id="compressedSize">--</span>
                <span class="data_dimensions" id="compressedDimensions">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span>Reducción: <strong id="reductionPercent">0%</strong></span>
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
      <div class="comp_right">
        <div class="drop_preview_zone" id="dropZone">
          <div class="drop_placeholder" id="dropPlaceholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o presiona <kbd>Ctrl</kbd> + <kbd>V</kbd></p>
            <small>PNG, JPG, JPEG, WEBP (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/jpg,image/webp" hidden>

          <div class="preview_container" id="previewContainer" style="display:none;">
            <img id="previewImage" src="" alt="Preview">
          </div>
        </div>
      </div>
    </div>
  </div>
`,S=()=>{console.log(`✅ Comprimir de ${w} cargado`);const i=e("#dropZone");e("#fileInput").on("change",a=>f(a.target.files[0])),e("#btnCompress").on("click",x),e("#btnDownload").on("click",C),e("#btnSelect").on("click",()=>e("#fileInput").trigger("click")),e("#btnDelete").on("click",D),i.on("dragover",a=>{a.preventDefault(),i.addClass("dragover")}),i.on("dragleave",a=>{a.preventDefault(),i.removeClass("dragover")}),i.on("drop",a=>{a.preventDefault(),i.removeClass("dragover");const n=a.originalEvent.dataTransfer.files[0];n&&f(n)}),i.on("dblclick",()=>e("#fileInput").trigger("click")),e(document).on("paste",a=>{const n=a.originalEvent.clipboardData?.items;if(n){for(let o of n)if(o.type.indexOf("image")!==-1){const l=o.getAsFile();l&&(f(l),r("¡Imagen pegada desde portapapeles!","success",2e3));break}}})};function f(i){if(!i)return;if(!i.type.match("image/(png|jpeg|jpg|webp)"))return r("Formato no soportado. Usa PNG, JPG o WEBP","error",3e3);if(i.size>50*1024*1024)return r("Archivo muy grande (máx 50MB)","error",3e3);const a=new FileReader;a.onload=n=>{const o=new Image;o.onload=()=>{s={file:i,url:n.target.result,size:i.size,width:o.width,height:o.height,name:i.name},t=null,y(),r(`Imagen cargada: ${i.name}`,"success",2e3)},o.src=n.target.result},a.readAsDataURL(i)}function y(){s&&(e("#dropPlaceholder").hide(),e("#previewContainer").show(),e("#previewImage").attr("src",s.url),e("#originalSize").text(v(s.size)),e("#originalDimensions").text(`${s.width}×${s.height}`),e("#fileNameDisplay").text(s.name).attr("title",s.name),e("#infoSection, #fileNameSection").fadeIn(300),e("#compressedSize, #compressedDimensions").text("--"),e("#reductionDisplay").hide())}async function x(){if(!s)return r("Primero carga una imagen","warning",2e3);const i=e("#btnCompress");i.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');try{const a=parseInt(e("#quality").val())/100,n=parseInt(e("#maxWidth").val()),o=parseInt(e("#maxWidth").val()),l=performance.now(),c=await new Promise((m,d)=>{new b(s.file,{quality:a,maxWidth:n,maxHeight:o,convertSize:5e6,mimeType:s.file.type==="image/png"&&s.file.size>5e6?"image/jpeg":void 0,success:m,error:d})}),h=performance.now(),g=new FileReader;await new Promise(m=>{g.onload=d=>{const p=new Image;p.onload=()=>{const u=((s.size-c.size)/s.size*100).toFixed(1);t={blob:c,url:d.target.result,size:c.size,width:p.width,height:p.height,reduccion:u,tiempo:((h-l)/1e3).toFixed(2)},e("#previewImage").attr("src",t.url),e("#compressedSize").text(v(t.size)),e("#compressedDimensions").text(`${t.width}×${t.height}`),e("#reductionPercent").text(`${u}%`),e("#reductionDisplay").fadeIn(300),r(`¡Comprimida! Reducción: ${u}% en ${t.tiempo}s`,"success",3e3),m()},p.src=d.target.result},g.readAsDataURL(c)})}catch(a){console.error("Error:",a),r("Error al comprimir","error")}i.prop("disabled",!1).html('<i class="fas fa-compress-alt"></i> <span>Comprimir</span>')}function C(){if(!t)return r("Primero comprime la imagen","warning",2e3);const i=URL.createObjectURL(t.blob),a=document.createElement("a");a.href=i,a.download=`comprimido_${s.name}`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),_("#btnDownload","¡Descargado! 🎉","success",1500)}function D(){if(!s&&!t)return r("No hay imagen para eliminar","warning",2e3);s=null,t=null,e("#previewContainer").hide(),e("#dropPlaceholder").show(),e("#previewImage").attr("src",""),e("#infoSection, #fileNameSection").hide(),e("#fileInput").val(""),e("#quality").val(70),e("#maxWidth").val(1920),r("Imagen eliminada correctamente","success",2e3)}const k=()=>{console.log("🧹 Comprimir limpiado"),s=null,t=null,e("#fileInput, #btnCompress, #btnDownload, #btnSelect, #btnDelete, #dropZone").off(),e(document).off("paste")};export{k as cleanup,S as init,P as render};
