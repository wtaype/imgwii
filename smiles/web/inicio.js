import './inicio.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { wiVista, Saludar, wiTip, Notificacion } from '../widev.js';

// 🎨 Datos de las 7 secciones de navegación
const navSections = [
  {
    icon: 'fa-compress-arrows-alt',
    title: 'Optimizar',
    desc: 'Reduce el tamaño de tus imágenes PNG y JPG sin perder calidad con browser-image-compression',
    color: '--success',
    link: '/optimizar',
    emoji: '🗜️'
  },
  {
    icon: 'fa-file-archive',
    title: 'Comprimir',
    desc: 'Comprime tus imágenes de forma eficiente con compressorjs y obtén estadísticas detalladas',
    color: '--warning',
    link: '/comprimir',
    emoji: '📦'
  },
  {
    icon: 'fa-exchange-alt',
    title: 'Convertir',
    desc: 'Convierte entre formatos PNG, JPG, WEBP y más con pica de alta calidad',
    color: '--info',
    link: '/convertir',
    emoji: '🔄'
  },
  {
    icon: 'fa-palette',
    title: 'Editar',
    desc: 'Edita imágenes profesionalmente: agrega texto, filtros, recorta y ajusta con fabric.js',
    color: '--Mora',
    link: '/editar',
    emoji: '🎨'
  },
  {
    icon: 'fa-lightbulb',
    title: 'Curiosidades',
    desc: 'Descubre datos fascinantes sobre formatos de imagen, compresión y tecnología visual',
    color: '--Dulce',
    link: '/curiosidades',
    emoji: '💡'
  },
  {
    icon: 'fa-info-circle',
    title: 'Acerca',
    desc: 'Conoce la historia de imgwii y nuestra pasión por las imágenes',
    color: '--Cielo',
    link: '/acerca',
    emoji: 'ℹ️'
  }
];

// 📊 Estadísticas impactantes sobre procesamiento de imágenes
const stats = [
  { number: 6, label: 'Herramientas Poderosas', suffix: '+' },
  { number: 100, label: 'Gratis y Open Source', suffix: '%' },
  { number: 90, label: 'Reducción de Tamaño', suffix: '%' },
  { number: 24, label: 'Disponible Siempre', suffix: '/7' }
];

// 🎯 Roles rotatorios
const roles = [
  '🖼️ Optimiza tus Imágenes',
  '🚀 Procesa con Velocidad',
  '💎 Calidad Profesional',
  '🎨 Edita con Amor'
];

export const render = () => `
  <div class="inicio_container">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero_content">
        <div class="hero_saludo">
          <span class="saludo_texto">${Saludar()} Amigo!</span>
          <span class="saludo_emoji">👋</span>
        </div>
        <h1 class="hero_title">
          Bienvenido a <span class="gradient_text">${app}</span>
        </h1>
        <div class="hero_roles">
          ${roles.map((role, i) => `<span class="role ${i === 0 ? 'active' : ''}">${role}</span>`).join('')}
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
          <img src="${import.meta.env.BASE_URL}hero.png" 
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
        <h2 class="section_title">¿Por qué ${app}?</h2>
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
        ${navSections.map(section => `
          <a href="${section.link}" class="nav_card" data-page="${section.link.slice(1)}">
            <div class="nav_card_icon" style="background: linear-gradient(135deg, var(${section.color}) 0%, var(--hv) 100%); color: var(--txa);">
              <i class="fas ${section.icon}"></i>
            </div>
            <div class="nav_card_emoji">${section.emoji}</div>
            <h3 class="nav_card_title">${section.title}</h3>
            <p class="nav_card_desc">${section.desc}</p>
            <div class="nav_card_arrow">
              <i class="fas fa-arrow-right"></i> Explorar
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- ESTADÍSTICAS -->
    <section class="stats_section">
      <div class="stats_grid">
        ${stats.map(stat => `
          <div class="stat_box">
            <div class="stat_number" data-count="${stat.number}">0${stat.suffix}</div>
            <div class="stat_label">${stat.label}</div>
          </div>
        `).join('')}
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
`;

export const init = () => {
  console.log(`✅ Inicio de ${app} cargado`);

  // 🚀 ROLES ANIMADOS
  const $roles = $('.hero_roles .role');
  let roleActual = 0;
  setInterval(() => {
    $roles.removeClass('active');
    roleActual = (roleActual + 1) % $roles.length;
    $roles.eq(roleActual).addClass('active');
  }, 3000);

  // 📊 STATS ANIMADOS (Hero)
  wiVista('.hero_stats', () => {
    $('.hero_stats .stat_number').each(function() {
      const $num = $(this);
      const objetivo = parseInt($num.data('target'));
      let actual = 0;
      const incremento = objetivo / 50;
      const timer = setInterval(() => {
        actual += incremento;
        if (actual >= objetivo) {
          $num.text(objetivo + (objetivo === 100 || objetivo === 90 ? '%' : '+'));
          clearInterval(timer);
        } else {
          $num.text(Math.floor(actual));
        }
      }, 30);
    });
  });

  // 📊 STATS ANIMADOS (Sección de estadísticas)
  wiVista('.stats_section', () => {
    $('.stats_section .stat_number').each(function() {
      const $this = $(this);
      const objetivo = parseInt($this.data('count'));
      const suffix = $this.text().replace(/[0-9]/g, '');
      let actual = 0;
      const incremento = objetivo / 60;
      const timer = setInterval(() => {
        actual += incremento;
        if (actual >= objetivo) {
          $this.text(objetivo + suffix);
          clearInterval(timer);
        } else {
          $this.text(Math.floor(actual) + suffix);
        }
      }, 30);
    });
  });

  // 🎨 ANIMACIÓN CARDS CARACTERÍSTICAS
  wiVista('.features_grid', () => {
    $('.feature_card').each((i, el) => {
      setTimeout(() => $(el).addClass('visible'), i * 150);
    });
  });

  // 🎨 ANIMACIÓN CARDS NAVEGACIÓN
  wiVista('.nav_grid', () => {
    $('.nav_card').each((i, el) => {
      setTimeout(() => {
        $(el).css({
          opacity: '1',
          transform: 'translateY(0)'
        });
      }, i * 100);
    });
  });

  // 🎨 ANIMACIÓN TECH CARDS
  wiVista('.tech_grid', () => {
    $('.tech_card').each((i, el) => {
      setTimeout(() => $(el).addClass('visible'), i * 120);
    });
  });

  // 🖱️ FLOATING ICONS CLICK
  $('.floating_icon').on('click', function() {
    const link = $(this).data('link');
    if (link) {
      wiTip(this, '¡Vamos! 🚀', 'success', 1000);
      setTimeout(() => window.location.href = link, 800);
    }
  });

  // 🖱️ TECH CARDS HOVER TOOLTIP
  $('.tech_card').on('mouseenter', function() {
    const tech = $(this).data('tech');
    const tooltips = {
      'browser-image-compression': '¡Compresión moderna con Web Workers!',
      'compressorjs': '¡Control total sobre la compresión!',
      'pica': '¡Algoritmos Lanczos de alta calidad!',
      'fabric': '¡Editor de canvas profesional!'
    };
    wiTip(this, tooltips[tech] || 'Tecnología increíble', 'info', 2000);
  });

  // 🎉 MENSAJE DE BIENVENIDA (solo primera vez)
  if (!localStorage.getItem('imgwii_visited')) {
    setTimeout(() => {
      Notificacion('¡Bienvenido a imgwii! 🎨 Todas tus imágenes se procesan localmente, 100% privado.', 'success', 5000);
      localStorage.setItem('imgwii_visited', 'true');
    }, 1000);
  }
};

export const cleanup = () => {
  console.log('🧹 Inicio limpiado');
  $('.floating_icon, .tech_card').off('click mouseenter');
};