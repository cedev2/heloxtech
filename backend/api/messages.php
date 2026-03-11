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
        $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['full_name'], $data['email'], $data['message'])) {
            $stmt = $pdo->prepare("INSERT INTO contact_messages (full_name, email, message) VALUES (?, ?, ?)");
            $stmt->execute([$data['full_name'], $data['email'], $data['message']]);
            echo json_encode(['success' => true]);
        }
        break;
}
?>
