<?php
// backend/api/products.php

require_once '../config/db.php';

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Use GET."]);
    exit();
}

function normalizeImagePath(?string $url): string {
    if (empty($url)) return '';
    if (strpos($url, 'http') === 0) return $url;
    return '/' . ltrim($url, '/');
}

try {
    $productId = isset($_GET['id']) ? intval($_GET['id']) : null;
    $outputData = null;

    if (isset($pdo) && $pdo instanceof PDO) {
        if ($productId) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $productId]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $imgKey = isset($row['image_path']) ? 'image_path' : (isset($row['image_url']) ? 'image_url' : (isset($row['image']) ? 'image' : null));
                if ($imgKey) {
                    $row[$imgKey] = normalizeImagePath($row[$imgKey] ?? null);
                }
                $outputData = $row;
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Product not found"]);
                exit();
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($products as &$row) {
                $imgKey = isset($row['image_path']) ? 'image_path' : (isset($row['image_url']) ? 'image_url' : (isset($row['image']) ? 'image' : null));
                if ($imgKey) {
                    $row[$imgKey] = normalizeImagePath($row[$imgKey] ?? null);
                }
            }
            unset($row);
            $outputData = $products;
        }
    } elseif (isset($conn)) {
        if ($productId) {
            $stmt = $conn->prepare("SELECT * FROM products WHERE id = ? LIMIT 1");
            $stmt->bind_param("i", $productId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($row = $result->fetch_assoc()) {
                $imgKey = isset($row['image_path']) ? 'image_path' : (isset($row['image_url']) ? 'image_url' : (isset($row['image']) ? 'image' : null));
                if ($imgKey) {
                    $row[$imgKey] = normalizeImagePath($row[$imgKey] ?? null);
                }
                $outputData = $row;
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Product not found"]);
                $stmt->close();
                $conn->close();
                exit();
            }
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM products ORDER BY id DESC");
            if (!$result) throw new Exception("Query failed: " . $conn->error);

            $products = [];
            while ($row = $result->fetch_assoc()) {
                $imgKey = isset($row['image_path']) ? 'image_path' : (isset($row['image_url']) ? 'image_url' : (isset($row['image']) ? 'image' : null));
                if ($imgKey) {
                    $row[$imgKey] = normalizeImagePath($row[$imgKey] ?? null);
                }
                $products[] = $row;
            }
            $outputData = $products;
            $result->free();
        }
        $conn->close();
    } else {
        throw new Exception("No valid database connection available.");
    }

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $outputData]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>