// ========== MÓDULO PRINCIPAL DE PROCESAMIENTO - BRAIN.JS ==========
import * as memoria from './memoria.js';
import * as amabilidad from './head/amabilidad.js';
import * as estados from './head/estados.js';
import * as animos from './head/animos.js';

// Módulos de procesamiento secundario
const modulos = [amabilidad, estados, animos];

export const procesar = async (mensaje) => {
  // Recorrer los módulos para encontrar una respuesta
  for (const mod of modulos) {
    if (mod.generate) {
      const res = mod.generate(mensaje);
      if (res) {
        return res;
      }
    }
  }
  
  // Si ningún módulo tiene respuesta (fallback inteligente y amable)
  const fallbacks = [
    '💙😊 Me gustaría ayudarte, herman@. ¿Puedes contarme un poco más sobre lo que necesitas? Estoy aquí para ti con todo mi corazón. 💚✨',
    '🙏 Entiendo. A veces es difícil encontrar las palabras. Si te gustaría que oremos juntos por algo en específico, dímelo con confianza.',
    '🕊️ Dios te ama infinitamente. Si necesitas que hablemos de algún problema o elevemos una oración al Padre, estoy aquí para escucharte.'
  ];
  
  const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return fallback;
};