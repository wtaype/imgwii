import{j as s}from"./vendor-BOJxWFg6.js";import{db as y,auth as d}from"./firebase-Cz-ABH3P.js";import{u as E,e as P,k}from"./firebase-D-ROeyul.js";import{r as x,n as t,s as z,M as o,p as C,g as j}from"./index-DfI58Hqs.js";const c=()=>j("wiSmile")||{},F=()=>{const a=c();if(!a.email)return location.replace("/"),"";const r=a.nombre||"",e=a.apellidos||"",i=a.usuario||"",u=a.email||"",v=a.rol||"smile",n=a.plan||"free",_=a.estado||"activo";(a.tema||"Por defecto").split("|")[0],a.uid;const p=a.avatar||"",m=a.fechaNacimiento||"",b=a.pais||"",l=a.genero||"",g=a.gustos||"",h=a.bio||"",f=a.creacion||a.creado,$=f?C(null).get(f,"local"):"Desconocido",w="https://ui-avatars.com/api/?name="+encodeURIComponent(r+" "+e)+"&background=random&color=fff";return`
  <div class="prf_wrap">

    <div class="prf_hero">
      <div class="prf_av_wrap">
        <img src="${p||w}" alt="${r}" class="prf_av" onerror="this.src='./smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname">${r} ${e}</h1>
        <p class="prf_username"><i class="fas fa-at"></i> ${i}</p>
        <span class="prf_rol_chip"><i class="fas fa-crown"></i> Plan ${n.toUpperCase()}</span>
      </div>
    </div>

    <div class="prf_grid">

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar perfil</h2>
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Nombres</label>
            <input id="prf_nombre" value="${r}" placeholder="Tus nombres">
          </div>
          <div class="prf_form_grp">
            <label>Apellidos</label>
            <input id="prf_apellidos" value="${e}" placeholder="Tus apellidos">
          </div>
        </div>
        
        <label>Enlace del Avatar (URL)</label>
        <input id="prf_avatar" value="${p}" placeholder="https://tu-foto.com/imagen.jpg">
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Fecha de Nacimiento</label>
            <input type="date" id="prf_nacimiento" value="${m}">
          </div>
          <div class="prf_form_grp">
            <label>Género</label>
            <select id="prf_genero">
              <option value="" disabled ${l?"":"selected"}>Selecciona tu género</option>
              <option value="Masculino" ${l==="Masculino"?"selected":""}>Masculino</option>
              <option value="Femenino" ${l==="Femenino"?"selected":""}>Femenino</option>
              <option value="Otro" ${l==="Otro"?"selected":""}>Otro</option>
              <option value="Prefiero no decirlo" ${l==="Prefiero no decirlo"?"selected":""}>Prefiero no decirlo</option>
            </select>
          </div>
        </div>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>País</label>
            <input id="prf_pais" value="${b}" placeholder="Ej. Perú, México, España...">
          </div>
          <div class="prf_form_grp">
            <label>Gustos o intereses</label>
            <input id="prf_gustos" value="${g}" placeholder="Ej. Fútbol, leer, viajar...">
          </div>
        </div>
        
        <label>Biografía</label>
        <textarea id="prf_bio" rows="3" placeholder="Cuéntanos un poco sobre ti...">${h}</textarea>

        <button id="prf_guardar" class="prf_btn"><i class="fas fa-save"></i> Guardar cambios</button>
      </div>

      <div class="prf_col_right">
        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-lock"></i> Actualizar contraseña</h2>
          <label>Nueva contraseña</label>
          <input type="password" id="prf_pass" placeholder="Ingresa tu nueva contraseña">
          <label>Confirmar contraseña</label>
          <input type="password" id="prf_pass_conf" placeholder="Confirma tu nueva contraseña">
          <button id="prf_guardar_pass" class="prf_btn"><i class="fas fa-key"></i> Actualizar contraseña</button>
        </div>

        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-info-circle"></i> Datos de cuenta</h2>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-envelope"></i> Email</span>
            <span class="prf_val em">${u}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-crown"></i> Plan</span>
            <span class="prf_val" style="color:var(--mco); text-transform:uppercase;">${n}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-signal"></i> Estado</span>
            <span class="prf_val" style="color:var(--success)">${_}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-calendar-alt"></i> Registro</span>
            <span class="prf_val">${$}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-user-tag"></i> Rol</span>
            <span class="prf_val" style="text-transform:capitalize;">${v}</span>
          </div>
        </div>
      </div>

    </div>
  </div>`},G=()=>{if(!c().email)return x.navigate("/");s(document).on("click.prf","#prf_guardar",async function(){const a=c(),r={nombre:s("#prf_nombre").val().trim(),apellidos:s("#prf_apellidos").val().trim(),avatar:s("#prf_avatar").val().trim(),fechaNacimiento:s("#prf_nacimiento").val(),pais:s("#prf_pais").val().trim(),genero:s("#prf_genero").val()||"",gustos:s("#prf_gustos").val().trim(),bio:s("#prf_bio").val().trim()};if(!r.nombre)return t(document.getElementById("prf_nombre"),"Ingresa tu nombre","error");s(this).prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');try{await E(P(y,"smiles",a.usuario),r),z("wiSmile",{...a,...r},24),s(".prf_fullname").text(`${r.nombre} ${r.apellidos}`),r.avatar?s(".prf_av").attr("src",r.avatar):s(".prf_av").attr("src","https://ui-avatars.com/api/?name="+encodeURIComponent(r.nombre+" "+r.apellidos)+"&background=random&color=fff"),o("Perfil actualizado ✅","success")}catch(e){console.error(e),o("Error al guardar","error")}finally{s(this).prop("disabled",!1).html('<i class="fas fa-save"></i> Guardar cambios')}}).on("click.prf","#prf_guardar_pass",async function(){const a=s("#prf_pass").val(),r=s("#prf_pass_conf").val(),e=s(this);if(!a||a.length<6)return t(document.getElementById("prf_pass"),"Mínimo 6 caracteres","error");if(a!==r)return t(document.getElementById("prf_pass_conf"),"Las contraseñas no coinciden","error");if(!d.currentUser)return o("Sesión expirada. Por favor recarga","error");e.prop("disabled",!0).html('<i class="fas fa-spinner fa-spin"></i> Actualizando...');try{await k(d.currentUser,a),s("#prf_pass").val(""),s("#prf_pass_conf").val(""),o("Contraseña actualizada correctamente ✅","success")}catch(i){console.error(i),i.code==="auth/requires-recent-login"?o("Por seguridad, cierra sesión y vuelve a ingresar para cambiar la contraseña.","error"):o("Error al actualizar contraseña","error")}finally{e.prop("disabled",!1).html('<i class="fas fa-key"></i> Actualizar contraseña')}})},R=()=>s(document).off(".prf");export{R as cleanup,G as init,F as render};
