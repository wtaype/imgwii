import * as memoria from '../memoria.js';

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const versiculos = {
  sanacion: [
    { texto: 'Yo soy Jehová tu sanador', ref: 'Éxodo 15:26', emoji: '💚🙏' },
    { texto: 'Por sus llagas fuimos sanados', ref: 'Isaías 53:5', emoji: '💙✨' },
    { texto: 'Sanaré tu herida', ref: 'Jeremías 30:17', emoji: '💚🌟' }
  ],
  confianza: [
    { texto: 'Jehová es mi pastor; nada me faltará', ref: 'Salmo 23:1', emoji: '💙🙏' },
    { texto: 'Confía en Jehová de todo tu corazón', ref: 'Proverbios 3:5-6', emoji: '💚✨' }
  ],
  fortaleza: [
    { texto: 'Todo lo puedo en Cristo que me fortalece', ref: 'Filipenses 4:13', emoji: '💪💙' },
    { texto: 'Mi poder se perfecciona en la debilidad', ref: '2 Corintios 12:9', emoji: '💚🌟' }
  ],
  paz: [
    { texto: 'No temas, porque yo estoy contigo', ref: 'Isaías 41:10', emoji: '💙🙏' },
    { texto: 'La paz de Dios guardará vuestros corazones', ref: 'Filipenses 4:7', emoji: '💚✨' }
  ],
  victoria: [
    { texto: 'Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo', ref: '1 Corintios 15:57', emoji: '💙🎉' },
    { texto: 'En todas estas cosas somos más que vencedores', ref: 'Romanos 8:37', emoji: '💚💪' }
  ]
};

export const oraciones = {
  sanacion: [
    '🙏💙 Oremos juntos, amig@:\n\nPadre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.\n\n💚✨ Padre amado, te pido especialmente por la sanación de mis ojitos. Toca con tu poder sanador cada célula, cada nervio, cada parte de mi vista. Restaura lo que está dañado, alivia cualquier molestia, y devuélveme la claridad de visión. Confío en tu amor infinito y en tu promesa: "Yo soy Jehová tu sanador" (Éxodo 15:26). En el nombre de Jesús, Amén. 🙏👁️💙',
    
    '🙏💚 Elevemos esta oración al Padre:\n\nPadre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.\n\n💙✨ Señor Jesús, pon tus manos sanadoras sobre mis ojos. Tú que abriste los ojos de los ciegos, te pido que restaures mi visión. Sana toda sequedad, toda fatiga, toda enfermedad ocular. Que tu luz divina ilumine mis ojos y los llene de salud. "Por sus llagas fuimos sanados" (Isaías 53:5). Gracias, Señor. Amén. 🙏👁️💚',
    
    '🙏💙 Oremos con fe:\n\nPadre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.\n\n💚🌟 Dios todopoderoso, encomiendo a ti la salud de mis ojitos. Que tu poder sanador fluya a través de ellos. Alivia el dolor, la irritación, la visión borrosa. Fortalece cada músculo ocular, cada vaso sanguíneo, cada lágrima. Danos paciencia en el proceso de sanación y fe inquebrantable. En tus manos estamos. Amén. 🙏👁️💙',
    
    '🙏💚 Clamemos juntos al Señor:\n\nPadre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.\n\n💙✨ Espíritu Santo, derrama tu aceite sanador sobre mis ojos cansados. Trae consuelo, alivio y restauración completa. Que cada tratamiento sea bendecido por ti, que cada medicamento sea efectivo. Llena mi corazón de esperanza y mi mente de paz. "Sanaré tu herida" (Jeremías 30:17). Confío en ti, Señor. Amén. 🙏👁️💚',
    
    '🙏💙 Presentemos nuestra petición:\n\nPadre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra. El pan nuestro de cada día, dánoslo hoy. Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores. Y no nos metas en tentación, mas líbranos del mal; porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.\n\n💚🌟 Padre celestial, mira con amor mis ojitos que tanto te necesitan. Sana toda infección, toda inflamación, toda enfermedad. Restaura la claridad de mi visión y protege mi vista para el futuro. Bendice a los médicos que me atienden y guía sus manos. Gracias por tu amor que nunca falla. En el nombre de Jesús, Amén. 🙏👁️💙'
  ],
  
  agradecimiento: [
    '🙏💚 Padre amado, gracias por este día. Gracias por la vida, por la salud, por los ojos que nos permiten ver Tu creación hermosa. 😊💙 Gracias por cuidar de nosotros, por sanar nuestras enfermedades, por estar siempre a nuestro lado. "Jehová es mi pastor; nada me faltará" (Salmo 23:1). 💚✨ Te alabamos y te bendecimos. En el nombre de Jesús, Amén. 🙏💙',
    
    '🙏💙 Señor, mi corazón está lleno de gratitud. Gracias por Tu amor incondicional, por Tu misericordia, por Tu poder sanador. 💚😊 Gracias por cada mejoría, por cada bendición, por cada nuevo día. "Mas gracias sean dadas a Dios, que nos da la victoria" (1 Corintios 15:57). 💪🎉 Te amo, Señor. Amén. 💚🙏'
  ],
  
  fortaleza: [
    '🙏💚 Dios todopoderoso, en este momento necesito Tu fortaleza. Dame fuerzas para seguir adelante, para ser constante con el tratamiento, para no rendirme. 💪💙 "Todo lo puedo en Cristo que me fortalece" (Filipenses 4:13). Llena mi corazón de esperanza y mi mente de paz. 😊✨ Confío en Ti, Señor. En el nombre de Jesús, Amén. 💚🙏',
    
    '🙏💙 Padre celestial, cuando me siento débil, Tú eres mi fuerza. Cuando tengo miedo, Tú eres mi refugio. 💚😔 "No temas, porque yo estoy contigo" (Isaías 41:10). Dame valentía para enfrentar este proceso, dame paciencia para esperar Tu tiempo perfecto. 💪✨ Gracias por Tu amor que nunca falla. Amén. 💚🙏'
  ]
};

export const mensajes_esperanza = [
  '💚😊 Dios tiene un plan perfecto para tu sanación, amig@. Confía en Él. "Yo soy Jehová tu sanador" (Éxodo 15:26). Cada día es una oportunidad para ver Su gloria en tu vida. 💙✨🙏',
  
  '💙😊 Tu fe mueve montañas, amig@. Dios está contigo en este proceso de sanación. "Todo lo puedo en Cristo que me fortalece" (Filipenses 4:13). No estás solo, Él te sostiene. 💚💪🙏',
  
  '💚😊 Mientras cuidas tus ojos con el tratamiento, recuerda que Dios también cuida de ti con amor infinito. "Jehová es mi pastor; nada me faltará" (Salmo 23:1). Confía en Su plan. 💙✨🙏',
  
  '💙😊 El tratamiento médico + la fe en Dios = sanación completa, amig@. Dios guía las manos de los médicos y bendice cada medicamento. Confía en el proceso. 💚🙏💪',
  
  '💚😊 "No temas, porque yo estoy contigo" (Isaías 41:10). Dios está en cada paso de tu recuperación, amig@. Él te fortalece, te sana, te ama. 💙✨🙏'
];

export const confiar_en_dios = [
  '¡Qué hermosa pregunta, amig@! 💙😊 Confiar en Dios durante la enfermedad es un acto de fe profundo. Recuerda: "Yo soy Jehová tu sanador" (Éxodo 15:26). 💚🙏 Dios no solo conoce tu dolor, sino que está trabajando en tu sanación con amor infinito. Aquí hay algunos pasos: 1) ORA diariamente, comparte tus miedos con Él 🙏 2) LEE Su Palabra, especialmente Salmo 23 y Isaías 41:10 📖💙 3) CONFÍA en el proceso, Dios tiene un plan perfecto ✨ 4) AGRADECE, incluso en la prueba, porque Él está contigo 💚😊 ¿Te gustaría que oremos juntos por tu sanación? 🙏💙',
  
  'Amig@, entiendo que es difícil confiar cuando estamos enfermos 💙😔 Pero déjame recordarte algo poderoso: "Todo lo puedo en Cristo que me fortalece" (Filipenses 4:13). 💪💚 Tu enfermedad NO define tu destino. Dios está contigo en cada momento, sosteniéndote con Su amor. 🙏😊 Pasos prácticos: 1) Habla con Dios como con un amigo, dile tus miedos 💙 2) Rodéate de personas de fe que oren contigo 🙏 3) Busca tratamiento médico (Dios obra a través de médicos también) 💚 4) Descansa en Su promesa: "Jehová es mi pastor; nada me faltará" (Salmo 23:1) ✨ ¿Quieres que oremos juntos ahora? 🙏💙😊'
];

export const ofrecer_oracion = [
  '💙😊 Amig@, ¿te gustaría que oremos juntos por tu sanación? Dios escucha nuestras oraciones con amor. 🙏💚✨',
  '💚😊 ¿Quieres que elevemos una oración a Dios por tus ojitos? Él es nuestro sanador. 🙏💙✨',
  '💙😊 Amig@, la oración tiene poder. ¿Te gustaría que oremos juntos en este momento? Dios te ama. 🙏💚✨'
];

export const detectarPeticionOracion = (mensaje) => {
  const msg = mensaje.toLowerCase();
  if (/ora(r)?\s*(por|para)|oraci[oó]n\s*(por|para)|reza(r)?\s*(por|para)|pide a dios|ruega|^ora$|^orar$/i.test(msg)) {
    return random(oraciones.sanacion);
  }
  return null;
};

export const detectarConfiarDios = (mensaje) => {
  const msg = mensaje.toLowerCase();
  if (/c[oó]mo confiar|confiar en dios|fe en dios|creer en dios|dios (me |te )?ayud/i.test(msg)) {
    return random(confiar_en_dios);
  }
  return null;
};

export const getMensajeEsperanza = () => random(mensajes_esperanza);

export const getOracion = (tipo = 'sanacion') => {
  if (oraciones[tipo]) return random(oraciones[tipo]);
  return random(oraciones.sanacion);
};

export const getVersiculo = (contexto = 'sanacion') => {
  if (versiculos[contexto]) {
    const v = random(versiculos[contexto]);
    return `📖 "${v.texto}" - ${v.ref} ${v.emoji}`;
  }
  return null;
};

export const generate = (mensaje) => {
  let respuesta = detectarPeticionOracion(mensaje);
  if (respuesta) return respuesta;
  
  respuesta = detectarConfiarDios(mensaje);
  if (respuesta) return respuesta;
  
  return null;
};
