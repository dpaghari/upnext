<?php
try{
	$db = new PDO( 'mysql:host=localhost:8889;
                  dbname=upnext;
                  charset=utf8',
                 'root',
                 'root' );
}
catch(Exception $e){
	echo "An error has occurred";
}
$users = array();
$stmt = $db->prepare("SELECT * FROM un_users");
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

		$userEntry = array(
			"id" => $row["id"],
			"name" => $row["name"],
			"password" => $row["password"],
			"profile_url" => $row["profile_url"],
			"profile_picture" => $row["profile_picture"]
		);

		$users[] = $userEntry;

}

echo json_encode($users);

 ?>
