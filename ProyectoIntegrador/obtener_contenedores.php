<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "terapp_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si hay errores de conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Consulta SQL para obtener los contenedores
$sql = "SELECT id, color, contenido FROM notas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Crear un array para almacenar los contenedores
    $contenedores = array();

    // Recorrer los resultados y agregarlos al array de contenedores
    while ($row = $result->fetch_assoc()) {
        $contenedor = array(
            'id' => $row['id'],
            'color' => $row['color'],
            'contenido' => $row['contenido']
        );

        $contenedores[] = $contenedor;
    }

    // Devolver los contenedores como respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($contenedores);
} else {
    // No se encontraron contenedores
    echo "No se encontraron contenedores";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>