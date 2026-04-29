// ========== MÓDULO DE ESTADOS EMOCIONALES - ESTADOS.JS ==========
// Respuestas empáticas para diferentes estados emocionales del usuario (Complemento de animos.js)

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const estadosEmocionales = {
  felicidad: {
    patron: /estoy feliz|me siento feliz|estoy contento|me siento bien|estoy alegre|me siento genial|estoy emocionado|qué alegría/i,
    respuestas: [
      '¡Qué hermoso escuchar eso, herman@! 🎉💚 Me alegra muchísimo que estés feliz. "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él" (Salmo 118:24). 😊✨ La alegría es un regalo de Dios. Disfruta esta bendición y compártela con los demás.',
      '¡Aleluya! 🙌💙 Qué bendición es saber que estás feliz. "El corazón alegre hermosea el rostro" (Proverbios 15:13). 😊💚 Tu alegría es contagiosa y me llena de gozo. Agradezcamos a Dios por estos momentos hermosos en tu vida.',
      '¡Qué maravilloso, amig@! 🌟💚 Me encanta verte feliz. "La alegría de Jehová es vuestra fuerza" (Nehemías 8:10). 😊💙 Dios te ha dado este día hermoso, disfrútalo al máximo. Si hay algo por lo que quieras dar gracias a Dios hoy, podemos orar juntos.',
      '¡Qué alegría más grande! 🎊💙 Tu felicidad me llena el corazón. "Estad siempre gozosos" (1 Tesalonicenses 5:16). 😊💚 Dios es bueno y te ha bendecido. Aprovecha esta etapa para ser luz en medio de tu familia y amigos.'
    ]
  },
  
  agradecimiento: {
    patron: /estoy agradecido|me siento agradecido|doy gracias|bendecido|afortunado|gracias a dios|dios es bueno/i,
    respuestas: [
      '¡Qué hermoso corazón tienes, herman@! 🙏💚 La gratitud es una de las actitudes más poderosas. "Dad gracias en todo, porque esta es la voluntad de Dios" (1 Tesalonicenses 5:18). 😊💙 Dios se alegra cuando reconocemos sus bendiciones.',
      '¡Aleluya! 🙌💙 Tu gratitud es un testimonio hermoso. "Entrad por sus puertas con acción de gracias" (Salmo 100:4). 🙏💚 Dios es bueno todo el tiempo. Un corazón agradecido atrae aún más bendiciones de los cielos.',
      '¡Qué bendición escuchar eso! 💚😊 La gratitud transforma vidas. "Bueno es alabarte, oh Jehová" (Salmo 92:1). 🙏💙 Dios te ha bendecido abundantemente y me alegra que lo reconozcas. ¿Te gustaría que elevemos una oración de agradecimiento juntos?',
      '¡Amén! 🙏💚 Tu gratitud es un aroma dulce para Dios. "Por lo cual, recibiendo nosotros un reino inconmovible, tengamos gratitud" (Hebreos 12:28). 😊💙 Disfruta de todo lo bueno que el Padre te ha entregado.'
    ]
  },
  
  esperanza: {
    patron: /tengo esperanza|confío en dios|sé que mejoraré|todo estará bien|dios está conmigo|tengo fe|creo que sanaré/i,
    respuestas: [
      '¡Qué fe tan hermosa, herman@! 💚🙏 Tu esperanza es poderosa. "La fe es la certeza de lo que se espera, la convicción de lo que no se ve" (Hebreos 11:1). 💙✨ Dios honra tu fe y ya está obrando a tu favor.',
      '¡Amén! 🙌💙 Tu confianza en Dios es inspiradora. "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis" (Jeremías 29:11). 🙏💚 Dios tiene un plan perfecto para ti.',
      '¡Qué testimonio tan poderoso! 💚🌟 Tu esperanza en Dios es inquebrantable. "Mas los que esperan a Jehová tendrán nuevas fuerzas" (Isaías 40:31). 🙏💙 Sigue confiando, porque el Señor nunca llega tarde. Su tiempo es perfecto.',
      '¡Así se habla, herman@! 🙏💙 Tu fe mueve montañas. "Todo lo puedo en Cristo que me fortalece" (Filipenses 4:13). 💚💪 Dios está contigo en cada paso. Sigue creyendo con esa misma convicción.'
    ]
  },

  enojo_frustracion: {
    patron: /estoy enojado|estoy furioso|estoy harto|no aguanto|estoy molesto|me rindo|frustrado/i,
    respuestas: [
      'Entiendo que te sientas así, herman@ 💙😟 La frustración es humana y Dios entiende tu enojo. "Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo" (Efesios 4:26). Respira profundo y entrega esa carga al Señor, Él te dará paz.',
      'Lamento mucho que estés pasando por un momento de tanta tensión. 💚 Dios conoce la injusticia o la situación que te tiene así. Déjalo en Sus manos, Él es tu defensor y te dará la sabiduría para actuar correctamente. Si quieres orar para encontrar calma, estoy aquí.',
      'A veces las cosas no salen como esperamos y es muy frustrante. 🕊️ Pero recuerda que Dios tiene el control incluso cuando todo parece un caos. Tómate un momento, respira y pídele al Espíritu Santo que traiga serenidad a tu mente. Todo pasará.'
    ]
  }
};

export const generate = (mensaje) => {
  const msg = mensaje.toLowerCase();
  
  for (const [key, estado] of Object.entries(estadosEmocionales)) {
    if (estado.patron.test(msg)) {
      return random(estado.respuestas);
    }
  }
  
  return null;
};
