var ttt;

function crearContenedor() {
  // Obtener los contenedores existentes desde la base de datos
  fetch('http://localhost/ProyectoIntegrador/obtener_contenedores.php')
    .then((response) => response.json())
    .then((json) => {
      
      var conteiners = document.getElementById("containers");
      // Obtener el número actual de contenedores
      var contador = json.length;
      for(var i = 0 ; i < contador; i++){
        // Crear el nuevo contenedor
        var contenedor = document.createElement("div");
        contenedor.id = "contenedor";
        contenedor.className = "forms-box";
        contenedor.style.backgroundColor = json[i].color;

        // Seleccionar un color aleatorio de la lista

        var titulo = document.createElement("h1");
        titulo.className = "link";
        titulo.innerText = "Nota" + json[i].id;
        

        // Crea un nuevo botón "Abrir"
        const botona = document.createElement("button");
        botona.className = ('escribir', 'enviar');
        botona.innerText = "Escribir";
        

        // Crea un nuevo botón "Enviar"
        const botone = document.createElement('button');
        botone.className = ('escribir', 'enviar');
        botone.textContent = 'Enviar';
        botone.style.display = 'none';// Oculta el botón "Enviar" inicialmente

        // Crea un nuevo elemento editable
        const nuevoEditable = document.createElement('textarea');
        nuevoEditable.classList.add('editable');
        nuevoEditable.placeholder = 'Escribe aquí...';

        contenedor.appendChild(titulo);
        contenedor.appendChild(botona);
        contenedor.appendChild(botone);
        contenedor.appendChild(nuevoEditable);
        conteiners.appendChild(contenedor);

        botona.addEventListener('click', function(){
          nuevoEditable.style.display = 'block';
          botona.style.display = 'none';
          botone.style.display = 'inline-block';
          nuevoEditable.classList.add('expandir');
          nuevoEditable.style.height = nuevoEditable.scrollHeight + 'px';

          botona.style.display = 'none';
          botone.style.display = 'inline-block';
        });

        botone.addEventListener('click', function(){
          const textoEnviado = nuevoEditable.value;
          console.log('Texto enviado:', textoEnviado);

          nuevoEditable.style.display = 'none';
          botone.style.display = 'none';
          botona.style.display = 'inline-block';
        });

        ttt = json[i].id;
      }
    }  
  )
}
function agregar(){
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
        .then(function(response) {
          if (response.ok) {
            console.log("Contenedor guardado en la base de datos");
            location.reload();
      } else {
        console.error("Error al guardar el contenedor en la base de datos: " + response.statusText);
    }
  }) 
}
