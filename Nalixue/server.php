<?php
header("Content-Type: application/json;charset=utf-8"); 
$searDetail = array
	(
		array(
			"detail" => "百度知道", 
			"searCon" => "百度"
			),
		array(
			"detail" => "百度地图", 
			"searCon" => "百度"
			),
		array(
			"detail" => "百度贴吧", 
			"searCon" => "百度"
			),
		array(
			"detail" => "百度音乐", 
			"searCon" => "百度"
			),
		array(
			"detail" => "百度文库",
			"searCon" => "百度"
			),
		array(
			"detail" => "百度视频", 
			"searCon" => "百度"
			),
		array(
			"detail" => "百度", 
			"searCon" => "百"
			),
		array(
			"detail" => "百元", 
			"searCon" => "百"
			)
	);

search();

function search(){

	if (!isset($_GET["searCon"]) || empty($_GET["searCon"])) {
		echo "参数错误";
		return;
	}
	global $searDetail;

	$searCon = $_GET["searCon"];
	$result = array();
 /*   foreach ($searDetail as $value) {

		if ($value["searCon"] == $searCon) {
			$result[] = $value["detail"];
			
		}
	}
    echo json_encode($result);*/
	
	foreach ($searDetail as $value) {

		if ($value["searCon"] == $searCon) {
			$result[] = urlencode($value["detail"]);
			
		}
	}
    echo urldecode(json_encode($result));
} 
