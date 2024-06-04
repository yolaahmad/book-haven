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
    $recovery_key = validate_input($_POST['recovery_key']);
    $new_password = validate_input($_POST['new_password']);

    // Check if the recovery key exists
    $stmt = $conn->prepare("SELECT ID FROM users WHERE recovery_key = ?");
    $stmt->bind_param("s", $recovery_key);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 0) {
        // Invalid recovery key
        $stmt->close();
        header("Location: signUp.html?error=invalid_recovery_key");
        exit();
    }

        // Hash the new password
        $new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);
    
        // Update the password in the database
        $stmt->close();
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE recovery_key = ?");
        $stmt->bind_param("ss", $new_password_hash, $recovery_key);
    
        if ($stmt->execute()) {
            // Password updated successfully
            header("Location: signUp.html?success=password_updated");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }
    
        // Close the statement and connection
        $stmt->close();
        $conn->close();
    }
    ?>
