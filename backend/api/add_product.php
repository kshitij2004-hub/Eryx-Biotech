<?php
// backend/api/add_product.php

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

    $name        = trim($_POST['name'] ?? $input['name'] ?? '');
    $description = trim($_POST['description'] ?? $input['description'] ?? '');
    $category    = trim($_POST['category'] ?? $input['category'] ?? '');
    $price       = trim($_POST['price'] ?? $input['price'] ?? '');
    $imageUrl    = trim($_POST['image_path'] ?? $_POST['image_url'] ?? $input['image_path'] ?? $input['image_url'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Product name is required."]);
        exit();
    }

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
        }
    }

    $insertedId = null;

    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->prepare("INSERT INTO products (name, description, category, price, image_path) VALUES (:name, :description, :category, :price, :image_path)");
        $stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':category' => $category,
            ':price' => $price,
            ':image_path' => $imageUrl
        ]);
        $insertedId = $pdo->lastInsertId();
    } elseif (isset($conn)) {
        $stmt = $conn->prepare("INSERT INTO products (name, description, category, price, image_path) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $description, $category, $price, $imageUrl);
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
        "message" => "Product created successfully.",
        "data" => [
            "id" => $insertedId,
            "name" => $name,
            "description" => $description,
            "category" => $category,
            "price" => $price,
            "image_path" => $formattedPath
        ]
    ]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>