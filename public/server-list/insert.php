<?php

	header("Content-type:application/json;charset=utf-8");
	require_once('db.php');
	if($link){

	$newstitle=$_POST['newstitle'];
	// echo "$newstitle";
	$newstype=$_POST['newstype'];
	// echo "$newstype";
	$newsimg=$_POST['newsimg'];
	// echo "$newsimg";
	$newstime=$_POST['newstime'];
	// echo "$newstime";
	$newssrc=$_POST['newssrc'];
	// echo "$newssrc";


	 $sql="INSERT INTO `news`(`newstittle`, `newstype`, `newsimg`, `newstime`, `newssrc`) VALUES ('{$newstitle}','{$newstype}','{$newsimg}','{$newstime}','{$newssrc}')";
	 // echo "$sql";
	 mysqli_query($link,"SET NAMES utf8");
	 $result=mysqli_query($link,$sql);
                 
	 echo json_encode(array('success' => $sql));

	}

?>








