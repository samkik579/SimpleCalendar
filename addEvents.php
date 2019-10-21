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
$event_title = $json_obj['event_title'];
$event_startdate = $json_obj['event_startdate'];
$event_enddate = $json_obj['event_enddate'];
$event_time = $json_obj['event_time'];
$event_note = $json_obj['event_note'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$stmt = $mysqli->prepare("insert into events (username, title, note, time, start_date, end_date) values (?, ?)");

if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('ssssss', $_SESSION['username'], $event_title, $event_startdate, $event_enddate, $event_time, $event_note);

$stmt->execute(); 

?>