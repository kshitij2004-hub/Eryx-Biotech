<?php
// backend/api/delete_product.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/db.php';

// 🛡️ Bulletproof ID Capture: Checks URL string, FormData ($_POST), or raw JSON streams
$id = $_GET['id'] ?? $_POST['id'] ?? null;

if (!$id) {
    $rawInput = json_decode(file_get_contents("php://input"), true);
    $id = $rawInput['id'] ?? null;
}

// Check if a valid identification key was successfully extracted
if ($id) {
    try {
        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->execute([':id' => $id]);

        echo json_encode([
            "status" => "success", 
            "message" => "Product successfully purged from structural rows."
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Internal database drop command execution failure: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Malformed endpoint call parameters. Missing identification key entry."
    ]);
}
?>