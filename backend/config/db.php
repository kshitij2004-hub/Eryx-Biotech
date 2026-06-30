<?php
// backend/config/db.php

$host = 'localhost';
$db_name = 'eryx_biotech_platform'; // Replace with your actual MySQL database name
$username = 'root';        // Default XAMPP username
$password = '';            // Default XAMPP password (empty)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    // Set error mode to exception to catch issues early
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database link failure: " . $e->getMessage()
    ]);
    exit();
}