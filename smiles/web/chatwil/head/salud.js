import * as memoria from '../memoria.js';

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const conversaciones = {
  inicio: [
    { pregunta: 'Quiero cuidar mis ojos', prompt: 'Dime acerca de los ojitos' },
    { pregunta: 'Tengo molestias', prompt: 'Tengo ojo seco' },
    { pregunta: 'Quiero comer sano', prompt: 'Alimentos para mi vista' },
    { pregunta: 'Necesito apoyo', prompt: 'Ora por mi sanación' },
    { pregunta: 'Consejos generales', prompt: '¿Qué consejos me das?' }
  ],
  ojo_seco: [
    { pregunta: '¿Qué tratamiento me recomiendas, amigo?', prompt: '¿Qué tratamiento me recomiendas?' },
    { pregunta: '¿En cuánto tiempo me recuperaré?', prompt: '¿Cuánto tiempo tardaré en recuperarme?' },
    { pregunta: '¿Qué alimentos me ayudarían?', prompt: '¿Qué alimentos me ayudan con el ojo seco?' },
    { pregunta: '¿Cuántas veces a la semana debo comerlos?', prompt: '¿Con qué frecuencia debo comerlos?' },
    { pregunta: '¿Debo usar lágrimas artificiales siempre?', prompt: '¿Siempre necesitaré lágrimas artificiales?' },
    { pregunta: '¿Cuándo debo ir al oftalmólogo?', prompt: '¿Cuándo debo visitar al oftalmólogo?' },
    { pregunta: '¿Por qué me pasa esto?', prompt: '¿Cuál es la causa del ojo seco?' },
    { pregunta: '¿El aire acondicionado afecta?', prompt: '¿El aire acondicionado es malo?' },
    { pregunta: '¿Puedo usar lentes de contacto?', prompt: '¿Puedo usar lentes de contacto con ojo seco?' },
    { pregunta: 'Gracias por todo, amigo', prompt: 'Gracias por tu ayuda' }
  ],
  
  fatiga_visual: [
    { pregunta: '¿Qué me recomiendas hacer, amigo?', prompt: '¿Qué puedo hacer para mejorar?' },
    { pregunta: '¿Cada cuánto debo descansar?', prompt: '¿Con qué frecuencia debo descansar?' },
    { pregunta: '¿Los lentes con filtro ayudan?', prompt: '¿Sirven los lentes con filtro azul?' },
    { pregunta: '¿Qué ejercicios puedo hacer?', prompt: '¿Qué ejercicios me recomiendas?' },
    { pregunta: '¿En cuánto tiempo veré mejoría?', prompt: '¿Cuándo notaré mejoría?' },
    { pregunta: '¿Debo ir al oftalmólogo?', prompt: '¿Necesito ir al oftalmólogo?' },
    { pregunta: '¿Es malo usar mucho el celular?', prompt: '¿El celular daña la vista?' },
    { pregunta: '¿Cómo configuro mi pantalla?', prompt: '¿Cómo debo configurar mi pantalla?' },
    { pregunta: '¿Dormir ayuda?', prompt: '¿Dormir bien ayuda a la vista?' },
    { pregunta: 'Gracias por todo, amigo', prompt: 'Muchas gracias por tu ayuda' }
  ],
  
  nutricion: [
    { pregunta: '¿Qué alimentos me recomiendas?', prompt: '¿Qué alimentos son buenos para mis ojos?' },
    { pregunta: '¿Cuántas veces a la semana debo comerlos?', prompt: '¿Con qué frecuencia debo comerlos?' },
    { pregunta: '¿Las vitaminas en pastillas funcionan igual?', prompt: '¿Sirven los suplementos en pastillas?' },
    { pregunta: '¿Qué más puedo hacer para mejorar mi vista?', prompt: '¿Qué más puedo hacer por mi vista?' },
    { pregunta: '¿En cuánto tiempo veré resultados?', prompt: '¿Cuándo veré resultados?' },
    { pregunta: '¿Hay alimentos que deba evitar?', prompt: '¿Qué alimentos debo evitar?' },
    { pregunta: '¿La zanahoria realmente ayuda?', prompt: '¿Es verdad que la zanahoria ayuda?' },
    { pregunta: '¿Qué frutas son buenas?', prompt: '¿Qué frutas me recomiendas?' },
    { pregunta: '¿El agua es importante?', prompt: '¿Por qué debo beber agua?' },
    { pregunta: 'Gracias por todo, amigo', prompt: 'Muchas gracias' }
  ],

  oracion: [
    { pregunta: 'Otra oración por favor', prompt: 'Ora por mi sanación nuevamente' },
    { pregunta: 'Un versículo bíblico', prompt: 'Dame un versículo de sanidad' },
    { pregunta: 'Cómo tener fe', prompt: '¿Cómo puedo tener más fe?' },
    { pregunta: 'Gracias por la oración', prompt: 'Gracias por orar por mí' },
    { pregunta: 'Pide por mi familia', prompt: 'Ora por la salud de mi familia' },
    { pregunta: 'Me siento triste', prompt: 'Me siento triste por mi enfermedad' },
    { pregunta: 'Dios me sanará', prompt: '¿Crees que Dios me sanará?' },
    { pregunta: 'Oración para dormir', prompt: 'Una oración para dormir en paz' },
    { pregunta: 'Bendición del día', prompt: 'Dame una bendición para hoy' },
    { pregunta: 'Amén', prompt: 'Amén, gracias amigo' }
  ],
  
  examenes: [
    { pregunta: '¿Cada cuánto debo ir al oftalmólogo?', prompt: '¿Con qué frecuencia debo ir?' },
    { pregunta: '¿Qué exámenes me harán?', prompt: '¿Qué tipo de exámenes me harán?' },
    { pregunta: '¿Duelen los exámenes?', prompt: '¿Los exámenes son dolorosos?' },
    { pregunta: '¿Cuánto tiempo toma la revisión?', prompt: '¿Cuánto dura la revisión?' },
    { pregunta: '¿Qué debo llevar a la cita?', prompt: '¿Qué necesito llevar a la cita?' },
    { pregunta: '¿Es caro el examen?', prompt: '¿Cuánto cuesta aproximadamente?' },
    { pregunta: 'Gracias por todo, amigo', prompt: 'Muchas gracias por la información' }
  ],
  
  dolor_ojos: [
    { pregunta: 'Siento que me duelen, ¿qué me recomiendas?', prompt: 'Me duelen los ojos, ¿qué hago?' },
    { pregunta: '¿Es grave el dolor?', prompt: '¿Es algo grave?' },
    { pregunta: '¿Qué puedo hacer para aliviar el dolor?', prompt: '¿Cómo alivio el dolor?' },
    { pregunta: '¿Debo ir al doctor inmediatamente?', prompt: '¿Debo ir al doctor ya?' },
    { pregunta: '¿Qué puede estar causando el dolor?', prompt: '¿Qué causa este dolor?' },
    { pregunta: '¿Puedo usar algo mientras tanto?', prompt: '¿Puedo usar algo para el dolor?' },
    { pregunta: 'Gracias por tu ayuda, amigo', prompt: 'Gracias por ayudarme' }
  ]
};

export const respuestasContextuales = {
  frecuencia_alimentos: {
    ojo_seco: [
      'Plan semanal 🐟📅: Pescado graso 3 veces/semana (salmón, atún). Nueces y chía a diario. Vegetales verdes siempre. Y no olvides: 2L de agua al día. ¡Constancia es salud!',
      'Frecuencia recomendada: Consume Omega-3 (pescado/nueces) Lunes, Miércoles y Viernes. Vegetales verdes todos los días. La hidratación debe ser diaria. ¡Tu lágrima te lo agradecerá!'
    ],
    nutricion: [
      'Calendario visual 📅: Pescado 2-3 veces/semana. Huevos y zanahorias interdiario. Fruta y vegetales verdes a diario. Esta rutina reduce riesgos oculares significativamente. ¡Inténtalo!',
      'Guía rápida: Combina colores en tu plato todos los días. Naranja (zanahoria), verde (espinaca) y rojo (pimientos). Pescado graso es el fin de semana. ¡Simple y efectivo!'
    ]
  },
  
  vitaminas_suplementos: {
    nutricion: [
      'Alimentos vs Suplementos 💊: Los alimentos naturales siempre son mejores por su absorción. Úsalos como primera opción. Si no comes pescado, entonces sí: Omega-3 1000mg. ¡Prioriza lo natural!',
      'Consejo experto: Los suplementos son útiles si tienes deficiencias específicas o no consumes ciertos grupos de alimentos. Consulta a tu médico antes de iniciar cualquier régimen. 💚'
    ]
  },
  
  que_mas_hacer: {
    nutricion: [
      'Plus para tu vista ✨: Usa lentes con filtro UV, duerme 7-8 horas y mantente hidratado. El ejercicio físico también mejora la circulación ocular. ¡Todo suma!',
      'Estilo de vida visual 👁️: No fumes (daña la retina), gestiona el estrés y haz pausas de pantallas. Nutrición + Hábitos saludables = Visión para toda la vida.'
    ]
  },
  
  alimentos_evitar: {
    nutricion: [
      'Enemigos de la visión 🚫: Exceso de azúcar (daña vasos), grasas trans (frituras) y mucho sodio. Reduce también el alcohol y tabaco. ¡Tus ojos te lo agradecerán!',
      'A evitar: Comida ultraprocesada y bebidas muy azucaradas. Aumentan el riesgo de enfermedades oculares. Opta por lo natural y fresco siempre que puedas. 💚'
    ]
  },
  
  otros_consejos: {
    nutricion: [
      'Consejo de oro 🌟: La constancia vence a la perfección. Pequeños cambios diarios en tu dieta protegen tu visión a largo plazo. ¡Empieza hoy mismo!',
      'Tip final: Planifica tus comidas. Tener opciones saludables a mano evita caer en tentaciones procesadas. ¡Tu visión es una inversión a futuro! 💙'
    ]
  },
  
  ejercicios: {
    fatiga_visual: [
      'Ejercicios top 👁️: Palming (manos sobre ojos) para relax total. Enfoque cerca-lejos para flexibilidad. Parpadeo consciente para hidratación. ¡Hazlos a diario!',
      'Rutina visual: 1. Mira lejos (6m) 20 seg. 2. Dibuja un 8 con los ojos. 3. Masajea suavemente las sienes. Simple y efectivo para el cansancio digital.'
    ]
  },
  
  tiempo_mejoria: {
    fatiga_visual: [
      'Tiempos reales ⏰: Alivio inmediato con la regla 20-20-20. Mejoría notable en 3-5 días. Recuperación completa en 2 semanas si eres constante. ¡Ánimo!'
    ]
  },
  
  cuando_doctor: {
    fatiga_visual: [
      'Consulta si: El dolor persiste tras 2 semanas, tienes visión borrosa súbita, o sensibilidad extrema a la luz. Es mejor prevenir. ¡Tu salud es primero! 🩺'
    ]
  }
};

export const detectarTema = (mensaje) => {
  const msg = mensaje.toLowerCase();
  
  if (/hola|buenos|buenas|saludos|qu[eé] tal|c[oó]mo est[aá]s/i.test(msg)) return 'inicio';
  if (/ojo(s)? seco(s)?|sequedad|xeroftalm/i.test(msg)) return 'ojo_seco';
  if (/fatiga|cansancio|pantalla|proteger (mis )?ojos|lentes con filtro/i.test(msg)) return 'fatiga_visual';
  if (/alimento(s)?|comida|vitamina(s)?|nutrici[oó]n|qu[eé] (debo |puedo )?comer/i.test(msg)) return 'nutricion';
  if (/ora(r)?|reza(r)?|dios|sanaci[oó]n|fe|vers[ií]culo|bendici[oó]n/i.test(msg)) return 'oracion';
  if (/cada cu[aá]nto (debo )?ir|oftalm[oó]logo|examen|revisi[oó]n|qu[eé] examen|qu[eé] debo llevar|es caro/i.test(msg)) return 'examenes';
  if (/duele(n)?|dolor|me duele(n)?|siento dolor/i.test(msg)) return 'dolor_ojos';
  
  return memoria.getTemaActual();
};

export const getSiguientePregunta = () => {
  const tema = memoria.getTemaActual();
  const contador = memoria.getContadorPregunta();
  
  if (tema && conversaciones[tema] && contador < conversaciones[tema].length) {
    return conversaciones[tema][contador].prompt;
  }
  
  return null;
};

export const detectarPreguntaContextual = (mensaje) => {
  const msg = mensaje.toLowerCase();
  
  if (/cu[aá]ntas veces|frecuencia|cada cu[aá]nto (debo |puedo )?comer/i.test(msg)) return 'frecuencia_alimentos';
  if (/vitaminas? (en )?pastillas?|suplementos?|c[aá]psulas?|funcionan igual/i.test(msg)) return 'vitaminas_suplementos';
  if (/qu[eé] m[aá]s (puedo |debo )?hacer|qu[eé] otra cosa|adem[aá]s de|aparte de/i.test(msg)) return 'que_mas_hacer';
  if (/alimentos? (que |debo )?evitar|qu[eé] no (debo |puedo )?comer|alimentos? malos/i.test(msg)) return 'alimentos_evitar';
  if (/alg[uú]n otro consejo|otro tip|m[aá]s consejos|[uú]ltimo consejo|algo m[aá]s que/i.test(msg)) return 'otros_consejos';
  if (/ejercicios?|qu[eé] ejercicios|c[oó]mo ejercitar|actividades/i.test(msg)) return 'ejercicios';
  if (/cu[aá]nto tiempo|cu[aá]ndo (ver[eé]|notar[eé])|mejor[ií]a|resultados|cu[aá]ndo me|tiempo (de |para )/i.test(msg)) return 'tiempo_mejoria';
  if (/debo ir|necesito ir|cu[aá]ndo ir|oftalm[oó]logo|doctor|m[eé]dico/i.test(msg)) return 'cuando_doctor';
  
  return null;
};

export const getRespuestaContextual = (tipoPregunta, tema) => {
  if (respuestasContextuales[tipoPregunta] && respuestasContextuales[tipoPregunta][tema]) {
    return random(respuestasContextuales[tipoPregunta][tema]);
  }
  return null;
};

export const esAgradecimiento = (mensaje) => {
  return /^(muchas )?gracias|te agradezco|mil gracias|thank you|thx|grax/i.test(mensaje.trim());
};

export const getAgradecimiento = () => {
  const agradecimientos = [
    '¡Un placer! 💚 Tu salud visual es mi prioridad. Sigue cuidándote y verás grandes resultados. Si necesitas más consejos, aquí estaré. ¡Bendiciones! 🙏',
    '¡De nada! 💙 La constancia es el secreto. Cuida tus ojos cada día y ellos te darán la mejor visión del mundo. ¡Estamos en contacto! ✨',
    '¡A ti! 😊 Recuerda que pequeños hábitos hacen grandes diferencias. Confía en el proceso y cuida ese tesoro que es tu vista. ¡Adelante! 💪'
  ];
  return random(agradecimientos);
};
