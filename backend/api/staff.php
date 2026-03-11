<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once '../db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM staff ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;
        
    case 'POST':
        $name = $_POST['name'] ?? null;
        $role = $_POST['role'] ?? null;
        $phone = $_POST['phone'] ?? '';
        $bio = $_POST['bio'] ?? '';
        $imagePath = '/staff-default.jpg';

        if ($name && $role) {
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

            $stmt = $pdo->prepare("INSERT INTO staff (name, role, phone, image, bio) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $role, $phone, $imagePath, $bio]);
            $id = $pdo->lastInsertId();
            logAction($pdo, 1, 'Add Staff', "Added staff member: $name with image");
            echo json_encode(['success' => true, 'id' => $id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM staff WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            logAction($pdo, 1, 'Delete Staff', "Deleted staff ID: " . $_GET['id']);
            echo json_encode(['success' => true]);
        }
        break;
}
?>
