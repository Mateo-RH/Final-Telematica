const form = document.querySelector('.login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', function(e) {
  e.preventDefault();
});

function login() {
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      email: email.value,
      password: password.value
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
}
