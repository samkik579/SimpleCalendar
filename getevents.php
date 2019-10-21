<?php
	require 'database.php';
	session_start();
	header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	//Variables can be accessed as such:
	$username = $_SESSION['username'];
    $title = $json_obj['event_title'];
    $month = $json_obj['event_month'];
    $day = $json_obj['event_day'];
	$year = $json_obj['event_year'];
	$hour = $json_obj['event_hour'];
	$minute = $json_obj['event_minute'];
	$note = $json_obj['event_note'];
	// echo ($username);
	//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

	$user = $SESSION_['username'];

	$stmt = $mysqli->prepare("SELECT username, title, note, month, day, year, hour, minute FROM events ORDER BY year, month, day, hour, minute WHERE username='$user" );
	

	$stmt->bind_param('s', $username);

	// //$user = $_POST['username'];
	$stmt->execute();
	// // Bind the results
	//$stmt->bind_result($cnt, $user_id, $pwd_hash);

	$events_array = array();
	$count = 0; 

	while($stmt->fetch()){
		$events_array[$count] = array("title" => $title, "note" => $note, "month" => $month, "day" => $day, 
		"year" => $year, "hour" => $hour, "minute" => $minute);
		$count = $count +1;
	}

	
	$stmt->close();

	$eventgot = json_encode($events_array);

	echo $eventgot;
?>