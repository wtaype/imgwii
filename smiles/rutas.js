import $ from 'jquery';
import { app } from './wii.js';
import { Notificacion, wiPath, wiFade } from './widev.js';
import * as inicioMod from './web/inicio.js';

// ── NAV COMUN — rutas compartidas entre todos los roles ────────────────────────
const COMUN = [
  { href: '/convertir',   page: 'convertir',   ico: 'fa-exchange-alt', txt: 'Convertir' },
  { href: '/optimizar',   page: 'optimizar',   ico: 'fa-bolt',         txt: 'Optimizar' },
  { href: '/comprimir',   page: 'comprimir',   ico: 'fa-compress',     txt: 'Comprimir' },
  { href: '/editar',      page: 'editar',      ico: 'fa-crop-simple',  txt: 'Editar'    },
  { href: '/curiosidades',page: 'curiosidades',ico: 'fa-lightbulb',    txt: 'Curiosidades' },
  { href: '/precios',     page: 'precios',     ico: 'fa-crown',        txt: 'Planes'    },
  { href: '/acerca',      page: 'acerca',      ico: 'fa-info-circle',  txt: 'Acerca'    },
];

// ── NAV — Config visual por rol (nvleft = izquierda, nvright = derecha) ────────
export const NAV = {
  todos: {
    nvleft:  [{ href: '/', page: 'inicio', ico: 'fa-house', txt: 'Inicio' }, ...COMUN],
    nvright: [
      { href: '/descubre', page: 'descubre', ico: 'fa-gauge',       txt: 'Descubre'  },
      { isBtn: true, cls: 'bt_auth registrar', ico: 'fa-user-plus', txt: 'Registrar' },
      { isBtn: true, cls: 'bt_auth login',     ico: 'fa-sign-in-alt', txt: 'Login'  },
    ],
  },
  smile: {
    nvleft:  [{ href: '/smile', page: 'smile', ico: 'fa-house', txt: 'Dashboard' }, ...COMUN],
    nvright: [
      { href: '/word',      page: 'word',      ico: 'fa-rocket', txt: 'Planificar'     },
      { href: '/nuevo',    page: 'nuevo',    ico: 'fa-plus',        txt: 'Nuevo Post' },
      { href: '/notas',    page: 'notas',    ico: 'fa-note-sticky', txt: 'Notas'      },
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments',    txt: 'Mensajes'   },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  gestor: {
    nvleft:  [{ href: '/gestor', page: 'gestor', ico: 'fa-house', txt: 'Dashboard' }, ...COMUN],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  empresa: {
    nvleft:  [{ href: '/empresa', page: 'empresa', ico: 'fa-building', txt: 'Panel' }],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  admin: {
    nvleft: [
      { href: '/admin',    page: 'admin',    ico: 'fa-globe', txt: 'Plataforma' },
      { href: '/usuarios', page: 'usuarios', ico: 'fa-users', txt: 'Usuarios'   },
    ],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
};

// ── RUTAS — Fuente única de verdad ───────────────────────────────────────────────
// roles: null = público · ['rol',...] = protegido · area = carpeta del módulo
export const RUTAS = [
  // ── Core público ImgWii ───────────────────────────────────────────────
  { path: '/inicio',       area: 'web/', meta: { title: 'ImgWii — Editor y Optimizador con IA', desc: 'Edita, optimiza y comprime tus imágenes online con inteligencia artificial. Rápido y gratis.' }},
  { path: '/convertir',    area: 'web/', meta: { title: 'Convertir Imágenes — ImgWii', desc: 'Convierte tus imágenes a WebP, PNG, JPG o AVIF en segundos sin perder calidad.' }},
  { path: '/optimizar',    area: 'web/', meta: { title: 'Optimizar Imágenes — ImgWii', desc: 'Mejora la calidad, ajusta colores y mejora tus imágenes usando inteligencia artificial.' }},
  { path: '/comprimir',    area: 'web/', meta: { title: 'Comprimir Imágenes — ImgWii', desc: 'Reduce el peso de tus imágenes drásticamente para mejorar el SEO y velocidad de tu web.' }},
  { path: '/editar',       area: 'web/', meta: { title: 'Editar Imágenes — ImgWii', desc: 'Herramientas de edición potentes: recorta, ajusta y aplica filtros a tus imágenes online.' }},
  { path: '/curiosidades', area: 'web/', meta: { title: 'Curiosidades — ImgWii', desc: 'Descubre tips, trucos y curiosidades sobre el mundo del diseño, la fotografía y la web.' }},
  { path: '/precios',      area: 'web/', meta: { title: 'Planes Pro — ImgWii', desc: 'Lleva tu productividad al siguiente nivel con nuestras herramientas premium.' }},
  { path: '/login',        area: 'web/', meta: { title: 'Iniciar Sesión — ImgWii', desc: 'Accede a tu cuenta de ImgWii para guardar tus configuraciones y usar la nube.' }},

  // ── Submódulos extras (si aplican) ───────────────────────────────────────────
  { path: '/blog',     area: 'web/blog/',    meta: { title: 'Blog — ImgWii', desc: 'Artículos sobre optimización, diseño web y novedades de la plataforma.' }},
  { path: '/post',     area: 'web/blog/'    }, // dinámico
  { path: '/chatwil',  area: 'web/chatwil/', meta: { title: 'Soporte con IA — ImgWii', desc: 'Habla con nuestra IA para resolver dudas de optimización y diseño.' }},

    // ── Acerca / Legales / Info ───────────────────────────────────────────────
  { path: '/acerca',     area: 'web/acerca/', meta: { title: 'Acerca de ImgWii — Editor de Imágenes con IA', desc: 'Conoce la historia y tecnología detrás de ImgWii, tu herramienta profesional de edición local.' }},
  { path: '/descubre',   area: 'web/acerca/', meta: { title: 'Descubre ImgWii — Explora nuestras herramientas', desc: 'Explora todas las funciones: Optimizar, Comprimir, Convertir y Editar tus imágenes con IA.' }},
  { path: '/terminos',   area: 'web/acerca/', meta: { title: 'Términos y Condiciones — ImgWii', desc: 'Lee los términos y condiciones de uso de la plataforma ImgWii.' }},
  { path: '/cookies',    area: 'web/acerca/', meta: { title: 'Política de Cookies — ImgWii', desc: 'Conoce cómo ImgWii usa cookies para mejorar tu experiencia técnica de edición.' }},
  { path: '/privacidad', area: 'web/acerca/', meta: { title: 'Privacidad — ImgWii', desc: 'Tus fotos son privadas. Lee cómo ImgWii garantiza el procesamiento local de tus archivos.' }},
  { path: '/feedback',   area: 'web/acerca/', meta: { title: 'Feedback — ImgWii', desc: 'Compártenos tu opinión o sugerencias. ImgWii crece gracias a tu feedback creativo.' }},
  { path: '/contacto',   area: 'web/acerca/', meta: { title: 'Contáctanos — ImgWii', desc: 'Escríbenos con tus dudas técnicas o propuestas. El equipo de ImgWii te responde en 24h.' }},

  // ── Autenticadas (smile) ───────────────────────────────────────────────
  { path: '/smile',    area: 'smile/', roles: ['smile','gestor','empresa','admin'] },
  { path: '/notas',    area: 'smile/', roles: ['smile','gestor','empresa','admin'] },
  { path: '/perfil',   area: 'smile/', roles: ['smile','gestor','empresa','admin'] },
  { path: '/mensajes', area: 'smile/', roles: ['smile','gestor','empresa','admin'] },
  { path: '/word',     area: 'smile/', roles: ['smile','gestor','empresa','admin'] },
  { path: '/nuevo',    area: 'web/blog/', roles: ['smile','gestor','empresa','admin'] },

  // ── Autenticadas (roles superiores) ───────────────────────────────────────────────
  { path: '/gestor',   area: 'gestor/',  roles: ['gestor','empresa','admin'] },
  { path: '/empresa',  area: 'empresa/', roles: ['empresa','admin']          },
  { path: '/admin',    area: 'admin/',   roles: ['admin']                    },
  { path: '/usuarios', area: 'admin/',   roles: ['admin']                    },
];

// ── GLOB — Vite mapea todos los módulos en build time ───────────────────────────────────────────────
const MODS = import.meta.glob([
  './{web,smile,gestor,empresa,admin}/**/*.js',
  '!./web/chatwil/head/**/*.js',
  '!./web/chatwil/memoria.js',
  '!./web/chatwil/brain.js',
  '!./web/blog/devblog.js',
  '!./web/blog/wiad.js'
]);
const rutasMod = (area, page) => MODS[`./${area}${page}.js`];

// ── META MAP — Index rápido ruta → meta ───────────────────────────────────────────────
const META_MAP = Object.fromEntries(RUTAS.filter(r => r.meta).map(r => [r.path, r.meta]));
const BASE_URL = 'https://imgwii.com';
const BASE_IMG = `${BASE_URL}/poster.webp`;

// ── setMeta: actualiza <head> dinámicamente en cada navegación ──────────────────────────────
const setTag  = (id, val) => { const el = document.getElementById(id); if (el) el.setAttribute('content', val); };
const setHref = (id, val) => { const el = document.getElementById(id); if (el) el.setAttribute('href', val); };

export const setMeta = ({ title, desc, img, path } = {}) => {
  const t = title ?? `ImgWii — Editor y Optimizador con IA`;
  const d = desc  ?? 'Edita, optimiza y comprime tus imágenes online con inteligencia artificial. Rápido y gratis.';
  const i = img   ?? BASE_IMG;
  const u = path  ? `${BASE_URL}${path}` : BASE_URL;

  document.title = t;
  setTag('wi_desc',     d);
  setTag('wi_og_title', t);  setTag('wi_og_desc', d);
  setTag('wi_og_url',   u);  setTag('wi_og_img',  i);
  setTag('wi_tw_title', t);  setTag('wi_tw_desc', d);  setTag('wi_tw_img', i);
  setHref('wi_canonical', u);
};

// ── MOTOR ──────────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};               // funciones lazy originales — nunca se sobreescriben
    this.cache     = { '/inicio': inicioMod }; // inicio eagerly bundled, cero red
    this.modActual = null;
    this.cargand   = false;
    this.HOME      = 'inicio';
    this.main      = '#wimain';
  }

  register(path, fn) { this.rutas[path] = fn; }

  registerAll(getRol) {
    const pub = {}, priv = {};

    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      const page = mod ?? path.split('/').pop();
      const imp  = rutasMod(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ${area}${page}.js`); return; }
      roles === null ? (pub[path] = imp) : (priv[path] ??= []).push({ roles, imp });
    });

    const noAuth = () => Promise.resolve({
      render: () => '',
      init:   () => setTimeout(() => this.navigate('/login'), 0),
    });

    new Set([...Object.keys(pub), ...Object.keys(priv)]).forEach(path => {
      const pubImp   = pub[path];
      const privList = priv[path] || [];
      const resolve  = () => { const rol = getRol?.() || null; return privList.find(e => e.roles.includes(rol)); };

      if (!privList.length)  return this.register(path, pubImp);
      if (!pubImp)           return this.register(path, () => { const e = resolve(); return e ? e.imp() : noAuth(); });
      this.register(path, () => { const e = resolve(); return e ? e.imp() : pubImp(); });
    });
  }

  // ── PREFETCH: descarga el módulo al hacer hover, sin bloquear nada ───────────
  async prefetch(ruta) {
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
    if (this.cache[norm] || !this.rutas[norm]) return;   // ya listo o no existe
    try {
      this.cache[norm] = await this.rutas[norm]();
      console.log(`⚡ Listo ${norm.replace('/', '')}`);
    } catch { console.warn('[ruta] prefetch falló:', norm); }
  }

  // ── NAVIGATE: si ya está en cache, carga instantánea ─────────────────────────
  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);

    try {
      this.modActual?.cleanup?.();
      const slug = !this.rutas[norm] ? norm.slice(1) : null;
      const cargar  = slug ? rutasMod('web/blog/', 'post') : (this.rutas[norm] ?? rutasMod('web/', '404'));
      const mod = this.cache[norm] ?? await cargar();
      if (!slug) this.cache[norm] = mod;

      const [html] = await Promise.all([mod.render(slug)]);
      
      document.body.classList.remove('is-public-profile');
      this.marcarNav(norm);
      await wiFade(this.main, html);
      window.scrollTo(0, 0);

      // ── SEO dinámico ─────────────────────────────────────────────────────────────────
      const rutaMeta = META_MAP[norm];
      if (rutaMeta) setMeta({ ...rutaMeta, path: norm === `/${this.HOME}` ? '/' : norm });

      mod.init?.(slug);

      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, document.title);
      this.modActual = mod;
    } catch (err) {
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    $('.nv_item').removeClass('active');
    $(`.nv_item[data-page="${pag}"]`).addClass('active');
  }

  init() {
    this.marcarNav(wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual));

    $(document)
      .on('click', '.nv_item', (e) => {
        e.preventDefault();
        const pag = $(e.currentTarget).data('page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      })
      .on('mouseenter touchstart', '.nv_item[data-page]', (e) => {
        const pag = $(e.currentTarget).data('page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      });

    window.addEventListener('popstate', (e) =>
      this.navigate(e.state?.ruta || wiPath.actual, false)
    );
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();