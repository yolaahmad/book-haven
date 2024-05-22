<?php
session_start();
if (!isset($_SESSION['userid'])) {
    header("Location: index.html"); // Redirect to login page if not logged in
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome to your Dashboard, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
    <p><a href="logout.php">Logout</a></p>
</body>
</html>
