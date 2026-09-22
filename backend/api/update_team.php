<?php
// backend/api/update_team.php

require_once '../config/db.php';

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT'])) {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Use POST or PUT."]);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    
    $teamId = isset($_POST['id']) ? intval($_POST['id']) : (isset($input['id']) ? intval($input['id']) : null);
    
    if (!$teamId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Team Member ID is required for updating."]);
        exit();
    }

    $name       = $_POST['name'] ?? $input['name'] ?? null;
    $role       = $_POST['role'] ?? $input['role'] ?? null;
    $department = $_POST['department'] ?? $input['department'] ?? null;
    $bio        = $_POST['bio'] ?? $input['bio'] ?? null;
    $imageUrl   = $_POST['image_url'] ?? $input['image_url'] ?? null;

    if ($name !== null) $name = trim($name);
    if ($role !== null) $role = trim($role);
    if ($department !== null) $department = trim($department);
    if ($bio !== null) $bio = trim($bio);

    $newUploadedFile = false;

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
            $newUploadedFile = true;
        }
    }

    if (isset($pdo) && $pdo instanceof PDO) {
        $checkStmt = $pdo->prepare("SELECT * FROM team_members WHERE id = :id LIMIT 1");
        $checkStmt->execute([':id' => $teamId]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Team member not found."]);
            exit();
        }

        $updates = [];
        $params = [':id' => $teamId];

        if ($name !== null) { $updates[] = "name = :name"; $params[':name'] = $name; }
        if ($role !== null) { $updates[] = "role = :role"; $params[':role'] = $role; }
        if ($department !== null) { $updates[] = "department = :department"; $params[':department'] = $department; }
        if ($bio !== null) { $updates[] = "bio = :bio"; $params[':bio'] = $bio; }
        
        $oldImagePath = $existing['image_url'] ?? null;

        if ($imageUrl !== null && $imageUrl !== '') {
            $updates[] = "image_url = :image_url";
            $params[':image_url'] = $imageUrl;
        }

        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No fields provided to update."]);
            exit();
        }

        $sql = "UPDATE team_members SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($newUploadedFile && !empty($oldImagePath)) {
            $oldFileFullPath = __DIR__ . '/../../public/' . ltrim($oldImagePath, '/');
            if (file_exists($oldFileFullPath) && is_file($oldFileFullPath)) {
                @unlink($oldFileFullPath);
            }
        }

        $fetchStmt = $pdo->prepare("SELECT * FROM team_members WHERE id = :id LIMIT 1");
        $fetchStmt->execute([':id' => $teamId]);
        $updatedRow = $fetchStmt->fetch(PDO::FETCH_ASSOC);

        if (isset($updatedRow['image_url']) && strpos($updatedRow['image_url'], 'http') !== 0) {
            $updatedRow['image_url'] = '/' . ltrim($updatedRow['image_url'], '/');
        }

        echo json_encode([
            "status" => "success",
            "message" => "Team member updated successfully.",
            "data" => $updatedRow
        ]);

    } elseif (isset($conn)) {
        $checkStmt = $conn->prepare("SELECT * FROM team_members WHERE id = ? LIMIT 1");
        $checkStmt->bind_param("i", $teamId);
        $checkStmt->execute();
        $existing = $checkStmt->get_result()->fetch_assoc();
        $checkStmt->close();

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Team member not found."]);
            $conn->close();
            exit();
        }

        $updates = [];
        $types = "";
        $values = [];

        if ($name !== null) { $updates[] = "name = ?"; $types .= "s"; $values[] = $name; }
        if ($role !== null) { $updates[] = "role = ?"; $types .= "s"; $values[] = $role; }
        if ($department !== null) { $updates[] = "department = ?"; $types .= "s"; $values[] = $department; }
        if ($bio !== null) { $updates[] = "bio = ?"; $types .= "s"; $values[] = $bio; }
        
        $oldImagePath = $existing['image_url'] ?? null;

        if ($imageUrl !== null && $imageUrl !== '') {
            $updates[] = "image_url = ?";
            $types .= "s";
            $values[] = $imageUrl;
        }

        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No fields provided to update."]);
            $conn->close();
            exit();
        }

        $types .= "i";
        $values[] = $teamId;

        $sql = "UPDATE team_members SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$values);
        $stmt->execute();
        $stmt->close();

        if ($newUploadedFile && !empty($oldImagePath)) {
            $oldFileFullPath = __DIR__ . '/../../public/' . ltrim($oldImagePath, '/');
            if (file_exists($oldFileFullPath) && is_file($oldFileFullPath)) {
                @unlink($oldFileFullPath);
            }
        }

        $fetchStmt = $conn->prepare("SELECT * FROM team_members WHERE id = ? LIMIT 1");
        $fetchStmt->bind_param("i", $teamId);
        $fetchStmt->execute();
        $updatedRow = $fetchStmt->get_result()->fetch_assoc();
        $fetchStmt->close();
        $conn->close();

        if (isset($updatedRow['image_url']) && strpos($updatedRow['image_url'], 'http') !== 0) {
            $updatedRow['image_url'] = '/' . ltrim($updatedRow['image_url'], '/');
        }

        echo json_encode([
            "status" => "success",
            "message" => "Team member updated successfully.",
            "data" => $updatedRow
        ]);
    } else {
        throw new Exception("No valid database connection available.");
    }

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>