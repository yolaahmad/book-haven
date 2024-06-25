<?php
session_start();

if (!isset($_SESSION['ID'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

require 'connect.php';

$user_id = $_SESSION['ID'];
$book_data = json_decode(file_get_contents('php://input'), true);

$title = $book_data['title'];
$author = $book_data['author'];
$cover = $book_data['cover'];
$description = $book_data['description'];
$key = $book_data['key'];

$sql = "INSERT INTO user_library (ID, book_key, title, author, cover, description) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('isssss', $user_id, $key, $title, $author, $cover, $description);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add book to library']);
}

$stmt->close();
$conn->close();
?>
