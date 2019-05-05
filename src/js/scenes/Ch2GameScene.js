
// global game options

var timedEvent;
var text;
var scoreText;
var score = 0;
var primeravez=0;

// playGame scene
class Ch2GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Ch2GameScene'
        });
    }
    init(data){
        console.log(data);
        console.log("RECIEVED in GameScene ~ Data");
    }

    preload(){
        // for img
        this.load.image("player", "./src/img/testPlayer3232.png");
        this.load.image("pause", "./src/img/pause.png");
        }

    create(){

        // setting the back ground
    
        // Ading pause btn and pause scene
        let PauseButton = this.add.image(750,75,"pause").setScale(0.5).setDepth(1);
        scoreText = this.add.text(50, 50, 'Score: 0').setScale(2);
        timedEvent = this.time.addEvent({ delay: 100000, loop: true });
        text = this.add.text(this.game.config.width / 2, 50);

        //we have to fix ScenePause. We cant come back from the ScenePause. look at ScenePause 
        /*
        PauseButton.setInteractive();

        PauseButton.on("pointerup", ()=>{ 
            if(primeravez==0){
                console.log("Lets See");
                this.scene.pause();
                this.scene.launch('sceneP');
            }
            
        })
        */
    
        // adding the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height / 2, "player");
    
        
        //keyboard
        this.keyboard = this.input.keyboard.addKeys('W,S,A,D');
    }

 
    // the core of the script: platform are added from the pool or created on the fly
    
    update(){
        if(this.player.active=== true){
            if(this.keyboard.D.isDown === true){
                this.player.setVelocityX(128);
            }
            if(this.keyboard.W.isDown === true){
                this.player.setVelocityY(-128);
            }
            if(this.keyboard.S.isDown === true){
                this.player.setVelocityY(128);
            }
            if(this.keyboard.A.isDown === true){
                this.player.setVelocityX(-128);
            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);
            }
        }

    }
};

export default Ch2GameScene;