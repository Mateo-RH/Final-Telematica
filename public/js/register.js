const email = document.querySelector('#email');
const password = document.querySelector('#password');
const nombre = document.querySelector('#nombre');
const edad = document.querySelector('#edad');
const sexo = document.querySelector('#sexo');
const ciudad = document.querySelector('#ciudad');
const direccion = document.querySelector('#direccion');
const estadoCivil = document.querySelector('#estadoCivil');
const profesion = document.querySelector('#profesion');
const errorBody = document.querySelector('#errorBody');

function registrar() {
  if (!validarCampos()) return;
  else
    var {
      email,
      password,
      nombre,
      edad,
      sexo,
      ciudad,
      direccion,
      estadoCivil,
      profesion
    } = validarCampos();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://3.221.183.74/client',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
    data: {
      email,
      password,
      edad,
      sexo,
      ciudad,
      direccion,
      estadoCivil,
      profesion,
      nombre
    }
  };

  $.ajax(settings)
    .fail(function() {
      errorBody.innerHTML = '<p>Email ya registrado.</p>';
      $('#errorModal').modal();
    })
    .done(function() {
      routeLogin();
    });
}

function validarCampos() {
  if (
    !email.value ||
    !password.value ||
    !nombre.value ||
    !edad.value ||
    !ciudad.value ||
    !direccion.value
  ) {
    errorBody.innerHTML = '<p>Porfavor complete todos los campos.</p>';
    $('#errorModal').modal();
    return false;
  } else if (parseInt(edad.value) == NaN) {
    errorBody.innerHTML = '<p>La edad no es un valor valido.</p>';
    $('#errorModal').modal();
    return false;
  } else {
    return {
      email: email.value,
      password: password.value,
      nombre: nombre.value,
      edad: edad.value,
      sexo: sexo.value,
      ciudad: ciudad.value,
      direccion: direccion.value,
      estadoCivil: estadoCivil.value,
      profesion: profesion.value
    };
  }
}
