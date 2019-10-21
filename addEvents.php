<!-- for events: 
    need: username/id, time, day, month, year
        - store this in database

    how to display an events on calender
    
    have them fill out a form
    the difficult part will be associating that with a day on the grid
    but we can ask them for a month and a year: 

        1. run through the for loop of months to get the number of the month
        2. use the function Month(year,month) to get the month object
        3. get the offset of that month
            - with UpdateCalendar() ? 
            - or just use the functions we used to get the offset prev
        3. calculate what the day would be on our grid 


    we should probably create an event object 
    I don't know how to associate the event with the grid for a month

    -->
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