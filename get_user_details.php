<?php
session_start();
include 'connect.php'; // Include the database connection script

if (!isset($_SESSION['ID'])) {
    // User is not logged in
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

$userId = $_SESSION['ID'];

// Fetch user details from the database
$stmt = $conn->prepare("SELECT Username, Email, RecoveryKey FROM users WHERE ID = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($username, $email, $recoveryKey);
$stmt->fetch();

if ($username) {
    echo json_encode([
        'status' => 'success',
        'user' => [
            'username' => $username,
            'email' => $email,
            'recovery_key' => $recoveryKey
        ]
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
