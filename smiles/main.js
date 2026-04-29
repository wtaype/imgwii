import $ from 'jquery';
import { getls, wiSmart } from './widev.js';
import { rutas } from './rutas.js';

// ── RUTAS PROFESIONAL DE ACUERDO A ROLES  ─────────────────────────────
rutas.registerAll(() => getls('wiSmile')?.rol);

rutas.register('/', (isPre = false) => {
  const u = getls('wiSmile');
  if (!u) return import('./web/inicio.js');
  const map = {
    smile:   { r: '/smile',   m: () => import('./smile/smile.js')     },
    gestor:  { r: '/gestor',  m: () => import('./gestor/gestor.js')   },
    empresa: { r: '/empresa', m: () => import('./empresa/empresa.js') },
    admin:   { r: '/admin',   m: () => import('./admin/admin.js')     }
  };
  const t = map[u.rol] || map.smile;
  if (!isPre && t.r !== '/') { rutas.navigate(t.r); return t.m(); }
  return t.m();
});

rutas.init();
import('./header.js');
import('./footer.js')

wiSmart({
css: [
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap',
],
});


