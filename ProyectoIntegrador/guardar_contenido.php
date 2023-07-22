<?php
// Obtener los datos enviados por la solicitud POST
$contenedorId = $_POST['contenedorId'];
$contenido = $_POST['contenido'];

// Realizar la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "terapp_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si hay errores en la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Actualizar el contenido en la base de datos
$sql = "UPDATE notas SET contenido = '$contenido' WHERE id = '$contenedorId'";

if ($conn->query($sql) === TRUE) {
    echo "Contenido actualizado en la base de datos";
} else {
    echo "Error al actualizar el contenido en la base de datos: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>