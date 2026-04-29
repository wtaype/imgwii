import{g as _}from"./index-D-jC5gH6.js";import{db as y}from"./firebase-BQ0uLJvq.js";import{q as f,c as g,w as p,g as u}from"./firebase-D-ROeyul.js";import"./vendor-BOJxWFg6.js";const E=async()=>`
    <div class="me_layout wi_fadeUp wi_visible">
      <div class="me_header">
        <h1 class="me_title">Métricas de Rendimiento</h1>
        <p class="me_subtitle">Monitorea el tráfico de tus proyectos en tiempo real.</p>
      </div>

      <div id="me_loading" style="text-align:center; padding:15vh 0; color:var(--tx3); font-size:1.2rem;">
        <i class="fas fa-spinner fa-spin" style="margin-bottom:2vh; font-size:2rem; color:var(--mco);"></i>
        <div>Calculando métricas...</div>
      </div>

      <div id="me_content" style="display:none;">
        <div class="me_stats_grid" id="me_stats_render"></div>

        <div class="me_table_card">
          <div class="me_table_header">
            <i class="fas fa-layer-group" style="color:var(--mco);"></i> Resumen por Proyecto
          </div>
          <table class="me_table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Enlaces Activos</th>
                <th>Vistas Totales</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="me_tbody_render"></tbody>
          </table>
        </div>
      </div>
    </div>
  `,x=async()=>{const l=_("wiSmile");if(l)try{const i=f(g(y,"linkwiis"),p("usuario","==",l.usuario)),a=await u(i);let o=0,r=0;const e=[];a.forEach(t=>{const s=t.data(),n=s.vistas||0,c=s.links?s.links.filter(d=>d.url||d.titulo).length:0;o+=n,r+=c,e.push({slug:t.id,vistas:n,linksCount:c,logo:s.logo})}),e.sort((t,s)=>s.vistas-t.vistas);const m=`
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-eye" style="color:var(--mco); font-size:1rem;"></i> Vistas Globales</div>
        <div class="me_stat_val">${o.toLocaleString()}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-folder-open" style="color:#0F9D58; font-size:1rem;"></i> Proyectos Activos</div>
        <div class="me_stat_val">${e.length}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-link" style="color:#E53935; font-size:1rem;"></i> Enlaces Creados</div>
        <div class="me_stat_val">${r}</div>
      </div>
    `,v=e.map(t=>`
      <tr>
        <td data-label="Proyecto">
          <div class="me_slug_cell">
            <img src="${t.logo||"/smile.avif"}" class="me_slug_avatar" alt="logo">
            <span>linkwii.com/${t.slug}</span>
          </div>
        </td>
        <td data-label="Enlaces Activos"><span class="me_badge"><i class="fas fa-link" style="color:var(--tx3)"></i> ${t.linksCount}</span></td>
        <td data-label="Vistas Totales"><strong>${t.vistas.toLocaleString()}</strong> <span style="font-size:0.75rem; color:var(--tx3); font-weight:normal;">vistas</span></td>
        <td data-label="Acciones">
          <div style="display:flex; gap:1vh; flex-wrap:wrap;">
            <a href="/${t.slug}" target="_blank" class="me_action_btn sec"><i class="fas fa-external-link-alt"></i> Visitar</a>
            <!-- Link to editor, maybe in future we can automatically select it via localStorage -->
            <a href="/p/crear" class="me_action_btn"><i class="fas fa-pen"></i> Editar</a>
          </div>
        </td>
      </tr>
    `).join("");document.getElementById("me_stats_render").innerHTML=m,document.getElementById("me_tbody_render").innerHTML=v||'<tr><td colspan="4" style="text-align:center; padding:5vh; color:var(--tx3);">No tienes proyectos creados aún.</td></tr>',document.getElementById("me_loading").style.display="none",document.getElementById("me_content").style.display="block"}catch(i){console.error(i);const a=document.getElementById("me_loading");a&&(a.innerHTML='<i class="fas fa-exclamation-triangle" style="color:var(--error); font-size:2rem; margin-bottom:1vh; display:block;"></i> Error al cargar métricas.')}},L=()=>{};export{L as cleanup,x as init,E as render};
