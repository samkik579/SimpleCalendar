<?php
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();

$islogged = $_SESSION['loggedin'];
$username = $_SESSION['username'];

if($_SESSION['username'] != null){
    echo json_encode(array(
        "success" => true
    ));
}

else{
    echo json_encode(array("success" => false,
	));
}


?>