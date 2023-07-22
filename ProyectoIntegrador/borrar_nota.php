<?php
// Verificar si se recibe un ID válido para borrar la nota
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
    
    // Conexión a la base de datos (cambia los valores por los de tu base de datos)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "terapp_db";
    
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Consulta SQL para borrar la nota con el ID proporcionado
        $sql = "DELETE FROM notas WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        echo "Nota borrada exitosamente.";
    } catch (PDOException $e) {
        echo "Error al borrar la nota: " . $e->getMessage();
    }
    $conn = null;
} else {
    echo "ID de la nota no válido.";
}
?>