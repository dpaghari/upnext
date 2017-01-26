<?php

require("./config.php");

try {
	$db = new PDO(DB_CONN_STR, DB_USER, DB_PASSWORD);
}
catch(Exception $e){
	echo "An error has occurred";
}

?>
