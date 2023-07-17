<?php
$server = "localhost";
$usuario = "root";
$contraseña = "";
$bd = "terapp_db";

$conexion = mysqli_connect($server, $usuario, $contraseña, $bd) or die("Error en la conexión");

$query = "SELECT * FROM usuariostb";
$resultado = mysqli_query($conexion, $query) or die("Error en la consulta");

$datos = array();

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

$json_datos = json_encode($datos);

header('Content-Type: application/json');
echo $json_datos;

mysqli_close($conexion);
?>