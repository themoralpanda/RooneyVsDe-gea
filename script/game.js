	//setting the canvas
	var canvas = document.getElementById("football_pitch");
	var ctx = canvas.getContext("2d");
	
	
	//loading the pitch
	
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function (){
		bgReady = true;
	}
	bgImage.src = "resources/pitch.png";

	//loading rooney image
	var rooneyReady = false;
	var rooneyImage = new Image();
	rooneyImage.onload = function (){
		rooneyReady = true;
	}
	rooneyImage.src = "resources/rooney.png";

	//loading ball image
	var ballReady = false;
	var ballImage = new Image();
	ballImage.onload = function (){
		ballReady = true;
	}
	ballImage.src = "resources/ball.png";


	//loading Degea image
	var degeaReady = false;
	var degeaImage = new Image();
	degeaImage.onload = function (){
		degeaReady = true;
	}
	degeaImage.src = "resources/degea.png";

	//Game objects
	//Rooney's speed and movement config
	var rooney = {
		speed: 356
		
	};

	//Degea's speed and movement config
	var degea = {
		speed: 125,
		y:100
	};
	//Ball's config dictionary
	var ball ={};

	var goalscored = 0; //count of number of goals rooney has scored !


	//Gathering User Keys

	var keysdown = {};

	addEventListener("keydown", function (e){
		keysdown[e.keyCode] = true;
		
	},false);

	addEventListener("keyup", function (e){
		delete keysdown[e.keyCode];

	},false);

	//reseting the game when rooney scored a goal.
	var reset = function() {
		rooney.x = 64 +(Math.random() * (canvas.width - 128)); //canvas.width / 2 ;
		rooney.y = 64 + (Math.random() * (canvas.height - 128)); //canvas.height / 2 ;

		//Placing the ball at a random place.
		ball.x = 64 +(Math.random() * (canvas.width - 128));
		ball.y = 64 + (Math.random() * (canvas.height - 128));

		if (rooney.x > (ball.x +50) || rooney.x < (ball.x -50)){
			if(ball.x > rooney.x)
				{
					degea.x = ball.x - 100 ;
					//degea.y = 100;
				}
			else if (rooney.x > ball.x)
			{
				degea.x = ball.x + 100;			
				//degea.y = 100;	
			}
		}
		else 
			reset();
	};

	//Start moving David Degea
	var MoveDegea = function(modifier){
		
	}
	var sign = 0;
	//update game objets.
	var update = function(modifier , degea_move_val) {
		if(38 in keysdown) { //Up arrow
			rooney.y -= rooney.speed * modifier;
			
			}
		if(40 in keysdown) { //down arrow
			rooney.y += rooney.speed * modifier;
			
		}
		if(37 in keysdown) { //left arrow
			rooney.x -= rooney.speed * modifier;
			

		}
		if(39 in keysdown) { //right arrow
			rooney.x += rooney.speed * modifier;
		}
		if(sign == 0)
			{ 
				degea.y += degea_move_val;
				sign = 1;
			}
			else
			{
					degea.y -= degea_move_val;
					sign = 0;
			
			}
			if (degea.y >= canvas.height - 60) {
				degea.y = canvas.height - 60;
				}
			if (degea.y <= 30) {
				degea.y = 30;
				}

		if (rooney.x <= (ball.x +64) &&
			ball.x <= (rooney.x +64) &&
			rooney.y <= (ball.y +64) &&
			ball.y <= (rooney.y +64) )
		{
			goalscored++;
			reset();
		} 

		if (rooney.x <= (degea.x +32) &&
			degea.x <= (rooney.x +32) &&
			rooney.y <= (degea.y +32) &&
			degea.y <= (rooney.y +32) )
		{
			window.alert("Game over .Your score is "+goalscored);
			exit("end");
		}

	};

	//Drawing all the objects on the canvas
	var render = function() {
		
		if(bgReady)
			ctx.drawImage(bgImage,0,0);
		if(rooneyReady)
			ctx.drawImage(rooneyImage,rooney.x,rooney.y);
		if(degeaReady)
			ctx.drawImage(degeaImage,degea.x,degea.y);
		if(ballReady)
			ctx.drawImage(ballImage,ball.x,ball.y);

		//filling the score
		ctx.fillstyle ="rgb(21,21,208)";
		ctx.font="40px Helvetica";
		ctx.textAlign = "left"
		ctx.textBaseline = "top";
		ctx.fillText("Goals Scored --   " + goalscored ,32 , 32 );
	};

	var main = function(){
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000 , Math.floor((Math.random() * 300) + 1));
		render();
		then = now;

		requestAnimationFrame(main);
		sleep(100);
	};
	function sleep(milliSeconds){
		var startTime = new Date().getTime(); // get the current time
		while (new Date().getTime() < startTime + milliSeconds); // hog cpu
		}
	var w  = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame  || w.mozRequestAnimationFrame ;

	var then = Date.now();
	reset();
	main();

	function exit( status ) {
    var i;
    
    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);
    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}

