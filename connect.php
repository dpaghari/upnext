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
	case 'get_user' :
		get_user_details($db);
		break;
	case 'get_friends_info' :
		get_friends_info($db);



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
	$stmt = $db->prepare("SELECT * FROM un_events");
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
	$name = isset($_GET["name"]) ? $_GET["name"] : "";
	$img_url = isset($_GET["imgURL"]) ? $_GET["imgURL"] : "";
	$location = isset($_GET["location"]) ? $_GET["location"] : "";
	$details = isset($_GET["details"]) ? $_GET["details"] : "";

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
// Get user details based on given id
function get_user_details($db) {
	$userID = isset($_GET["userID"]) ? $_GET["userID"] : null;
	if($userID != null){
		$stmt = $db->prepare("SELECT * FROM un_users WHERE id = :user_id");
		$stmt->execute(array(
			"user_id" => $userID
		));
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$userDetails = array(
				"id" => $row["id"],
				"username" => $row["username"],
				"profile_url" => $row["profile_url"],
				"profile_picture" => $row["profile_picture"],
				"bio" => $row["bio"],
				"rank" => $row["rank"]
			);
		}
		echo json_encode($userDetails);
	}
}

function get_friends_info($db) {
	$userID = isset($_GET["friendIDs"]) ? json_decode($_GET["friendIDs"]) : null;
	
	$friendsInfo = array();
	if($userID != null){
		$enum = implode(",", $userID);

		$stmt = $db->prepare("SELECT * FROM un_users WHERE id IN ($enum)");

		$stmt->execute();
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$userDetails = array(
				"id" => $row["id"],
				"username" => $row["username"],
				"profile_url" => $row["profile_url"],
				"profile_picture" => $row["profile_picture"],
				"bio" => $row["bio"],
				"rank" => $row["rank"]
			);

			$friendsInfo[] = $userDetails;

		}
		echo json_encode($friendsInfo);
	}
}


 ?>
