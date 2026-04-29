// orar.js — Motor de oración altamente empático y personalizado de ChatWil 🙏💚
import { Saludar } from '../../../widev.js';
import * as memoria from '../memoria.js';
import * as citas from './citas.js';
import * as animos from './animos.js';

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ── EMPATÍA INICIAL ────────────────────────────────────────────────────────────
const empatia_tema = {
  salud:    'lamento mucho la situación que estás pasando con tu salud. Dios es nuestro sanador supremo.',
  familia:  'entiendo la preocupación que sientes por tu familia. No hay nada más valioso que el hogar.',
  economia: 'sé que la incertidumbre económica puede traer mucha carga, pero Dios es nuestro gran proveedor.',
  paz:      'siento mucho esa angustia en tu corazón. El Señor quiere darte paz en medio de la tormenta.',
  trabajo:  'comprendo la situación laboral que enfrentas. Dios abre puertas que nadie puede cerrar.',
  duelo:    'siento muchísimo el dolor de tu pérdida. El Espíritu Santo es nuestro gran consolador.',
  general:  'entiendo la necesidad que hay en tu corazón en este momento. Dios está dispuesto a escucharte.',
};

// ── PADRE NUESTRO ──────────────────────────────────────────────────────────────
const PADRE_NUESTRO = `*Padre nuestro que estás en los cielos, santificado sea Tu nombre. Venga Tu reino. Hágase Tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque Tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.*`;

// ── ORACIONES ESPECÍFICAS ──────────────────────────────────────────────────────
const oraciones_especificas = {
  salud: [
    `💙 Padre amado, en este momento pongo en Tus manos la salud de Tu hijo/a. Toca con Tu poder sanador cada parte de su cuerpo que sufre. Alivia el dolor, restaura lo que está débil y renueva sus fuerzas. Tú eres Jehová Rapha, nuestro Sanador. Declaramos sanidad completa en el nombre de Jesús. ¡Amén! 🌟`,
    `💚 Señor Jesús, Tú que sanaste a los enfermos y devolviste la vista a los ciegos, te ruego que pongas Tu mano poderosa sobre su cuerpo. Reprendemos toda enfermedad y declaramos que por Tus llagas fuimos nosotros curados. Dale paciencia y fe mientras obras el milagro. ¡Amén! ✨`
  ],
  familia: [
    `💙 Señor, Te presento a esta familia. Que Tu amor sea el lazo perfecto que los une. Sana las heridas del pasado, restaura los vínculos rotos y trae paz donde hay conflicto. Cubre a cada miembro de su hogar con Tu manto de protección divina. En el nombre de Jesús, ¡Amén! 👨‍👩‍👧‍👦`,
    `💚 Padre amoroso, esta familia está en Tus manos. Donde hay distancia, acércalos. Donde hay dolor, sánalos. Protege a sus hijos, fortalece su matrimonio y que el amor de Cristo reine en su hogar cada día. ¡Amén y amén! ✨`
  ],
  economia: [
    `💙 Dios de abundancia, Tú que alimentaste a multitudes, provee hoy a Tu hijo/a. Abre puertas de oportunidad, de favor y bendice el trabajo de sus manos. Aleja la preocupación y trae paz financiera a su vida, sabiendo que Tú suplirás todo lo que le falta. ¡Amén! 🌟`,
    `💚 Señor Jehová Jireh, mi proveedor, ponemos en Tus manos sus finanzas. Guía sus decisiones económicas con Tu infinita sabiduría. Donde parece no haber salida, Tú abres camino en el desierto. Creemos y recibimos Tu provisión. ¡Amén! ✨`
  ],
  paz: [
    `💙 Señor Jesús, Príncipe de Paz, reprende toda tormenta en su mente y corazón. Aleja la ansiedad, el miedo y la incertidumbre. Llena su interior con esa paz que sobrepasa todo entendimiento, para que pueda descansar en Tus promesas. ¡Amén! 🌊`,
  ],
  trabajo: [
    `💚 Padre, te pedimos favor y gracia en su vida laboral. Que donde busca empleo, encuentre una puerta abierta por Ti. Que sus talentos sean valorados y que todo lo que emprenda con sus manos prospere bajo Tu bendición. ¡Amén y amén! ✨`
  ],
  duelo: [
    `💙 Dios de toda consolación, abraza fuertemente a Tu hijo/a en este momento de dolor. Sana su corazón quebrantado y venda sus heridas. Que Tu Espíritu Santo traiga ese consuelo profundo que solo proviene de Ti, convirtiendo su tristeza en esperanza. ¡Amén! 🌅`
  ],
  general: [
    `💚 Señor, Tú conoces perfectamente la petición que hay en su corazón hoy. Te pedimos que obres con Tu gran misericordia y poder, trayendo respuesta oportuna, paz y dirección. Que Tu voluntad, que es buena, agradable y perfecta, se cumpla en su vida. ¡Amén! ✨`
  ]
};

// (Eliminado versiculos_tema, ahora usa citas.js)

// ── SUGERENCIAS CONTEXTUALES ───────────────────────────────────────────────────
export const SUGERENCIAS = {
  salud: [
    { ico: 'fa-heart-pulse', txt: 'Ora por mi recuperación', prompt: 'Ora por mi recuperación completa' },
    { ico: 'fa-book-bible',  txt: 'Cita de sanación',        prompt: 'Dame una cita bíblica de sanación' },
    { ico: 'fa-comment-dots',txt: 'Dime palabras de ánimo',  prompt: 'Me siento desanimado por mi salud' },
    { ico: 'fa-hospital',    txt: 'Por los médicos',         prompt: 'Ora por los médicos que me atienden' },
  ],
  familia: [
    { ico: 'fa-house-heart', txt: 'Paz en el hogar',         prompt: 'Ora por la paz y unión en mi hogar' },
    { ico: 'fa-book-bible',  txt: 'Cita para mi familia',    prompt: 'Dame una cita bíblica para la familia' },
    { ico: 'fa-children',    txt: 'Por mis hijos',           prompt: 'Ora por la protección de mis hijos' },
    { ico: 'fa-comment-dots',txt: 'Palabras de aliento',     prompt: 'Me siento triste por problemas familiares' },
  ],
  economia: [
    { ico: 'fa-hand-holding-dollar', txt: 'Ora por provisión', prompt: 'Ora para que Dios provea en mi necesidad' },
    { ico: 'fa-book-bible',  txt: 'Cita de prosperidad',     prompt: 'Dame una cita bíblica sobre provisión' },
    { ico: 'fa-comment-dots',txt: 'Ánimo en la escasez',     prompt: 'Me siento angustiado por dinero' },
    { ico: 'fa-briefcase',   txt: 'Por un trabajo',          prompt: 'Ora para que encuentre trabajo pronto' },
  ],
  general: [
    { ico: 'fa-heart-pulse', txt: 'Ora por mi salud',        prompt: 'Ora por mi salud' },
    { ico: 'fa-book-bible',  txt: 'Palabra de Dios',         prompt: 'Regálame una cita bíblica para hoy' },
    { ico: 'fa-comment-dots',txt: 'Necesito ánimos',         prompt: 'Me siento triste, necesito ánimos' },
    { ico: 'fa-dove',        txt: 'Ora por paz',             prompt: 'Ora para que tenga paz' },
  ]
};

// ── DETECCIÓN DEL TEMA ─────────────────────────────────────────────────────────
export const detectarTema = (msg) => {
  const m = msg.toLowerCase();
  if (/salud|enferme|sana|dolor|hospital|médico|operaci[oó]n|recupera|ojo|cuerpo|fiebre|covid|diagn[oó]stico|s[ií]ntoma/i.test(m)) return 'salud';
  if (/familia|hijo|esposo|esposa|matrimonio|hogar|padres|hermano|relaci[oó]n|divorcio|separaci[oó]n|pareja|mam[aá]|pap[aá]/i.test(m)) return 'familia';
  if (/dinero|trabajo|econom[ií]a|deuda|empleo|negocio|finanzas|pobreza|provisi[oó]n|necesidad|recursos|pagar|banco/i.test(m)) return 'economia';
  if (/paz|ansie|miedo|angustia|depresi[oó]n|tristeza|llorar|siento mal|estresado|preocupaci[oó]n|desespero/i.test(m)) return 'paz';
  if (/trabajo|empleo|empresa|jefe|compañero|contrato|sueldo|entrevista/i.test(m)) return 'trabajo';
  if (/luto|muri[oó]|falleci|perd[íi] a|duelo|extra[ñn]o/i.test(m)) return 'duelo';
  return 'general';
};

export const getSugerencias = (tema) => SUGERENCIAS[tema] ?? SUGERENCIAS.general;

// ── GENERADOR PRINCIPAL DE RESPUESTA ───────────────────────────────────────────
export const generate = (mensaje) => {
  const m = mensaje.toLowerCase();
  const tema = detectarTema(mensaje);
  const esPeticionOracion = /ora(r)?\s*(por|para|conmigo)?|orac[ií][oó]n|reza(r)?|oremos|pide a dios/i.test(m);
  const pideCita = citas.detectarCita(mensaje);
  const pideAnimo = animos.detectarAnimo(mensaje);

  // 1. Inteligencia conversacional: Si no hay petición de nada, return null (brain.js saluda)
  if (tema === 'general' && !esPeticionOracion && !pideCita && !pideAnimo) {
    return null;
  }

  // 🧠 Inteligencia de Saludo: Evitar saludar cada vez
  const historial = memoria.get() || [];
  const yaSaludo = historial.some(h => h.role === 'assistant' && /^(buenos días|buenas tardes|buenas noches)/i.test(h.content));
  const saludoStr = Saludar().replace(/, $/, '').toLowerCase(); // "buenos días"
  const SaludoCap = yaSaludo ? '' : (saludoStr.charAt(0).toUpperCase() + saludoStr.slice(1) + ' herman@. ');

  // 2. Manejo exclusivo de petición de Cita Bíblica
  if (pideCita && !esPeticionOracion) {
    return citas.generate(mensaje, tema); // citas.js maneja su propio saludo si quiere, o lo devuelve directo
  }

  // 3. Manejo de Ánimo y Consuelo (sin oración completa)
  if (pideAnimo && !esPeticionOracion) {
    return `${SaludoCap}${animos.generate(mensaje, tema)}`;
  }

  // Si llegamos aquí, ES UNA ORACIÓN o una declaración de problema que requiere oración
  const empatiaMsg = empatia_tema[tema] ?? empatia_tema.general;
  const oracionEspecifica = random(oraciones_especificas[tema] ?? oraciones_especificas.general);
  const versiculoFinal = citas.getCita(tema);
  
  const nombreTema = {
    salud: 'sanación para tu salud',
    familia: 'bendición para tu familia',
    economia: 'provisión para tu vida',
    paz: 'paz para tu corazón',
    trabajo: 'bendición para tu trabajo',
    duelo: 'consuelo para tu alma',
    general: 'esperanza para ti'
  }[tema];

  // 🧠 Inteligencia: Evitar redundancia del Padre Nuestro
  const padreNuestroYaDicho = historial.some(h => h.role === 'assistant' && h.content.includes('Padre nuestro que estás en los cielos'));
  const padreNuestroStr = padreNuestroYaDicho ? '' : `\n\n${PADRE_NUESTRO}`;

  return `${SaludoCap}${SaludoCap ? empatiaMsg.charAt(0).toLowerCase() + empatiaMsg.slice(1) : empatiaMsg} Cierra tus ojitos, vamos a orar juntos.${padreNuestroStr}

${oracionEspecifica}

Aquí te muestro una promesa de ${nombreTema}, yo sé que todo estará bien. Hay que confiar en Dios:

📖 ${versiculoFinal}`;
};

