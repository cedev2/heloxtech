<?php
require_once 'db.php';
$stmt = $pdo->query("SELECT id, name, email, role FROM users");
$users = $stmt->fetchAll();
echo "Found " . count($users) . " users:\n";
foreach ($users as $u) {
    echo "- {$u['name']} ({$u['email']}) as {$u['role']}\n";
}
?>
