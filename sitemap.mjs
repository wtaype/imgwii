import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';

config();

const BASE = 'https://imgwii.web.app', OUT = 'public/sitemap.xml', D = new Date().toISOString().slice(0, 10);
const url = (l, c, p, d = D) => `  <url><loc>${BASE}${l}</loc><lastmod>${d}</lastmod><changefreq>${c}</changefreq><priority>${p}</priority></url>`;

const STATIC = [
  ['/', 'weekly', '1.0'],
  ['/convertir', 'daily', '0.9'],
  ['/optimizar', 'daily', '0.9'],
  ['/comprimir', 'daily', '0.9'],
  ['/editar', 'daily', '0.9'],
  ['/curiosidades', 'weekly', '0.8'],
  ['/precios', 'weekly', '0.8'],
  ['/blog', 'daily', '0.8'],
  ['/chatwil', 'weekly', '0.7'],
  ['/acerca', 'monthly', '0.7'],
  ['/descubre', 'monthly', '0.7'],
  ['/terminos', 'monthly', '0.5'],
  ['/privacidad', 'monthly', '0.5'],
  ['/cookies', 'monthly', '0.5'],
  ['/feedback', 'monthly', '0.5'],
  ['/contacto', 'monthly', '0.5'],
];

(async () => {
  let posts = '';
  try {
    initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}')) });
    const snap = await getFirestore().collection('blog').where('activo', '==', true).get();
    posts = snap.docs.map(d => url(`/${d.id}`, 'weekly', '0.8', d.data().creado?.toDate()?.toISOString()?.slice(0, 10) || D)).join('\n');
  } catch (e) { console.warn('⚠️ No se conectó a Firebase, generando solo rutas estáticas.'); }

  writeFileSync(OUT, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.map(r => url(r[0], r[1], r[2])).join('\n')}
${posts}
</urlset>`);

  console.log(`✅ Sitemap (${STATIC.length} estáticas, ${posts ? posts.split('<url>').length - 1 : 0} posts) guardado en public/sitemap.xml`);
  process.exit(0);
})();
