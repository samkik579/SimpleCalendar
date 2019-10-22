<?php

require 'database.php';
session_start();

$islogged = $_SESSION['loggedin'];

if($islogged == "true"){
    echo json_encode(array(
        "success" => true));
}

else{
    echo json_encode(array("success" => false,
	));
}


?>