<?php
require_once("config.php");
// require_once("db.php");
/**
 *
 */
class ApiManager
{

  private $db;
  private $events_table;
  private $users_table;
  private $comments_table;

  public function __construct () {
    try {
    	$this->db = new PDO(DB_CONN_STR, DB_USER, DB_PASSWORD);

      if(UN_ENV == "PROD"){
        $prefix = "danie374_upnext.";
        $this->events_table = $prefix . "un_events";

        $this->users_table = $prefix . "un_users";
        $this->comments_table = $prefix . "un_comments";
        $this->invites_table = $prefix . "un_invites";

      }
      else if(UN_ENV == "DEV"){
        $this->events_table = "un_events";
        $this->users_table = "un_users";
        $this->comments_table = "un_comments";
        $this->invites_table = $prefix . "un_invites";
      }

    }
    catch(Exception $e){
    	echo "An error has occurred";
    }
  }

  public function delete_user() {

  }

  public function fetchUsers() {
  	$users = array();
    $sql = "SELECT * FROM " . $this->users_table;
  	$stmt = $this->db->prepare($sql);
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
    return $users;
  }

  public function fetchEventInfo($eventID = null) {
    $eventInfo = array();
    $sql = "SELECT * from " . $this->events_table  ." WHERE event_id = $eventID";
  	if($eventID != null){
  		$stmt = $this->db->prepare($sql);
  		$stmt->execute();

  		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  			$eventInfo = array(
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
  	}
    return $eventInfo;
  }

  public function fetchEventComments($eventID = null) {
  	$comments = array();
  	if($eventID != null){
      $sql = "SELECT ". $this->events_table . ".event_id, ". $this->comments_table.".event_id, ". $this->comments_table .".comment, ". $this->comments_table.".comment_id, ".$this->users_table.".*
       FROM ".$this->comments_table."
       INNER JOIN ". $this->events_table." on ".$this->comments_table.".event_id = ". $this->events_table.".event_id
       INNER JOIN ". $this->users_table ." on ".$this->comments_table.".user_id = ". $this->users_table .".user_id
       WHERE ".$this->comments_table.".event_id = $eventID";
  		$stmt = $this->db->prepare($sql);
  		$stmt->execute();

  		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  			$comments[] = $row;
  		}
  	}
    return $comments;
  }

  public function fetchEvents() {
    $events = array();
    $sql = "SELECT * FROM " . $this->events_table . " ORDER BY `event_date` ASC";
  	$stmt = $this->db->prepare($sql);
  	$stmt->execute();

  	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {


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
    return $events;
  }

  public function create_new_event($name, $img_url, $host, $event_date, $location, $details, $event_type, $friends) {



    $sql = "INSERT INTO
  		". $this->events_table ."(name, img_url, status, location, details, host, event_date, event_type, friends)
    	VALUES(:name, :img_url, :status, :location, :details, :host, :event_date, :event_type, :friends)";
  	$stmt = $this->db->prepare($sql);
  	$stmt->execute(array(
  		"name" => $name,
  		"img_url" => $img_url,
  		"host" => $host,
  		"status" => 0,
  		"event_date" => $event_date,
  		"location" => $location,
  		"details" => $details,
      "event_type" => $event_type,
      "friends" => $friends
  	));
  	$stmt = $this->db->prepare("SELECT LAST_INSERT_ID()");
  	$stmt->execute();
  	$row = $stmt->fetch(PDO::FETCH_ASSOC);
  	return $row["LAST_INSERT_ID()"];
  }

  public function create_new_invites($friends, $host, $event_id) {
    $sql = "INSERT INTO" .
      $this->invites_table . "(host_id, event_id, friend_id)
      VALUES(:host_id, :event_id, :friend_id)";
      for ($i=0; $i < $friends.length;  $i++) {
        $stmt = $this->db->prepare($sql);
        $stmt->execute(array(
          "host_id" => $host,
          "event_id" => $event_id,
          "friend_id" => $friends[i]
        ));
      }

  }

  public function create_new_comment($event_id, $user_id, $comment) {

    $sql = "INSERT INTO
  		". $this->comments_table ."(event_id, user_id, comment)
    	VALUES(:event_id, :user_id, :comment)";

  	$stmt = $this->db->prepare($sql);
  	$stmt->execute(array(
  		"event_id" => $event_id,
  		"user_id" => $user_id,
  		"comment" => $comment
  	));
  	$stmt = $this->db->prepare("SELECT LAST_INSERT_ID()");
  	$stmt->execute();
  	$row = $stmt->fetch(PDO::FETCH_ASSOC);
  	return $row["LAST_INSERT_ID()"];
  }




  public function create_new_user($name, $pw, $profile_picture) {

    $hashPW = password_hash($pw, PASSWORD_DEFAULT);

    $sql = "INSERT INTO
  		". $this->users_table ."(username, password, profile_url, profile_picture)
    	VALUES(:username, :password, :profile_url, :profile_picture)";
  	$stmt = $this->db->prepare($sql);
  	$stmt->execute(array(
  		"username" => $name,
  		"password" => $hashPW,
  		"profile_url" => $name,
  		"profile_picture" => $profile_picture
  	));
  	$stmt = $this->db->prepare("SELECT LAST_INSERT_ID()");
  	$stmt->execute();
  	$row = $stmt->fetch(PDO::FETCH_ASSOC);
  	return $row["LAST_INSERT_ID()"];
  }
  // Get user details based on given id
  public function get_user_details($userID) {
    $userDetails = array();
  	if($userID != null){
      $sql = "SELECT * FROM ". $this->users_table ." WHERE user_id = :user_id";
  		$stmt = $this->db->prepare($sql);
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
  	}
    return $userDetails;
  }
  // Get user details based on given id
  public function auth_user($username, $pw) {

    $response = array(
      "valid" => false,
      "user_info" => array()
    );

  	if($username != null && $pw != null){
      $sql = "SELECT * FROM ". $this->users_table ." WHERE username = :username";
  		$stmt = $this->db->prepare($sql);
  		$stmt->execute(array(
  			"username" => $username
  		));
  		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  			$id = $row["user_id"];
        $valid = password_verify($pw, $row["password"]);


        $user_info = array(
          "user_id" => $id,
          "username" => $row["username"],
          "profile_picture" => $row["profile_picture"],
          "profile_url" => $row["profile_url"]
        );
  		}


  	}

    if($valid){
      $response = array(
        "valid" => $valid,
        "user_info" => $user_info
      );
    }

    return $response;
  }

  public function get_users_info($userIDs) {
  	$friendsInfo = array();
  	if($userIDs != null){
  		$friendIDs = implode(",", $userIDs);
      $sql = "SELECT * FROM " . $this->users_table . " WHERE user_id IN ($friendIDs)";
  		$stmt = $this->db->prepare($sql);

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
  	}
    return $friendsInfo;
  }
}



?>
