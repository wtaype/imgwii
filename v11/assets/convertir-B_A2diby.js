import{j as t}from"./vendor-gzd0YkcT.js";import{c as M,N as d,w as O}from"./main-BJdlpthx.js";import"./main-Cji-o2Zg.js";import"./firebase-xYuwcABI.js";let s=[],c=null,b=!1,z=1;const A=i=>{if(!i)return"0 B";const e=1024,a=["B","KB","MB","GB"],o=Math.floor(Math.log(i)/Math.log(e));return`${(i/Math.pow(e,o)).toFixed(1)} ${a[o]}`},W=()=>`
  <div class="convert_container">
    <div class="conv_layout">
      <div class="conv_left">
        <div class="conv_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-exchange-alt"></i>
            <h2>Arrastra tus imágenes aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, WEBP, AVIF, BMP, GIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" multiple hidden>
        </div>
        <div class="conv_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <img id="previewImage" src="" alt="Preview">
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
              <div class="stat_compact format_selector">
                <i class="fas fa-file-image"></i>
                <select id="formatSelect">
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                  <option value="avif">AVIF</option>
                  <option value="bmp">BMP</option>
                </select>
              </div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnConvertCurrent"><i class="fas fa-exchange-alt"></i><span>Convertir</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
          <div class="progress_container dpn" id="progressContainer">
            <div class="progress_bar">
              <div class="progress_fill" id="progressFill"></div>
            </div>
            <div class="progress_text" id="progressText">Convirtiendo... 0%</div>
          </div>
        </div>
      </div>
      <div class="conv_right">
        <div class="files_section">
          <div class="files_header">
            <h3><i class="fas fa-images"></i> Archivos (<span id="filesCount">0</span>)</h3>
            <button class="btn_clear_all" id="btnClearAll" title="Limpiar todo"><i class="fas fa-trash"></i></button>
          </div>
          <div class="files_list" id="filesList">
            <div class="files_empty"><i class="fas fa-folder-open"></i><p>Sin archivos</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`,q=()=>{console.log(`✅ Convertidor de ${M} cargado`);const i=t("#dropZone");t("#fileInput").on("change",e=>$(e.target.files)),t("#btnConvertCurrent").on("click",L),t("#btnDownloadCurrent").on("click",N),t("#btnClearAll").on("click",D),i.on("dragover",e=>{e.preventDefault(),i.addClass("dragover")}),i.on("dragleave",e=>{e.preventDefault(),i.removeClass("dragover")}),i.on("drop",e=>{e.preventDefault(),i.removeClass("dragover"),$(e.originalEvent.dataTransfer.files)}),i.on("dblclick",e=>{e.preventDefault(),t("#fileInput").trigger("click")}),t(document).on("paste",k),j()},k=i=>{const e=i.originalEvent?.clipboardData?.items;if(!e)return;let a=!1;t.each(e,(o,r)=>{if(r.type.startsWith("image/")){const n=r.getAsFile();if(!n)return!0;const l=new File([n],`Captura_${z++}.png`,{type:n.type});return $([l]),a=!0,t("#dropZone, #previewArea").addClass("paste_flash"),setTimeout(()=>{t("#dropZone, #previewArea").removeClass("paste_flash")},300),!1}}),!a&&i.originalEvent?.clipboardData?.items?.length>0&&d("No se detectó imagen en portapapeles","error",2e3)};function $(i){let e=0;Array.from(i).forEach(a=>{if(!a.type.startsWith("image/"))return d(`${a.name}: no es una imagen`,"error",2e3);if(a.size>50*1024*1024)return d(`${a.name}: muy grande (máx 50MB)`,"error",2e3);const o=new FileReader;o.onload=r=>{const n=new Image;n.onload=()=>{const l=a.type.split("/")[1].toUpperCase();s.push({id:Date.now()+Math.random(),file:a,original:{url:r.target.result,size:a.size,width:n.width,height:n.height,name:a.name,format:l},isConverted:!1}),++e===i.length&&(m(),s.length===e&&v(0),d(`${e} archivo(s) agregado(s)`,"success",2e3),C())},n.src=r.target.result},o.readAsDataURL(a)})}function v(i){if(i<0||i>=s.length)return;c=i;const e=s[i];t("#dropZone").is(":visible")&&t("#dropZone").fadeOut(200,()=>t("#previewArea").removeClass("dpn").hide().fadeIn(300)),t("#previewImage").attr("src",e.original.url),t("#previewStats").removeClass("dpn").hide().fadeIn(200),t("#statNombre").text(e.original.name),t("#statDimensiones").text(`${e.original.width}×${e.original.height}`),t("#statTamano").text(A(e.original.size)),t(".file_item").removeClass("active"),t(`.file_item[data-id="${e.id}"]`).addClass("active")}async function L(){if(c===null||b)return;const i=s[c],e=t("#formatSelect").val(),a=t("#btnConvertCurrent"),o=t("#progressContainer"),r=t("#progressFill"),n=t("#progressText");b=!0,a.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>'),o.removeClass("dpn");try{let l=0;const T=setInterval(()=>{l+=Math.random()*15,l>90&&(l=90),r.css("width",`${l}%`),n.text(`Convirtiendo... ${Math.round(l)}%`)},100),P=performance.now(),g=document.createElement("canvas"),S=g.getContext("2d"),p=new Image;await new Promise((f,h)=>{p.onload=f,p.onerror=h,p.src=i.original.url}),g.width=p.width,g.height=p.height,S.drawImage(p,0,0);const I=`image/${e==="jpg"?"jpeg":e}`,B=e==="jpeg"||e==="webp"?.92:void 0,u=await new Promise(f=>{g.toBlob(f,I,B)});clearInterval(T),r.css("width","100%"),n.text("Conversión completa! 100%");const E=performance.now(),x=i.original.name.replace(/\.[^.]+$/,`.${e}`),y=new FileReader;await new Promise(f=>{y.onload=h=>{const w=new Image;w.onload=()=>{const _=((u.size-i.original.size)/i.original.size*100).toFixed(1),F=_>0?"+":"";s.push({id:Date.now()+Math.random(),file:new File([u],x,{type:I}),original:{url:h.target.result,size:u.size,width:w.width,height:w.height,name:x,format:e.toUpperCase()},isConverted:!0,cambioTamano:_,tiempoConversion:((E-P)/1e3).toFixed(2),formatoOriginal:i.original.format}),m(),v(s.length-1),d(`¡Convertido a ${e.toUpperCase()}! ${F}${_}%`,"success",2e3),C(),setTimeout(()=>{o.addClass("dpn"),r.css("width","0%")},1500),f()},w.src=h.target.result},y.readAsDataURL(u)})}catch(l){console.error("Error:",l),d("Error al convertir","error"),o.addClass("dpn"),r.css("width","0%")}b=!1,a.prop("disabled",!1).html('<i class="fas fa-exchange-alt"></i> <span>Convertir</span>')}function N(){if(c===null)return;const i=s[c],e=URL.createObjectURL(i.file),a=document.createElement("a");a.href=e,a.download=i.original.name,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(e),O("#btnDownloadCurrent","¡Descargado! 🎉","success",1500)}function D(){s.length&&(s=[],c=null,z=1,t("#fileInput").val(""),t("#previewArea").fadeOut(200,()=>t("#dropZone").fadeIn(300)),t("#previewStats").addClass("dpn"),t("#progressContainer").addClass("dpn"),m(),d("Todo limpiado","success",1500),localStorage.removeItem("convertir_session"))}function m(){t("#filesCount").text(s.length),U()}function U(){const i=t("#filesList");if(!s.length)return i.html('<div class="files_empty"><i class="fas fa-folder-open"></i><p>Sin archivos</p></div>');i.html(s.map((e,a)=>{const o=e.isConverted,r=o?"fa-check-circle":"fa-image",n=o?"var(--success)":"var(--mco)";return`
      <div class="file_item ${a===c?"active":""} ${o?"converted":""}" data-id="${e.id}">
        <div class="file_icon"><i class="fas ${r}" style="color: ${n}"></i></div>
        <div class="file_info">
          <span class="file_name">${e.original.name}</span>
          <div class="file_meta">
            <span class="file_format">${e.original.format}</span>
            <span class="file_size">${A(e.original.size)}</span>
            ${o?`<span class="file_change">${e.cambioTamano>0?"+":""}${e.cambioTamano}%</span>`:""}
          </div>
        </div>
        <button class="btn_file_delete" data-id="${e.id}"><i class="fas fa-times"></i></button>
      </div>
    `}).join("")),t(".file_item").on("click",function(e){if(t(e.target).closest(".btn_file_delete").length)return;const a=s.findIndex(o=>o.id===t(this).data("id"));a!==-1&&v(a)}),t(".btn_file_delete").on("click",function(e){e.stopPropagation();const a=s.findIndex(o=>o.id===t(this).data("id"));if(a!==-1){if(s.splice(a,1),!s.length)return D();c>=s.length&&(c=s.length-1),v(c),m(),C()}})}const C=()=>{const i=s.map(e=>({id:e.id,name:e.original.name,url:e.original.url,size:e.original.size,width:e.original.width,height:e.original.height,format:e.original.format,isConverted:e.isConverted,cambioTamano:e.cambioTamano,formatoOriginal:e.formatoOriginal}));localStorage.setItem("convertir_session",JSON.stringify(i))},j=()=>{const i=localStorage.getItem("convertir_session");if(i)try{const e=JSON.parse(i);if(!e.length||s.length>0)return;e.forEach(a=>{s.push({id:a.id,file:null,original:{url:a.url,name:a.name,size:a.size,width:a.width,height:a.height,format:a.format},isConverted:a.isConverted,cambioTamano:a.cambioTamano,formatoOriginal:a.formatoOriginal})}),m(),s.length>0&&v(0),console.log(`✅ ${s.length} archivo(s) restaurados`)}catch(e){console.error("Error cargando sesión:",e)}},V=()=>{C(),t(document).off("paste")};export{V as cleanup,q as init,W as render};
