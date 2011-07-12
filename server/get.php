<?php
$date=$_GET['date'];
$con=mysql_connect('localhost','sunny','m3g4d37h');
if (!$con) {
	die("<Error>1</Error>");
}
$time=Time();
$ftn_daz_bak=$time-1296000;
if ((!$date)||($date<$ftn_daz_bak)) {
$date=$ftn_daz_bak;
}
mysql_select_db("dfr",$con);
$result=mysql_query("SELECT * FROM reports where time >".$date);
if(mysql_num_rows($result)==0) {
	die("<Error>2</Error>");
} else {
	while($row=mysql_fetch_array($result)) {
		print "store(".$row['id'].",".$row['lat'].",".$row['lon'].",".$row['type'].",".$row['value'].",".$row['time'].",'".$row['comment']."');\n";
	}
}
?>
