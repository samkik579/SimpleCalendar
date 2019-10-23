<?php

require 'database.php';
session_start();

$islogged = $_SESSION['loggedin'];
$username = $_SESSION['username'];

if(isset($_SESSION['username'])){
    echo json_encode(array(
        "success" => true, "username" => $username));
}

else{
    echo json_encode(array("success" => false,
	));
}


?>