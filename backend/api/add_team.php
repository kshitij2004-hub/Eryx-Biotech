<?php
// 🌐 Network Gateway & Dynamic CORS Headers Configuration
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $allowed_origin = $_SERVER['HTTP_ORIGIN'];
    
    // Safety verification: Ensures the origin is either localhost (any port) or your secure platform domain
    if (preg_match('~^https?://localhost(:\d+)?$~', $allowed_origin) || strpos($allowed_origin, 'eryx-biotech') !== false) {
        header("Access-Control-Allow-Origin: " . $allowed_origin);
    }
} else {
    // Basic fallback if no explicit origin header is passed
    header("Access-Control-Allow-Origin: *");
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS requests smoothly
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 🗄️ Database Connection Coordinates
$host = "localhost";
$db_name = "eryx_biotech_platform"; 
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Only process POST requests
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        // 1. Intercept raw JSON stream from React fetch/axios
        $rawInput = file_get_contents("php://input");
        $payload = json_decode($rawInput, true) ?? [];

        // 2. Fallback to standard $_POST if form data is sent instead of JSON data
        $name = $payload['name'] ?? $_POST['name'] ?? null;
        $role = $payload['role'] ?? $payload['roleDesignation'] ?? $_POST['role'] ?? null;
        $department = $payload['department'] ?? $_POST['department'] ?? null;
        $bio = $payload['bio'] ?? $payload['biography'] ?? $_POST['bio'] ?? '';
        $image_url = $payload['image_url'] ?? $payload['avatar'] ?? $_POST['image_url'] ?? 'default-avatar.png';

        // 3. Handle physical file upload if your uploader sends a real file binary
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $target_dir = "../../public/uploads/team/"; // Adjust path to match your project architecture
            if (!is_dir($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            $file_ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $file_name = uniqid() . '.' . $file_ext;
            
            if (move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $file_name)) {
                $image_url = "/uploads/team/" . $file_name;
            }
        }

        // Enforce data validation requirements
        if (!$name || !$role || !$department) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Validation fault: Name, Role, and Department properties are mandatory."
            ]);
            exit();
        }

        // 4. SQL Write Execution
        $query = "INSERT INTO team_members (name, role, department, image_url, bio) 
                  VALUES (:name, :role, :department, :image_url, :bio)";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':role', $role);
        $stmt->bindParam(':department', $department);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':bio', $bio);
        
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Profile successfully provisioned and committed to storage.",
                "inserted_id" => $conn->lastInsertId()
            ]);
        } else {
            throw new PDOException("Data engine failed to write the profile matrix row.");
        }
        exit();
    }

    // If someone tries GET on this file
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed on add_team execution path."]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database level fault on add_team script: " . $e->getMessage()
    ]);
}
?>