<?php
// backend/api/apply.php - Matched to Exact DB Schema

ini_set('display_errors', 0);
error_reporting(0);

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

try {
    $conn = new mysqli('127.0.0.1', 'eryx_web_user', 'q0h40?1Cz', 'eryxheal_db', 3306);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    // Parse input from FormData or JSON body
    $rawInput = file_get_contents('php://input');
    $jsonData = json_decode($rawInput, true) ?? [];

    $full_name    = $_POST['full_name'] ?? $_POST['full_legal_identity'] ?? $jsonData['full_name'] ?? $jsonData['full_legal_identity'] ?? '';
    $email        = $_POST['email'] ?? $_POST['digital_communications_address'] ?? $jsonData['email'] ?? $jsonData['digital_communications_address'] ?? '';
    $position     = $_POST['position'] ?? $_POST['target_assignment_node'] ?? $jsonData['position'] ?? $jsonData['target_assignment_node'] ?? '';
    $experience   = $_POST['experience'] ?? $_POST['experience_metric_tier'] ?? $jsonData['experience'] ?? $jsonData['experience_metric_tier'] ?? '';
    $cover_letter = $_POST['cover_letter'] ?? $_POST['covering_statement'] ?? $_POST['message'] ?? $jsonData['cover_letter'] ?? $jsonData['covering_statement'] ?? $jsonData['message'] ?? '';
    $status       = 'Pending Review';

    // Insert into exact table structure: full_name, email, position, experience, cover_letter, status
    $sql = "INSERT INTO job_applications (full_name, email, position, experience, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssssss", $full_name, $email, $position, $experience, $cover_letter, $status);

    if (!$stmt->execute()) {
        throw new Exception("Execution failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    http_response_code(200);
    echo json_encode([
        "status"  => "success",
        "message" => "Application submitted successfully"
    ]);

} catch (Throwable $e) {
    http_response_code(200);
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
?>