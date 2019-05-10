import BaseScene from "./BaseScene";

// global game options
var timedEvent;
var text;
var scoreText;
var score = 0;
//var primeravez=0; 

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 150], // Range of blocks (platform group)
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    enemyStartPosition: 400,
    jumps: 2,

    // just for testing
    testCounter: 0,
    testBool: true
};

// playGame scene
class FirstGameScene extends BaseScene {
    constructor(test) {
        super({
            key: 'FirstGameScene'
        });
    }

    create(){

        // setting the back ground
        this.background = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 800, 600, "firstBackground");

        // Ading pause btn and pause scene and score and Time
        let PauseButton = this.add.image(750,65,"pause").setScale(0.5).setDepth(1);
        scoreText = this.add.text(50, 50, 'Score: 0').setScale(2);
        timedEvent = this.time.addEvent({ delay: 100000, loop: true });
        text = this.add.text(this.game.config.width / 2, 50);

        // group with all active platforms.
        this.platformGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform);
            }
        });
 
        // pool
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
        });

        // to pause the game
        PauseButton.setInteractive();
        PauseButton.on("pointerup", ()=>{ 
            //if(primeravez==0){
                console.log("Lets See");
                this.scene.pause();
                this.scene.launch('sceneP');
<<<<<<< HEAD
            }  
=======
            //}
            
>>>>>>> 11c21577820aa0fbd982778771f34d3284589b8d
        })
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(this.game.config.width, this.game.config.width / 2);
 
        // adding the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height / 2, "mar");
        this.player.setGravityY(gameOptions.playerGravity);
 
        // adding the enemyBox
        this.enemyBox = this.physics.add.sprite(gameOptions.playerStartPosition + 320, this.game.config.height / 2, "bullier");
        this.enemyBox.setGravityX(-10);

        //let hoverSprite = this.enemyBox.add.sprite(100, 100, "bullier");
        this.enemyBox.setScale(2);
        this.player.setScale(2);
        //hoverSprite.setVisible(false);

        this.anims.create({
            key: "run",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("bullier", {
                frames: [6,7,8,9,10]
            })
        })
        
        /*this.anims.create({
            key: "catmove",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("cat", {
                frames: [8,9,10,11]
            })
        })*/
        this.anims.create({
            key: "marmove",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("mar", {
                frames: [0,1,2,3,4,5]
            })
        })

        this.player.play("marmove")
        this.enemyBox.play("run");

        // for limit enemyBox area -> using invisible wall
        {
        this.invisible_wallTop = this.physics.add.sprite(0, 100, 'invisible_wall');
        this.invisible_wallDown = this.physics.add.sprite(0, this.game.config.height - 100, 'invisible_wall');
        this.invisible_wallTop.setDisplaySize(this.game.config.width * 2, 30);
        this.invisible_wallDown.setDisplaySize(this.game.config.width * 2, 30);
        this.invisible_wallTop.fixedToCamera = true;
        this.invisible_wallTop.body.immovable = true;
        this.invisible_wallTop.body.allowGravity = false;
        this.invisible_wallDown.fixedToCamera = true;
        this.invisible_wallDown.body.immovable = true;
        this.invisible_wallDown.body.allowGravity = false;
        }

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.collider(this.player, this.enemyBox, function(){
            console.log("collision event");
            score += 10;
            scoreText.setText('Points: '+score);
        });
        this.enemyBox.setBounce(1.0);
        this.physics.add.collider(this.enemyBox, this.invisible_wallTop);
        this.physics.add.collider(this.enemyBox, this.invisible_wallDown);

        // checking for input
        this.input.on("pointerdown", this.jump, this);
    }

 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, this.game.config.height * 0.93, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
    }

    update(){

        //Time elapsed
        text.setText(Math.trunc(timedEvent.getProgress().toString().substr(0, 4)*100)).setScale(2);
 
        // game over
        if(this.player.y > this.game.config.height){    
            this.scene.start('FirstGameScene'); // restart to GameScene
            score=0;
        }
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = this.game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
        }

        // Enemy Actions ~ first, move top to down
        if(gameOptions.testCounter == 52){
            gameOptions.testBool = false;
        } else if(gameOptions.testCounter == 0){
            gameOptions.testBool = true;
        }
        if(gameOptions.testBool == true){
            this.enemyBox.y--;
            gameOptions.testCounter++;
        } else {
            this.enemyBox.y++;
            gameOptions.testCounter--;
        }
        // Limit minmun of Enemy's X position 
        if(this.enemyBox.x < 0){
            this.enemyBox.x += this.game.config.width;
        }

        // endless setting of Background Img
        this.background.tilePositionX += 0.9;
    }
};



// resize the canvas's size to fit any user
/*
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
*/


export default FirstGameScene;
