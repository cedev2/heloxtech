<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../db.php';

$stmt = $pdo->query("SELECT l.*, u.name as user_name FROM systems_logs l LEFT JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC");
echo json_encode($stmt->fetchAll());
?>
