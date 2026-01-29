import './acerca.css';
import $ from 'jquery';
import { wiVista } from '../widev.js';

// Curiosidades fascinantes sobre los ojos
const curiosidades = [
  {
    emoji: '⚡',
    title: 'Músculo Más Rápido',
    desc: 'Los músculos que controlan el parpadeo son los más rápidos del cuerpo humano. Puedes parpadear 5 veces por segundo. ¡Eso es 28,800 veces al día!'
  },
  {
    emoji: '🎨',
    title: '10 Millones de Colores',
    desc: 'El ojo humano puede distinguir aproximadamente 10 millones de colores diferentes. Cada persona ve los colores ligeramente diferente.'
  },
  {
    emoji: '🔍',
    title: 'Iris Único',
    desc: 'Tu iris es más único que tu huella dactilar. Tiene 256 características únicas vs 40 de las huellas. Por eso se usa en seguridad biométrica.'
  },
  {
    emoji: '💧',
    title: 'Lágrimas Complejas',
    desc: 'Las lágrimas tienen 3 capas: aceite, agua y mucosa. Las lágrimas emocionales tienen diferentes proteínas que las lágrimas de irritación.'
  },
  {
    emoji: '🧠',
    title: 'Conexión Cerebral',
    desc: 'Más del 50% de la corteza cerebral está involucrada en el procesamiento visual. Tus ojos envían información al cerebro a 120 metros por segundo.'
  },
  {
    emoji: '👶',
    title: 'Bebés y Lágrimas',
    desc: 'Los bebés no producen lágrimas hasta las 4-13 semanas de edad. Nacen con ojos del 75% del tamaño adulto, pero siguen creciendo.'
  },
  {
    emoji: '🌈',
    title: 'Visión Nocturna',
    desc: 'En completa oscuridad, tus ojos pueden detectar la llama de una vela a 1.6 km de distancia. Los bastones son 500 veces más sensibles que los conos.'
  },
  {
    emoji: '🎯',
    title: 'Enfoque Automático',
    desc: 'Tus ojos hacen movimientos sacádicos (saltos rápidos) 3-4 veces por segundo para construir una imagen completa. Tu cerebro edita las partes borrosas.'
  },
  {
    emoji: '⏱️',
    title: 'Procesamiento Instantáneo',
    desc: 'Tu cerebro puede procesar una imagen en solo 13 milisegundos. Eso es 75 veces más rápido que un parpadeo.'
  }
];

// Misión del proyecto
const misionProyecto = [
  {
    icon: '💙',
    title: 'Amor por tus Ojitos',
    desc: 'Compartir conocimiento que ayude a prevenir problemas visuales y mejorar la calidad de vida de las personas.'
  },
  {
    icon: '📚',
    title: 'Educación Accesible',
    desc: 'Hacer que la información oftalmológica profesional sea fácil de entender y accesible para todos.'
  },
  {
    icon: '🙏',
    title: 'Fe y Esperanza',
    desc: 'Recordar que con Dios todo es posible. Nunca pierdas la fe en tu recuperación y cuidado visual.'
  }
];

// Consejos finales
const consejosFinales = [
  {
    icon: 'fa-calendar-check',
    title: 'Exámenes Regulares',
    desc: 'Visita al oftalmólogo anualmente, incluso si no tienes síntomas. La detección temprana salva tu visión.'
  },
  {
    icon: 'fa-sun',
    title: 'Protección UV',
    desc: 'Usa lentes de sol con protección UV 100% siempre que estés al aire libre. El daño UV es acumulativo e irreversible.'
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Descansos Digitales',
    desc: 'Aplica la regla 20-20-20 religiosamente. Tus ojos necesitan descansos frecuentes de las pantallas.'
  },
  {
    icon: 'fa-apple-whole',
    title: 'Nutrición Balanceada',
    desc: 'Come alimentos ricos en vitaminas A, C, E y Omega-3 diariamente. Tu dieta impacta directamente tu visión.'
  },
  {
    icon: 'fa-bed',
    title: 'Sueño Reparador',
    desc: 'Duerme 7-8 horas. Durante el sueño, tus ojos se limpian, reparan y recuperan de la fatiga del día.'
  },
  {
    icon: 'fa-heart-pulse',
    title: 'Escucha tu Cuerpo',
    desc: 'No ignores síntomas como visión borrosa, dolor, destellos o moscas volantes. Consulta inmediatamente.'
  }
];

export const render = () => `
  <div class="acerca_container">
    <!-- HERO SECTION -->
    <section class="acer_hero">
      <h1>👁️💙 Love Eye</h1>
      <p>
        Un proyecto nacido del amor, la fe y el deseo de ayudar a otros a cuidar 
        el regalo más preciado: la visión. Porque tus ojitos merecen todo el amor del mundo.
      </p>
      <img src="${import.meta.env.BASE_URL}acerca.png" alt="Curiosidades del Ojo" class="acer_hero_img" loading="lazy">
    </section>

    <!-- CURIOSIDADES -->
    <section class="curiosidades_section">
      <div class="section_header">
        <h2 class="section_title">
          <i class="fas fa-lightbulb"></i>
          Curiosidades Fascinantes del Ojo
        </h2>
        <p class="section_subtitle">
          Datos increíbles que probablemente no sabías sobre tus ojos
        </p>
        <div class="section_line"></div>
      </div>
      <div class="curiosidades_grid">
        ${curiosidades.map(curiosidad => `
          <div class="curiosidad_card">
            <span class="curiosidad_emoji">${curiosidad.emoji}</span>
            <h3 class="curiosidad_title">${curiosidad.title}</h3>
            <p class="curiosidad_desc">${curiosidad.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- PROYECTO -->
    <section class="proyecto_section">
      <div class="section_header">
        <h2 class="section_title">
          <i class="fas fa-heart"></i>
          Acerca del Proyecto
        </h2>
        <p class="section_subtitle">
          La historia detrás de Love Eye
        </p>
        <div class="section_line"></div>
      </div>
      <div class="proyecto_content">
        <div class="proyecto_historia">
          <h3><i class="fas fa-book-open"></i> Nuestra Historia</h3>
          <p>
            <strong>Love Eye</strong> nació de una experiencia personal con problemas de visión. 
            Cuando enfrenté desafíos con mis ojos, me di cuenta de cuánta información valiosa 
            desconocía sobre el cuidado visual.
          </p>
          <p>
            Este proyecto es mi manera de transformar esa experiencia en algo positivo. 
            Quiero que otras personas tengan acceso a la información que yo necesité: 
            <strong>prevención, nutrición, ejercicios, tratamientos y esperanza.</strong>
          </p>
          <p>
            Si hubiera sabido hace 6 meses lo que sé ahora, tal vez mi historia sería diferente. 
            Pero Dios tiene un propósito para todo. Si esta información ayuda aunque sea a una 
            persona a cuidar mejor sus ojos, habrá valido la pena. 🙏💙
          </p>
        </div>

        <div class="proyecto_mision">
          ${misionProyecto.map(mision => `
            <div class="mision_card">
              <span class="mision_icon">${mision.icon}</span>
              <h4 class="mision_title">${mision.title}</h4>
              <p class="mision_desc">${mision.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CREADOR -->
    <section class="creador_section">
      <div class="creador_content">
        <img src="${import.meta.env.BASE_URL}wilder.webp" alt="Wilder Taype" class="creador_foto">
        <div class="creador_info">
          <h3>Wilder Taype</h3>
          <div class="rol">Desarrollador Full Stack & Creador de Love Eye</div>
          <p>
            Apasionado por la tecnología y el desarrollo web. Creo en usar la programación 
            para crear soluciones que impacten positivamente la vida de las personas.
          </p>
          <p>
            Este proyecto combina mi amor por el código con mi deseo de ayudar a otros 
            a cuidar su salud visual. Cada línea de código está escrita con amor y esperanza. 💙
          </p>
          <div class="creador_social">
            <a href="https://github.com/wtaype" target="_blank" class="social_link" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://wtaype.github.io/" target="_blank" class="social_link" title="Portfolio">
              <i class="fas fa-globe"></i>
            </a>
            <a href="mailto:wilder.taype@example.com" class="social_link" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CONSEJOS FINALES -->
    <section class="consejos_finales">
      <div class="section_header">
        <h2 class="section_title">
          <i class="fas fa-star"></i>
          Consejos Finales para Cuidar tus Ojitos
        </h2>
        <p class="section_subtitle">
          Recuerda estos puntos clave para mantener una visión saludable toda la vida
        </p>
        <div class="section_line"></div>
      </div>
      <div class="consejos_grid">
        ${consejosFinales.map(consejo => `
          <div class="consejo_card">
            <div class="consejo_header">
              <div class="consejo_icon">
                <i class="fas ${consejo.icon}"></i>
              </div>
              <h3 class="consejo_title">${consejo.title}</h3>
            </div>
            <p class="consejo_desc">${consejo.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- MENSAJE FINAL -->
    <section class="mensaje_final" style="text-align: center; padding: 6vh 0; background: var(--bg3); border-radius: 2vh; margin-bottom: 4vh;">
      <h2 style="font-size: var(--fz_x1); font-weight: 800; color: var(--tx); margin-bottom: 2vh;">
        💙 Gracias por Visitar Love Eye 👁️
      </h2>
      <p style="font-size: var(--fz_m4); color: var(--txe); max-width: 700px; margin: 0 auto 3vh; line-height: 1.8;">
        Recuerda: <strong>Tus ojos son un regalo precioso.</strong> Cuídalos con amor, 
        aliméntalos bien, descánsalos adecuadamente y visita a tu oftalmólogo regularmente.
      </p>
      <p style="font-size: var(--fz_m3); color: var(--mco); font-weight: 700;">
        🙏 Con fe, todo es posible. Nunca pierdas la esperanza. 🙏
      </p>
      <p style="font-size: var(--fz_m2); color: var(--txe); margin-top: 3vh;">
        Hecho con 💙 por Wilder Taype © ${new Date().getFullYear()}
      </p>
    </section>
  </div>
`;

export const init = () => {
  console.log(`✅ Acerca completado`);

  // Animación de entrada para curiosidades
  wiVista('.curiosidad_card', () => {
    $('.curiosidad_card').each((i, el) => {
      setTimeout(() => {
        $(el).css({
          opacity: '0',
          transform: 'scale(0.8)'
        });
        setTimeout(() => {
          $(el).css({
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: '1',
            transform: 'scale(1)'
          });
        }, 50);
      }, i * 80);
    });
  });

  // Animación para misión
  wiVista('.mision_card', () => {
    $('.mision_card').each((i, el) => {
      setTimeout(() => {
        $(el).css({
          opacity: '0',
          transform: 'translateY(30px)'
        });
        setTimeout(() => {
          $(el).css({
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: '1',
            transform: 'translateY(0)'
          });
        }, 50);
      }, i * 150);
    });
  });

  // Animación para consejos finales
  wiVista('.consejo_card', () => {
    $('.consejo_card').each((i, el) => {
      setTimeout(() => {
        $(el).css({
          opacity: '0',
          transform: 'translateX(-30px)'
        });
        setTimeout(() => {
          $(el).css({
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: '1',
            transform: 'translateX(0)'
          });
        }, 50);
      }, i * 100);
    });
  });
};

export const cleanup = () => {
  console.log('🧹 Acerca limpiado');
};
