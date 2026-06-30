<?php
// backend/api/get_adr_reports.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Force PHP to show deep runtime errors instead of a silent white screen
error_reporting(E_ALL);
ini_set('display_errors', 1);

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "eryx_biotech_platform";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database link failure: " . $conn->connect_error]);
    exit();
}

// Let's run a flexible select query to bypass missing timestamp column crashes
$query = "SELECT * FROM adr_reports ORDER BY id DESC";
$result = $conn->query($query);

if ($result) {
    $reports = [];
    while ($row = $result->fetch_assoc()) {
        // Fallback safety if created_at column wasn't provisioned yet
        if (!isset($row['created_at'])) {
            $row['created_at'] = "System Token Sync Logged";
        }
        $reports[] = $row;
    }
    echo json_encode([
        "status" => "success",
        "data" => $reports
    ]);
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "SQL Execution Crash: " . $conn->error
    ]);
}

$conn->close();
?>