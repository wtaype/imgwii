const MAX_HISTORY = 20;
const STORAGE_KEY = 'chatwiil_history';
const TOPICS_KEY = 'chatwiil_topics';
const CONVERSATION_KEY = 'chatwiil_conversation';

let conversationHistory = [];
let topicsDiscussed = [];
let temaActual = null;
let contadorPregunta = 0;

const temasOculares = {
  ojo_seco: /ojo(s)? seco(s)?|sequedad|xeroftalm[ií]a|resequedad/i,
  conjuntivitis: /conjuntivitis|ojo(s)? rojo(s)?|infecci[oó]n/i,
  fatiga_visual: /fatiga|cansancio|vista cansada|ojos cansados/i,
  vision_borrosa: /borrosa?|desenfocad[oa]|no veo bien/i,
  dolor: /dolor|duele|adolorido/i,
  prevencion: /prevenci[oó]n|cuidado|proteger|evitar/i,
  nutricion: /alimento(s)?|comida|vitamina(s)?|dieta|omega/i,
  pantallas: /pantalla(s)?|computadora|celular|luz azul/i,
  examenes: /examen|revisi[oó]n|oftalm[oó]logo|chequeo/i,
  lentes: /lentes|anteojos|gafas|contacto/i,
  diabetes: /diabetes|diab[eé]tico|az[uú]car|glucosa/i,
  glaucoma: /glaucoma|presi[oó]n ocular/i,
  cataratas: /catarata(s)?|opacidad|nublad[oa]/i
};

export const add = (role, content) => {
  const mensaje = { role, content, timestamp: Date.now(), topics: detectarTemas(content) };
  conversationHistory.push(mensaje);
  
  if (mensaje.topics.length > 0) {
    mensaje.topics.forEach(topic => {
      const existing = topicsDiscussed.find(t => t.name === topic);
      if (existing) {
        existing.count++;
        existing.lastMention = Date.now();
      } else {
        topicsDiscussed.push({ name: topic, count: 1, lastMention: Date.now() });
      }
    });
  }
  
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory = conversationHistory.slice(-MAX_HISTORY);
  }
  
  save();
};

const detectarTemas = (texto) => {
  const temas = [];
  const textoNorm = texto.toLowerCase();
  for (const [tema, patron] of Object.entries(temasOculares)) {
    if (patron.test(textoNorm)) temas.push(tema);
  }
  return temas;
};

export const get = () => conversationHistory;

export const clear = () => {
  conversationHistory = [];
  topicsDiscussed = [];
  temaActual = null;
  contadorPregunta = 0;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOPICS_KEY);
  localStorage.removeItem(CONVERSATION_KEY);
};

const save = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topicsDiscussed));
    localStorage.setItem(CONVERSATION_KEY, JSON.stringify({ temaActual, contadorPregunta }));
  } catch (err) {
    console.warn('⚠️ Error guardando:', err);
  }
};

export const loadHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedTopics = localStorage.getItem(TOPICS_KEY);
    const savedConversation = localStorage.getItem(CONVERSATION_KEY);
    
    if (saved) conversationHistory = JSON.parse(saved);
    if (savedTopics) topicsDiscussed = JSON.parse(savedTopics);
    if (savedConversation) {
      const conv = JSON.parse(savedConversation);
      temaActual = conv.temaActual;
      contadorPregunta = conv.contadorPregunta;
    }
  } catch (err) {
    console.warn('⚠️ Error cargando:', err);
    conversationHistory = [];
    topicsDiscussed = [];
  }
};

export const getContext = (limit = 6) => conversationHistory.slice(-limit);

export const getTemaActual = () => {
  if (temaActual) return temaActual;
  const recientes = conversationHistory.slice(-3);
  const temasRecientes = {};
  recientes.forEach(msg => {
    if (msg.topics) {
      msg.topics.forEach(topic => {
        temasRecientes[topic] = (temasRecientes[topic] || 0) + 1;
      });
    }
  });
  const tema = Object.entries(temasRecientes).sort((a, b) => b[1] - a[1])[0];
  return tema ? tema[0] : null;
};

export const setTemaActual = (tema) => {
  if (tema !== temaActual) {
    temaActual = tema;
    contadorPregunta = 0;
    save();
  }
};

export const getContadorPregunta = () => contadorPregunta;

export const incrementarContador = () => {
  contadorPregunta++;
  save();
  return contadorPregunta;
};

export const resetearConversacion = () => {
  temaActual = null;
  contadorPregunta = 0;
  save();
};

export const getTemasFrecuentes = () => topicsDiscussed.sort((a, b) => b.count - a.count).slice(0, 3).map(t => t.name);

export const esSeguimiento = (mensaje) => /^(y |pero |adem[aá]s|tambi[eé]n|ah |ok |s[ií]|entiendo|gracias)/i.test(mensaje.trim());

export const getUltimoMensajeUsuario = () => {
  const mensajesUsuario = conversationHistory.filter(m => m.role === 'user');
  return mensajesUsuario.length > 0 ? mensajesUsuario[mensajesUsuario.length - 1] : null;
};

export const analizarSentimiento = (texto) => {
  const textoNorm = texto.toLowerCase();
  const positivas = /gracias|excelente|genial|bien|bueno|perfecto|ayud[oó]|mejor|feliz|contento/i;
  const negativas = /mal|dolor|molest|problem|preocup|triste|dificil|no (puedo|veo|entiendo)/i;
  const urgentes = /urgente|r[aá]pido|ayuda|emergencia|grave|serio|inmediato/i;
  
  if (urgentes.test(textoNorm)) return 'urgente';
  if (positivas.test(textoNorm)) return 'positivo';
  if (negativas.test(textoNorm)) return 'negativo';
  return 'neutral';
};

export const getEstadisticas = () => ({
  totalMensajes: conversationHistory.length,
  mensajesUsuario: conversationHistory.filter(m => m.role === 'user').length,
  mensajesAsistente: conversationHistory.filter(m => m.role === 'assistant').length,
  temasDiscutidos: topicsDiscussed.length,
  temaActual: getTemaActual(),
  temasFrecuentes: getTemasFrecuentes()
});
