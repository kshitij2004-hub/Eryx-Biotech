<?php
// backend/config/db.php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$isLocalhost = ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1');

if ($isLocalhost) {
    $host = '127.0.0.1';
    $db   = 'eryx_biotech_platform';
    $user = 'root';
    $pass = '';
} else {
    $host = '127.0.0.1';
    $db   = 'eryxheal_db';
    $user = 'eryx_web_user'; 
    $pass = 'q0h40?1Cz';
}

$port = 3306;

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => true
    ];
    $pdo  = new PDO($dsn, $user, $pass, $options);
    $conn = $pdo;
} catch (\PDOException $e) {
    $mysqli = new mysqli($host, $user, $pass, $db, $port);
    if ($mysqli->connect_error) {
        if (!headers_sent()) {
            header("Content-Type: application/json; charset=UTF-8");
        }
        http_response_code(500);
        echo json_encode([
            "status"  => "error",
            "message" => "Database connection failed: " . $mysqli->connect_error
        ]);
        exit();
    }
    
    $mysqli->set_charset("utf8mb4");
    $pdo = null;
    $conn = $mysqli;
}
?>