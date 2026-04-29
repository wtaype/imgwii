import './precios.css';
import { app, version, linkweb } from '../wii.js';
import { wiVista } from '../widev.js';

const planes = [
  {
    id: 'gratis', color: '#8b9bb4', name: 'Gratis', desc: 'Todo lo básico para optimizar tus imágenes.', price: '0',
    btn: 'Comenzar Gratis', btnType: 'outline',
    features: [
      { t: 'Optimización con IA básica', v: true },
      { t: 'Compresión hasta 50MB/día', v: true },
      { t: 'Formatos: JPG, PNG, WEBP', v: true },
      { t: 'Editor de canvas estándar', v: true },
      { t: 'Marca de agua ImgWii', v: true },
      { t: 'Soporte por comunidad', v: true }
    ]
  },
  {
    id: 'pro', color: '#0EBEFF', name: 'Pro', desc: 'Para creadores y diseñadores exigentes.', price: '9',
    btn: 'Elegir Pro', btnType: 'outline',
    features: [
      { t: 'Todo lo de Gratis, más:', v: true },
      { t: 'IA de alta fidelidad (HD)', v: true },
      { t: 'Compresión ilimitada', v: true },
      { t: 'Sin marca de agua', v: true },
      { t: 'Formatos Pro: AVIF, SVG, PDF', v: true },
      { t: 'Soporte prioritario 24h', v: true }
    ]
  },
  {
    id: 'promax', color: '#7000FF', name: 'Pro Max', desc: 'La herramienta definitiva para escalar tu audiencia.', price: '15',
    btn: 'Obtener Pro Max', btnType: 'solid', destacado: true,
    features: [
      { t: 'Todo lo de Pro, más:', v: true },
      { t: 'Procesamiento por lotes (Bulk)', v: true },
      { t: 'Modelos de IA exclusivos', v: true },
      { t: 'Almacenamiento en la nube (5GB)', v: true },
      { t: 'Estadísticas detalladas de uso', v: true },
      { t: 'Soporte VIP 24/7', v: true }
    ]
  },
  {
    id: 'business', color: '#FF8C00', name: 'Business', desc: 'Para tiendas y equipos que facturan en línea.', price: '25',
    btn: 'Elegir Business', btnType: 'outline',
    features: [
      { t: 'Todo lo de Pro Max, más:', v: true },
      { t: 'API para desarrolladores', v: true },
      { t: 'Colaboradores (Hasta 5 admin)', v: true },
      { t: 'Integración con CMS (WordPress/Shopify)', v: true },
      { t: 'Branding personalizado en herramientas', v: true },
      { t: 'Webhooks y automatizaciones', v: true }
    ]
  },
  {
    id: 'empresa', color: '#29C72E', name: 'Empresa', desc: 'Soluciones a medida para grandes corporaciones.', price: 'Hablemos',
    btn: 'Contactar Ventas', btnType: 'outline', customPrice: true,
    features: [
      { t: 'Todo lo de Business, más:', v: true },
      { t: 'Infraestructura dedicada', v: true },
      { t: 'SLA del 99.9% garantizado', v: true },
      { t: 'Gestor de cuenta asignado', v: true },
      { t: 'Desarrollo de IA a medida', v: true },
      { t: 'Facturación corporativa', v: true }
    ]
  }
];

export const render = () => `
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Calidad Profesional</div>
    <h1 class="pr_title">Planes diseñados <span class="pr_grad">para tu éxito</span></h1>
    <p class="pr_desc">Ya seas un fotógrafo independiente o una agencia global, tenemos las herramientas de IA perfectas para potenciar tus imágenes.</p>
  </div>
  
  <div class="pr_grid">
    ${planes.map((p, i) => `
      <div class="pr_card wi_fadeUp ${p.destacado ? 'destacado' : ''}" style="--cc:${p.color}; --d:${i * 0.15}s">
        ${p.destacado ? `<div class="pr_popular"><i class="fas fa-star"></i> Más Recomendado</div>` : ''}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${p.name}</div>
          <div class="pr_desc_card">${p.desc}</div>
          <div class="pr_price_wrap">
            ${p.customPrice ? `
              <div class="pr_price" style="font-size:2.8rem">${p.price}</div>
            ` : `
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${p.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${p.features.map(f => `
            <li class="pr_feat ${f.v ? '' : 'no'}">
              <i class="fas ${f.v ? 'fa-check' : 'fa-xmark'}"></i>
              <span>${f.t}</span>
            </li>
          `).join('')}
        </ul>
        
        <a href="/login" class="pr_btn pr_btn_${p.btnType}">${p.btn}</a>
      </div>
    `).join('')}
  </div>

  <!-- SECCIÓN COMPROMISO -->
  <div class="pr_trust_sec">
    <div class="pr_trust_head pr_anim" style="--d:0.2s">
      <h2>¿Por qué elegir <span>${app}</span>?</h2>
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
`;

export const init = () => {
  wiVista('.pr_card, .pr_anim', null, { anim: 'pr_anim', stagger: 80 });
  console.log(`💳 ${app} ${version} · Precios OK`);
};

export const cleanup = () => {
  console.log('🧹 Precios limpiado');
};
