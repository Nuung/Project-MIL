
// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    enemyStartPosition: 400,
    jumps: 2,

    // just for testing
    testCounter: 0,
    testBool: true
}

// playGame scene
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    init(data){
        console.log(data);
        console.log("RECIEVED in GameScene ~ Data");
    }

    preload(){
        this.load.image("platform", "assets/testPlatform6432.png");
        this.load.image("player", "assets/testPlayer3232.png");
        this.load.image("enemyBox","assets/testEnemy3232.png")
    }

    create(){
 
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(this.game.config.width, this.game.config.width / 2);
 
        // adding the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height / 2, "player");
        this.player.setGravityY(gameOptions.playerGravity);
 
        // adding the enemyBox
        this.enemyBox = this.physics.add.sprite(gameOptions.playerStartPosition + 320, this.game.config.height / 2, "enemyBox");
        this.enemyBox.setGravityX(-20);

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.collider(this.player, this.enemyBox, function(){
            console.log("collision event");
        });
        this.enemyBox.setBounce(3.0);
        
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
            platform = this.physics.add.sprite(posX, this.game.config.height * 0.8, "platform");
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
 
        // game over
        if(this.player.y > this.game.config.height){
            this.scene.start('GameScene'); // restart to GameScene
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

        // Enemy Actions
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

        // if(this.enemyBox.x < this.player.x){
        //     this.enemyBox.x += 256;
        // }
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

export default GameScene;