// ===================Formulario Guardia=================== //
function evaluarFormulario() {
      event.preventDefault(); // Agregado para evitar recarga
      const form = document.forms['formulario-guardia'];
      let irAGuardia = false;

      // Verificar sección de signos de alarma
      for (let i = 1; i <= 7; i++) {
        if (form[`alarma${i}`].value === "si") {
          irAGuardia = true;
          break;
        }
      }

      const resultadoDiv = document.getElementById("resultado");

      if (irAGuardia) {
        resultadoDiv.innerHTML = "🔴 Recomendación: Deberías asistir a una guardia médica. Estás presentando síntomas que requieren evaluación profesional.";
        resultadoDiv.style.backgroundColor = "#ffe6e6";
      } else {
        resultadoDiv.innerHTML = "🟡 Recomendación: Podés manejar los síntomas en casa. Reposá, hidratate y consultá a tu médico si no mejorás en 3 días.";
        resultadoDiv.style.backgroundColor = "#e0f7fa";
      }
    };