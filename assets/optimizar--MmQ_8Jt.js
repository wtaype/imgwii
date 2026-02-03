import{j as i}from"./vendor-gzd0YkcT.js";import{i as b}from"./browser-image-compression-DILJcqf6.js";import{c as _,N as r,w}from"./main-BW9oKZ0g.js";import"./main-DPsc1Z-h.js";import"./firebase-xYuwcABI.js";let n=null,t=null;const g=a=>{if(!a)return"0 B";const e=1024,o=["B","KB","MB","GB"],s=Math.floor(Math.log(a)/Math.log(e));return`${(a/Math.pow(e,s)).toFixed(1)} ${o[s]}`},C=()=>`
  <div class="optimizar_container">
    <div class="opt_layout">
      <!-- LEFT COLUMN (29%) -->
      <div class="opt_left">
        <div class="opt_config_section">
          <div class="config_header">
            <h3><i class="fas fa-sliders-h"></i> Configuración</h3>
          </div>

          <div class="config_grid">
            <div class="config_item">
              <label><i class="fas fa-star"></i> Calidad:</label>
              <div class="input_wrapper">
                <input type="number" id="quality" min="10" max="100" value="80" step="5">
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
            <button class="btn_optimize" id="btnOptimize">
              <i class="fas fa-magic"></i>
              <span>Optimizar</span>
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

        <div class="opt_info_section" id="infoSection" style="display:none;">
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
              <span class="comparison_label">Optimizado:</span>
              <div class="comparison_data">
                <span class="data_size success" id="optimizedSize">--</span>
                <span class="data_dimensions" id="optimizedDimensions">--</span>
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
      <div class="opt_right">
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
`,$=()=>{console.log(`✅ Optimizar de ${_} cargado`);const a=i("#dropZone");i("#fileInput").on("change",e=>m(e.target.files[0])),i("#btnOptimize").on("click",y),i("#btnDownload").on("click",x),i("#btnSelect").on("click",()=>i("#fileInput").trigger("click")),i("#btnDelete").on("click",D),a.on("dragover",e=>{e.preventDefault(),a.addClass("dragover")}),a.on("dragleave",e=>{e.preventDefault(),a.removeClass("dragover")}),a.on("drop",e=>{e.preventDefault(),a.removeClass("dragover");const o=e.originalEvent.dataTransfer.files[0];o&&m(o)}),a.on("dblclick",()=>i("#fileInput").trigger("click")),i(document).on("paste",e=>{const o=e.originalEvent.clipboardData?.items;if(o){for(let s of o)if(s.type.indexOf("image")!==-1){const l=s.getAsFile();l&&(m(l),r("¡Imagen pegada desde portapapeles!","success",2e3));break}}})};function m(a){if(!a)return;if(!a.type.match("image/(png|jpeg|jpg|webp)"))return r("Formato no soportado. Usa PNG, JPG o WEBP","error",3e3);if(a.size>50*1024*1024)return r("Archivo muy grande (máx 50MB)","error",3e3);const e=new FileReader;e.onload=o=>{const s=new Image;s.onload=()=>{n={file:a,url:o.target.result,size:a.size,width:s.width,height:s.height,name:a.name},t=null,z(),r(`Imagen cargada: ${a.name}`,"success",2e3)},s.src=o.target.result},e.readAsDataURL(a)}function z(){n&&(i("#dropPlaceholder").hide(),i("#previewContainer").show(),i("#previewImage").attr("src",n.url),i("#originalSize").text(g(n.size)),i("#originalDimensions").text(`${n.width}×${n.height}`),i("#fileNameDisplay").text(n.name).attr("title",n.name),i("#infoSection, #fileNameSection").fadeIn(300),i("#optimizedSize, #optimizedDimensions").text("--"),i("#reductionDisplay").hide())}async function y(){if(!n)return r("Primero carga una imagen","warning",2e3);const a=i("#btnOptimize");a.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');try{const e=parseInt(i("#quality").val())/100,s={maxSizeMB:50,maxWidthOrHeight:parseInt(i("#maxWidth").val()),useWebWorker:!0,initialQuality:e},l=performance.now(),d=await b(n.file,s),v=performance.now(),u=new FileReader;await new Promise(h=>{u.onload=f=>{const c=new Image;c.onload=()=>{const p=((n.size-d.size)/n.size*100).toFixed(1);t={blob:d,url:f.target.result,size:d.size,width:c.width,height:c.height,reduccion:p,tiempo:((v-l)/1e3).toFixed(2)},i("#previewImage").attr("src",t.url),i("#optimizedSize").text(g(t.size)),i("#optimizedDimensions").text(`${t.width}×${t.height}`),i("#reductionPercent").text(`${p}%`),i("#reductionDisplay").fadeIn(300),r(`¡Optimizado! Reducción: ${p}% en ${t.tiempo}s`,"success",3e3),h()},c.src=f.target.result},u.readAsDataURL(d)})}catch(e){console.error("Error:",e),r("Error al optimizar","error")}a.prop("disabled",!1).html('<i class="fas fa-magic"></i> <span>Optimizar</span>')}function x(){if(!t)return r("Primero optimiza la imagen","warning",2e3);const a=URL.createObjectURL(t.blob),e=document.createElement("a");e.href=a,e.download=`optimizado_${n.name}`,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(a),w("#btnDownload","¡Descargado! 🎉","success",1500)}function D(){if(!n&&!t)return r("No hay imagen para eliminar","warning",2e3);n=null,t=null,i("#previewContainer").hide(),i("#dropPlaceholder").show(),i("#previewImage").attr("src",""),i("#infoSection, #fileNameSection").hide(),i("#fileInput").val(""),i("#quality").val(80),i("#maxWidth").val(1920),r("Imagen eliminada correctamente","success",2e3)}const N=()=>{console.log("🧹 Optimizar limpiado"),n=null,t=null,i("#fileInput, #btnOptimize, #btnDownload, #btnSelect, #btnDelete, #dropZone").off(),i(document).off("paste")};export{N as cleanup,$ as init,C as render};
