<?php
header("Access-Control-Allow-Origin: *");
// Obtener los datos enviados por la solicitud AJAX
$contenedorColor = $_POST['contenedorColor'];

// Realizar la inserción en la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "terapp_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error al conectar con la base de datos: " . $conn->connect_error);
}

$sql = "INSERT INTO notas (color) VALUES ('$contenedorColor')";
if ($conn->query($sql) === TRUE) {
    echo "php funciona";
} else {
    echo "Error al guardar el contenedor en la base de datos: " . $conn->error;
}

$conn->close();
?>