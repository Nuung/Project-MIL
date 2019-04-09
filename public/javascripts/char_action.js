
/* TEST */
/*
var btn1 = document.getElementById('btn1');
btn1.addEventListener('click', function(event){
    alert('TEST');
});

$(document).keydown(function(event) {
    console.log(event.keyCode);
    
    if (event.keyCode == '37') {
      alert('좌측 화살키를 누르셨습니다.');
    }
    else if (event.keyCode == '39') {
      alert('우측 화살키를 누르셨습니다.');
    }
});
*/

/* run and jump */

var context, controller, rectangle, loop;
const canvasWidth = 640, canvasHeight = 360, landBelow = 16, sizeofChar = 44; // the elements of an object
const imgPath = "images/PlayerMoveFrame"; // Path of char img
context = document.querySelector('canvas').getContext('2d'); // get canvas from DOM

// set canvas size
context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

// drawing char
var imgChar = new Image(); 
imgChar.src = imgPath+"0.png";
context.drawImage(imgChar, 0, 0, sizeofChar, sizeofChar);

// char object (like json)
rectangle = {
  height: sizeofChar,
  jumping: true,
  width: sizeofChar,
  x: canvasWidth/2 - landBelow, // center of canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event){
    // When the key is pressed, key_state becomes true or false.
    var key_state = (event.type == 'keydown') ? true:false;

    switch(event.keyCode){
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    } // switch
  } // keyListener Event
};

// main action loop function
loop = function(){
  // jumping action
  if(controller.up && rectangle.jumping == false){
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }
  // move to left
  if(controller.left){
    rectangle.x_velocity -= 0.5;
  }
  // move to right
  if(controller.right){
    rectangle.x_velocity += 0.5;
  }

  rectangle.y_velocity += 1.5; // gravity: falling velocity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  
  // feel like friction
  rectangle.x_velocity *= 0.9;
  rectangle.y_velocity *= 0.9;

  // collison detect
  if(rectangle.y > canvasHeight - landBelow - sizeofChar){
    rectangle.jumping = false; // cant jumping
    rectangle.y = canvasHeight - landBelow - sizeofChar; // Positioning so as not to leave the canvas
    rectangle.y_velocity = 0;
  }

  if(rectangle.x < -sizeofChar){ // limit left side of canvas 
    rectangle.x = canvasWidth;
  } else if(rectangle.x > canvasWidth){ // limit right side of canvas
    rectangle.x = -sizeofChar;
  }

  // Style of canvas and objects
  context.fillStyle = '#202020';
  context.fillRect(0, 0, canvasWidth, canvasHeight); // x, y, width, height
  context.fillStyle = '#ff0000';
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = '#202830';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, canvasHeight - landBelow);
  context.lineTo(canvasWidth, canvasHeight - landBelow);
  context.stroke();

  window.requestAnimationFrame(loop);
}; // loop function

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);