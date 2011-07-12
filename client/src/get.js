function check_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
function view_init() {
	if (check_storage()) {
	view5(); // HTML5
	update();
	view5();
	}
	else {
	view4(); // old browsers
	}
}
function statement(value) {
		if (value=='0') {
			var str="Hurt: NO, Can Help: NO, Casuality: NO";
		}
		else if (value=='1') {
			var str="Hurt: YES, Can Help: NO, Casuality: NO";
		}
		else if (value=='10') {
			var str="Hurt: NO, Can Help: YES, Casuality: NO";
		}
		else if (value=='11') {
			var str="Hurt: YES, Can Help: YES, Casuality: NO";
		}
		else if (value=='100') {
			var str="Hurt: NO, Can Help: NO, Casuality: YES";
		}
		else if (value=='101') {
			var str="Hurt: YES, Can Help: NO, Casuality: YES";
		}
		else if (value=='110') {
			var str="Hurt: NO, Can Help: YES, Casuality: YES";
		}
		else if (value=='111') {
			var str="Hurt: YES, Can Help: YES, Casuality: YES";
		}		
		else {
			var str="Invalid";
		}
		return str;
}
function type_convert(num) {
	if (num=='1') {
		var dtype="Earthquake";
	}
	else if (num=='2') {
		var dtype="Tsunami";
	}
	else if (num=='3') {
		var dtype="Flood";
	}
	else if (num=='4') {
		var dtype="Fire";
	}
	else if (num=='5') {
		var dtype="Cyclone/Hurricane/Tornado";
	}
	else {
		var dtype="Other";
	}
	return dtype;
}
function update() {
	url="http://localhost/rhok/server/get.php";
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		xml=xmlhttp.responseText;
	}
	eval(xml);	
}
function gmap_open(url){
window.open(url,"Map","width=600,height=600");
}
function map(lat,time,lon,msg) {
	map_url="http://maps.google.com/maps/api/staticmap?size=500x500&center="+lat+","+lon+"&marker=label:R&maptype=hybrid&sensor=true&zoom=14";
	sss="<div class='text_big'><h4>Latitude : "+lat+"<br />Longitude : "+lon+"<br />Time : "+time+"</h4><button class='submit' onclick=\"gmap_open('"+map_url+"')\">Locate</button><br />";
	if (msg) {
		sss=sss+"<h4>Comment :</h4><p>"+msg+"</p>";
	}
	sss=sss+"</div><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
	document.getElementById('article').innerHTML=sss;	
}
function view5() {
	var total=localStorage.length;
	var i=0;
	var str="";
	for(i=0;i<total;i++) {
		var id=localStorage.key(i);
		json=localStorage.getItem(id);
		obj=eval('(' + json + ')');
		statmnt=statement(obj.value);
		typename=type_convert(obj.type);
		time=c_time(obj.time);
		s_dist=Gdistance(obj.lat,obj.lon,latitude,longitude);
		str=str+"<div id='"+id+"' class='text_big' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick=\"map("+obj.lat+",'"+time+"',"+obj.lon+",'"+obj.comment+"')\"><h3>"+typename+"</h3><h4>Report Time: "+time+"</h4><h4>Distance from you: "+s_dist+"</h4><p>";
		str=str+statmnt+"</p></div>";
	}
	if (str) {
		document.getElementById('article').innerHTML=str+"<button class='submit' onclick='clear_memory()'>Clear Memory</button><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
	}
	else {
		document.getElementById('article').innerHTML="<div class='list'>No Report Found</div><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
	}
}
function Gdistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1) return Math.round(d)+"km";
    else if (d<=1) return Math.round(d*1000)+"m";
    return d;
}
function store(id,lat,lon,type,value,time,comment) {
str="{ \"lat\":\""+lat+"\",\"lon\":\""+lon+"\",\"type\":\""+type+"\",\"value\":\""+value+"\",\"comment\":\""+comment+"\",\"time\":\""+time+"\" }";
localStorage.setItem(id,str);
}
function c_time(eObj) {
	dDate=new Date();
	var mEpoch = parseInt(eObj);
	if(mEpoch<10000000000) mEpoch *= 1000;
	dDate.setTime(mEpoch)
	return dDate;
}
