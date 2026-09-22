<?php
// backend/api/update_product.php

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
    
    $productId = isset($_POST['id']) ? intval($_POST['id']) : (isset($input['id']) ? intval($input['id']) : null);
    
    if (!$productId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Product ID is required for updating."]);
        exit();
    }

    $name        = $_POST['name'] ?? $input['name'] ?? null;
    $description = $_POST['description'] ?? $input['description'] ?? null;
    $category    = $_POST['category'] ?? $input['category'] ?? null;
    $price       = $_POST['price'] ?? $input['price'] ?? null;
    $imageUrl    = $_POST['image_path'] ?? $_POST['image_url'] ?? $input['image_path'] ?? $input['image_url'] ?? null;

    if ($name !== null) $name = trim($name);
    if ($description !== null) $description = trim($description);
    if ($category !== null) $category = trim($category);
    if ($price !== null) $price = trim($price);

    $newUploadedFile = false;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../../public/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = 'prod_' . time() . '_' . mt_rand(1000, 9999) . '.' . $fileExtension;
        $uploadFile = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            $imageUrl = 'uploads/' . $fileName;
            $newUploadedFile = true;
        }
    }

    if (isset($pdo) && $pdo instanceof PDO) {
        $checkStmt = $pdo->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
        $checkStmt->execute([':id' => $productId]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Product not found."]);
            exit();
        }

        $updates = [];
        $params = [':id' => $productId];

        if ($name !== null) { $updates[] = "name = :name"; $params[':name'] = $name; }
        if ($description !== null) { $updates[] = "description = :description"; $params[':description'] = $description; }
        if ($category !== null) { $updates[] = "category = :category"; $params[':category'] = $category; }
        if ($price !== null) { $updates[] = "price = :price"; $params[':price'] = $price; }
        
        $imgCol = array_key_exists('image_path', $existing) ? 'image_path' : 'image_url';
        $oldImagePath = $existing[$imgCol] ?? null;

        if ($imageUrl !== null && $imageUrl !== '') {
            $updates[] = "$imgCol = :image_val";
            $params[':image_val'] = $imageUrl;
        }

        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No fields provided to update."]);
            exit();
        }

        $sql = "UPDATE products SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($newUploadedFile && !empty($oldImagePath)) {
            $oldFileFullPath = __DIR__ . '/../../public/' . ltrim($oldImagePath, '/');
            if (file_exists($oldFileFullPath) && is_file($oldFileFullPath)) {
                @unlink($oldFileFullPath);
            }
        }

        $fetchStmt = $pdo->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
        $fetchStmt->execute([':id' => $productId]);
        $updatedRow = $fetchStmt->fetch(PDO::FETCH_ASSOC);

        if (isset($updatedRow[$imgCol]) && strpos($updatedRow[$imgCol], 'http') !== 0) {
            $updatedRow[$imgCol] = '/' . ltrim($updatedRow[$imgCol], '/');
        }

        echo json_encode([
            "status" => "success",
            "message" => "Product updated successfully.",
            "data" => $updatedRow
        ]);

    } elseif (isset($conn)) {
        $checkStmt = $conn->prepare("SELECT * FROM products WHERE id = ? LIMIT 1");
        $checkStmt->bind_param("i", $productId);
        $checkStmt->execute();
        $existing = $checkStmt->get_result()->fetch_assoc();
        $checkStmt->close();

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Product not found."]);
            $conn->close();
            exit();
        }

        $updates = [];
        $types = "";
        $values = [];

        if ($name !== null) { $updates[] = "name = ?"; $types .= "s"; $values[] = $name; }
        if ($description !== null) { $updates[] = "description = ?"; $types .= "s"; $values[] = $description; }
        if ($category !== null) { $updates[] = "category = ?"; $types .= "s"; $values[] = $category; }
        if ($price !== null) { $updates[] = "price = ?"; $types .= "s"; $values[] = $price; }
        
        $imgCol = array_key_exists('image_path', $existing) ? 'image_path' : 'image_url';
        $oldImagePath = $existing[$imgCol] ?? null;

        if ($imageUrl !== null && $imageUrl !== '') {
            $updates[] = "$imgCol = ?";
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
        $values[] = $productId;

        $sql = "UPDATE products SET " . implode(', ', $updates) . " WHERE id = ?";
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

        $fetchStmt = $conn->prepare("SELECT * FROM products WHERE id = ? LIMIT 1");
        $fetchStmt->bind_param("i", $productId);
        $fetchStmt->execute();
        $updatedRow = $fetchStmt->get_result()->fetch_assoc();
        $fetchStmt->close();
        $conn->close();

        if (isset($updatedRow[$imgCol]) && strpos($updatedRow[$imgCol], 'http') !== 0) {
            $updatedRow[$imgCol] = '/' . ltrim($updatedRow[$imgCol], '/');
        }

        echo json_encode([
            "status" => "success",
            "message" => "Product updated successfully.",
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