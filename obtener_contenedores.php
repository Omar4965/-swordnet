<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Establecer la conexión con la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "terapp_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error al conectar con la base de datos: " . $conn->connect_error);
}

// Realizar la consulta para obtener los datos de los contenedores
$sql = "SELECT id, color FROM notas";
$result = $conn->query($sql);

// Crear un array para almacenar los datos obtenidos
$contenedores = array();

if ($result->num_rows > 0) {
    // Recorrer los resultados de la consulta y almacenar los datos en el array
    while ($row = $result->fetch_assoc()) {
        $contenedor = array(
            'id' => $row['id'],
            'color' => $row['color']
        );
        $contenedores[] = $contenedor;
    }
}

// Cerrar la conexión con la base de datos
$conn->close();

// Devolver los datos como respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($contenedores);
?>