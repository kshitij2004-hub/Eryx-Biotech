<?php
// 🌐 Network Gateway & Dynamic CORS Headers Configuration
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $allowed_origin = $_SERVER['HTTP_ORIGIN'];
    
    // Safety verification: Ensures the origin is either localhost (any port) or your secure platform domain
    if (preg_match('~^https?://localhost(:\d+)?$~', $allowed_origin) || strpos($allowed_origin, 'eryx-biotech') !== false) {
        header("Access-Control-Allow-Origin: " . $allowed_origin);
    }
} else {
    // Basic fallback if no explicit origin header is passed
    header("Access-Control-Allow-Origin: *");
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS requests smoothly
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$host = "localhost";
$db_name = "eryx_biotech_platform"; 
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $query = "SELECT id, name, role, department, image_url, bio FROM team_members ORDER BY id ASC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
        echo json_encode([
            "status" => "success",
            "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ]);
        exit();
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>