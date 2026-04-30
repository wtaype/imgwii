import{j as e,i as U}from"./vendor-BOJxWFg6.js";import{b as k,e as g,n as N}from"./index-gR8PmHRz.js";let c=null,v=null,C=!1;const F=a=>{if(!a)return"0 B";const i=1024,t=["B","KB","MB","GB"],s=Math.floor(Math.log(a)/Math.log(i));return`${(a/Math.pow(i,s)).toFixed(1)} ${t[s]}`},j=a=>a.replace(/\.[^/.]+$/,""),h={webp:{default:65,canvas:.65,label:"WebP"},avif:{default:65,canvas:.65,label:"AVIF"},jpeg:{default:65,canvas:.65,label:"JPEG"},jpg:{default:65,canvas:.65,label:"JPEG"},png:{default:65,canvas:null,label:"PNG"},bmp:{default:65,canvas:null,label:"BMP"}};async function E(a,i,t){return new Promise((s,n)=>{const o=URL.createObjectURL(a),r=new Image;r.onload=()=>{const l=document.createElement("canvas");l.width=r.naturalWidth,l.height=r.naturalHeight;const m=i==="image/png"||i==="image/bmp",d=l.getContext("2d",{alpha:m,willReadFrequently:!1});i==="image/jpeg"&&(d.fillStyle="#FFFFFF",d.fillRect(0,0,l.width,l.height)),d.imageSmoothingEnabled=!0,d.imageSmoothingQuality="high",d.drawImage(r,0,0),URL.revokeObjectURL(o);const S=t??void 0;l.toBlob(p=>p?s(p):n(new Error("Canvas toBlob failed")),i,S)},r.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image load failed"))},r.src=o})}async function G(a,i,t,s){if(i==="image/png"||i==="image/bmp")return a;let o=s,r=a,l=0;const m=6,d=.3;for(;r.size>t&&o>d&&l<m;)o-=.08,o=Math.max(o,d),r=await E(a,i,o),l++;return r}const Q=()=>`
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
                  <option value="webp"  selected>WebP</option>
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
                <input type="number" id="quality" min="10" max="100" value="65" step="5">
                <span class="input_unit">%</span>
              </div>
            </div>
          </div>

          <!-- TAMAÑO OBJETIVO (NUEVO) -->
          <div class="target_size_row">
            <label class="target_size_label">
              <i class="fas fa-bullseye"></i>
              Tamaño máximo objetivo:
            </label>
            <div class="target_size_inputs">
              <div class="input_wrapper target_input_wrap">
                <input type="number" id="targetSize" min="10" max="50000" placeholder="Auto" step="10">
              </div>
              <div class="select_wrapper target_unit_wrap">
                <select id="targetUnit">
                  <option value="kb" selected>KB</option>
                  <option value="mb">MB</option>
                </select>
              </div>
              <button class="btn_target_clear" id="btnTargetClear" title="Limpiar objetivo">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <span class="target_hint">Deja vacío para compresión automática</span>
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

        <!-- INFO / COMPARACIÓN -->
        <div class="conv_info_section" id="infoSection" style="display:none;">
          <div class="info_header">
            <h4><i class="fas fa-chart-line"></i> Comparación</h4>
          </div>

          <div class="comparison_grid">
            <div class="comparison_col">
              <span class="comparison_label">Original:</span>
              <div class="comparison_data">
                <span class="data_size"     id="originalSize">--</span>
                <span class="data_dimensions" id="originalDimensions">--</span>
                <span class="data_format"   id="originalFormat">--</span>
              </div>
            </div>

            <div class="comparison_arrow"><i class="fas fa-arrow-right"></i></div>

            <div class="comparison_col">
              <span class="comparison_label">Convertido:</span>
              <div class="comparison_data">
                <span class="data_size success"   id="convertedSize">--</span>
                <span class="data_dimensions"     id="convertedDimensions">--</span>
                <span class="data_format success" id="convertedFormat">--</span>
              </div>
            </div>
          </div>

          <div class="reduction_display" id="reductionDisplay" style="display:none;">
            <i class="fas fa-chart-pie"></i>
            <span id="reductionLabel">Reducción: <strong id="reductionPercent">0%</strong></span>
          </div>

          <!-- BADGES PRO -->
          <div class="pro_badges" id="proBadges" style="display:none;">
            <span class="badge badge_exif"><i class="fas fa-shield-alt"></i> EXIF eliminado</span>
            <span class="badge badge_time" id="badgeTime"></span>
          </div>
        </div>

        <!-- PROGRESO -->
        <div class="progress_section" id="progressSection" style="display:none;">
          <div class="progress_header">
            <span id="progressLabel">Procesando...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress_bar">
            <div class="progress_fill" id="progressFill"></div>
          </div>
          <div class="progress_detail" id="progressDetail"></div>
        </div>

        <!-- NOMBRE ARCHIVO -->
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
`,H=()=>{console.log(`✅ Convertir PRO de ${k} cargado`);const a=e("#dropZone");e("#formatSelect").on("change",()=>{const i=e("#formatSelect").val(),t=h[i]||h.webp;e("#quality").val(t.default),P()}),e("#quality").on("input",()=>{v&&P()}),e("#fileInput").on("change",i=>x(i.target.files[0])),e("#btnConvert").on("click",B),e("#btnDownload").on("click",q),e("#btnSelect").on("click",()=>e("#fileInput").trigger("click")),e("#btnDelete").on("click",V),e("#btnTargetClear").on("click",()=>{e("#targetSize").val("")}),a.on("dragover",i=>{i.preventDefault(),a.addClass("dragover")}),a.on("dragleave",i=>{i.preventDefault(),a.removeClass("dragover")}),a.on("drop",i=>{i.preventDefault(),a.removeClass("dragover");const t=i.originalEvent.dataTransfer.files[0];t&&x(t)}),e("#dropPlaceholder").on("click",()=>e("#fileInput").trigger("click")),e(document).on("paste",i=>{const t=i.originalEvent.clipboardData?.items;if(t){for(let s of t)if(s.type.indexOf("image")!==-1){const n=s.getAsFile();if(n){const o=s.type.split("/")[1]||"png",r=new File([n],`Captura_${Date.now()}.${o}`,{type:s.type});x(r),a.addClass("paste_flash"),setTimeout(()=>a.removeClass("paste_flash"),300),g("¡Imagen pegada desde portapapeles!","success",2e3)}break}}})};function x(a){if(!a)return;if(!a.type.startsWith("image/"))return g("Por favor selecciona un archivo de imagen válido","error",3e3);if(a.size>50*1024*1024)return g("Archivo muy grande (máx 50MB)","error",3e3);const i=new FileReader;i.onload=t=>{const s=new Image;s.onload=()=>{const n=a.name.split(".").pop().toLowerCase(),o=n==="jpg"?"JPEG":n.toUpperCase();c={file:a,url:t.target.result,size:a.size,width:s.width,height:s.height,name:a.name,format:o},v=null;const r=e("#formatSelect").val(),l=h[r]||h.webp;e("#quality").val(l.default),T(),g(`Imagen cargada: ${a.name}`,"success",2e3),B()},s.src=t.target.result},i.readAsDataURL(a)}function T(){c&&(e("#dropPlaceholder").hide(),e("#previewContainer").show(),e("#previewImage").attr("src",c.url),e("#originalSize").text(F(c.size)),e("#originalDimensions").text(`${c.width}×${c.height}`),e("#originalFormat").text(c.format),e("#fileNameDisplay").text(c.name).attr("title",c.name),e("#infoSection, #fileNameSection").fadeIn(300),P())}function P(){e("#convertedSize, #convertedDimensions, #convertedFormat").text("--"),e("#reductionDisplay, #proBadges").hide()}async function B(){if(!c)return g("Primero carga una imagen","warning",2e3);if(C)return g("Ya hay una conversión en progreso","warning",2e3);const a=e("#formatSelect").val(),i=`image/${a==="jpg"?"jpeg":a}`,t=h[a]||h.webp,s=parseInt(e("#quality").val()),n=s/100,o=parseFloat(e("#targetSize").val()),r=e("#targetUnit").val(),l=!isNaN(o)&&o>0?r==="mb"?o*1024*1024:o*1024:null,m=e("#btnConvert");C=!0,m.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>'),e("#progressSection").fadeIn(300),b(0,"Iniciando motor PRO...");try{const d=performance.now();b(15,"Comprimiendo con motor principal...");const S={maxSizeMB:50,useWebWorker:!0,fileType:i,initialQuality:n,alwaysKeepResolution:!0};let p=await U(c.file,S);b(45,"Eliminando metadatos EXIF...");const R=t.canvas!=null?t.canvas*(s/t.default):null;p=await E(p,i,R),l&&p.size>l&&(b(65,`Ajustando al objetivo (${F(l)})...`),p=await G(p,i,l,R??n)),b(85,"Leyendo resultado..."),await new Promise(L=>{const $=new FileReader;$.onload=z=>{const u=new Image;u.onload=()=>{const M=performance.now(),D=c.size,I=p.size,f=((D-I)/D*100).toFixed(1),_=parseFloat(f)>0,y=((M-d)/1e3).toFixed(2);v={blob:p,url:z.target.result,size:I,width:u.width,height:u.height,format:t.label,extension:a==="jpeg"?"jpg":a,reduccion:Math.abs(f),esReduccion:_,tiempo:y},e("#previewImage").attr("src",v.url),e("#convertedSize").text(F(I)),e("#convertedDimensions").text(`${u.width}×${u.height}`),e("#convertedFormat").text(t.label);const w=e("#reductionDisplay"),O=e("#reductionLabel");_?(w.removeClass("warning").addClass("success"),w.find("i").attr("class","fas fa-chart-pie"),O.html(`Reducción: <strong id="reductionPercent">${f}%</strong>`)):(w.removeClass("success").addClass("warning"),w.find("i").attr("class","fas fa-arrow-up"),O.html(`Aumento: <strong id="reductionPercent">+${Math.abs(f)}%</strong>`)),w.fadeIn(300),e("#badgeTime").html(`<i class="fas fa-clock"></i> ${y}s`),e("#proBadges").fadeIn(300),b(100,"¡Listo!"),setTimeout(()=>{e("#progressSection").fadeOut(300);const A=_?`¡Convertido a ${t.label}! Ahorro: ${f}% en ${y}s`:`¡Convertido a ${t.label}! Archivo ${Math.abs(f)}% más grande en ${y}s`;g(A,_?"success":"warning",3500)},600),L()},u.src=z.target.result},$.readAsDataURL(p)})}catch(d){console.error("Error conversión PRO:",d),g("Error al convertir la imagen: "+d.message,"error"),e("#progressSection").fadeOut(300)}C=!1,m.prop("disabled",!1).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>')}function b(a,i=""){e("#progressFill").css("width",`${a}%`),e("#progressPercent").text(`${a}%`),i&&e("#progressLabel").text(i)}function q(){if(!v)return g("Primero convierte la imagen","warning",2e3);const a=j(c.name),i=v.extension,t=`${a}.${i}`,s=URL.createObjectURL(v.blob),n=document.createElement("a");n.href=s,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s),N("#btnDownload",`¡Descargado como ${t}! 🎉`,"success",2e3)}function V(){if(!c&&!v)return g("No hay imagen para eliminar","warning",2e3);c=null,v=null,e("#previewContainer").hide(),e("#dropPlaceholder").show(),e("#previewImage").attr("src",""),e("#infoSection, #fileNameSection, #progressSection").hide(),e("#fileInput").val(""),e("#formatSelect").val("webp"),e("#quality").val(65),e("#targetSize").val(""),P(),g("Imagen eliminada correctamente","success",2e3)}const K=()=>{console.log("🧹 Convertir PRO limpiado"),c=null,v=null,C=!1,e("#fileInput, #btnConvert, #btnDownload, #btnSelect, #btnDelete, #dropZone, #formatSelect, #quality, #targetSize, #targetUnit, #btnTargetClear").off(),e(document).off("paste")};export{K as cleanup,H as init,Q as render};
