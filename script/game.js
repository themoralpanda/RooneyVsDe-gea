	//setting the canvas
	var canvas = document.getElementById("football_pitch");
	var ctx = canvas.getContext("2d");
	
	//document.body.appendChild(canvas);
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
	var degea = {};

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
		rooney.x = canvas.width / 2 ;
		rooney.y = canvas.height / 2 ;

		//Placing degea at a random place.
		degea.x = 64 +(Math.random() * (canvas.width - 128));
		degea.y = 64 + (Math.random() * (canvas.height - 128));


	};

	//update game objets.
	var update = function(modifier) {
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

		if (rooney.x <= (degea.x +64) &&
			degea.x <= (rooney.x +64) &&
			rooney.y <= (degea.y +64) &&
			degea.y <= (rooney.y +64) )
		{
			goalscored++;
			reset();
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

		//filling the score
		ctx.fillstyle ="rgb(250,250,250)";
		ctx.font="24px Helvetica";
		ctx.textAlign = "left"
		ctx.textBaseline = "top";
		ctx.fillText("Goals Scored:" + goalscored ,32 , 32 );
	};

	var main = function(){
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();
		then = now;

		requestAnimationFrame(main);
	};

	var w  = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame  || w.mozRequestAnimationFrame ;

	var then = Date.now();
	reset();
	main();
