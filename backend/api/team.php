<?php
// backend/api/team.php - Output Team Member Profile Data

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

function normalizeImageUrl(?string $url): string {
    if (empty($url)) return '';
    if (strpos($url, 'http') === 0) return $url;
    return '/' . ltrim($url, '/');
}

try {
    $team = [];

    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->query("SELECT id, name, role, department, image_url, bio, created_at FROM team_members ORDER BY id DESC");
        $team = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($team as &$row) {
            $row['image_url'] = normalizeImageUrl($row['image_url'] ?? null);
        }
        unset($row);
    } elseif (isset($conn)) {
        $result = $conn->query("SELECT id, name, role, department, image_url, bio, created_at FROM team_members ORDER BY id DESC");
        if (!$result) throw new Exception("Query failed: " . $conn->error);

        while ($row = $result->fetch_assoc()) {
            $row['image_url'] = normalizeImageUrl($row['image_url'] ?? null);
            $team[] = $row;
        }
        $result->free();
        $conn->close();
    } else {
        throw new Exception("No valid database connection available.");
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data"   => $team
    ]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
?>