<?php

header("Content-type:application/json;charset=utf-8");

require_once('db.php');

// if (!$link) {
// 	echo json_encode(array("连接信息"  => "连接失败"));
// } else{
// 	echo json_encode(array("连接信息"  => "连接成功"));

// }




if ($link) {
	// 执行成功的过程
	// ？？？？？？？？？？？？？
	// 如果成功接收到newstype的情况下
	// $typing=$_GET['newstype'];
	// echo "$typing";
	if (@$_GET['newstype']) {
		// 动态地从前端获得一个TYPE值
	     $newstype=$_GET['newstype'];	
	     $sql="SELECT * FROM `news` WHERE `newstype` = '{$newstype}' order by  `id` desc ";
	      // $result=mysqli_query($link,$sql);

	      mysqli_query($link,"SET NAMES utf8");

	      $result=mysqli_query($link,$sql);

	      $senddata=array();
	      // 注意专心写这个while循环的关键
	      // WHILE开始
	       while ( $row=mysqli_fetch_assoc($result)) {
		# code...
		array_push($senddata,array(
				'id' => $row['id'],
				'newstittle' => $row['newstittle'],
				'newstype' => $row['newstype'],
				'newsimg' => $row['newsimg'],
				'newstime' => $row['newstime'],
				'newssrc' => $row['newssrc'],
			));

	       }
	        // WHILE结束
	        echo json_encode($senddata);
	 }else{
	       $sql='SELECT * FROM news order by id desc' ;
	        mysqli_query($link,"SET NAMES utf8");
	        $result=mysqli_query($link,$sql);	

	        $senddata=array();
	      // 注意专心写这个while循环的关键
	      // 
	      // WHILE开始
                       while ( $row=mysqli_fetch_assoc($result)) {
		# code...
		array_push($senddata,array(
				'id' => $row['id'],
				'newstittle' => $row['newstittle'],
				'newstype' => $row['newstype'],
				'newsimg' => $row['newsimg'],
				'newstime' => $row['newstime'],
				'newssrc' => $row['newssrc'],

			));
	        }
	        // WHILE结束
	        echo json_encode($senddata);	
	 }
	

} else{
	echo json_encode(array('success' => 'none'));

}

mysqli_close($link);
// [{newstype:,newstitle:},{},{}]
// $arr = array(

// 'newstype' => '百家',
// 'newsimg' => 'img/02.JPEG',
// 'newstime' => '2017-06-09',
// 'newssrc' => '极客学院',
// 'newstitle' => '测试动态获取数据'
// );

// echo json_encode($arr);
?>







	







