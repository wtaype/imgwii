// INFORMACIÓN DEL APP 
export let id = 'imgwii'
export let app = 'ImgWii'
export let icon = 'fa-image'
export let desc = 'Editor de imágenes online con inteligencia artificial';
export let linkweb = 'https://imgwii.web.app/';
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v14';

/** ACTUALIZAR AL TAG POR SEGURIDAD [TAG NUEVO] (1)
git tag v14 -m "Version v14" ; git push origin v14

ACTUALIZACIÓN AL MAIN PRINCIPAL DEL PROYECTO [MAIN] (2)
git add . ; git commit -m "Actualizacion Principal v14.10.10" ; git push origin main

// REEMPLAZAR TAG DE SEGURIDAD EXISTENTE [TAG REMPLAZO] (3)
git tag -d v14 ; git tag v14 -m "Version v14 actualizada" ; git push origin v14 --force

// PARA ACTUALIZAR SITEMAP EFFICIENTE (4)
npm run sitemap

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (5)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main

 ACTUALIZACION TAG[END] */


 