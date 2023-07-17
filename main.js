function crearContenedor() {
  // Obtener los contenedores existentes desde la base de datos
  fetch('http://localhost/ProyectoIntegrador/obtener_contenedores.php')
    .then((response) => response.json())
    .then((json) => {
      // Obtener el número actual de contenedores
      var contador = json.length;

      // Crear el nuevo contenedor
      var contenedor = document.createElement("div");
      contenedor.id = "contenedor";

      // Seleccionar un color aleatorio de la lista
      var colores = ["lightskyblue", "tomato", "gold", "mediumpurple"];
      var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
      contenedor.style.backgroundColor = colorAleatorio;

      var enlace = document.createElement("a");
      enlace.className = "link";
      enlace.innerText = "Nota " + (contador + 1);

      var boton = document.createElement("button");
      boton.className = "submit-btns";
      boton.innerText = "Escribir";

      contenedor.appendChild(enlace);
      contenedor.appendChild(boton);
      document.body.appendChild(contenedor);

      // Guardar el nuevo contenedor en la base de datos
      var url = "http://localhost/ProyectoIntegrador/guardar_contenedor.php";
      var params = "contenedorId=" + encodeURIComponent(contenedor.id) + "&contenedorColor=" + encodeURIComponent(contenedor.style.backgroundColor);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })
        .then(function(response) {
          if (response.ok) {
            console.log("Contenedor guardado en la base de datos");
          } else {
            console.error("Error al guardar el contenedor en la base de datos: " + response.statusText);
          }
        })
        .catch(function(error) {
          console.error("Error en la solicitud AJAX: " + error);
        });
    })
    .catch(error => console.error('Error al obtener los contenedores: ' + error));
}