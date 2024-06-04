<?php
include 'connect.php'; // Include the database connection script

function validate_input($data) {
    $data = trim($data); // Remove whitespace from both sides
    $data = stripslashes($data); // Remove backslashes
    $data = htmlspecialchars($data); // Convert special characters to HTML entities
    return $data;
}

function generateRecoveryKey($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and validate form data
    $username = validate_input($_POST['username']);
    $email = validate_input($_POST['email']);
    $password = validate_input($_POST['password']);

    // Server-side validation
    if (!preg_match("/^[A-Za-z0-9]{3,20}$/", $username)) {
        header("Location: signUp.html?error=username_format");
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: signUp.html?error=email_format");
        exit();
    }

    if (strlen($password) < 8) {
        header("Location: signUp.html?error=password_length");
        exit();
    }

    // Hash the password for security
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $recovery_key = generateRecoveryKey();

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        header("Location: signUp.html?error=username_exists");
        exit();
    }
    $stmt->close();

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, recovery_key) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $email, $password_hash, $recovery_key);

    // Execute and check if the insertion was successful
    if ($stmt->execute()) {
        // Redirect to the dashboard
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
