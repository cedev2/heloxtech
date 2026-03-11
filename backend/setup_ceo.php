<?php
require_once 'db.php';

$email = 'cedrickrwa@gmail.com';
$password = 'Heloxcoding52!';
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Update existing CEO
        $stmt = $pdo->prepare("UPDATE users SET password = ?, role = 'CEO' WHERE email = ?");
        $stmt->execute([$hashedPassword, $email]);
        echo json_encode(['success' => true, 'message' => 'CEO password updated successfully!']);
    } else {
        // Insert new CEO
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'CEO')");
        $stmt->execute(['NIBISHAKA Cedrick', $email, $hashedPassword]);
        echo json_encode(['success' => true, 'message' => 'CEO account created successfully!']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
