function ajax_send(url) {
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		document.getElementById('footer').style.display='block';
		document.getElementById('header').style.display='block';
		document.getElementById('article').innerHTML=xmlhttp.responseText;
	}	
}
function init() {
		document.getElementById('article').innerHTML="<div id='felt_list' class='list' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='send_init()'>I Felt It</div><div id='view_list' class='list' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='view_init()'>View Reports</div><div id='what_list' class='list' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='what_init()'>What To Do</div><div id='about_list' class='list' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='about_init()'>About This App</div>";
		document.getElementById('header').innerHTML="<header>Disaster Felt Report</header>";
		document.getElementById('footer').innerHTML="<footer><img id='rhok_logo' src='./img/logo.png' alt='RHoK #3' /></footer>";
		document.getElementById('footer').style.display='block';
		document.getElementById('header').style.display='block';
		geo_init();
}
function clear_memory() {
localStorage.clear();
view5();
}
function send_init() {
		document.getElementById('article').innerHTML="<form name='questionnaire'><div id='type_list' class='list'>Select Report Type :<select name='calamity_type' id='calamity_type'><option value='1'>Earthquake</option><option value='2'>Tsunami</option><option value='3'>Flood</option><option value='4'>Fire</option><option value='5'>Cyclone/Hurricane/Tornado</option><option value='6'>Others</option></select></div><div id='hurt_box' class='qlist' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='check_hurt()'><input type='checkbox' class='questions' name='hurt' id='hurt' value='hurt'/><div class='question_text'>Are you hurt?</div></div><div id='help_box' class='qlist' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='check_help()'><input type='checkbox' class='questions' name='help' id='help' value='help'/><div class='question_text'>Can you help others?</div></div><div id='casuality_box' class='qlist' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)' onClick='check_casuality()'><input type='checkbox' class='questions' name='casuality' id='casuality' value='casuality'/><div class='question_text'>Is there any casuality around you?</div></div><div id='comment_box' class='list' onmouseover='mouseover(this.id)' onmouseout='mouseout(this.id)'><textarea rows='2' class='questions_text' name='comment' id='comment' value=''>Add a comment.</textarea></div><input type='button' class='submit' onclick='start_send()' value='Next >>'/></form><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
		document.getElementById('footer').style.display='none';
		document.getElementById('header').style.display='none';
}
function about_init() {
		document.getElementById('footer').style.display='block';
		document.getElementById('header').style.display='block';
		document.getElementById('article').innerHTML="<div id='felt_list' class='text_big'><p>This app is made using a LAMP (Linux, Apache, MySQL, Php) server and HTML 5/JavaScript (Geolocation API, offline storage, Ajax) client.</p><p>This should work in full mode in :<ul><li>iOS</li><li>Android</li></ul><p>and in 'fallback' mode in :</p><ul><li>Symbian 60 5th Edition (N97,..)</li><li>Blackberry</li><li>PalmOS</li></ul></p><p>This app uses 2 open source libraries by Chris Veness (to calculate distance between two points using Vincenty's Inverse formula) and Stan Wiechers (to provide a geolocation wrapper for many GPS enabled devices, including non-HTML5 devices like Nokia, Blackberry & PalmOS)</p><p>This app was influenced by the two RHoK problems namely :</p><ul><li>Quake Felt Alert</li><li>Disaster Safe</li></ul></div><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
}
function validate() {
	var url="../server/save.php?type="+window.document.questionnaire.calamity_type.value+"&value=";
	var value=0;
	var comment="";
	var hurt="No";
	var help="No";
	var casuality="No";
	if (window.document.questionnaire.hurt.checked == true) {
		value+=1;
		hurt="Yes";
	}
	if (window.document.questionnaire.help.checked == true) {
		value+=10;
		help="Yes";
	}
	if (window.document.questionnaire.casuality.checked == true) {
		value+=100;
		casuality="Yes";
	}
	url+=value;
	if ((latitude)&&(longitude)) {
		url+="&lat="+latitude+"&lon="+longitude;
		warn="Latitude : "+latitude+"\nLongitude : "+longitude+"\nAre You Hurt : "+hurt+"\nCan you help : "+help+"\nIs there casuality around you : "+casuality;
		if ((window.document.questionnaire.comment.value != "Add a comment.")&&(window.document.questionnaire.comment.value)) {
			warn+="\n----------------------------\nYour comment:\n"+window.document.questionnaire.comment.value;
			url+="&comment="+escape(window.document.questionnaire.comment.value);
		}
		var ask=confirm(warn);
		if (ask) {
			return url;
		}
		else {
			return NULL;
		}
	} else {
		document.getElementById('footer').style.display='block';
		document.getElementById('header').style.display='block';
		document.getElementById('article').innerHTML="<div class='list'>Unable to find your location</div><button id='what_cyclone' class='submit' onclick='init()'>&lt;&lt; Back</button>";
	}
	
}
function start_send() {
	var i=validate();
	ajax_send(i);
}
function check_help() {
	if (window.document.questionnaire.help.checked == true) {
		window.document.questionnaire.help.checked=false;
	} else {
		window.document.questionnaire.help.checked=true;
	}
}
function check_hurt() {
	if (window.document.questionnaire.hurt.checked == true) {
		window.document.questionnaire.hurt.checked=false;
	} else {
		window.document.questionnaire.hurt.checked=true;
	}
}
function check_casuality() {
	if (window.document.questionnaire.casuality.checked == true) {
		window.document.questionnaire.casuality.checked=false;
	} else {
		window.document.questionnaire.casuality.checked=true;
	}
}
function mouseover(id) {
document.getElementById(id).style.backgroundColor='#990000';
}
function mouseout(id) {
document.getElementById(id).style.backgroundColor='#fff';
}
