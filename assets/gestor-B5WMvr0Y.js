import{j as e}from"./vendor-BOJxWFg6.js";import{auth as d}from"./firebase-CIMG1A84.js";import{o as u}from"./firebase-D-ROeyul.js";import{b as c,g as f,r as p,a as v,S as _}from"./index-B7g3A6lw.js";const h=()=>new Promise(s=>{if(d.currentUser)return s(d.currentUser);const o=u(d,t=>{o(),s(t)})}),r=s=>{try{const o=JSON.parse(localStorage.getItem(s));return Array.isArray(o)?o:o?.value&&Array.isArray(o.value)?o.value:[]}catch{return[]}},F=()=>`
  <div class="gs_dash">
    
    <!-- ══ HEADER PREMIUM (Management Style) ══ -->
    <header class="gs_hero wi_fadeUp">
      <div class="gs_hero_glow"></div>
      <div class="gs_hero_content">
        <div class="gs_hero_left">
          <div class="gs_avatar_wrap">
             <div class="gs_avatar" id="gsAvatar"></div>
             <div class="gs_avatar_ring"></div>
          </div>
          <div class="gs_welcome">
            <h1 id="gsSaludo">Cargando...</h1>
            <p id="gsRole"><i class="fas fa-shield-halved"></i> Gestión de ${c}</p>
          </div>
        </div>
        <div class="gs_hero_quote" id="gsQuote">
          <i class="fas fa-quote-left"></i>
          <div class="gs_quote_body">
            <p id="gsQuoteTxt">...</p>
            <span id="gsQuoteRef">...</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ══ DASHBOARD GRID ══ -->
    <main class="gs_main">
      
      <!-- COLUMNA IZQUIERDA: GESTIÓN DE CONTENIDO -->
      <div class="gs_col">
        <div class="gs_sec_head">
          <div class="gs_sec_info">
            <h2><i class="fas fa-grip-horizontal"></i> Centro de Gestión</h2>
            <p>Supervisa y administra el ecosistema de ${c}</p>
          </div>
        </div>
        <div class="gs_tools_grid">
          ${[{page:"nuevo",ico:"fa-pen-nib",col:"#FF5C69",tit:"Crear Blog",sub:"Publicar contenido"},{page:"usuarios",ico:"fa-users-gear",col:"#0EBEFF",tit:"Comunidad",sub:"Gestionar usuarios"},{page:"chatwil",ico:"fa-hands-praying",col:"#29C72E",tit:"Sala Oración",sub:"Moderación de fe"},{page:"mensajes",ico:"fa-paper-plane",col:"#7000FF",tit:"Mensajería",sub:"Bandeja de soporte"},{page:"perfil",ico:"fa-user-shield",col:"#FFB800",tit:"Seguridad",sub:"Ajustes de cuenta"},{page:"biblia",ico:"fa-book-bible",col:"#00D1FF",tit:"Recursos",sub:"Base de datos"}].map((s,o)=>`
            <a href="/${s.page}" class="gs_tool_card nv_item" data-page="${s.page}" style="animation-delay: ${o*.05}s">
              <div class="gs_tool_ico" style="color: ${s.col}; background: color-mix(in srgb, ${s.col} 12%, transparent);"><i class="fas ${s.ico}"></i></div>
              <div class="gs_tool_txt">
                <h4>${s.tit}</h4>
                <span>${s.sub}</span>
              </div>
              <div class="gs_tool_arr"><i class="fas fa-arrow-right"></i></div>
            </a>
          `).join("")}
        </div>
      </div>

      <!-- COLUMNA DERECHA: FLUJO Y ESTADÍSTICAS -->
      <div class="gs_col">
        
        <!-- ACTIVIDAD RECIENTE -->
        <section class="gs_card gs_recent">
          <div class="gs_card_head">
            <h3><i class="fas fa-bolt"></i> Actividad Global</h3>
            <button class="gs_clean_btn" id="gs_refresh"><i class="fas fa-sync-alt"></i></button>
          </div>
          <div class="gs_timeline" id="gsFeed">
             <div class="gs_empty"><i class="fas fa-circle-notch fa-spin"></i><p>Sincronizando...</p></div>
          </div>
        </section>

        <!-- KPI SUMMARY (PRO) -->
        <section class="gs_card gs_impact">
          <h3><i class="fas fa-chart-line"></i> Impacto de Fe</h3>
          <div class="gs_kpi_list" id="gsKpis">
             <!-- KPIs aquí -->
          </div>
        </section>

      </div>

    </main>

  </div>
`,A=async()=>{if(!await h())return;const o=f("wiSmile");if(!o)return setTimeout(()=>p.navigate("/login"),100);e(document).off(".gs"),e(".wi_fadeUp").addClass("visible");const t=v(o.nombre||o.usuario||"Gestor"),n=`${(o.nombre||"?")[0]}${(o.apellidos||"")[0]||""}`.toUpperCase();e("#gsAvatar").text(n),e("#gsSaludo").html(`${_()} <strong>${t}</strong>`);const a=r("wiFrases");if(a.length){const i=a[Math.floor(Math.random()*a.length)];e("#gsQuoteTxt").text(i.cita),e("#gsQuoteRef").text(i.libro)}else e("#gsQuoteTxt").text("Gestiona con propósito, lidera con el corazón."),e("#gsQuoteRef").text(`Liderazgo ${c}`);g(),e(document).on("click.gs","#gs_refresh",function(){const i=e(this).find("i").addClass("fa-spin");g(),setTimeout(()=>i.removeClass("fa-spin"),600)}),console.log(`🛡️ ${c} Gestor — ${c} (Ultra Pro)`)},y=()=>{e(document).off(".gs")};function g(){const s={notas:r("misNotas"),blogs:r("wi_blog_todo_nuevo"),tareas:r("tareas"),word:r("word_docs"),links:r("links")},o=[{n:"Reflexiones",c:s.notas.length,col:"#0EBEFF"},{n:"Artículos",c:s.blogs.length,col:"#FF5C69"},{n:"Peticiones",c:s.tareas.length,col:"#29C72E"}];e("#gsKpis").html(o.map(a=>`
    <div class="gs_kpi_item">
      <span>${a.n}</span>
      <strong style="color: ${a.col}">${a.c}</strong>
    </div>
  `).join(""));let t=[];s.blogs.forEach(a=>t.push({...a,mod:"Blog",i:"fa-pen-nib",col:"#FF5C69",url:"blog"})),s.notas.forEach(a=>t.push({...a,mod:"Notas",i:"fa-lightbulb",col:"#0EBEFF",url:"notas"})),s.tareas.forEach(a=>t.push({...a,mod:"Petic.",i:"fa-heart",col:"#29C72E",url:"tareas"})),s.word.forEach(a=>t.push({...a,mod:"Doc",i:"fa-file-word",col:"#7000FF",url:"word"})),t.sort((a,i)=>(i.actualizado||i.creado||0)-(a.actualizado||a.creado||0));const n=t.slice(0,6);if(n.length){const a=i=>{const l=Math.floor((Date.now()-i)/6e4);return l<1?"Ahora":l<60?`${l}m`:`${Math.floor(l/1440)}d`};e("#gsFeed").html(n.map((i,l)=>`
      <div class="gs_tl_item" style="animation-delay: ${l*.05}s">
        <div class="gs_tl_ico" style="color: ${i.col}"><i class="fas ${i.i}"></i></div>
        <div class="gs_tl_body">
          <h4>${i.titulo||"Sin título"}</h4>
          <span>${i.mod} · ${a(i.actualizado||i.creado)}</span>
        </div>
        <a href="/${i.url}" class="gs_tl_btn nv_item" data-page="${i.url}"><i class="fas fa-chevron-right"></i></a>
      </div>
    `).join(""))}else e("#gsFeed").html('<div class="gs_empty"><i class="fas fa-inbox"></i><p>Sin actividad reciente</p></div>')}export{y as cleanup,A as init,F as render};
