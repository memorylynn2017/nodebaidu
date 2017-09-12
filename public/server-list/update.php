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
	$newsid=$_POST['id'];

	$sql="UPDATE `news` SET `id`='{$newsid}',`newstype`='{$newstype}',`newstittle`='{$newstitle}',`newsimg`='{$newsimg}',`newstime`='{$newstime}',`newssrc`='{$newssrc}' WHERE `id`={$newsid}";
	
	 mysqli_query($link,"SET NAMES utf8");
	 
	 $result=mysqli_query($link,$sql);
	 // 老师教得方法，利用IF侦侧数据的成功与否：
	 if ($result) {
	 	  echo json_encode(array('message' =>'success'));
	 }else{
	 	 echo json_encode(array('message' =>'error'));
	 }
                 
	

	}

           mysqli_close($link);

?>















