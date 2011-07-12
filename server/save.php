<?php
function getIpAddress() {
return (empty($_SERVER['HTTP_CLIENT_IP'])?(empty($_SERVER['HTTP_X_FORWARDED_FOR'])?$_SERVER['REMOTE_ADDR']:$_SERVER['HTTP_X_FORWARDED_FOR']):$_SERVER['HTTP_CLIENT_IP']);
}
$time=time();
$ip=getIpAddress();
$lat=$_GET['lat'];
if ((!$lat)||($lat>90)||($lat<-90)) {
	die("<div class='list'>Latitude Error</div>");
}
$lon=$_GET['lon'];
if ((!$lon)||($lon>180)||($lon<-180)) {
	die("<div class='list'>Longitude Error</div>");
}
$type=$_GET['type'];
if((!$type)||($type<0)||($type>6)) {
	die("<div class='list'>Type Error</div>");
}
$value=$_GET['value'];
if (!((value==0)||(value==1)||(value==10)||(value==11)||(value==100)||(value==101)||(value==111))) {
	die("<div class='list'>Value Error</div>");
}	
$con=mysql_connect('localhost','sunny','m3g4d37h');
if (!$con) {
	die("<div class='list'>Value Error</div>");
}
mysql_select_db("dfr",$con);
$result=mysql_query("SELECT * FROM reports");
$id=mysql_num_rows($result)+1;
if (!$_GET['comment']) {
	$sql = "INSERT INTO reports (id,ip,lat,lon,type,value,time,comment) VALUES ('".$id."','".$ip."','".$lat."','".$lon."','".$type."','".$value."','".$time."','');";
} else {
	$message=$_GET['comment'];
	$sql = "INSERT INTO reports (id,ip,lat,lon,type,value,comment,time) VALUES ('".$id."','".$ip."','".$lat."','".$lon."','".$type."','".$value."','".$message."','".$time."');";
}
if (mysql_query($sql)) {
	print "<div class='list'>Your report ID : ".$id."</div>";
	print "<div class='text_big'>Your IP: ".$ip."<br />Latitude: ".$lat."<br />Longitude: ".$lon."</div>";
	print "<button id='back' class='submit' onclick='init()'>&lt;&lt; Back</button>";
} else {
	die($sql."<br />".mysql_error());
}
?>

