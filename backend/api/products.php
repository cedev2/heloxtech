<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once '../db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;
        
    case 'POST':
        $name = $_POST['name'] ?? null;
        $description = $_POST['description'] ?? '';
        $badge = $_POST['badge'] ?? '';
        $imagePath = null;

        if ($name) {
            // Handle File Upload
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = '../../uploads/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
                
                $fileTmpPath = $_FILES['image']['tmp_name'];
                $fileName = time() . '_' . $_FILES['image']['name'];
                $destPath = $uploadDir . $fileName;

                if (move_uploaded_file($fileTmpPath, $destPath)) {
                    $imagePath = '/uploads/' . $fileName;
                }
            }

            $stmt = $pdo->prepare("INSERT INTO products (name, description, badge, image) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $description, $badge, $imagePath]);
            $id = $pdo->lastInsertId();
            logAction($pdo, 1, 'Add Product', "Added product: $name with image");
            echo json_encode(['success' => true, 'id' => $id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Product name is required']);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            logAction($pdo, 1, 'Delete Product', "Deleted product ID: " . $_GET['id']);
            echo json_encode(['success' => true]);
        }
        break;
}
?>
