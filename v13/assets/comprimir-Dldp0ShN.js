import{j as c}from"./vendor-gzd0YkcT.js";import{c as Re,N as B,w as Ue}from"./main-VEFui3rb.js";import"./main-Hd9TPuUq.js";import"./firebase-xYuwcABI.js";function fe(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),i.push.apply(i,a)}return i}function F(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?fe(Object(i),!0).forEach(function(a){_e(t,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):fe(Object(i)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(i,a))})}return t}function Ce(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ue(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,ge(a.key),a)}}function Pe(t,e,i){return e&&ue(t.prototype,e),i&&ue(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function _e(t,e,i){return e=ge(e),e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function z(){return z=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},z.apply(this,arguments)}function Ae(t,e){if(typeof t!="object"||t===null)return t;var i=t[Symbol.toPrimitive];if(i!==void 0){var a=i.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}function ge(t){var e=Ae(t,"string");return typeof e=="symbol"?e:String(e)}var be={exports:{}};(function(t){typeof window>"u"||(function(e){var i=e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype,a=e.Blob&&(function(){try{return!!new Blob}catch{return!1}})(),r=a&&e.Uint8Array&&(function(){try{return new Blob([new Uint8Array(100)]).size===100}catch{return!1}})(),n=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||e.MSBlobBuilder,m=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,d=(a||n)&&e.atob&&e.ArrayBuffer&&e.Uint8Array&&function(l){var s,f,u,y,p,o,w,v,R;if(s=l.match(m),!s)throw new Error("invalid data URI");for(f=s[2]?s[1]:"text/plain"+(s[3]||";charset=US-ASCII"),u=!!s[4],y=l.slice(s[0].length),u?p=atob(y):p=decodeURIComponent(y),o=new ArrayBuffer(p.length),w=new Uint8Array(o),v=0;v<p.length;v+=1)w[v]=p.charCodeAt(v);return a?new Blob([r?w:o],{type:f}):(R=new n,R.append(o),R.getBlob(f))};e.HTMLCanvasElement&&!i.toBlob&&(i.mozGetAsFile?i.toBlob=function(l,s,f){var u=this;setTimeout(function(){f&&i.toDataURL&&d?l(d(u.toDataURL(s,f))):l(u.mozGetAsFile("blob",s))})}:i.toDataURL&&d&&(i.msToBlob?i.toBlob=function(l,s,f){var u=this;setTimeout(function(){(s&&s!=="image/png"||f)&&i.toDataURL&&d?l(d(u.toDataURL(s,f))):l(u.msToBlob(s))})}:i.toBlob=function(l,s,f){var u=this;setTimeout(function(){l(d(u.toDataURL(s,f)))})})),t.exports?t.exports=d:e.dataURLtoBlob=d})(window)})(be);var me=be.exports,Oe=function(e){return typeof Blob>"u"?!1:e instanceof Blob||Object.prototype.toString.call(e)==="[object Blob]"},pe={strict:!0,checkOrientation:!0,retainExif:!1,maxWidth:1/0,maxHeight:1/0,minWidth:0,minHeight:0,width:void 0,height:void 0,resize:"none",quality:.8,mimeType:"auto",convertTypes:["image/png"],convertSize:5e6,beforeDraw:null,drew:null,success:null,error:null},Te=typeof window<"u"&&typeof window.document<"u",D=Te?window:{},j=function(e){return e>0&&e<1/0},Ie=Array.prototype.slice;function X(t){return Array.from?Array.from(t):Ie.call(t)}var ke=/^image\/.+$/;function G(t){return ke.test(t)}function Fe(t){var e=G(t)?t.substr(6):"";return e==="jpeg"&&(e="jpg"),".".concat(e)}var ye=String.fromCharCode;function ze(t,e,i){var a="",r;for(i+=e,r=e;r<i;r+=1)a+=ye(t.getUint8(r));return a}var je=D.btoa;function he(t,e){for(var i=[],a=8192,r=new Uint8Array(t);r.length>0;)i.push(ye.apply(null,X(r.subarray(0,a)))),r=r.subarray(a);return"data:".concat(e,";base64,").concat(je(i.join("")))}function Le(t){var e=new DataView(t),i;try{var a,r,n;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(var m=e.byteLength,d=2;d+1<m;){if(e.getUint8(d)===255&&e.getUint8(d+1)===225){r=d;break}d+=1}if(r){var l=r+4,s=r+10;if(ze(e,l,4)==="Exif"){var f=e.getUint16(s);if(a=f===18761,(a||f===19789)&&e.getUint16(s+2,a)===42){var u=e.getUint32(s+4,a);u>=8&&(n=s+u)}}}if(n){var y=e.getUint16(n,a),p,o;for(o=0;o<y;o+=1)if(p=n+o*12+2,e.getUint16(p,a)===274){p+=8,i=e.getUint16(p,a),e.setUint16(p,1,a);break}}}catch{i=1}return i}function Se(t){var e=0,i=1,a=1;switch(t){case 2:i=-1;break;case 3:e=-180;break;case 4:a=-1;break;case 5:e=90,a=-1;break;case 6:e=90;break;case 7:e=90,i=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:i,scaleY:a}}var Me=/\.\d*(?:0|9){12}\d*$/;function ve(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return Me.test(t)?Math.round(t*e)/e:t}function k(t){var e=t.aspectRatio,i=t.height,a=t.width,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",n=j(a),m=j(i);if(n&&m){var d=i*e;(r==="contain"||r==="none")&&d>a||r==="cover"&&d<a?i=a/e:a=i*e}else n?i=a/e:m&&(a=i*e);return{width:a,height:i}}function We(t){for(var e=X(new Uint8Array(t)),i=e.length,a=[],r=0;r+3<i;){var n=e[r],m=e[r+1];if(n===255&&m===218)break;if(n===255&&m===216)r+=2;else{var d=e[r+2]*256+e[r+3],l=r+d+2,s=e.slice(r,l);a.push(s),r=l}}return a.reduce(function(f,u){return u[0]===255&&u[1]===225?f.concat(u):f},[])}function He(t,e){var i=X(new Uint8Array(t));if(i[2]!==255||i[3]!==224)return t;var a=i[4]*256+i[5],r=[255,216].concat(e,i.slice(4+a));return new Uint8Array(r)}var $e=D.ArrayBuffer,$=D.FileReader,E=D.URL||D.webkitURL,Ne=/\.\w+$/,Ge=D.Compressor,Xe=(function(){function t(e,i){Ce(this,t),this.file=e,this.exif=[],this.image=new Image,this.options=F(F({},pe),i),this.aborted=!1,this.result=null,this.init()}return Pe(t,[{key:"init",value:function(){var i=this,a=this.file,r=this.options;if(!Oe(a)){this.fail(new Error("The first argument must be a File or Blob object."));return}var n=a.type;if(!G(n)){this.fail(new Error("The first argument must be an image File or Blob object."));return}if(!E||!$){this.fail(new Error("The current browser does not support image compression."));return}$e||(r.checkOrientation=!1,r.retainExif=!1);var m=n==="image/jpeg",d=m&&r.checkOrientation,l=m&&r.retainExif;if(E&&!d&&!l)this.load({url:E.createObjectURL(a)});else{var s=new $;this.reader=s,s.onload=function(f){var u=f.target,y=u.result,p={},o=1;d&&(o=Le(y),o>1&&z(p,Se(o))),l&&(i.exif=We(y)),d||l?!E||o>1?p.url=he(y,n):p.url=E.createObjectURL(a):p.url=y,i.load(p)},s.onabort=function(){i.fail(new Error("Aborted to read the image with FileReader."))},s.onerror=function(){i.fail(new Error("Failed to read the image with FileReader."))},s.onloadend=function(){i.reader=null},d||l?s.readAsArrayBuffer(a):s.readAsDataURL(a)}}},{key:"load",value:function(i){var a=this,r=this.file,n=this.image;n.onload=function(){a.draw(F(F({},i),{},{naturalWidth:n.naturalWidth,naturalHeight:n.naturalHeight}))},n.onabort=function(){a.fail(new Error("Aborted to load the image."))},n.onerror=function(){a.fail(new Error("Failed to load the image."))},D.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(D.navigator.userAgent)&&(n.crossOrigin="anonymous"),n.alt=r.name,n.src=i.url}},{key:"draw",value:function(i){var a=this,r=i.naturalWidth,n=i.naturalHeight,m=i.rotate,d=m===void 0?0:m,l=i.scaleX,s=l===void 0?1:l,f=i.scaleY,u=f===void 0?1:f,y=this.file,p=this.image,o=this.options,w=document.createElement("canvas"),v=w.getContext("2d"),R=Math.abs(d)%180===90,L=(o.resize==="contain"||o.resize==="cover")&&j(o.width)&&j(o.height),P=Math.max(o.maxWidth,0)||1/0,_=Math.max(o.maxHeight,0)||1/0,A=Math.max(o.minWidth,0)||0,O=Math.max(o.minHeight,0)||0,U=r/n,g=o.width,b=o.height;if(R){var q=[_,P];P=q[0],_=q[1];var V=[O,A];A=V[0],O=V[1];var Y=[b,g];g=Y[0],b=Y[1]}L&&(U=g/b);var J=k({aspectRatio:U,width:P,height:_},"contain");P=J.width,_=J.height;var K=k({aspectRatio:U,width:A,height:O},"cover");if(A=K.width,O=K.height,L){var Z=k({aspectRatio:U,width:g,height:b},o.resize);g=Z.width,b=Z.height}else{var Q=k({aspectRatio:U,width:g,height:b}),ee=Q.width;g=ee===void 0?r:ee;var ie=Q.height;b=ie===void 0?n:ie}g=Math.floor(ve(Math.min(Math.max(g,A),P))),b=Math.floor(ve(Math.min(Math.max(b,O),_)));var xe=-g/2,Be=-b/2,De=g,Ee=b,S=[];if(L){var ae=0,te=0,M=r,W=n,re=k({aspectRatio:U,width:r,height:n},{contain:"cover",cover:"contain"}[o.resize]);M=re.width,W=re.height,ae=(r-M)/2,te=(n-W)/2,S.push(ae,te,M,W)}if(S.push(xe,Be,De,Ee),R){var ne=[b,g];g=ne[0],b=ne[1]}w.width=g,w.height=b,G(o.mimeType)||(o.mimeType=y.type);var oe="transparent";y.size>o.convertSize&&o.convertTypes.indexOf(o.mimeType)>=0&&(o.mimeType="image/jpeg");var se=o.mimeType==="image/jpeg";if(se&&(oe="#fff"),v.fillStyle=oe,v.fillRect(0,0,g,b),o.beforeDraw&&o.beforeDraw.call(this,v,w),!this.aborted&&(v.save(),v.translate(g/2,b/2),v.rotate(d*Math.PI/180),v.scale(s,u),v.drawImage.apply(v,[p].concat(S)),v.restore(),o.drew&&o.drew.call(this,v,w),!this.aborted)){var le=function(T){if(!a.aborted){var ce=function(I){return a.done({naturalWidth:r,naturalHeight:n,result:I})};if(T&&se&&o.retainExif&&a.exif&&a.exif.length>0){var de=function(I){return ce(me(he(He(I,a.exif),o.mimeType)))};if(T.arrayBuffer)T.arrayBuffer().then(de).catch(function(){a.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."))});else{var C=new $;a.reader=C,C.onload=function(H){var I=H.target;de(I.result)},C.onabort=function(){a.fail(new Error("Aborted to read the compressed image with FileReader."))},C.onerror=function(){a.fail(new Error("Failed to read the compressed image with FileReader."))},C.onloadend=function(){a.reader=null},C.readAsArrayBuffer(T)}}else ce(T)}};w.toBlob?w.toBlob(le,o.mimeType,o.quality):le(me(w.toDataURL(o.mimeType,o.quality)))}}},{key:"done",value:function(i){var a=i.naturalWidth,r=i.naturalHeight,n=i.result,m=this.file,d=this.image,l=this.options;if(E&&d.src.indexOf("blob:")===0&&E.revokeObjectURL(d.src),n)if(l.strict&&!l.retainExif&&n.size>m.size&&l.mimeType===m.type&&!(l.width>a||l.height>r||l.minWidth>a||l.minHeight>r||l.maxWidth<a||l.maxHeight<r))n=m;else{var s=new Date;n.lastModified=s.getTime(),n.lastModifiedDate=s,n.name=m.name,n.name&&n.type!==m.type&&(n.name=n.name.replace(Ne,Fe(n.type)))}else n=m;this.result=n,l.success&&l.success.call(this,n)}},{key:"fail",value:function(i){var a=this.options;if(a.error)a.error.call(this,i);else throw i}},{key:"abort",value:function(){this.aborted||(this.aborted=!0,this.reader?this.reader.abort():this.image.complete?this.fail(new Error("The compression process has been aborted.")):(this.image.onload=null,this.image.onabort()))}}],[{key:"noConflict",value:function(){return window.Compressor=Ge,t}},{key:"setDefaults",value:function(i){z(pe,i)}}]),t})();let h=null,x=null;const we=t=>{if(!t)return"0 B";const e=1024,i=["B","KB","MB","GB"],a=Math.floor(Math.log(t)/Math.log(e));return`${(t/Math.pow(e,a)).toFixed(1)} ${i[a]}`},ai=()=>`
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
`,ti=()=>{console.log(`✅ Comprimir de ${Re} cargado`);const t=c("#dropZone");c("#fileInput").on("change",e=>N(e.target.files[0])),c("#btnCompress").on("click",Ve),c("#btnDownload").on("click",Ye),c("#btnSelect").on("click",()=>c("#fileInput").trigger("click")),c("#btnDelete").on("click",Je),t.on("dragover",e=>{e.preventDefault(),t.addClass("dragover")}),t.on("dragleave",e=>{e.preventDefault(),t.removeClass("dragover")}),t.on("drop",e=>{e.preventDefault(),t.removeClass("dragover");const i=e.originalEvent.dataTransfer.files[0];i&&N(i)}),t.on("dblclick",()=>c("#fileInput").trigger("click")),c(document).on("paste",e=>{const i=e.originalEvent.clipboardData?.items;if(i){for(let a of i)if(a.type.indexOf("image")!==-1){const r=a.getAsFile();r&&(N(r),B("¡Imagen pegada desde portapapeles!","success",2e3));break}}})};function N(t){if(!t)return;if(!t.type.match("image/(png|jpeg|jpg|webp)"))return B("Formato no soportado. Usa PNG, JPG o WEBP","error",3e3);if(t.size>50*1024*1024)return B("Archivo muy grande (máx 50MB)","error",3e3);const e=new FileReader;e.onload=i=>{const a=new Image;a.onload=()=>{h={file:t,url:i.target.result,size:t.size,width:a.width,height:a.height,name:t.name},x=null,qe(),B(`Imagen cargada: ${t.name}`,"success",2e3)},a.src=i.target.result},e.readAsDataURL(t)}function qe(){h&&(c("#dropPlaceholder").hide(),c("#previewContainer").show(),c("#previewImage").attr("src",h.url),c("#originalSize").text(we(h.size)),c("#originalDimensions").text(`${h.width}×${h.height}`),c("#fileNameDisplay").text(h.name).attr("title",h.name),c("#infoSection, #fileNameSection").fadeIn(300),c("#compressedSize, #compressedDimensions").text("--"),c("#reductionDisplay").hide())}async function Ve(){if(!h)return B("Primero carga una imagen","warning",2e3);const t=c("#btnCompress");t.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> <span>Procesando...</span>');try{const e=parseInt(c("#quality").val())/100,i=parseInt(c("#maxWidth").val()),a=parseInt(c("#maxWidth").val()),r=performance.now(),n=await new Promise((l,s)=>{new Xe(h.file,{quality:e,maxWidth:i,maxHeight:a,convertSize:5e6,mimeType:h.file.type==="image/png"&&h.file.size>5e6?"image/jpeg":void 0,success:l,error:s})}),m=performance.now(),d=new FileReader;await new Promise(l=>{d.onload=s=>{const f=new Image;f.onload=()=>{const u=((h.size-n.size)/h.size*100).toFixed(1);x={blob:n,url:s.target.result,size:n.size,width:f.width,height:f.height,reduccion:u,tiempo:((m-r)/1e3).toFixed(2)},c("#previewImage").attr("src",x.url),c("#compressedSize").text(we(x.size)),c("#compressedDimensions").text(`${x.width}×${x.height}`),c("#reductionPercent").text(`${u}%`),c("#reductionDisplay").fadeIn(300),B(`¡Comprimida! Reducción: ${u}% en ${x.tiempo}s`,"success",3e3),l()},f.src=s.target.result},d.readAsDataURL(n)})}catch(e){console.error("Error:",e),B("Error al comprimir","error")}t.prop("disabled",!1).html('<i class="fas fa-compress-alt"></i> <span>Comprimir</span>')}function Ye(){if(!x)return B("Primero comprime la imagen","warning",2e3);const t=URL.createObjectURL(x.blob),e=document.createElement("a");e.href=t,e.download=`comprimido_${h.name}`,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(t),Ue("#btnDownload","¡Descargado! 🎉","success",1500)}function Je(){if(!h&&!x)return B("No hay imagen para eliminar","warning",2e3);h=null,x=null,c("#previewContainer").hide(),c("#dropPlaceholder").show(),c("#previewImage").attr("src",""),c("#infoSection, #fileNameSection").hide(),c("#fileInput").val(""),c("#quality").val(70),c("#maxWidth").val(1920),B("Imagen eliminada correctamente","success",2e3)}const ri=()=>{console.log("🧹 Comprimir limpiado"),h=null,x=null,c("#fileInput, #btnCompress, #btnDownload, #btnSelect, #btnDelete, #dropZone").off(),c(document).off("paste")};export{ri as cleanup,ti as init,ai as render};
