<?php
// backend/api/add_team.php

require_once '../config/db.php';

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Use POST."]);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    $name       = trim($_POST['name'] ?? $input['name'] ?? '');
    $role       = trim($_POST['role'] ?? $input['role'] ?? '');
    $department = trim($_POST['department'] ?? $input['department'] ?? '');
    $bio        = trim($_POST['bio'] ?? $input['bio'] ?? '');
    $imageUrl   = trim($_POST['image_url'] ?? $input['image_url'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Team member name is required."]);
        exit();
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../../public/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = 'team_' . time() . '_' . mt_rand(1000, 9999) . '.' . $fileExtension;
        $uploadFile = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            $imageUrl = 'uploads/' . $fileName;
        }
    }

    $insertedId = null;

    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->prepare("INSERT INTO team_members (name, role, department, bio, image_url) VALUES (:name, :role, :department, :bio, :image_url)");
        $stmt->execute([
            ':name' => $name,
            ':role' => $role,
            ':department' => $department,
            ':bio' => $bio,
            ':image_url' => $imageUrl
        ]);
        $insertedId = $pdo->lastInsertId();
    } elseif (isset($conn)) {
        $stmt = $conn->prepare("INSERT INTO team_members (name, role, department, bio, image_url) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $role, $department, $bio, $imageUrl);
        $stmt->execute();
        $insertedId = $stmt->insert_id;
        $stmt->close();
        $conn->close();
    } else {
        throw new Exception("No valid database connection available.");
    }

    $formattedPath = (!empty($imageUrl) && strpos($imageUrl, 'http') !== 0) ? '/' . ltrim($imageUrl, '/') : $imageUrl;

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Team member added successfully.",
        "data" => [
            "id" => $insertedId,
            "name" => $name,
            "role" => $role,
            "department" => $department,
            "bio" => $bio,
            "image_url" => $formattedPath
        ]
    ]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>