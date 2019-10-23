

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
$id = $json_obj['id'];

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$stmt = $mysqli->prepare("delete from events where username=? AND id=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('ss', $_SESSION['username'], $id);
$stmt->execute(); 

echo json_encode(array(
    "username" => $_SESSION['username'],
    "id" => $id

));

$stmt->close();
?>