//John Dobson
//Jacinda Ballantyne
var gl;
var points;
var score;
var player;
var bullet;
var targetArray;
var target;
var playField;

var numVertices;
var sceneVertices;
window.onload = function init()
{
var canvas = document.getElementById('webgl');
var scr = document.getElementById( 'scr' ); // 2D screen 

if (!canvas || !scr) { 
    console.log('Failed to get HTML elements');
    return false; 
  } 
  
var gl = getWebGLContext(canvas);
var ctx = scr.getContext('2d'); // Associate ctx with 2d screen
if (!gl || !ctx) {
    console.log('Failed to get rendering context');
    return;
  }
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.5, 0.5, 0.5, 1.0 );
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

//listen for keypress
document.onkeydown=handleKeyDown;

//Insert Game Logic

//Collision detection
if(isCollided){
	score += 100;
	if (score >= 1200){
		send win message
	}
}


//pull shader variables and bind buffers
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
gl.bufferData(gl.ARRAY_BFFER, flatten(sceneVertices), gl.STATIC_DRAW);

var vPosition = gl.getAttribLocation( program, "vPosition");
	if (vPosition <0) {
		console.log('Failed to get the storage location of vPosition');
		return -1;
	}
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, FSIZE*5, 0);
	gl.enableVertexAttribArray(vPosition);
	

render();
};

function isCollided(){ //returns a boolean --> True if collision occurred
	switch(bullet.anchorYPosition){	//Check Y pos to see if at one of the possible collision levels
	 case (playField.height-bullet.size): //top of playing field
			//reset bullet
			bullet.anchorXPosition = player.anchorXposition;
			bullet.anchorYPosition = player.anchorYposition;
			return false;
			break;
		case (targetA.anchorYPosition): //top row of targets
			if (bullet.anchorXPosition >= targetA.anchorXPosition && bullet.anchorXPosition <= targetA.anchorXPosition+target.width){
				// targetA has been hit
			}
			else if (bullet.anchorXPosition >= targetB.anchorXPosition && bullet.anchorXPosition <= targetB.anchorXPosition+target.width){
				// targetB has been hit
			}
			else if (bullet.anchorXPosition >= targetC.anchorXPosition && bullet.anchorXPosition <= targetC.anchorXPosition+target.width){
				// targetC has been hit
			}
			else if (bullet.anchorXPosition >= targetD.anchorXPosition && bullet.anchorXPosition <= targetD.anchorXPosition+target.width){
				// targetD has been hit
			}
			break;
		case (targetE.anchorYPosition): //middle row of targets
			if (bullet.anchorXPosition >= targetA.anchorXPosition && bullet.anchorXPosition <= targetA.anchorXPosition+target.width){
				// targetE has been hit
			}
			else if (bullet.anchorXPosition >= targetB.anchorXPosition && bullet.anchorXPosition <= targetB.anchorXPosition+target.width){
				// targetF has been hit
			}
			else if (bullet.anchorXPosition >= targetC.anchorXPosition && bullet.anchorXPosition <= targetC.anchorXPosition+target.width){
				// targetG has been hit
			}
			else if (bullet.anchorXPosition >= targetD.anchorXPosition && bullet.anchorXPosition <= targetD.anchorXPosition+target.width){
				// targetH has been hit
			}
			break;
		case (targetI.anchorYPosition): //bottom row of targets
			if (bullet.anchorXPosition >= targetA.anchorXPosition && bullet.anchorXPosition <= targetA.anchorXPosition+target.width){
				// targetI has been hit
			}
			else if (bullet.anchorXPosition >= targetB.anchorXPosition && bullet.anchorXPosition <= targetB.anchorXPosition+target.width){
				// targetJ has been hit
			}
			else if (bullet.anchorXPosition >= targetC.anchorXPosition && bullet.anchorXPosition <= targetC.anchorXPosition+target.width){
				// targetK has been hit
			}
			else if (bullet.anchorXPosition >= targetD.anchorXPosition && bullet.anchorXPosition <= targetD.anchorXPosition+target.width){
				// targetL has been hit
			}
			break;
		
	}
}

function render() {
gl.clear( gl.COLOR_BUFFER_BIT );
if (bullet.fired){
	bullet.anchorYPosition += (0.01*playField.height);
}
gl.DrawArrays(gl.TRIANGLE, 0, numVertices);
draw2D(ctx, score); // draw score on 2D screen
window.requestAnimFrame(render);
}

function handleKeyDown(event){
		switch(event.keyCode){
			case 49: //'1' Key pressed
				//reset game
				createScene();
				break;
			case 37: //left arrow key
				//move player left, if not max
				if (player.anchorXPosition > -(playField.width*0.5)){
					player.anchorXPosition -= 0.05;
				}
				break;
			case 39: //right arrow key
				//move player right, if not max
				if (player.anchorXPosition < (playField.width*0.5)){
					player.anchorXPosition += 0.05;
				}
				break;
			case 32: //space bar
				//fire bullet
				if (!bullet.fired){
					bullet.fired=true;
				}
				break;
		}
	};

function createScene(){ // sets playing field scene with respect to object anchors
	//create object for playing field
	playField.height = 0.82*canvas.height;
	playField.width = 0.82*canvas.width;
	
	//create object info for player, bullet, and targets
	//player anchor will the the top of the triangle
	player.height = 0.05;
	player.width = 0.05;
	player.anchorXPosition = -(playField.width*0.5);	//initialize player to left-most side
	player.anchorYPosition = -(playField.height*0.5);	//keep player below bottom of playField
	
	//bullet anchors will be the middle of the bottom of the square
	bullet.size = 0.01;
	bullet.anchorXPosition = player.anchorXPosition;   //initialize bullet to tip of player
	bullet.anchorYPosition = player.anchorYPosition;
	bullet.fired = false;	//initialized fired status to false
	
	target.height = 0.1*playField.height;	//target is 1/10th of the height of the playfield
	target.width = 0.142*playField.width;	//target is 1/7th of the width of the playfield
	
	//target anchors will be the lower left corner of the rectangle
	//create a 3x4 array of targets
	targetA.anchorXPosition = -playField.width;
	targetA.anchorYPosition = playField.height-target.height;
	
	targetB.anchorXPosition = targetA.anchorXPosition + 2*target.width;
	targetB.anchorYPosition = targetA.anchorYPosition;
	
	targetC.anchorXPosition = targetA.anchorXPosition + 4*target.width;
	targetC.anchorYPosition = targetA.anchorYPosition;
	
	targetD.anchorXPosition = targetA.anchorXPosition + 6*target.width;
	targetD.anchorYPosition = targetA.anchorYPosition;
	
	targetE.anchorXPosition = targetA.anchorXPosition;
	targetE.anchorYPosition = targetA.anchorYPosition - 2*target.height;
	
	targetF.anchorXPosition = targetA.anchorXPosition + 2*target.width;
	targetF.anchorYPosition = targetA.anchorYPosition - 2*target.height;
	
	targetG.anchorXPosition = targetA.anchorXPosition + 4*target.width;
	targetG.anchorYPosition = targetA.anchorYPosition - 2*target.height;
	
	targetH.anchorXPosition = targetA.anchorXPosition + 6*target.width;
	targetH.anchorYPosition = targetA.anchorYPosition - 2*target.height;
	
	targetI.anchorXPosition = targetA.anchorXPosition;
	targetI.anchorYPosition = targetA.anchorYPosition - 4*target.height;
	
	targetJ.anchorXPosition = targetA.anchorXPosition + 2*target.width;
	targetJ.anchorYPosition = targetA.anchorYPosition - 4*target.height;
	
	targetK.anchorXPosition = targetA.anchorXPosition + 4*target.width;
	targetK.anchorYPosition = targetA.anchorYPosition - 4*target.height;
	
	targetL.anchorXPosition = targetA.anchorXPosition + 6*target.width;
	targetL.anchorYPosition = targetA.anchorYPosition - 4*target.height;
	
	score=0.0;
	
}

function drawScene(){	// creates the vertex info for each shape and combines them into a single matrix; NEVER CALLED
	//create vertex information for player, bullet and targets
	player.vertices = [
		vec3(player.anchorXPosition, player.anchorYPosition, 0.0),
		vec3(player.anchorXPosition-player.width/2, player.anchorYPosition-player.height, 0.0),
		vec3(player.anchorXPosition+player.width/2, player.anchorYPosition-player.height, 0.0)
		];
	
	bullet.vertices = [
		vec3(bullet.anchorXposition-bullet.size/2, bullet.anchorYPosition, 0.0),
		vec3(bullet.anchorXposition-bullet.size/2, bullet.anchorYPosition+bullet.size, 0.0),
		vec3(bullet.anchorXposition+bullet.size/2, bullet.anchorYPosition+bullet.size, 0.0),
		vec3(bullet.anchorXposition+bullet.size/2, bullet.anchorYPosition, 0.0),
		vec3(bullet.anchorXposition-bullet.size/2, bullet.anchorYPosition+bullet.size, 0.0),
		vec3(bullet.anchorXposition+bullet.size/2, bullet.anchorYPosition+bullet.size, 0.0)
		];
	
	//create target array
	targetA.vertices = drawTarget(targetA.anchorXPosition,targetA.anchorYPosition);
	targetB.vertices = drawTarget(targetB.anchorXPosition,targetB.anchorYPosition);
	targetC.vertices = drawTarget(targetC.anchorXPosition,targetC.anchorYPosition);
	targetD.vertices = drawTarget(targetD.anchorXPosition,targetD.anchorYPosition);
	targetE.vertices = drawTarget(targetE.anchorXPosition,targetE.anchorYPosition);
	targetF.vertices = drawTarget(targetF.anchorXPosition,targetF.anchorYPosition);
	targetG.vertices = drawTarget(targetG.anchorXPosition,targetG.anchorYPosition);
	targetH.vertices = drawTarget(targetH.anchorXPosition,targetH.anchorYPosition);
	
	sceneVertices = player.vertices.concat(
						bullet.vertices,
						targetA.vertices,
						targetB.vertices,
						targetC.vertices,
						targetD.vertices,
						targetE.vertices,
						targetF.vertices,
						targetG.vertices,
						targetH.vertices
						);
						
	numVertices = sceneVertices/3; //might need to convert to integer
}

function drawTarget(anchorX, anchorY){
	var targetVertices = [
		vec3(anchorX, anchorY, 0.0),
		vec3(anchorX, anchorY+target.height, 0.0),
		vec3(anchorX+target.width,anchorY+target.height, 0.0),
		vec3(anchorX+target.width,anchorY, 0.0),
		vec3(anchorX,anchorY, 0.0),
		vec3(anchorX+target.width,anchorY+target.height, 0.0)
		];
		return targetVertices;
}

function draw2D(ctx, score) { // puts score on 2D screen
	ctx.clearRect(0, 0, 512, 512);
	ctx.font = '18px "Times New Roman"';
	ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
	ctx.fillText('Score: '+ Math.floor(score), 40, 240);
}
