

<?php
ini_set("session.cookie_httponly", 1);
require 'database.php';

session_start(); 




header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['newusername'];
$password = $json_obj['newpassword'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$passhashed = password_hash((string) $password, PASSWORD_BCRYPT);

$stmt = $mysqli->prepare("insert into user (username, password) values (?, ?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('ss', $username, $passhashed);

$_SESSION['username'] = $username;

$stmt->execute();

?>

