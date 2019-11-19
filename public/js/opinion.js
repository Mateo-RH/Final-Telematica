const opinion = document.querySelector('#opinion');
const errorBody = document.querySelector('#errorBody');

$(document).ready(function() {
  window.productoId = '';
  validarToken();
  obtenerProductId();
});

function validarToken() {
  var token = localStorage.getItem('token');
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/validaToken',
    method: 'GET',
    headers: {
      token
    }
  };

  $.ajax(settings).fail(function() {
    routeError();
  });
}

function enviarOpinion() {
  var token = localStorage.getItem('token');
  if (!opinion.value) {
    errorBody.innerHTML = '<p>Campos incompletos.</p>';
    $('#errorModal').modal();
    return;
  }

  var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3000/product/${window.productoId}`,
    method: 'PUT',
    headers: {
      token
    },
    data: {
      opinion: opinion.value
    }
  };

  $.ajax(settings)
    .fail(function() {
      errorBody.innerHTML = '<p>Maximo una opinion por cliente.</p>';
      $('#errorModal').modal();
    })
    .done(function() {
      routeProduct();
    });
}

function obtenerProductId() {
  var searchParams = new URLSearchParams(window.location.search);
  window.productoId =
    searchParams.get('producto') == null
      ? '5dd3ce4fb4b180018ee8f3d7'
      : searchParams.get('producto');
}
