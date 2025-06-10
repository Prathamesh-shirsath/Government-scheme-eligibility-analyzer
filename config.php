<?php
// config.php
// This file contains the database connection configuration.

// Database credentials
define('DB_SERVER', 'localhost'); // Your database server, usually 'localhost'
define('DB_USERNAME', 'root');     // Your database username (e.g., 'root')
define('DB_PASSWORD', '');         // Your database password (empty by default for XAMPP/WAMP)
define('DB_NAME', 'scheme_finder_db'); // The name of the database created earlier

// Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    // If connection fails, terminate and display error
    die("Connection failed: " . $conn->connect_error);
}

// Set character set to UTF-8 for proper handling of multilingual data
$conn->set_charset("utf8mb4");

?>