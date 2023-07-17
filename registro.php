<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	    <link rel= "stylesheet" href="css/estilosRegistro.css">
	<title>Registrar</title>
</head>
<body>
		<div class="message">Datos insertados</div>
	<a class="back-link" href="index.html">&larr; Volver</a>
<?php
$server = "localhost";
$usuario = "root";
$contraseña = "";
$bd = "terapp_db";

$conexion = mysqli_connect($server, $usuario, $contraseña, $bd)
	or die("Error en la conexion");

$Nombre_usuario = $_POST['nickname'];
$Correo = $_POST['correo'];
$Contraseña = $_POST['contraseña'];

$insertar = "INSERT into usuariostb values('$Nombre_usuario', '$Correo', '$Contraseña')";

$resultado = mysqli_query($conexion, $insertar) or die("Error en la consulta");
?>
</body>
</html>
