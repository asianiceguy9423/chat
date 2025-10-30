<?php
// 設置 CORS 頭部以允許跨域請求
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

include('../../api/constants.php');

$sql = "SELECT user_name, chat_info FROM chat_room_data ORDER BY id DESC";
$res = mysqli_query($conn, $sql);
$count = mysqli_num_rows($res);

$data_array = [];

if($count > 0) {
  while($row = mysqli_fetch_assoc($res)) {
    $data_array[] = [
      'user' => $row['user_name'],
      'chatInfo' => $row['chat_info']
    ];
  }
  echo json_encode([
    'success' => true,
    'data' => $data_array
  ]);
} else {
  echo json_encode([
    'success' => true,
    'message' => '資料庫沒資料',
    'data' => []
  ]);
}
?>