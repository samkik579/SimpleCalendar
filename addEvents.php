<!DOCTYPE html>
<html lang="en">

<?php 
require 'database.php';
session_start(); 
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
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$stmt = $mysqli->prepare("insert into events (username, title, note, time, start_date, end_date) values (?, ?, ?, ?, ?, ?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('ssssss', $_SESSION['username'], $title, $note, $time, $startdate, $enddate);
$stmt->execute(); 
$stmt->close();
?>