

<?php 

require 'database.php';
session_start(); 

$mysqli->query(/* perform transfer */);


header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such:
$title = $json_obj['title'];
$startdate = $json_obj['start_date'];
$enddate = $json_obj['end_date'];
$time = $json_obj['time'];
$note = $json_obj['note'];
$work = $json_obj['work'];
$shared_user = $json_obj['shared_user'];
$home = $json_obj['home'];
$school = $json_obj['school'];
$fun = $json_obj['fun'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$stmt = $mysqli->prepare("insert into events (username, title, note, time, start_date, end_date, isWork, isHome, isSchool, isFun) values (?, ?, ?, ?, ?, ?,?, ?, ?, ?)");
if(!$stmt){
	echo json_encode(array("success => false"));
	exit;
}

// insert into logged in user 
$stmt->bind_param('ssssssiiii', $_SESSION['username'], $title, $note, $time, $startdate, $enddate, $work, $home, $school, $fun);
$stmt->execute(); 
$stmt->close();

// insert into shared user 

$sharedinsert = $mysqli->prepare("insert into events (username, title, note, time, start_date, end_date, isWork, isHome, isSchool, isFun) values (?, ?, ?, ?, ?, ?,?, ?, ?, ?)");
if(!$sharedinsert){
	echo json_encode(array("success => false"));
	exit;
}
$sharedinsert->bind_param('ssssssiiii', $shared_user, $title, $note, $time, $startdate, $enddate, $work, $home, $school, $fun);
$sharedinsert->execute(); 
$sharedinsert->close();

echo json_encode(array("success => false"));
	exit;

?>
