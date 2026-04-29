import{j as e}from"./vendor-gzd0YkcT.js";import{c as l,d as r,w as d,S as m}from"./main-WnjZvDdb.js";import"./main-BXvQAZNN.js";import"./firebase-xYuwcABI.js";const p=[{icon:"fa-compress-arrows-alt",title:"Optimizar",desc:"Reduce el tamaño de tus imágenes PNG y JPG sin perder calidad con browser-image-compression",color:"--success",link:"/optimizar",emoji:"🗜️"},{icon:"fa-file-archive",title:"Comprimir",desc:"Comprime tus imágenes de forma eficiente con compressorjs y obtén estadísticas detalladas",color:"--warning",link:"/comprimir",emoji:"📦"},{icon:"fa-exchange-alt",title:"Convertir",desc:"Convierte entre formatos PNG, JPG, WEBP y más con pica de alta calidad",color:"--info",link:"/convertir",emoji:"🔄"},{icon:"fa-palette",title:"Editar",desc:"Edita imágenes profesionalmente: agrega texto, filtros, recorta y ajusta con fabric.js",color:"--Mora",link:"/editar",emoji:"🎨"},{icon:"fa-lightbulb",title:"Curiosidades",desc:"Descubre datos fascinantes sobre formatos de imagen, compresión y tecnología visual",color:"--Dulce",link:"/curiosidades",emoji:"💡"},{icon:"fa-info-circle",title:"Acerca",desc:"Conoce la historia de imgwii y nuestra pasión por las imágenes",color:"--Cielo",link:"/acerca",emoji:"ℹ️"}],_=[{number:6,label:"Herramientas Poderosas",suffix:"+"},{number:100,label:"Gratis y Open Source",suffix:"%"},{number:90,label:"Reducción de Tamaño",suffix:"%"},{number:24,label:"Disponible Siempre",suffix:"/7"}],f=["🖼️ Optimiza tus Imágenes","🚀 Procesa con Velocidad","💎 Calidad Profesional","🎨 Edita con Amor"],C=()=>`
  <div class="inicio_container">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero_content">
        <div class="hero_saludo">
          <span class="saludo_texto">${m()} Amigo!</span>
          <span class="saludo_emoji">👋</span>
        </div>
        <h1 class="hero_title">
          Bienvenido a <span class="gradient_text">${l}</span>
        </h1>
        <div class="hero_roles">
          ${f.map((i,o)=>`<span class="role ${o===0?"active":""}">${i}</span>`).join("")}
        </div>
        <p class="hero_subtitle">
          Tu herramienta profesional para optimizar, comprimir, convertir y editar imágenes. 
          Todo el poder del procesamiento de imágenes en tu navegador, sin servidores, 100% privado.
        </p>
        <div class="hero_stats">
          <div class="stat_card">
            <div class="stat_number" data-target="6">0</div>
            <div class="stat_label">Herramientas</div>
          </div>
          <div class="stat_card">
            <div class="stat_number" data-target="100">0</div>
            <div class="stat_label">% Gratis</div>
          </div>
          <div class="stat_card">
            <div class="stat_number" data-target="90">0</div>
            <div class="stat_label">% Reducción</div>
          </div>
        </div>
        <div class="hero_actions">
          <a href="/optimizar" class="btn_primary">
            <i class="fas fa-rocket"></i>
            <span>Comenzar Ahora</span>
          </a>
          <a href="/curiosidades" class="btn_secondary">
            <i class="fas fa-lightbulb"></i>
            <span>Descubre Más</span>
          </a>
        </div>
      </div>
      <div class="hero_visual">
        <div class="img_container">
          <div class="img_ring"></div>
          <div class="img_ring ring2"></div>
          <img src="/loveye/v14/hero.png" 
               alt="Procesamiento de imágenes" 
               class="hero_img"
               loading="lazy">
          <div class="img_badge">
            <i class="fas fa-circle"></i>
            <span>100% Privado</span>
          </div>
        </div>
        <div class="floating_icon icon1" title="Optimizar" data-link="/optimizar">
          <i class="fas fa-compress-arrows-alt"></i>
        </div>
        <div class="floating_icon icon2" title="Convertir" data-link="/convertir">
          <i class="fas fa-exchange-alt"></i>
        </div>
        <div class="floating_icon icon3" title="Comprimir" data-link="/comprimir">
          <i class="fas fa-file-archive"></i>
        </div>
        <div class="floating_icon icon4" title="Editar" data-link="/editar">
          <i class="fas fa-palette"></i>
        </div>
      </div>
    </section>

    <!-- CARACTERÍSTICAS PRINCIPALES -->
    <section class="features">
      <div class="section_header">
        <h2 class="section_title">¿Por qué ${l}?</h2>
        <div class="section_line"></div>
      </div>
      <div class="features_grid">
        <div class="feature_card">
          <div class="card_icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>100% Privado</h3>
          <p>Todo el procesamiento ocurre en tu navegador. Tus imágenes nunca salen de tu computadora.</p>
        </div>
        <div class="feature_card">
          <div class="card_icon">
            <i class="fas fa-bolt"></i>
          </div>
          <h3>Súper Rápido</h3>
          <p>Usa Web Workers y algoritmos optimizados para procesar imágenes a velocidad increíble.</p>
        </div>
        <div class="feature_card">
          <div class="card_icon">
            <i class="fas fa-gem"></i>
          </div>
          <h3>Alta Calidad</h3>
          <p>Algoritmos avanzados (Lanczos, pica) para mantener la mejor calidad posible.</p>
        </div>
      </div>
    </section>

    <!-- NAVEGACIÓN VISUAL -->
    <section class="nav_visual">
      <div class="section_header">
        <h2 class="section_title">Explora Nuestras Herramientas</h2>
        <div class="section_line"></div>
      </div>
      <div class="nav_grid">
        ${p.map(i=>`
          <a href="${i.link}" class="nav_card" data-page="${i.link.slice(1)}">
            <div class="nav_card_icon" style="background: linear-gradient(135deg, var(${i.color}) 0%, var(--hv) 100%); color: var(--txa);">
              <i class="fas ${i.icon}"></i>
            </div>
            <div class="nav_card_emoji">${i.emoji}</div>
            <h3 class="nav_card_title">${i.title}</h3>
            <p class="nav_card_desc">${i.desc}</p>
            <div class="nav_card_arrow">
              <i class="fas fa-arrow-right"></i> Explorar
            </div>
          </a>
        `).join("")}
      </div>
    </section>

    <!-- ESTADÍSTICAS -->
    <section class="stats_section">
      <div class="stats_grid">
        ${_.map(i=>`
          <div class="stat_box">
            <div class="stat_number" data-count="${i.number}">0${i.suffix}</div>
            <div class="stat_label">${i.label}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- TECNOLOGÍAS -->
    <section class="tech_section">
      <div class="section_header">
        <h2 class="section_title">Tecnologías que Usamos</h2>
        <div class="section_line"></div>
      </div>
      <div class="tech_grid">
        <div class="tech_card" data-tech="browser-image-compression">
          <div class="tech_icon">📦</div>
          <h4>browser-image-compression</h4>
          <p>Compresión inteligente con Web Workers</p>
        </div>
        <div class="tech_card" data-tech="compressorjs">
          <div class="tech_icon">🗜️</div>
          <h4>compressorjs</h4>
          <p>Control granular de compresión</p>
        </div>
        <div class="tech_card" data-tech="pica">
          <div class="tech_icon">🎯</div>
          <h4>pica</h4>
          <p>Redimensionamiento de alta calidad</p>
        </div>
        <div class="tech_card" data-tech="fabric">
          <div class="tech_icon">🎨</div>
          <h4>fabric.js</h4>
          <p>Editor de imágenes profesional</p>
        </div>
      </div>
    </section>
  </div>
`,j=()=>{console.log(`✅ Inicio de ${l} cargado`);const i=e(".hero_roles .role");let o=0;setInterval(()=>{i.removeClass("active"),o=(o+1)%i.length,i.eq(o).addClass("active")},3e3),r(".hero_stats",()=>{e(".hero_stats .stat_number").each(function(){const a=e(this),s=parseInt(a.data("target"));let t=0;const c=s/50,n=setInterval(()=>{t+=c,t>=s?(a.text(s+(s===100||s===90?"%":"+")),clearInterval(n)):a.text(Math.floor(t))},30)})}),r(".stats_section",()=>{e(".stats_section .stat_number").each(function(){const a=e(this),s=parseInt(a.data("count")),t=a.text().replace(/[0-9]/g,"");let c=0;const n=s/60,v=setInterval(()=>{c+=n,c>=s?(a.text(s+t),clearInterval(v)):a.text(Math.floor(c)+t)},30)})}),r(".features_grid",()=>{e(".feature_card").each((a,s)=>{setTimeout(()=>e(s).addClass("visible"),a*150)})}),r(".nav_grid",()=>{e(".nav_card").each((a,s)=>{setTimeout(()=>{e(s).css({opacity:"1",transform:"translateY(0)"})},a*100)})}),r(".tech_grid",()=>{e(".tech_card").each((a,s)=>{setTimeout(()=>e(s).addClass("visible"),a*120)})}),e(".floating_icon").on("click",function(){const a=e(this).data("link");a&&(d(this,"¡Vamos! 🚀","success",1e3),setTimeout(()=>window.location.href=a,800))}),e(".tech_card").on("mouseenter",function(){const a=e(this).data("tech");d(this,{"browser-image-compression":"¡Compresión moderna con Web Workers!",compressorjs:"¡Control total sobre la compresión!",pica:"¡Algoritmos Lanczos de alta calidad!",fabric:"¡Editor de canvas profesional!"}[a]||"Tecnología increíble","info",2e3)}),localStorage.getItem("imgwii_visited")||setTimeout(()=>{localStorage.setItem("imgwii_visited","true")},1e3)},$=()=>{console.log("🧹 Inicio limpiado"),e(".floating_icon, .tech_card").off("click mouseenter")};export{$ as cleanup,j as init,C as render};
