<?php
// backend/api/upload_adr.php - Exact Schema Match

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

    // Extract inputs from FormData or JSON body
    $rawInput = file_get_contents('php://input');
    $jsonData = json_decode($rawInput, true) ?? [];

    $compound_id       = $_POST['compound_id'] ?? $_POST['batch_or_compound_id'] ?? $_POST['batch_id'] ?? $jsonData['compound_id'] ?? $jsonData['batch_or_compound_id'] ?? $jsonData['batch_id'] ?? '';
    $observation_notes = $_POST['observation_notes'] ?? $_POST['observations_clinical_notes'] ?? $_POST['clinical_notes'] ?? $_POST['description'] ?? $jsonData['observation_notes'] ?? $jsonData['observations_clinical_notes'] ?? $jsonData['clinical_notes'] ?? '';

    $file_name = '';
    $file_path = '';

    // Detect uploaded PDF attachment key dynamically
    $fileKey = null;
    foreach (['file', 'adr_file', 'attachment', 'pdf', 'document'] as $k) {
        if (isset($_FILES[$k]) && $_FILES[$k]['error'] === UPLOAD_ERR_OK) {
            $fileKey = $k;
            break;
        }
    }

    if ($fileKey) {
        $uploadDir = '../uploads/adr_forms/';
        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }

        $originalName = $_FILES[$fileKey]['name'];
        $fileExt      = pathinfo($originalName, PATHINFO_EXTENSION);
        $savedName    = time() . '_' . md5(uniqid()) . '.' . $fileExt;
        $targetFile   = $uploadDir . $savedName;

        if (@move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetFile)) {
            $file_name = $originalName;
            $file_path = 'backend/uploads/adr_forms/' . $savedName;
        }
    }

    // Prepare statement targeting exact table columns
    $sql  = "INSERT INTO adr_reports (compound_id, observation_notes, file_name, file_path) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssss", $compound_id, $observation_notes, $file_name, $file_path);

    if (!$stmt->execute()) {
        throw new Exception("Execution failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    http_response_code(200);
    echo json_encode([
        "status"  => "success",
        "message" => "ADR compliance dossier submitted successfully"
    ]);

} catch (Throwable $e) {
    http_response_code(200);
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
?>