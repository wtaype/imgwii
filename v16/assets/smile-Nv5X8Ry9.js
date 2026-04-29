import{j as a}from"./vendor-BOJxWFg6.js";import{auth as d}from"./firebase-CFwlYhJR.js";import{o as v}from"./firebase-D-ROeyul.js";import{g as _,r as p,a as f,S as h,b as u}from"./index-DCciXqAf.js";const g=()=>new Promise(e=>{if(d.currentUser)return e(d.currentUser);const s=v(d,r=>{s(),e(r)})}),c=e=>{try{const s=JSON.parse(localStorage.getItem(e));return Array.isArray(s)?s:s?.value&&Array.isArray(s.value)?s.value:[]}catch{return[]}},$=()=>`
  <div class="smw_dash">
    
    <!-- ══ HEADER PREMIUM (Glassmorphism Hero) ══ -->
    <header class="smw_hero wi_fadeUp">
      <div class="smw_hero_glow"></div>
      <div class="smw_hero_content">
        <div class="smw_hero_left">
          <div class="smw_avatar_wrap">
             <div class="smw_avatar" id="smwAvatar"></div>
             <div class="smw_avatar_ring"></div>
          </div>
          <div class="smw_welcome">
            <h1 id="smwSaludo">Cargando...</h1>
            <p id="smwRole"><i class="fas fa-dove"></i> Dashboard de Fe</p>
          </div>
        </div>
        <div class="smw_hero_quote" id="smwQuote">
          <i class="fas fa-quote-left"></i>
          <div class="smw_quote_body">
            <p id="smwQuoteTxt">...</p>
            <span id="smwQuoteRef">...</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ══ DASHBOARD DOS COLUMNAS ══ -->
    <main class="smw_main">
      
      <!-- COLUMNA IZQUIERDA: MIS FRASES POSITIVAS -->
      <section class="smw_col smw_phrases">
        <div class="smw_sec_head">
          <div class="smw_sec_info">
            <h2><i class="fas fa-heart"></i> Mis Frases Positivas</h2>
            <p>Tus promesas y versículos atesorados</p>
          </div>
          <a href="/citas" class="smw_add_btn nv_item" data-page="citas">
            <i class="fas fa-plus"></i>
          </a>
        </div>
        <div class="smw_phrases_list" id="smwPhrasesList">
          <!-- Citas de wiFrases -->
        </div>
      </section>

      <!-- COLUMNA DERECHA: ÚLTIMOS BLOGS -->
      <section class="smw_col smw_blogs">
        <div class="smw_sec_head">
          <div class="smw_sec_info">
            <h2><i class="fas fa-newspaper"></i> Últimos Blogs</h2>
            <p>Inspiración y noticias de la comunidad</p>
          </div>
          <a href="/blog" class="smw_add_btn nv_item" data-page="blog">
             <i class="fas fa-arrow-right"></i>
          </a>
        </div>
        <div class="smw_blogs_feed" id="smwBlogsFeed">
          <!-- Posts de wi_blog_todo_nuevo -->
        </div>
      </section>

    </main>

  </div>
`,R=async()=>{if(!await g())return;const s=_("wiSmile");if(!s)return setTimeout(()=>p.navigate("/login"),100);const r=f(s.nombre||s.usuario||""),n=`${(s.nombre||"?")[0]}${(s.apellidos||"")[0]||""}`.toUpperCase();a(".wi_fadeUp").addClass("visible"),a("#smwAvatar").text(n),a("#smwSaludo").html(`${h()} <strong>${r}</strong>`);const t=c("wiFrases");if(t.length){const o=t[Math.floor(Math.random()*t.length)];a("#smwQuoteTxt").text(o.cita),a("#smwQuoteRef").text(o.libro);const i=[...t].reverse().slice(0,6);a("#smwPhrasesList").html(i.map((l,w)=>`
      <div class="smw_phrase_card wi_fadeUp visible" style="animation-delay: ${w*.1}s">
        <div class="smw_phrase_ico"><i class="fas fa-star"></i></div>
        <div class="smw_phrase_body">
          <p>"${l.cita}"</p>
          <span>${l.libro}</span>
        </div>
      </div>
    `).join(""))}else a("#smwQuoteTxt").text("Dios es nuestro amparo y fortaleza."),a("#smwQuoteRef").text("Salmos 46:1"),a("#smwPhrasesList").html('<div class="smw_empty"><i class="fas fa-seedling"></i><p>Aún no has guardado frases</p></div>');const m=c("wi_blog_todo_nuevo");if(m.length){const o=m.slice(0,4);a("#smwBlogsFeed").html(o.map((i,l)=>`
      <a href="/post/${i.slug}" class="smw_blog_item nv_item" data-page="post" data-id="${i.id}" style="animation-delay: ${l*.1}s">
        <div class="smw_blog_img" style="background-image: url('${i.imagen}')"></div>
        <div class="smw_blog_info">
          <h4>${i.titulo}</h4>
          <div class="smw_blog_meta">
            <span><i class="fas fa-tag"></i> ${i.categoria}</span>
            <span><i class="fas fa-clock"></i> ${i.tiempo_lectura||"2 min"}</span>
          </div>
        </div>
      </a>
    `).join(""))}else a("#smwBlogsFeed").html('<div class="smw_empty"><i class="fas fa-newspaper"></i><p>No hay blogs recientes</p></div>');console.log(`🕊️ WiiHope Dashboard v2 — ${u}`)},U=()=>{};export{U as cleanup,R as init,$ as render};
