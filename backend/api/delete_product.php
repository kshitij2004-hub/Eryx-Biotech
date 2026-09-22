<?php
// backend/api/delete_product.php

require_once '../config/db.php';

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

try {
    $rawInput = json_decode(file_get_contents("php://input"), true) ?? [];
    $id = $_GET['id'] ?? $_POST['id'] ?? $rawInput['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing product ID."]);
        exit();
    }

    $imagePath = null;

    if (isset($pdo) && $pdo instanceof PDO) {
        $fetchStmt = $pdo->prepare("SELECT image_path, image_url FROM products WHERE id = :id LIMIT 1");
        $fetchStmt->execute([':id' => $id]);
        $row = $fetchStmt->fetch(PDO::FETCH_ASSOC);
        $imagePath = $row['image_path'] ?? $row['image_url'] ?? null;

        $stmt = $pdo->prepare("DELETE FROM products WHERE id = :id");
        $stmt->execute([':id' => $id]);
    } elseif (isset($conn)) {
        $fetchStmt = $conn->prepare("SELECT image_path, image_url FROM products WHERE id = ? LIMIT 1");
        $fetchStmt->bind_param("i", $id);
        $fetchStmt->execute();
        $row = $fetchStmt->get_result()->fetch_assoc();
        $imagePath = $row['image_path'] ?? $row['image_url'] ?? null;
        $fetchStmt->close();

        $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    if (!empty($imagePath)) {
        $fileFullPath = __DIR__ . '/../../public/' . ltrim($imagePath, '/');
        if (file_exists($fileFullPath) && is_file($fileFullPath)) {
            @unlink($fileFullPath);
        }
    }

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Product deleted successfully."]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>