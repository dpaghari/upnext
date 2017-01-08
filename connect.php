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

$action = isset($_GET["action"]) ? $_GET["action"] : null;
switch ($action) {
	case 'users':
		# code...
		fetchUsers($db);
		break;

	case 'events':
		fetchEvents($db);
		break;

	case 'create_event' :
		create_new_event($db);
		break;
	default:
		# code...
		break;
}



function fetchUsers($db) {
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
}


function fetchEvents($db) {
	$events = array();
	$stmt = $db->prepare("SELECT * from un_events");
	$stmt->execute();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		# code...
		$eventEntry = array(
			"id" => $row["id"],
			"imgURL" => $row["img_url"],
			"name" => $row["name"],
			"host" => $row["host"],
			"status" => $row["status"],
			"date" => $row["date"],
			"location" => $row["location"],
			"details" => $row["details"],
			"friends" => $row["friends"],
			"comments" => $row["comments"]
		);
		$events[] = $eventEntry;
	}

	echo json_encode($events);
}

function create_new_event($db) {
	echo $_GET;
	$name = isset($_GET["name"]) ? $_GET["name"] : "";
	$img_url = isset($_GET["imgURL"]) ? $_GET["imgURL"] : "";
	$location = isset($_GET["location"]) ? $_GET["location"] : "";
	$details = isset($_GET["details"]) ? $_GET["details"] : "";

	// $newEntry = array(
	// 	"name" => $name,
	//   "img_url" => $img_url,
	//   "status" => 0,
	// 	"location" => $location,
	// 	"details" => $details
	// );


	$stmt = $db->prepare("INSERT INTO
		un_events(name, img_url, status, location, details)
  	VALUES(:name, :img_url, :status, :location, :details)");
	$stmt->execute(array(
		"name" => $name,
		"img_url" => $img_url,
		"status" => 0,
		"location" => $location,
		"details" => $details
	));
}


 ?>
