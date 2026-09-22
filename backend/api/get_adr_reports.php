<?php
// backend/api/get_adr_reports.php

require_once '../config/db.php';

// Ensure response is always strict JSON
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Use GET."]);
    exit();
}

try {
    $reports = [];

    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->query("SELECT * FROM adr_reports ORDER BY id DESC");
        $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // MySQLi Fallback Execution
        $sql = "SELECT * FROM adr_reports ORDER BY id DESC";
        $result = $conn->query($sql);

        if (!$result) {
            throw new Exception("Query failed: " . $conn->error);
        }

        $reports = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        $conn->close();
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data"   => $reports
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>