<?php
include 'connect.php'; // Include the database connection script

function validate_input($data) {
    $data = trim($data); // Remove whitespace from both sides
    $data = stripslashes($data); // Remove backslashes
    $data = htmlspecialchars($data); // Convert special characters to HTML entities
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and validate form data
    $username = validate_input($_POST['username-login']);
    $password = validate_input($_POST['password-login']);

    // Server-side validation
    if (empty($username) || empty($password)) {
        header("Location: signUp.html?error=empty_fields");
        exit();
    }

    // Check if username exists
    $stmt = $conn->prepare("SELECT ID, Password FROM users WHERE Username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();
        
        if (password_verify($password, $hashed_password)) {
            // Start a session and store user information
            session_start();
            $_SESSION['ID'] = $id;
            $_SESSION['username'] = $username;

            // Password is correct, redirect to dashboard
            header("Location: dashboard.html");
            exit();
        } else {
            // Invalid password
            header("Location: signUp.html?error=invalid_password");
            exit();
        }
    } else {
        // Username does not exist
        header("Location: signUp.html?error=username_not_found");
        exit();
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
