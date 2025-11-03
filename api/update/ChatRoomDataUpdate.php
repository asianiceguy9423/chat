<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

include('../../api/constants.php');

$response = [];

if(!$conn){
  $response = ['success' => false, 'message' => '資料庫連結錯誤' . mysqli_connect_error()];
  echo json_encode($response);
  exit;
}

header('Content-Type: application/json');

try {
  $userName = isset($_POST['user_name'])
  ? htmlspecialchars(
    $_POST['user_name'],
    ENT_QUOTES,
    'UTF-8'
    )
  : null;

  $userChatInfo = isset($_POST['chat_info'])
  ? htmlspecialchars(
    $_POST['chat_info'],
    ENT_QUOTES,
    'UTF-8'
    )
  : null;

  $userTime = isset($_POST['chat_time'])
  ? htmlspecialchars(
    $_POST['chat_time'],
    ENT_QUOTES,
    'UTF-8'
    )
  : null;

  $stmt = $conn->prepare("INSERT INTO chat_room_data(
    user_name,
    chat_info,
    chat_time)
  VALUES (?, ?, ?)");

  $stmt->bind_param("sss",
    $userName,
    $userChatInfo,
    $userTime
  );

  $stmt->execute();
  if($stmt->affected_rows > 0){
    $response = [
      'success' => true,
      'message' => '新增成功'
    ];
  }else{
    $response = [
      'success' => false,
      'message' => '新增失敗'
    ];
    // echo json_encode($response);
    // exit;
  }
  $stmt->close();
}catch(Exception $e) {
  $response = [
    'success' => true,
    'message' => $e->getMessage()
  ];
  echo json_encode($response);
  exit;
}
mysqli_close($conn);
echo json_encode($response);
?>