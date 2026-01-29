import('./footer.js')
import $ from 'jquery';
import { getls } from './widev.js';
import { rutas } from './rutas/ruta.js';
import './header.js';

const pages = ['inicio','optimizar','comprimir','convertir','editar','curiosidades','acerca'];
pages.forEach(pg => rutas.register(`/${pg}`, () => import(`./web/${pg}.js`))); // Publico general

rutas.register('/smile',() => getls('wiSmile')?import('./smile/smile.js'):import('./smile/descubre.js'));//Con Auth

rutas.init(); // Rutas registrados y go excelente app. 
