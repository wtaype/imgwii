// animos.js — Motor de consolación y palabras de aliento positivo 🕊️💙

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const animos_tema = {
  paz: [ // Tristeza, ansiedad, miedo
    'Herman@, respira profundo. Sé que duele y que te sientes triste, pero recuerda que después de la tormenta siempre, siempre sale el sol. Dios está abrazando tu corazón en este preciso momento. Llora si lo necesitas, pero no te rindas. 💙✨',
    'A veces el cielo se nubla en nuestra vida, pero eso no significa que el sol haya dejado de brillar. Eres muy fuerte y valiente por expresar lo que sientes. Dios es experto en sanar corazones heridos. Vas a superar esto, te lo aseguro. 🕊️💚',
    'Entiendo perfecto esa tristeza que sientes. Pero quiero recordarte que eres un hij@ muy amado por Dios. Él recoge cada una de tus lágrimas. Mañana será un día mejor, descansa tu mente en Sus promesas. ¡Un abrazo muy fuerte! 🌅🤗'
  ],
  salud: [ // Enfermedad, dolor
    'El proceso de la enfermedad es duro, lo sé. Pero tu cuerpo es maravilloso y con la ayuda de Dios y los médicos, te vas a recuperar. Declaro sobre tu vida fuerzas nuevas. ¡No pierdas la esperanza, cada día estás un paso más cerca de sanar! 🌟💪',
    'Siento mucho que estés pasando por este dolor físico. Pero quiero animarte: tu diagnóstico no es tu destino. Dios tiene la última palabra. Mantén una actitud positiva, porque un corazón alegre es la mejor medicina. ¡Saldrás de esta! 💚🏥'
  ],
  economia: [ // Deudas, falta de trabajo
    'Sé que las deudas y la falta de dinero quitan mucho la paz. Pero herman@, las crisis son temporales. Eres una persona trabajadora y capaz. Dios abrirá una puerta gigante de oportunidad para ti. Sigue intentando, no bajes los brazos. 💰🙌',
    'La escasez asusta, te entiendo. Pero recuerda a los pajaritos: no siembran ni guardan en graneros, y Dios siempre los alimenta. Tú vales mucho más. Muy pronto vendrá una provisión económica que te sorprenderá. ¡Mantén la fe! ✨💙'
  ],
  familia: [ // Problemas familiares
    'Los problemas en casa duelen más porque son con quienes más amamos. Pero el amor siempre gana. Dale tiempo al tiempo, ten paciencia, perdona y pide perdón si es necesario. Dios restaurará la paz en tu hogar. 👨‍👩‍👧‍👦💚',
    'Toda familia pasa por crisis, pero los lazos de sangre y amor son más fuertes. Confía en que el Señor está obrando en el corazón de tus seres queridos aunque ahora no lo veas. Trata de mantener la calma, todo se va a solucionar. 🕊️💙'
  ],
  general: [
    'Herman@, sea lo que sea que estés enfrentando hoy, quiero decirte que NO estás sol@. Dios pelea tus batallas. Seca esas lágrimas, levanta la cabeza y sonríe, porque vienen días hermosos para ti. ¡Yo creo en ti y Dios también! 🌟😊',
    'Las pruebas difíciles solo preparan a personas comunes para destinos extraordinarios. ¡Ánimo! Eres mucho más fuerte de lo que crees. Respira, confía en el Creador y da un paso a la vez. ¡Todo va a estar muy bien! 💪💚'
  ]
};

export const detectarAnimo = (mensaje) => {
  const m = mensaje.toLowerCase();
  // Detecta si necesita ánimo o consuelo (no necesariamente pide oración)
  if (/triste|siento mal|depresi[oó]n|llorar|no (puedo|doy) m[aá]s|desesperad|miedo|angustia|desanimad|estresad/i.test(m)) {
    return true;
  }
  return false;
};

export const getAnimo = (tema) => {
  return random(animos_tema[tema] ?? animos_tema.general);
};

export const generate = (mensaje, tema = 'general') => {
  if (detectarAnimo(mensaje)) {
    return getAnimo(tema);
  }
  return null;
};
