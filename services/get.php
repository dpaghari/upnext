<?php

require_once("config.php");
require_once("ApiManager.php");

$action = isset($_GET["action"]) ? $_GET["action"] : null;
$data = array();
switch ($action) {

	// Event actions
	case 'events':
		$apiManager = new ApiManager();
		$data = $apiManager->fetchEvents();
		break;

	case 'create_event' :
		$_POST = json_decode(file_get_contents('php://input'), true);
		$name = isset($_POST["name"]) ? $_POST["name"] : null;
		$img_url = isset($_POST["imgURL"]) ? $_POST["imgURL"] : null;
		$host = isset($_POST["host"]) ? $_POST["host"] : null;
		$event_date = isset($_POST["event_date"]) ? $_POST["event_date"] : null;
		$location = isset($_POST["location"]) ? $_POST["location"] : null;
		$details = isset($_POST["details"]) ? $_POST["details"] : null;
		$event_type = isset($_POST["event_type"]) ? $_POST["event_type"] : 0;

		$apiManager = new ApiManager();
		$data = $apiManager->create_new_event($name, $img_url, $host, $event_date, $location, $details, $event_type);
		break;

	case 'create_new_comment' :
		$_POST = json_decode(file_get_contents('php://input'), true);
		$event_id = isset($_POST["event_id"]) ? $_POST["event_id"] : null;
		$user_id = isset($_POST["user_id"]) ? $_POST["user_id"] : null;
		$comment = isset($_POST["comment"]) ? $_POST["comment"] : null;

		$apiManager = new ApiManager();
		$data = $apiManager->create_new_comment($event_id, $user_id, $comment);
		break;

	case 'fetch_event' :
		$eventID = isset($_GET["eventID"]) ? $_GET["eventID"] : null;
		$apiManager = new ApiManager();
		$data = $apiManager->fetchEventInfo($eventID);
		break;

	case 'fetch_event_comments' :
		$eventID = isset($_GET["eventID"]) ? $_GET["eventID"] : null;
		$apiManager = new ApiManager();
		$data = $apiManager->fetchEventComments($eventID);
		break;

	// User actions
	case 'users':
		$apiManager = new ApiManager();
		$data = $apiManager->fetchUsers();
		break;

	case 'create_user' :
		$_POST = json_decode(file_get_contents('php://input'), true);

		$name = isset($_POST["user_name"]) ? $_POST["user_name"] : null;
		$pw = isset($_POST["user_pw"]) ? $_POST["user_pw"] : null;
		$profile_picture = isset($_POST["user_profile_picture"]) ? $_POST["user_profile_picture"] : null;
		// Not using dob currently
		$dob = isset($_POST["user_dob"]) ? $_POST["user_dob"] : null;

		$apiManager = new ApiManager();
		$data = $apiManager->create_new_user($name, $pw, $profile_picture);
		break;

	case 'get_user' :
		$userID = isset($_GET["userID"]) ? $_GET["userID"] : null;
		$apiManager = new ApiManager();
		$data = $apiManager->get_user_details($userID);
		break;

	case 'get_friends_info' :
		$userIDs = isset($_GET["friendIDs"]) ? json_decode($_GET["friendIDs"]) : null;
		$apiManager = new ApiManager();
		$data = $apiManager->get_users_info($userIDs);
		break;

	case 'delete_user' :
		$apiManager = new ApiManager();
		$data = $apiManager->delete_user();
		break;

	default :
	break;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($data, JSON_NUMERIC_CHECK);

 ?>
