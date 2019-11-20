const form = document.querySelector('.login-form');
const email = document.querySelector('#emailLog');
const password = document.querySelector('#passwordLog');
const errorBody = document.querySelector('#errorBody');

form.addEventListener('submit', function(e) {
  e.preventDefault();
});

function login() {
  if (!email.value || !password.value) {
    errorBody.innerHTML = '<p>Campos incompletos.</p>';
    $('#errorModal').modal();
    return;
  }

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://3.221.183.74/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      email: email.value,
      password: password.value
    }
  };

  $.ajax(settings)
    .fail(function() {
      errorBody.innerHTML = '<p>Usuario y/o contraseña incorrectos.</p>';
      $('#errorModal').modal();
    })
    .done(function(response) {
      var token = response.token;
      localStorage.setItem('token', token);
      routeProduct();
    });
}
