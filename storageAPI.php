<?php
include "config.php";
// inserts or update
function post($db, $page, $key, $value){
    $sql = "SELECT COUNT(*) FROM KeyValueStore WHERE page='$page' AND theKey='$key'";
    $result = $db -> query($sql);
    if($result -> num_rows == 0){
        $sql = "INSERT INTO KeyValueStore (page, theKey, value)
                VALUES ('$page','$key','$value')";
        if(!$db -> query($sql)) {
            echo "Error on insert";
            http_response_code(400); 
            exit(1);
        }
    } else {
        $sql = "UPDATE KeyValueStore SET value='$value' WHERE page='$page' AND theKey='$key'";
        if(!$db -> query($sql)) {
            echo "Error on update";
            http_response_code(400); 
            exit(1);
        }
    }
}
$headers = apache_request_headers();
$token = intval($headers['Authorization']);

$data = json_decode(file_get_contents('php://input'), true);
$page = $data["page"];

if(notPermitted($token) || !isset($page)){
  http_response_code(400); 
  exit(1);
}
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case 'POST':
        $value = $data["value"];
        $key = $data["key"];
        if (isset($value,$data)) post($db, $page, $key, $value);
        
        else {
            http_response_code(400); 
            exit(1);
        }
        echo json_encode($data);
        http_response_code(201);
        exit(0);
        break;
        
    case 'GET':
        # code...
        break;
    
    case 'DELETE':
        # code...
        break;
    
    default:
        http_response_code(400); 
        exit(1);
        break;
}