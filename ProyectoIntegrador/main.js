var ttt;

function crearContenedor() {
  fetch('http://localhost/ProyectoIntegrador/obtener_contenedores.php')
    .then((response) => response.json())
    .then((json) => {
      var containers = document.getElementById("containers");
      var contador = json.length;
      for (var i = 0; i < contador; i++) {
        (function(i) { //IIFE
          var contenedor = document.createElement("div");
          contenedor.id = "contenedor";
          contenedor.className = "forms-box";
          contenedor.style.backgroundColor = json[i].color;

          var titulo = document.createElement("h1");
          titulo.className = "link";
          titulo.innerText = "Nota ";

          const botona = document.createElement("button");
          botona.className = 'escribir enviar';
          botona.innerText = "Escribir";

          const botonBorrar = document.createElement("button");
          botonBorrar.className = 'borrar';
          botonBorrar.innerText = "Borrar";
          botonBorrar.setAttribute('data-id', json[i].id);

          const botone = document.createElement('button');
          botone.className = 'escribir enviar';
          botone.textContent = 'Enviar';
          botone.style.display = 'none';

          const nuevoEditable = document.createElement('textarea');
          nuevoEditable.classList.add('editable');
          nuevoEditable.placeholder = 'Escribe aquí...';

          nuevoEditable.value = json[i].contenido;

          contenedor.appendChild(titulo);
          contenedor.appendChild(botona);
          contenedor.appendChild(botone);
          contenedor.appendChild(nuevoEditable);
          contenedor.appendChild(botonBorrar);

          containers.appendChild(contenedor);

          botona.addEventListener('click', function () {
            nuevoEditable.style.display = 'block';
            botona.style.display = 'none';
            botone.style.display = 'inline-block';
            nuevoEditable.classList.add('expandir');
            nuevoEditable.style.height = nuevoEditable.scrollHeight + 'px';

            botona.style.display = 'none';
            botone.style.display = 'inline-block';
          });

          botone.addEventListener('click', function () {
            const textoEnviado = nuevoEditable.value;
            console.log('Texto enviado:', textoEnviado);

            // Guardar el contenido en la base de datos
            guardarContenido(json[i].id, textoEnviado);

            nuevoEditable.style.display = 'none';
            botone.style.display = 'none';
            botona.style.display = 'inline-block';
          });

          botonBorrar.addEventListener('click', function () {
            var idNotaABorrar = parseInt(botonBorrar.getAttribute('data-id')); // Obtener el ID de la nota desde data-id
            borrarNota(idNotaABorrar);
          });

          ttt = json[i].id;
        })(i); // valor del IIFE
      }
    });
}
function guardarContenido(contenedorId, contenido) {
  var url = "http://localhost/ProyectoIntegrador/guardar_contenido.php";
  var params = "contenedorId=" + encodeURIComponent(contenedorId) + "&contenido=" + encodeURIComponent(contenido);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Contenido guardado en la base de datos");
      } else {
        console.error("Error al guardar el contenido en la base de datos: " + response.statusText);
      }
    });
}

function borrarNota(idNota) {
  // Comprobar que el ID de la nota sea un número válido
  if (typeof idNota !== 'number' || isNaN(idNota) || idNota < 1) {
    console.error("ID de la nota no válido.");
    return;
  }

  // Realizar la solicitud al servidor para borrar la nota
  var url = `http://localhost/ProyectoIntegrador/borrar_nota.php?id=${idNota}`;
  fetch(url, {
    method: 'GET'
  })
  .then(function (response) {
    if (response.ok) {
      console.log("Nota borrada de la base de datos");
      // Actualizar la página después de borrar la nota
      location.reload();
    } else {
      console.error("Error al borrar la nota en el servidor.");
    }
  })
  .catch(function (error) {
    console.error("Error de conexión con el servidor: " + error);
  });
}

function agregar() {
  console.log(ttt);
  var colores = ["lightskyblue", "tomato", "gold", "mediumpurple"];
  var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

  var url = "http://localhost/ProyectoIntegrador/guardar_contenedor.php";
  var params = "contenedorColor=" + encodeURIComponent(colorAleatorio);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Contenedor guardado en la base de datos");
        location.reload();
      } else {
        console.error("Error al guardar el contenedor en la base de datos: " + response.statusText);
      }
    });
}