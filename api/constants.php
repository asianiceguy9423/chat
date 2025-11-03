<?php
  define('SITEURL', 'http://localhost/chatroom/');
  define('LOCALHOST','localhost');
  define('DB_USERNAME','root');
  define('DB_PASSWORD', '');
  define('DB_NAME', 'chat_room');

  // define('SITEURL', 'http://chatsimulation2025.atwebpages.com/');
  // define('LOCALHOST','fdb1031.runhosting.com');
  // define('DB_USERNAME','4700295_mysql');
  // define('DB_PASSWORD', 'guowenguowenw46');
  // define('DB_NAME', '4700295_mysql');

  $conn = mysqli_connect(
    LOCALHOST, 
    DB_USERNAME, 
    DB_PASSWORD
  ) or die(mysqli_error($conn));
  $db_select = mysqli_select_db($conn, DB_NAME) or die(mysqli_error($conn));
?>