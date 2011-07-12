var latitude;
var longitude;
function geo_init() {
	if(geo_position_js.init()) {
		geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true,options:5000});
	}
	else {
		document.getElementById('article').innerHTML="<div class='list'>Unable to find your location</div>";
	}
}
function success_callback(p) {
	latitude=p.coords.latitude;
	longitude=p.coords.longitude;
}
function error_callback(p) {
	document.getElementById('article').innerHTML="<div class='list'>Unable to find your location</div>";
}
