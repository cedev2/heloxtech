<?php
require_once 'db.php';
$email = 'cedrickrwa@gmail.com';
$password = 'Heloxcoding52!';

$stmt = $pdo->prepare("SELECT password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
    $isValid = password_verify($password, $user['password']);
    echo "Password check for $email: " . ($isValid ? "VALID" : "INVALID") . "\n";
    echo "Hash in DB: " . $user['password'] . "\n";
} else {
    echo "User not found.\n";
}
?>
