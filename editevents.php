

<?php 
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();

$destination_username = $_POST['dest'];
$amount = $_POST['amount'];

$mysqli->query(/* perform transfer */);


header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such:
$id = $json_obj['editid'];
$newtitle = $json_obj['newtitle'];
$newstartdate = $json_obj['newstart_date'];
$newenddate = $json_obj['newend_date'];
$newtime = $json_obj['newtime'];
$newnote = $json_obj['newnote'];

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$stmt = $mysqli->prepare("UPDATE events SET username=?, title=?, note=?, start_date=?, end_date=?, time=? WHERE id=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('ssssssi', $_SESSION['username'], $newtitle, $newnote, $newstartdate, $newenddate, $newtime, $id);
$stmt->execute(); 



$stmt->close();
?>

