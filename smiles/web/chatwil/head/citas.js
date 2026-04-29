// citas.js — Colección de versículos bíblicos por tema para ChatWil 📖💚

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const versiculos_tema = {
  salud: [
    '"Yo soy Jehová tu sanador" — Éxodo 15:26 💚',
    '"Por sus llagas fuimos nosotros curados" — Isaías 53:5 💙',
    '"Sanaré tu herida y te curaré de tus llagas" — Jeremías 30:17 🌟',
    '"He aquí que yo les traeré sanidad y medicina" — Jeremías 33:6 ✨'
  ],
  familia: [
    '"Mas yo y mi casa serviremos a Jehová" — Josué 24:15 💚',
    '"Si Dios es por nosotros, ¿quién contra nosotros?" — Romanos 8:31 💙',
    '"Cree en el Señor Jesucristo, y serás salvo, tú y tu casa" — Hechos 16:31 🌟'
  ],
  economia: [
    '"Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria" — Filipenses 4:19 💚',
    '"Jehová es mi pastor; nada me faltará" — Salmo 23:1 💙',
    '"Joven fui, y he envejecido, y no he visto justo desamparado, ni su descendencia que mendigue pan" — Salmo 37:25 🌟'
  ],
  paz: [
    '"La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones" — Filipenses 4:7 💚',
    '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo" — Isaías 41:10 💙',
    '"Mi paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo" — Juan 14:27 🕊️'
  ],
  trabajo: [
    '"Todo lo puedo en Cristo que me fortalece" — Filipenses 4:13 💪',
    '"Encomienda a Jehová tus obras, y tus pensamientos serán afirmados" — Proverbios 16:3 🌟',
    '"Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres" — Colosenses 3:23 ✨'
  ],
  duelo: [
    '"Él sana a los quebrantados de corazón, y venda sus heridas" — Salmo 147:3 💙',
    '"Por la noche durará el lloro, y a la mañana vendrá la alegría" — Salmo 30:5 🌅',
    '"Bienaventurados los que lloran, porque ellos recibirán consolación" — Mateo 5:4 🕊️'
  ],
  general: [
    '"Confía en Jehová de todo tu corazón, y no te apoyes en tu propia prudencia" — Proverbios 3:5 💚',
    '"Jehová es mi luz y mi salvación; ¿de quién temeré?" — Salmo 27:1 💙',
    '"Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón" — Salmo 37:4 🌟'
  ]
};

export const detectarCita = (mensaje) => {
  if (/vers[ií]culo|pasaje|biblia|palabra de dios|escritura|cita b[ií]blica/i.test(mensaje)) {
    return true;
  }
  return false;
};

export const getCita = (tema) => {
  return random(versiculos_tema[tema] ?? versiculos_tema.general);
};

export const generate = (mensaje, tema = 'general') => {
  if (detectarCita(mensaje)) {
    const v = getCita(tema);
    return `📖 Aquí tienes una Palabra de Dios que separé especialmente para ti:\n\n${v}\n\n💚 Medita en ella hoy. Yo sé que todo estará bien. Hay que confiar siempre en Dios. 🙏`;
  }
  return null;
};
