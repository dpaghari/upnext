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
		break;
	case 'fetch_event' :
		fetchEventInfo($db);
		break;
	case 'fetch_event_comments' :
		fetchEventComments($db);
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
			"user_id" => $row["user_id"],
			"username" => $row["username"],
			"password" => $row["password"],
			"profile_url" => $row["profile_url"],
			"profile_picture" => $row["profile_picture"]
		);

		$users[] = $userEntry;

	}
	echo json_encode($users);
}

function fetchEventInfo($db) {
	$eventID = isset($_GET["eventID"]) ? $_GET["eventID"] : null;

	// $eventInfo = array();
	if($eventID != null){
		$stmt = $db->prepare("SELECT * from un_events WHERE event_id = $eventID");
		$stmt->execute();

		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$event = array(
				"event_id" => $row["event_id"],
				"imgURL" => $row["img_url"],
				"name" => $row["name"],
				"host" => $row["host"],
				"status" => $row["status"],
				"event_date" => $row["event_date"],
				"location" => $row["location"],
				"details" => $row["details"],
				"friends" => $row["friends"],
				"comments" => $row["comments"]
			);

		}
		echo json_encode($event);
	}
}

function fetchEventComments($db) {
	$eventID = isset($_GET["eventID"]) ? $_GET["eventID"] : null;

	$comments = array();
	if($eventID != null){
		$stmt = $db->prepare(
			"SELECT un_events.event_id, un_comments.event_id, un_comments.comment, un_comments.comment_id, un_users.*
			 FROM un_comments
			 INNER JOIN un_events on un_comments.event_id = un_events.user_id
			 INNER JOIN un_users on un_comments.user_id = un_users.user_id
			 WHERE un_comments.event_id = $eventID
			"
		);
		$stmt->execute();

		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$comments[] = $row;

		}
		echo json_encode($comments);
	}
}


function fetchEvents($db) {
	$events = array();
	$stmt = $db->prepare("SELECT * FROM un_events");
	$stmt->execute();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		# code...
		$eventEntry = array(
			"event_id" => $row["event_id"],
			"imgURL" => $row["img_url"],
			"name" => $row["name"],
			"host" => $row["host"],
			"status" => $row["status"],
			"event_date" => $row["event_date"],
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

	$_POST = json_decode(file_get_contents('php://input'), true);

	$name = isset($_POST["name"]) ? $_POST["name"] : null;
	$img_url = isset($_POST["imgURL"]) ? $_POST["imgURL"] : null;
	$location = isset($_POST["location"]) ? $_POST["location"] : null;
	$details = isset($_POST["details"]) ? $_POST["details"] : null;
	$host = isset($_POST["host"]) ? $_POST["host"] : null;
	$event_date = isset($_POST["event_date"]) ? $_POST["event_date"] : null;

	echo json_encode($event_date);

	$stmt = $db->prepare("INSERT INTO
		un_events(name, img_url, status, location, details, host, event_date)
  	VALUES(:name, :img_url, :status, :location, :details, :host, :event_date)");
	$stmt->execute(array(
		"name" => $name,
		"img_url" => $img_url,
		"host" => $host,
		"status" => 0,
		"event_date" => $event_date,
		"location" => $location,
		"details" => $details
	));
	$stmt = $db->prepare("SELECT LAST_INSERT_ID()");
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	echo json_encode($row["LAST_INSERT_ID()"]);
}
// Get user details based on given id
function get_user_details($db) {
	$userID = isset($_GET["userID"]) ? $_GET["userID"] : null;
	if($userID != null){
		$stmt = $db->prepare("SELECT * FROM un_users WHERE user_id = :user_id");
		$stmt->execute(array(
			"user_id" => $userID
		));
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$userDetails = array(
				"user_id" => $row["user_id"],
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
	$userIDs = isset($_GET["friendIDs"]) ? json_decode($_GET["friendIDs"]) : null;

	$friendsInfo = array();
	if($userIDs != null){
		$friendIDs = implode(",", $userIDs);

		$stmt = $db->prepare("SELECT * FROM un_users WHERE user_id IN ($friendIDs)");

		$stmt->execute();
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$userDetails = array(
				"user_id" => $row["user_id"],
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
