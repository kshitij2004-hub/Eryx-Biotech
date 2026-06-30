<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Instant mitigation layer for browser preflight validation queries
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Pulls in your $pdo connection variable
require_once '../config/db.php';

// Since we are streaming live binary assets via FormData, read data directly out of $_POST arrays
if (isset($_POST['name']) && isset($_POST['description'])) {
    
    // ⚠️ PDO prepared statements eliminate the need for mysqli_real_escape_string
    $name        = $_POST['name'];
    $formula     = $_POST['formula'] ?? '';
    $category    = $_POST['category'] ?? '';
    $type        = $_POST['type'] ?? '';        // ✅ FIXED: Now included in database write below
    $description = $_POST['description'];
    $is_featured = ($_POST['is_featured'] === 'true' || $_POST['is_featured'] == 1) ? 1 : 0;
    
    $image_path  = ''; // Fallback default state parameter allocation

    // Process live file engine streaming allocations
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName    = $_FILES['image']['name'];
        
        // Sanitize naming criteria signatures
        $cleanFileName = time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "_", $fileName);
        
        // Define system paths target maps relative to server layout architectures
        $uploadFolder = '../../public/uploads/';
        
        if (!is_dir($uploadFolder)) {
            mkdir($uploadFolder, 0755, true);
        }
        
        $targetFilePath = $uploadFolder . $cleanFileName;
        
        if (move_uploaded_file($fileTmpPath, $targetFilePath)) {
            // Path saved inside database tracking points to public relative access targets
            $image_path = '/uploads/' . $cleanFileName;
        }
    }

    try {
        // 🛠️ PDO Parameterized Insert Sequence Routines
        // Added 'type' column and parameters to match your React UI architecture
        $query = "INSERT INTO products (name, formula, description, price, category, type, image_path, is_featured) 
                  VALUES (:name, :formula, :description, :price, :category, :type, :image_path, :is_featured)";
        
        $stmt = $pdo->prepare($query);
        
        $stmt->execute([
            ':name'        => $name,
            ':formula'     => $formula,
            ':description' => $description,
            ':price'       => null, // Set to NULL since we opened up the table structure earlier
            ':category'    => $category,
            ':type'        => $type,
            ':image_path'  => $image_path,
            ':is_featured' => $is_featured
        ]);

        echo json_encode(["status" => "success", "message" => "Database node synchronized successfully."]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database insertion execution fault: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid structural payload configuration references."]);
}
?>