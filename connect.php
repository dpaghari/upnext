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
		"username" => $row["username"],
		"password" => $row["password"],
		"profile_url" => $row["profile_url"],
		"profile_picture" => $row["profile_picture"]
	);

	$users[] = $userEntry;

}
echo json_encode($users);

// fetchUsers();
// $action = isset($_GET["action"]) ? $_GET["action"] : null;
// switch ($action) {
// 	case 'users':
// 		# code...
// 		fetchUsers();
// 		break;
//
// 	case 'create_event':
// 		create_new_event();
//
// 	default:
// 		# code...
// 		break;
// }
//


function fetchUsers() {
	$stmt = $db->prepare("SELECT * FROM un_users");
	$stmt->execute();
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

		$userEntry = array(
			"id" => $row["id"],
			"username" => $row["username"],
			"password" => $row["password"],
			"profile_url" => $row["profile_url"],
			"profile_picture" => $row["profile_picture"]
		);

		$users[] = $userEntry;

	}
	echo json_encode($users);
}

function create_new_event() {
	$stmt = $db->prepare();
}


 ?>
