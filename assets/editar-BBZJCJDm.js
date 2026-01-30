import{j as e}from"./vendor-gzd0YkcT.js";import{c as m,N as o,w as b}from"./main-BWRqHA95.js";import"./main-BgQ3oyBL.js";import"./firebase-xYuwcABI.js";let r=null,_=1,l={brightness:100,contrast:100,saturate:100,blur:0,grayscale:0,sepia:0,hueRotate:0,invert:0,opacity:100,rotate:0,flipH:1,flipV:1};const w=t=>{if(!t)return"0 B";const a=1024,i=["B","KB","MB","GB"],s=Math.floor(Math.log(t)/Math.log(a));return`${(t/Math.pow(a,s)).toFixed(1)} ${i[s]}`},D=()=>`
  <div class="edit_container">
    <div class="edit_layout">
      <div class="edit_left">
        <div class="edit_drop_zone" id="dropZone">
          <div class="drop_placeholder">
            <i class="fas fa-magic"></i>
            <h2>Arrastra tu imagen aquí</h2>
            <p>o haz doble clic para seleccionar</p>
            <small>PNG, JPG, WEBP, AVIF (máx 50MB)</small>
          </div>
          <input type="file" id="fileInput" accept="image/*" hidden>
        </div>
        <div class="edit_preview dpn" id="previewArea">
          <div class="preview_image_container">
            <canvas id="editCanvas"></canvas>
          </div>
          <div class="preview_stats dpn" id="previewStats">
            <div class="stats_info">
              <div class="stat_compact"><i class="fas fa-file-alt"></i><span id="statNombre">-</span></div>
              <div class="stat_compact"><i class="fas fa-expand-arrows-alt"></i><span id="statDimensiones">-</span></div>
              <div class="stat_compact"><i class="fas fa-weight-hanging"></i><span id="statTamano">-</span></div>
            </div>
            <div class="stats_controls">
              <button class="btn_stat_control" id="btnResetFilters"><i class="fas fa-undo"></i><span>Resetear</span></button>
              <button class="btn_stat_control" id="btnApplyFilters"><i class="fas fa-check"></i><span>Aplicar</span></button>
              <button class="btn_stat_control" id="btnDownloadCurrent"><i class="fas fa-download"></i><span>Descargar</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="edit_right">
        <div class="filters_section">
          <div class="filters_header">
            <h3><i class="fas fa-sliders-h"></i> Ajustes</h3>
          </div>
          <div class="filters_list" id="filtersList">
            <div class="filter_group">
              <label><i class="fas fa-sun"></i> Brillo</label>
              <input type="range" id="brightness" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="brightnessValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-adjust"></i> Contraste</label>
              <input type="range" id="contrast" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="contrastValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-palette"></i> Saturación</label>
              <input type="range" id="saturate" min="0" max="200" value="100" step="1">
              <span class="filter_value" id="saturateValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-blur"></i> Desenfoque</label>
              <input type="range" id="blur" min="0" max="10" value="0" step="0.5">
              <span class="filter_value" id="blurValue">0px</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-circle-half-stroke"></i> Escala de grises</label>
              <input type="range" id="grayscale" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="grayscaleValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-camera-retro"></i> Sepia</label>
              <input type="range" id="sepia" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="sepiaValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-rainbow"></i> Tono</label>
              <input type="range" id="hueRotate" min="0" max="360" value="0" step="1">
              <span class="filter_value" id="hueRotateValue">0°</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-exchange-alt"></i> Invertir</label>
              <input type="range" id="invert" min="0" max="100" value="0" step="1">
              <span class="filter_value" id="invertValue">0%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-eye"></i> Opacidad</label>
              <input type="range" id="opacity" min="0" max="100" value="100" step="1">
              <span class="filter_value" id="opacityValue">100%</span>
            </div>
            <div class="filter_group">
              <label><i class="fas fa-redo"></i> Rotación</label>
              <input type="range" id="rotate" min="0" max="360" value="0" step="90">
              <span class="filter_value" id="rotateValue">0°</span>
            </div>
          </div>
          <div class="transform_buttons">
            <button class="btn_transform" id="btnFlipH"><i class="fas fa-arrows-alt-h"></i> Voltear H</button>
            <button class="btn_transform" id="btnFlipV"><i class="fas fa-arrows-alt-v"></i> Voltear V</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`,z=()=>{console.log(`✅ Editor de ${m} cargado`);const t=e("#dropZone");e("#fileInput").on("change",a=>p(a.target.files[0])),e("#btnResetFilters").on("click",g),e("#btnApplyFilters").on("click",V),e("#btnDownloadCurrent").on("click",$),e("#btnFlipH").on("click",()=>v("h")),e("#btnFlipV").on("click",()=>v("v")),t.on("dragover",a=>{a.preventDefault(),t.addClass("dragover")}),t.on("dragleave",a=>{a.preventDefault(),t.removeClass("dragover")}),t.on("drop",a=>{a.preventDefault(),t.removeClass("dragover");const i=a.originalEvent.dataTransfer.files;i.length&&p(i[0])}),t.on("dblclick",a=>{a.preventDefault(),e("#fileInput").trigger("click")}),e(document).on("paste",x),y(),C()},x=t=>{const a=t.originalEvent?.clipboardData?.items;if(!a)return;let i=!1;e.each(a,(s,n)=>{if(n.type.startsWith("image/")){const d=n.getAsFile();if(!d)return!0;const h=new File([d],`Captura_${_++}.png`,{type:d.type});return p(h),i=!0,e("#dropZone, #previewArea").addClass("paste_flash"),setTimeout(()=>{e("#dropZone, #previewArea").removeClass("paste_flash")},300),!1}}),!i&&t.originalEvent?.clipboardData?.items?.length>0&&o("No se detectó imagen en portapapeles","error",2e3)};function p(t){if(!t)return;if(!t.type.startsWith("image/"))return o(`${t.name}: no es una imagen`,"error",2e3);if(t.size>50*1024*1024)return o(`${t.name}: muy grande (máx 50MB)`,"error",2e3);const a=new FileReader;a.onload=i=>{const s=new Image;s.onload=()=>{r={file:t,original:{url:i.target.result,size:t.size,width:s.width,height:s.height,name:t.name},img:s},f(),g(),o("Imagen cargada","success",1500),u()},s.src=i.target.result},a.readAsDataURL(t)}function f(){if(!r)return;e("#dropZone").is(":visible")&&e("#dropZone").fadeOut(200,()=>e("#previewArea").removeClass("dpn").hide().fadeIn(300));const t=e("#editCanvas")[0];t.getContext("2d");const a=r.img;t.width=a.width,t.height=a.height,c(),e("#previewStats").removeClass("dpn").hide().fadeIn(200),e("#statNombre").text(r.original.name),e("#statDimensiones").text(`${r.original.width}×${r.original.height}`),e("#statTamano").text(w(r.original.size))}function y(){["brightness","contrast","saturate","blur","grayscale","sepia","hueRotate","invert","opacity","rotate"].forEach(a=>{e(`#${a}`).on("input",function(){const i=e(this).val();l[a]=parseFloat(i);let s=i;a==="blur"?s=`${i}px`:a==="rotate"||a==="hueRotate"?s=`${i}°`:s=`${i}%`,e(`#${a}Value`).text(s),c()})})}function c(){if(!r)return;const t=e("#editCanvas")[0],a=t.getContext("2d"),i=r.img;a.clearRect(0,0,t.width,t.height),a.save(),a.translate(t.width/2,t.height/2),a.rotate(l.rotate*Math.PI/180),a.scale(l.flipH,l.flipV),a.filter=`
    brightness(${l.brightness}%)
    contrast(${l.contrast}%)
    saturate(${l.saturate}%)
    blur(${l.blur}px)
    grayscale(${l.grayscale}%)
    sepia(${l.sepia}%)
    hue-rotate(${l.hueRotate}deg)
    invert(${l.invert}%)
    opacity(${l.opacity}%)
  `,a.drawImage(i,-i.width/2,-i.height/2,i.width,i.height),a.restore()}function g(){l={brightness:100,contrast:100,saturate:100,blur:0,grayscale:0,sepia:0,hueRotate:0,invert:0,opacity:100,rotate:0,flipH:1,flipV:1},e("#brightness").val(100),e("#brightnessValue").text("100%"),e("#contrast").val(100),e("#contrastValue").text("100%"),e("#saturate").val(100),e("#saturateValue").text("100%"),e("#blur").val(0),e("#blurValue").text("0px"),e("#grayscale").val(0),e("#grayscaleValue").text("0%"),e("#sepia").val(0),e("#sepiaValue").text("0%"),e("#hueRotate").val(0),e("#hueRotateValue").text("0°"),e("#invert").val(0),e("#invertValue").text("0%"),e("#opacity").val(100),e("#opacityValue").text("100%"),e("#rotate").val(0),e("#rotateValue").text("0°"),c(),o("Filtros reseteados","info",1500)}function v(t){t==="h"?l.flipH*=-1:l.flipV*=-1,c()}function V(){if(!r)return;e("#editCanvas")[0].toBlob(a=>{const i=new File([a],r.original.name,{type:"image/png"});r.file=i,r.original.size=a.size,o("¡Filtros aplicados!","success",2e3),u()},"image/png")}function $(){if(!r)return;e("#editCanvas")[0].toBlob(a=>{const i=URL.createObjectURL(a),s=document.createElement("a");s.href=i,s.download=r.original.name.replace(/\.[^.]+$/,"_editado.png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i),b("#btnDownloadCurrent","¡Descargado! 🎉","success",1500)},"image/png")}const u=()=>{if(!r)return;const t={name:r.original.name,url:r.original.url,size:r.original.size,width:r.original.width,height:r.original.height,filtros:l};localStorage.setItem("editar_session",JSON.stringify(t))},C=()=>{const t=localStorage.getItem("editar_session");if(!(!t||r))try{const a=JSON.parse(t),i=new Image;i.onload=()=>{r={file:null,original:{url:a.url,name:a.name,size:a.size,width:a.width,height:a.height},img:i},l=a.filtros||l,f(),Object.keys(l).forEach(s=>{if(e(`#${s}`).length){e(`#${s}`).val(l[s]);let n=l[s];s==="blur"?n=`${l[s]}px`:s==="rotate"||s==="hueRotate"?n=`${l[s]}°`:n=`${l[s]}%`,e(`#${s}Value`).text(n)}}),console.log("✅ Imagen restaurada")},i.src=a.url}catch(a){console.error("Error cargando sesión:",a)}},B=()=>{u(),e(document).off("paste")};export{B as cleanup,z as init,D as render};
