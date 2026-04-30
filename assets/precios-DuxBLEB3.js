import{b as s,z as i,v as t}from"./index-CIOVQSOC.js";import"./vendor-BOJxWFg6.js";const o=[{id:"gratis",color:"#8b9bb4",name:"Gratis",desc:"Todo lo básico para optimizar tus imágenes.",price:"0",btn:"Comenzar Gratis",btnType:"outline",features:[{t:"Optimización con IA básica",v:!0},{t:"Compresión hasta 50MB/día",v:!0},{t:"Formatos: JPG, PNG, WEBP",v:!0},{t:"Editor de canvas estándar",v:!0},{t:"Marca de agua ImgWii",v:!0},{t:"Soporte por comunidad",v:!0}]},{id:"pro",color:"#0EBEFF",name:"Pro",desc:"Para creadores y diseñadores exigentes.",price:"9",btn:"Elegir Pro",btnType:"outline",features:[{t:"Todo lo de Gratis, más:",v:!0},{t:"IA de alta fidelidad (HD)",v:!0},{t:"Compresión ilimitada",v:!0},{t:"Sin marca de agua",v:!0},{t:"Formatos Pro: AVIF, SVG, PDF",v:!0},{t:"Soporte prioritario 24h",v:!0}]},{id:"promax",color:"#7000FF",name:"Pro Max",desc:"La herramienta definitiva para escalar tu audiencia.",price:"15",btn:"Obtener Pro Max",btnType:"solid",destacado:!0,features:[{t:"Todo lo de Pro, más:",v:!0},{t:"Procesamiento por lotes (Bulk)",v:!0},{t:"Modelos de IA exclusivos",v:!0},{t:"Almacenamiento en la nube (5GB)",v:!0},{t:"Estadísticas detalladas de uso",v:!0},{t:"Soporte VIP 24/7",v:!0}]},{id:"business",color:"#FF8C00",name:"Business",desc:"Para tiendas y equipos que facturan en línea.",price:"25",btn:"Elegir Business",btnType:"outline",features:[{t:"Todo lo de Pro Max, más:",v:!0},{t:"API para desarrolladores",v:!0},{t:"Colaboradores (Hasta 5 admin)",v:!0},{t:"Integración con CMS (WordPress/Shopify)",v:!0},{t:"Branding personalizado en herramientas",v:!0},{t:"Webhooks y automatizaciones",v:!0}]},{id:"empresa",color:"#29C72E",name:"Empresa",desc:"Soluciones a medida para grandes corporaciones.",price:"Hablemos",btn:"Contactar Ventas",btnType:"outline",customPrice:!0,features:[{t:"Todo lo de Business, más:",v:!0},{t:"Infraestructura dedicada",v:!0},{t:"SLA del 99.9% garantizado",v:!0},{t:"Gestor de cuenta asignado",v:!0},{t:"Desarrollo de IA a medida",v:!0},{t:"Facturación corporativa",v:!0}]}],c=()=>`
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Calidad Profesional</div>
    <h1 class="pr_title">Planes diseñados <span class="pr_grad">para tu éxito</span></h1>
    <p class="pr_desc">Ya seas un fotógrafo independiente o una agencia global, tenemos las herramientas de IA perfectas para potenciar tus imágenes.</p>
  </div>
  
  <div class="pr_grid">
    ${o.map((a,r)=>`
      <div class="pr_card wi_fadeUp ${a.destacado?"destacado":""}" style="--cc:${a.color}; --d:${r*.15}s">
        ${a.destacado?'<div class="pr_popular"><i class="fas fa-star"></i> Más Recomendado</div>':""}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${a.name}</div>
          <div class="pr_desc_card">${a.desc}</div>
          <div class="pr_price_wrap">
            ${a.customPrice?`
              <div class="pr_price" style="font-size:2.8rem">${a.price}</div>
            `:`
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${a.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${a.features.map(e=>`
            <li class="pr_feat ${e.v?"":"no"}">
              <i class="fas ${e.v?"fa-check":"fa-xmark"}"></i>
              <span>${e.t}</span>
            </li>
          `).join("")}
        </ul>
        
        <a href="/login" class="pr_btn pr_btn_${a.btnType}">${a.btn}</a>
      </div>
    `).join("")}
  </div>

  <!-- SECCIÓN COMPROMISO -->
  <div class="pr_trust_sec">
    <div class="pr_trust_head pr_anim" style="--d:0.2s">
      <h2>¿Por qué elegir <span>${s}</span>?</h2>
      <p>Nos enfocamos en la velocidad y la privacidad. Nuestras herramientas están optimizadas para que obtengas los mejores resultados en tiempo récord.</p>
    </div>
    <div class="pr_trust_grid">
      <div class="pr_trust_card pr_anim" style="--d:0.3s">
        <i class="fas fa-bolt"></i>
        <h3>Procesamiento Local</h3>
        <p>Aprovechamos la potencia de tu navegador para que tus imágenes nunca salgan de tu equipo si no es necesario.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.4s">
        <i class="fas fa-microchip"></i>
        <h3>IA de Vanguardia</h3>
        <p>Usamos modelos de redes neuronales actualizados semanalmente para garantizar la máxima nitidez posible.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.5s">
        <i class="fas fa-shield-halved"></i>
        <h3>Seguridad Total</h3>
        <p>Tus datos y archivos están protegidos con encriptación de nivel bancario. Tu privacidad es nuestro compromiso.</p>
      </div>
    </div>
  </div>

</div>
`,l=()=>{i(".pr_card, .pr_anim",null,{anim:"pr_anim",stagger:80}),console.log(`💳 ${s} ${t} · Precios OK`)},p=()=>{console.log("🧹 Precios limpiado")};export{p as cleanup,l as init,c as render};
