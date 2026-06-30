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
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Added OPTIONS to support preflight checks cleanly
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect the JSON load from our React submission engine
    $data = json_parse(file_get_contents("php://input"));
    
    // Quick procedural fallback layer if file_get_contents wrapper isn't parsing raw JSON string arrays
    if(!$data) {
        $data = (object)$_POST;
    }

    if (!empty($data->full_name) && !empty($data->email) && !empty($data->position)) {
        try {
            $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = "INSERT INTO job_applications (full_name, email, position, experience, cover_letter) 
                      VALUES (:full_name, :email, :position, :experience, :cover_letter)";
            
            $stmt = $conn->prepare($query);

            $stmt->bindParam(':full_name', $data->full_name);
            $stmt->bindParam(':email', $data->email);
            $stmt->bindParam(':position', $data->position);
            $stmt->bindParam(':experience', $data->experience);
            $stmt->bindParam(':cover_letter', $data->cover_letter);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Application successfully cataloged inside the database registry Matrix."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Unable to write application payload packet."]);
            }
        } catch(PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Storage system link failure: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incomplete field parameters sent to server processing node."]);
    }
}

function json_parse($raw) {
    return json_decode($raw);
}
?>