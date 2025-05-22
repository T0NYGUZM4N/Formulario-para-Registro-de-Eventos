document.getElementById('registroEvento').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío automático del formulario

  // Limpiar errores anteriores
  document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());

  const form = document.getElementById('registroEvento');

  // Variables
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const telefono = document.getElementById('telefono');
  const intereses = document.querySelectorAll('input[name="intereses"]:checked');
  const horario = document.querySelector('input[name="horario"]:checked');
  const fecha = document.getElementById('fecha');

  let hayErrores = false;

  // Validaciones
  if (!nombre.value.trim()) {
    insertarError(nombre, 'Este campo es obligatorio');
    hayErrores = true;
  }

  if (!correo.value.trim()) {
    insertarError(correo, 'Este campo es obligatorio');
    hayErrores = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    insertarError(correo, 'Correo electrónico no válido');
    hayErrores = true;
  }

  if (!telefono.value.trim()) {
    insertarError(telefono, 'Este campo es obligatorio');
    hayErrores = true;
  } else {
    const telefonoLimpio = telefono.value.replace(/\D/g, '');
    if (telefonoLimpio.length < 10) {
      insertarError(telefono, 'Debe tener al menos 10 dígitos');
      hayErrores = true;
    }
  }

  if (intereses.length === 0) {
  const grupoIntereses = document.getElementById('grupo-intereses');
  insertarError(grupoIntereses, 'Selecciona al menos un interés');
  hayErrores = true;
}

  if (!horario) {
    const ultimoRadio = document.querySelector('input[name="horario"]:last-of-type');
    insertarError(ultimoRadio, 'Selecciona un horario');
    hayErrores = true;
  }

  if (fecha.value) {
    const hoy = new Date();
    const seleccionada = new Date(fecha.value);
    hoy.setHours(0, 0, 0, 0);
    if (seleccionada < hoy) {
      insertarError(fecha, 'La fecha no puede ser anterior a hoy');
      hayErrores = true;
    }
  }

  // Si no hay errores
  if (!hayErrores) {
    // Mensaje visual
    const success = document.createElement('div');
    success.className = 'success-message';
    success.innerHTML = 'Registro exitoso. ¡Gracias por registrarte!';
    form.appendChild(success);
  }
});

// Función para insertar errores
function insertarError(inputElement, mensaje) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.innerHTML = mensaje;

  // Insertar después del elemento
  inputElement.insertAdjacentElement('afterend', error);
}
