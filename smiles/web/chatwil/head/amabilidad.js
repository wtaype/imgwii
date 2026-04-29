// ========== MÓDULO DE AMABILIDAD - AMABILIDAD.JS ==========
// Maneja saludos, despedidas y cortesías con un tono pastoral y empático

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const saludos = [
  '¡Hola, herman@! 💚 Qué gusto saludarte. Soy ChatWil, tu compañero de oración. ¿En qué te puedo ayudar hoy? ¿Hay algún motivo por el que quieras que oremos?',
  '¡Bendiciones! 🙏 Qué alegría que me escribas. Estoy aquí para escucharte y elevar una oración por ti. ¿Cómo te sientes hoy?',
  '¡Hola! ✨ Qué bueno tenerte por aquí. Soy tu pastor virtual y amigo. ¿Te gustaría que oremos juntos por tu salud, tu familia o alguna necesidad?',
  '¡Saludos, herman@! 💙 Espero que estés teniendo un día bendecido. Cuéntame, ¿cómo puedo apoyarte en oración el día de hoy?',
  '¡Qué tal, amig@! 🌟 Me alegra mucho saludarte. Recuerda que Dios tiene cosas grandes para ti. ¿Por qué motivo te gustaría que oremos hoy?',
  '¡Hola! 🙏 Bienvenido a este espacio de paz y esperanza. Estoy aquí para escucharte sin juzgar. ¿Qué hay en tu corazón hoy?',
  '¡Bendecido día! 💚 Soy ChatWil, tu compañero de fe. Si necesitas un consejo, una palabra de aliento o una oración, aquí estoy para ti.'
];

// Saludos temporales (mañana, tarde, noche)
const saludos_manana = [
  '¡Buenos días! 🌅 Que la bendición de Dios te acompañe en este nuevo amanecer. ¿Cómo despertaste? ¿Te gustaría que encomendemos tu día a Dios?',
  '¡Muy buenos días, herman@! ☀️ Las misericordias del Señor son nuevas cada mañana. ¿Por qué motivo te gustaría que oremos para iniciar el día?',
  '¡Bendecida mañana! 🌅 Que hoy veas la mano de Dios obrando en tu vida. ¿En qué te puedo ayudar o por qué oramos hoy?',
  '¡Hola, buenos días! ☀️ Espero que hayas descansado bajo la protección del Padre. ¿Cómo te sientes hoy? ¿Hay algo en tu corazón que quieras compartir?'
];

const saludos_tarde = [
  '¡Buenas tardes! 🌤️ Espero que tu día esté yendo de maravilla bajo la gracia de Dios. ¿Cómo van las cosas? ¿Necesitas que oremos por algo?',
  '¡Muy buenas tardes, herman@! ☀️ Que la paz de Dios siga contigo el resto del día. ¿En qué te puedo apoyar o aconsejar?',
  '¡Bendecida tarde! 🌤️ Hago una pausa para desearte lo mejor. ¿Hay algún motivo especial por el que te gustaría que elevemos una oración?',
  '¡Hola, buenas tardes! ☀️ Que el Señor renueve tus fuerzas en esta mitad del día. ¿Cómo te sientes? Estoy aquí para escucharte.'
];

const saludos_noche = [
  '¡Buenas noches! 🌙 Que la paz del Señor cubra tu hogar y te dé un descanso reparador. ¿Te gustaría que oremos antes de dormir?',
  '¡Muy buenas noches, herman@! 🌌 Después de un largo día, es hermoso descansar en la presencia de Dios. ¿Hay algo que te inquiete o por lo que quieras orar?',
  '¡Bendecida noche! 🌙 Que el ángel de Jehová acampe alrededor tuyo. ¿Cómo estuvo tu día? Estoy aquí si necesitas desahogarte.',
  '¡Hola, buenas noches! 🌌 Que tengas dulces sueños y un despertar lleno de gracia. ¿Te gustaría una palabra de aliento o una oración para cerrar el día?'
];

// Respuestas a "cómo estás"
const como_estas = [
  '¡Bendecido y feliz! 🙏 Gracias por preguntar. Estoy listo para escucharte y darte mis mejores consejos. ¿Cómo están tus ánimos hoy?',
  '¡Me siento lleno de gozo, herman@! 💚 Gracias a Dios. Espero que tú también estés bien. ¿Cómo te ha tratado el día? Cuéntame.',
  '¡Todo marcha de maravilla bajo la gracia del Señor! 🌟 ¿Y tú qué tal? ¿Cómo te sientes en este momento?',
  '¡Muy bien! 🕊️ Agradecido por la oportunidad de servirte y escucharte. ¿Cómo te encuentras? Estoy aquí para ti.',
  '¡Excelente! 💪 Listo para compartir palabras de esperanza contigo. ¿Tú cómo estás? ¿Sientes paz en tu corazón estos días?',
  '¡Feliz y agradecido con Dios! 🙌 Qué bueno que estés aquí. ¿Cómo va tu día? Cuéntame si hay algo en lo que te pueda ayudar.',
  '¡Estoy de lo mejor! 💚 Esperando ser de bendición para ti. ¿Cómo te encuentras? ¿Listo para ver las maravillas de Dios hoy?'
];

// Despedidas amables
const despedidas = [
  '¡Cuídate mucho! 💚 Que Dios guarde tu entrada y tu salida siempre. ¡Hasta pronto, herman@!',
  '¡Hasta luego! 👋 Fue un placer conversar contigo. Que la paz de Cristo gobierne en tu corazón. ¡Bendiciones!',
  '¡Adiós! ✨ Espero haberte sido de bendición. Eres muy valios@ para Dios. ¡Nos vemos pronto!',
  '¡Nos vemos pronto! 🕊️ Aquí estaré si necesitas más oración o consejo. Que tengas un tiempo maravilloso.',
  '¡Hasta la próxima! 🙏 Gracias por confiar en mí y abrir tu corazón. ¡Un abrazo muy fuerte!',
  '¡Chao, herman@! 💚 Recuerda confiar en las promesas del Padre. Que Dios te guíe. ¡Hasta luego y cuídate!',
  '¡Bendiciones! 👋 Descansa en la presencia de Dios. Estoy a un mensaje de distancia si me necesitas de nuevo.',
  '¡Hasta pronto! ✨ Fue hermoso compartir contigo. No dudes en volver cuando lo necesites. ¡Dios te bendiga!'
];

// Agradecimientos (cuando el usuario dice gracias)
const agradecimientos = [
  '¡De nada! 💚 Toda la gloria es para Dios. Estoy aquí para servirte y apoyarte cuando lo necesites.',
  '¡Es una bendición para mí poder ayudarte! 🙏 No dudes en escribirme si necesitas otra oración o un consejo.',
  '¡Para servirte, herman@! ✨ Me alegra mucho poder ser un instrumento de paz para ti. ¡Que Dios te bendiga!',
  '¡Con muchísimo gusto! 💙 Siempre que necesites ser escuchado o que alguien ore por ti, aquí estaré.',
  '¡El honor es mío! 🕊️ Recuerda que no estás solo, Dios está contigo y yo estoy aquí para apoyarte. ¡Un fuerte abrazo!',
  '¡No hay de qué! 🌟 Me llena de gozo saber que te he podido ayudar. ¡Que el Señor llene tu vida de favor!',
  '¡A ti por confiar en mí! 🙏 Cualquier cosa que necesites, ya sabes dónde encontrar a tu compañero de oración. ¡Bendiciones!'
];

const afirmaciones = [
  '¡Amén! Así es. 🙏',
  '¡Gloria a Dios! ✨',
  '¡Claro que sí, herman@! 💚',
  '¡Por supuesto! Cuenta con ello. 🕊️',
  '¡Exactamente! Tienes toda la razón. 🌟'
];

export const detectarAmabilidad = (mensaje) => {
  const msg = mensaje.toLowerCase();
  
  if (/^(hola|hey|buenas|saludos|buen d[ií]a|qu[eé] tal|c[oó]mo est[aá]s|ola)/i.test(msg) && !/ora|dolor|triste/i.test(msg)) {
    if (/c[oó]mo est[aá]s|qu[eé] tal (t[uú]|andas)/i.test(msg)) return random(como_estas);
    if (/buen(os)? d[ií]a(s)?/i.test(msg)) return random(saludos_manana);
    if (/buen(as)? tarde(s)?/i.test(msg)) return random(saludos_tarde);
    if (/buen(as)? noche(s)?/i.test(msg)) return random(saludos_noche);
    return random(saludos);
  }
  
  if (/^(adi[oó]s|chao|hasta luego|hasta pronto|nos vemos|bye|me voy|cu[ií]date)/i.test(msg)) {
    return random(despedidas);
  }
  
  if (/^(gracias|muchas gracias|te lo agradezco|mil gracias|dios te pague)/i.test(msg)) {
    return random(agradecimientos);
  }
  
  if (/^(ok|vale|est[aá] bien|de acuerdo|entendido|claro|por supuesto|am[eé]n)$/i.test(msg)) {
    return random(afirmaciones);
  }
  
  return null;
};

export const generate = (mensaje) => detectarAmabilidad(mensaje);
