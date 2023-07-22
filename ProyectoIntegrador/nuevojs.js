var ttt;

function agregarTextArea(contenedor, nota) {
  const pestañaContenedor = document.createElement('div');
  pestañaContenedor.classList.add('pestaña-cont');

        const nuevoEditable = document.createElement('textarea');
        nuevoEditable.classList.add('editable');
        nuevoEditable.placeholder = 'Escribe aquí...';
        nuevoEditable.value = nota.contenido;

        const botonEnviar = document.createElement("button");
        botonEnviar.className = 'escribir enviar';
        botonEnviar.innerText = "Enviar";

        const botonBorrarTexto = document.createElement("button");
        botonBorrarTexto.className = 'escribir enviar';
        botonBorrarTexto.innerText = "Borrar Texto";

        const botonCerrar = document.createElement("button");
        botonCerrar.className = 'escribir enviar';
        botonCerrar.innerText = "Cerrar";

        const pestañaBotones = document.createElement('div');
        pestañaBotones.classList.add('pestaña-botones');
        pestañaBotones.appendChild(botonEnviar);
        pestañaBotones.appendChild(botonBorrarTexto);
        pestañaBotones.appendChild(botonCerrar);

        pestañaContenedor.appendChild(pestañaBotones);
        pestañaContenedor.appendChild(nuevoEditable);

        contenedor.appendChild(pestañaContenedor);

        const botona = document.createElement("button");
        botona.className = 'escribir';
        botona.innerText = "Escribir";

        contenedor.appendChild(botona);

        botona.addEventListener('click', function () {
          pestañaContenedor.style.display = 'block';
          botona.style.display = 'none';
        });

        botonEnviar.addEventListener('click', function () {
          const textoEnviado = nuevoEditable.value;
          console.log('Texto enviado:', textoEnviado);

          // Guardar el contenido en la base de datos
          guardarContenido(nota.id, textoEnviado);

          pestañaContenedor.style.display = 'none';
          botona.style.display = 'inline-block';
        });

        botonBorrarTexto.addEventListener('click', function () {
          nuevoEditable.value = ''; // Borrar el texto del textarea
        });

        botonCerrar.addEventListener('click', function () {
          pestañaContenedor.style.display = 'none';
          botona.style.display = 'inline-block';
  });
}
// Función para crear el contenedor principal y agregar notas
function crearContenedor() {
  fetch('http://localhost/ProyectoIntegrador/obtener_contenedores.php')
    .then((response) => response.json())
    .then((json) => {
      var containers = document.getElementById("containers");
      var contador = json.length;
      for (var i = 0; i < contador; i++) {
        (function (i) { //IIFE
          var contenedor = document.createElement("div");
          contenedor.id = "contenedor";
          contenedor.className = "forms-box";
          contenedor.style.backgroundColor = json[i].color;

          var titulo = document.createElement("h1");
          titulo.className = "link";
          titulo.innerText = "Nota " + json[i].id;

          const botonBorrar = document.createElement("button");
          botonBorrar.className = 'borrar';
          botonBorrar.innerText = "Borrar";
          botonBorrar.setAttribute('data-id', json[i].id);

          botonBorrar.addEventListener('click', function () {
          var idNotaABorrar = parseInt(botonBorrar.getAttribute('data-id')); // Obtener el ID de la nota desde data-id
            borrarNota(idNotaABorrar);
          });
          
          contenedor.appendChild(titulo);
          contenedor.appendChild(botonBorrar);
          containers.appendChild(contenedor);

          agregarTextArea(contenedor, json[i]);
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