<?php
	require 'database.php';
	session_start();


	header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	$username = $_SESSION['username'];

	if(isset($_SESSION)){
		//Variables can be accessed as such:
	// $title = $json_obj['title'];
	// $note = $json_obj['note'];
	// $month = $json_obj['month'];
	// $days = $json_obj['days'];
	// $year = $json_obj['year'];
	// $time = $json_obj['time'];
    
	
	// echo ($username);
	//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

		$stmt = $mysqli->prepare("SELECT id, username, title, note, MONTH(start_date), DAY(start_date), YEAR(start_date), time, isWork, isHome, isSchool, isFun from events where username =? order by start_date");
		
		

		$stmt->bind_param('s', $username);

		// //$user = $_POST['username'];
		$stmt->execute();
		// // Bind the results
		//$stmt->bind_result($cnt, $user_id, $pwd_hash);
		$result = $stmt->get_result();

		$events_array = array();

		while($placeholder = $result->fetch_assoc()){

			$events_array[] = array("id" => htmlentities($placeholder['id']), "title" => htmlentities($placeholder['title']), "note" => htmlentities($placeholder['note']), 
			"month" => htmlentities($placeholder['MONTH(start_date)']), "day" => htmlentities($placeholder['DAY(start_date)']),
			"year" => htmlentities($placeholder['YEAR(start_date)']), "time" => htmlentities($placeholder['time']), "worktag" => htmlentities($placeholder['isWork']), 
			"hometag" => htmlentities($placeholder['isHome']), "schooltag" => htmlentities($placeholder['isSchool']), 
			"funtag" => htmlentities($placeholder['isFun']), "success" => true);
		}

		
		$stmt->close();

		$eventgot = json_encode($events_array);

		echo $eventgot;
	}
		
	
	
	else{
		$empty = array();
		echo json_encode(array("success" => false));
	}

	//array ("name" => htmlentities($placeholder[selecting from table]))
?>