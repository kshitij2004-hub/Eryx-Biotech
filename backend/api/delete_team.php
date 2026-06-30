<?php
// 🌐 Network Gateway & Architecture Headers
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS"); // Accepts both methods to bypass frontend quirks
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS requests smoothly
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 🗄️ Database Connection Coordinates
$host = "localhost";
$db_name = "eryx_biotech_platform"; 
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Read raw input stream for JSON data payloads
    $rawInput = file_get_contents("php://input");
    $payload = json_decode($rawInput, true) ?? [];

    // Smart Extraction: Checks every conceivable naming scheme and request global
    $recordId = $payload['id'] 
                ?? $payload['memberId'] 
                ?? $payload['_id'] 
                ?? $_POST['id'] 
                ?? $_GET['id'] 
                ?? null;

    // If no identifier key manages to register, reject cleanly with telemetry info
    if (!$recordId) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Purge request rejected: Invalid or missing record identifier token.",
            "debug_telemetry" => [
                "parsed_json_body" => $payload,
                "get_parameters" => $_GET,
                "post_parameters" => $_POST
            ]
        ]);
        exit();
    }

    // Force sanitization to integer format
    $recordId = intval($recordId);

    // Execute safe parameterised delete query against team_members
    $query = "DELETE FROM team_members WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $recordId, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Profile successfully detached from structural storage tiers."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database engine failed to clear the profile instance data."
        ]);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database level fault during drop sequence: " . $e->getMessage()
    ]);
}
?>