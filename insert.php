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
    $username = validate_input($_POST['username']);
    $email = validate_input($_POST['email']);
    $password = validate_input($_POST['password']);

    // Server-side validation
    if (!preg_match("/^[A-Za-z0-9]{3,20}$/", $username)) {
        die("Invalid username format");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    if (strlen($password) < 8) {
        die("Password should be at least 8 characters long");
    }

    // Hash the password for security
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password_hash);

    // Execute and check if the insertion was successful
    if ($stmt->execute()) {
        // Redirect to the same page with a hash to trigger the modal
        header("Location: dashboard.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
