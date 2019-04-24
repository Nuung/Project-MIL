import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import woodBack from "./assets/woodTexture.jpg"


function addArrow(){

}

function preload() {
  this.load.image("background", woodBack);
}

function create() {
  this.add.image(0, 0, "background");
  var r1 = this.add.triangle(200, 200, 0, 160, 100, 100, 0, 0, 0x6666ff)
  this.input.keyboard.on('keyup_D',function(event){
    r1.x += 10;
  },this);
}



function nextItem(){
  //Load next

}

function previousItem(){
  //load previous
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);
