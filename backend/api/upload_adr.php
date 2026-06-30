<?php
// backend/api/upload_adr.php

// 1. Configure CORS Headers for React Frontend Communication
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Only POST allowed."]);
    exit();
}

// 2. Initialize Database Connection Settings
$db_host = "localhost";
$db_user = "root";       // Update with your MySQL credentials
$db_pass = "";           // Update with your MySQL credentials
$db_name = "eryx_biotech_platform"; // Update with your actual database name

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit();
}

// 3. Process Text Metadata
$compound_id = isset($_POST['compound_id']) ? trim($_POST['compound_id']) : '';
$observation_notes = isset($_POST['observation_notes']) ? trim($_POST['observation_notes']) : '';

if (empty($compound_id) || empty($observation_notes)) {
    echo json_encode(["status" => "error", "message" => "Missing required clinical reporting metrics."]);
    exit();
}

// 4. Process File Upload Payload
if (!isset($_FILES['adr_form']) || $_FILES['adr_form']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["status" => "error", "message" => "No document file detected or upload error occurred."]);
    exit();
}

$file = $_FILES['adr_form'];
$fileName = $file['name'];
$fileTmpName = $file['tmp_name'];
$fileSize = $file['size'];

// Verification Rules: Enforce strict PDF verification
$fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
if ($fileExtension !== 'pdf') {
    echo json_encode(["status" => "error", "message" => "Invalid file extension. Only PDF blueprints are authorized."]);
    exit();
}

// Set maximum file limit size (e.g., 10 Megabytes)
$maxFileSize = 10 * 1024 * 1024; 
if ($fileSize > $maxFileSize) {
    echo json_encode(["status" => "error", "message" => "File target profile exceeds safe 10MB threshold."]);
    exit();
}

// 5. Establish Target Upload Storage Directory
$uploadDirectory = "../uploads/adr_forms/";
if (!file_exists($uploadDirectory)) {
    mkdir($uploadDirectory, 0755, true); // Automatically construct folder if missing
}

// Sanitize and randomize file naming conventions to eliminate overrides
$uniqueFileName = time() . "_" . bin2hex(random_bytes(8)) . ".pdf";
$destinationPath = $uploadDirectory . $uniqueFileName;

// 6. Relocate File and Write DB Record Entry
if (move_uploaded_file($fileTmpName, $destinationPath)) {
    
    // Use an absolute or relative public web path route for future administrative access
    $publicFilePath = "backend/uploads/adr_forms/" . $uniqueFileName;

    // Prepared Statement Execution to mitigate SQL Injection risks
    $stmt = $conn->prepare("INSERT INTO adr_reports (compound_id, observation_notes, file_name, file_path) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $compound_id, $observation_notes, $fileName, $publicFilePath);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Dossier verification complete. Compliance case records updated successfully."
        ]);
    } else {
        // Clean up file if DB record fails to insert properly
        if (file_exists($destinationPath)) {
            unlink($destinationPath);
        }
        echo json_encode(["status" => "error", "message" => "Database serialization record failed."]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Failed to write document payload to storage volume."]);
}

$conn->close();
?>