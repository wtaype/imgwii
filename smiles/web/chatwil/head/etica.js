// ========== PARTE 1: DATOS BASE ==========
const prohibidos = [
  // Violencia
  /matar|asesinar|violencia|golpear|herir|dañar/i,
  // Drogas y sustancias
  /droga|cocaína|marihuana|heroína|sustancia ilegal/i,
  // Suicidio y autolesión
  /suicid|suicidar|quitarme la vida|matarme|autolesión/i,
  // Hacking y delitos
  /hackear|robar|estafa|fraude|piratear|clonar tarjeta/i,
  // Armas y explosivos
  /bomba|arma|explosivo|granada|pistola/i,
  // Contenido sexual inapropiado
  /pornografía|porno|sexo explícito/i,
  // Odio y discriminación
  /odio|racismo|discriminación|xenofobia/i,
  // Información personal
  /contraseña|password|tarjeta de crédito|cuenta bancaria/i
];

const respuestasEticas = [
  '🛡️ Lo siento, no puedo ayudarte con eso. Es importante mantener la seguridad y ética.',
  '❌ Esa pregunta va contra mis principios. ¿Hay algo positivo en lo que pueda ayudarte?',
  '🚫 No puedo proporcionar información que pueda causar daño. ¿Necesitas ayuda con algo constructivo?',
  '💙 Entiendo que tienes curiosidad, pero no puedo responder eso por razones éticas y de seguridad.'
];

const alertasSuicidio = [
  '💙 Por favor, habla con alguien que pueda ayudarte. En Perú: 📞 Línea 113 (Salud Mental) disponible 24/7.',
  '🆘 Tu vida es valiosa. Contacta: 📞 113 (Línea de ayuda emocional) o busca apoyo profesional inmediato.',
  '💚 No estás solo. Por favor llama: 📞 113 o habla con un familiar/amigo de confianza. La ayuda existe.'
];

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: VALIDACIÓN ==========
export const validate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Detectar suicidio (máxima prioridad)
  if (/suicid|suicidar|quitarme la vida|matarme|no quiero vivir/i.test(msg)) {
    return {
      safe: false,
      response: random(alertasSuicidio)
    };
  }
  
  // Detectar contenido prohibido
  for (const patron of prohibidos) {
    if (patron.test(msg)) {
      return {
        safe: false,
        response: random(respuestasEticas)
      };
    }
  }
  
  // Mensaje seguro
  return { safe: true };
};