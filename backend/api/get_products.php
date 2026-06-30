<?php
// backend/api/get_products.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/db.php';

// Check if a specific ID is being queried
$id = $_GET['id'] ?? null;

try {
    if ($id) {
        // MODE A: Single Product Retrieval (For ProductDetail.jsx)
        $query = "SELECT * FROM products WHERE id = :id LIMIT 1";
        $stmt = $pdo->prepare($query);
        $stmt->execute([':id' => $id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            echo json_encode([
                "status" => "success",
                "data" => $product
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Formulation record not found."
            ]);
        }
    } else {
        // MODE B: Bulk Product Retrieval (For Admin Dashboard & Main Catalog Grid)
        $query = "SELECT * FROM products ORDER BY id DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => "success",
            "data" => $products
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database execution engine error: " . $e->getMessage()
    ]);
}
?>