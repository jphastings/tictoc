var dates = {
	'nii-san':5493114e5,
	'y':131688858e4,
	'leanne': 1392413813e3
};

var then = 4876965e5;

function set_display() {
	var date = (isNaN(parseInt(window.location.hash.substr(1)))) ? dates[window.location.hash.substr(1)] : window.location.hash.substr(1);
	if (date == undefined || date < then || date > 4885743011103) {
		date = new Date();
	} else {
		date = new Date(parseInt(date));
		$('#info').fadeIn();
	}
	
	var num = date.getTime() - then;
	display(num)
}

function display(num) {
	var date = new Date((num * 1000) + then + (new Date().getTimezoneOffset()) * 60000);
	$('#date').text(date.toString('d MMM yyyy HH:mm:ss') + ' GMT');
	$('#info .number').attr('href','#'+(num+then));
	$('#years'  ).text(Math.round(num / (60*60*24*365.25),1));
	$('#months' ).text(Math.round(num / (60*60*24*30),1));
	$('#weeks'  ).text(Math.floor(num / (60*60*24*7)));
	$('#days'   ).text(Math.floor(num / (60*60*24)));
	$('#hours'  ).text(Math.floor(num / (60*60)));
	$('#minutes').text(Math.floor(num / (60)));
	$('#seconds').text(Math.floor(num));

	for(i=34;i>4;i--) {
		turn(i,((num & 1) == 1));
		num = Math.floor(num / 2);
	}
}

function turn(i, turnon) {
	turnon = typeof(turnon) != 'undefined' ? (turnon == true) : (!$('#bit'+i).hasClass('on'));;

	$('#bit'+i).stop();
	if (turnon) {
		$('#bit'+i).removeClass('off');
		$('#bit'+i).addClass('on');
	} else {
		$('#bit'+i).addClass('off');
		$('#bit'+i).removeClass('on');
	}
}


function initialise(v) {
	clearInterval(interval);
	$('#counter').addClass('milestones')
	if (v >= 42) {
		$('#counter').removeClass('milestones')
		set_display();
		interval = setInterval(set_display, 1024);
	} else {
		display(Math.pow(2,v));
		timeout = setTimeout(function() {initialise(v+1)},50);
	}
	
}

var interval;
var mousedown_on_bit = false;

$(document).bind('ready',function() {
	initialise(0);

	$('#message').bind('click',function(){ $('#info').fadeOut(); $('#message').text(''); window.location.hash = ''; initialise(0); })

	$(document).bind('mouseup',function(e) { mousedown_on_bit = false; })
	$(document).bind('mousedown',function() { if (mousedown_on_bit == false) {$('#info').fadeToggle(); $('#counter').toggleClass('milestones') }});
	$('#counter div').bind('mouseover',function() { if (mousedown_on_bit != false) { $(this).trigger('mousedown') } })

	$('#counter div').bind('mousedown',function() {
		if (mousedown_on_bit == false) {
			mousedown_on_bit = ($(this).hasClass('on') ? 'off' : 'on' );
		}

		$('#info').fadeIn();

		if (mousedown_on_bit != false) {
			$(this).addClass(mousedown_on_bit)
			$(this).removeClass((mousedown_on_bit == 'on') ? 'off' : 'on')
		} else {
			$(this).toggleClass('on')
			$(this).toggleClass('off')
		}
		

		var num = 0;
		for(i=30;i>0;i--) {
			if ($('#bit'+i).hasClass('on')) {
				console.log(num, i, Math.pow(2, 34 - i))
				num += Math.pow(2, 34 - i);
			}
		}
		
		display(num);
		return false;
	})

	$('.number').bind('click',function() {clearInterval(interval); })
});