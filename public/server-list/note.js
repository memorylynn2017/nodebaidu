 $sql='SELECT * FROM news ' ;
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