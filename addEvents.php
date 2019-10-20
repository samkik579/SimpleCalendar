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

<?php 

require 'database.php';

$stmt = $mysqli->prepare("SELECT COUNT(*), id, password FROM users WHERE username=?");
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['username'];
$password = $json_obj['password'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

//$mysqli->query(/* perform transfer */);
// Use a prepared statement

// Bind the parameter
$stmt->bind_param('s', $username);

//$user = $_POST['username'];
$stmt->execute();
// Bind the results
$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();
   

//$pwd_guess = $_POST['pass_word'];
// Compare the submitted password to the actual password hash
//echo "$pwd_guess $pwd_hash";
//echo password_verify($pwd_guess, $pwd_hash);

if($cnt == 1 && password_verify($username, $password) ){
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

	echo json_encode(array(
		"success" => true
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>