const productos = document.querySelector('#productosList');

$(document).ready(function() {
  validarToken();
  obtenerProductos();
});

function logout() {
  localStorage.removeItem('token');
  routeLogin();
}

function opinar(id) {
  routeOpinion(id);
}

function validarToken() {
  var token = localStorage.getItem('token');
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://3.221.183.74/validaToken',
    method: 'GET',
    headers: {
      token,
      'Access-Control-Allow-Origin': '*'
    }
  };

  $.ajax(settings).fail(function() {
    routeError();
  });
}

function obtenerProductos() {
  var token = localStorage.getItem('token');
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://3.221.183.74/product?cantidad=100',
    method: 'GET',
    headers: {
      token,
      'Access-Control-Allow-Origin': '*'
    }
  };

  $.ajax(settings).done(function(response) {
    var lista = '';
    console.log(response);
    response.products.forEach(producto => {
      lista += `<li class="list-group-item">
      ${producto.nombre}
      <button
        class="btn btn-link p-0 text-success float-right"
        onclick="opinar('${producto._id}')"
      >
        Opinar
      </button>
    </li>`;
    });
    productos.innerHTML = lista;
  });
}
