<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once '../db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT id, name, email, role, created_at FROM users WHERE role != 'CEO' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name'], $data['email'], $data['password'], $data['role'])) {
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['name'], $data['email'], $hashedPassword, $data['role']]);
            
            logAction($pdo, 1, 'Create User', "Created account for: " . $data['name'] . " as " . $data['role']);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role != 'CEO'");
            $stmt->execute([$_GET['id']]);
            logAction($pdo, 1, 'Delete User', "Deleted user account ID: " . $_GET['id']);
            echo json_encode(['success' => true]);
        }
        break;
}
?>
