<?php

	header("Content-type:application/json;charset=utf-8");
	require_once('db.php');



	if ($link) {

		$newsid=$_GET['newsid'];

		mysqli_query($link,"SET NAMES utf8");

                             // 特别要留意SQL语句的书写格式
		$sql="SELECT * FROM `news` WHERE  `id` = {$newsid}";
                             // 最基本的用法，目的是在MYSQL库表中查到当前点击的这条记录
		$result= mysqli_query($link,$sql);

		$senddata=array();

		while ( $row=mysqli_fetch_assoc($result)) {
			
			array_push($senddata,array(
				
				'newstitle' => $row['newstittle'],
				'newstype' => $row['newstype'],
				'newsimg' => $row['newsimg'],
				'newstime' => $row['newstime'],
				'newssrc' => $row['newssrc']
		                          ));
	               }
			
				
                     echo json_encode($senddata);

	

	 }



      
       mysqli_close($link);


?>







		