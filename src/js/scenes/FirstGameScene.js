import BaseScene from "./BaseScene";

// global game options
var timedEvent;
var text;
var scoreText;
var score = 0;
var spacebar;
var PButton;
let hitten; // for global hit sound effect

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [0, 10], // Range of blocks (platform group) 100 ~ 140 is good
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

        //set sound effect when player hit enemy
        hitten = this.sound.add('hit',{loop:false});

        //create the spacebar key
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        PButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // setting the back ground
        this.background = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 800, 600, "firstBackground");

        // Ading pause btn and pause scene and score and Time and exit /// AKA HUD
        let PauseButton = this.add.image(750,65,"pause").setScale(0.8).setDepth(1);
        scoreText = this.add.text(50, 50, 'Score: 0').setScale(2);
        timedEvent = this.time.addEvent({ delay: 100000, loop: true });
        text = this.add.text(this.game.config.width / 2, 50);
        let exitC= this.add.image(750,105,'exit');

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

        // item assets (Objects to get -> for effects)
        this.itemGroup = this.add.group({
            removeCallback: function(platform){
                platform.scene.itemPool.add(platform);
            }
        });
    
        // pool
        this.itemPool = this.add.group({
            removeCallback: function(platform){
                platform.scene.itemGroup.add(platform);
            }
        });

        // to go back to world menu
        exitC.setInteractive();
        exitC.on("pointerup", ()=>{
            this.scene.start('WorldMap');
        })

        // to pause the game
        PauseButton.setInteractive();
        PauseButton.on("pointerup", ()=>{
            this.scene.pause();
            this.scene.launch('sceneP', "1");
        })
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(this.game.config.width, this.game.config.width / 2);
 
        // adding the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height / 2, "mar");
        this.player.setGravityY(gameOptions.playerGravity);
 
        // adding the enemyBox
        this.enemyBox = this.physics.add.sprite(gameOptions.playerStartPosition + 320, this.game.config.height / 2 + 60, "bullier");
        this.enemyBox.setGravityX(-10);
        this.enemyBox.setScale(2);
        this.player.setScale(2);

        // Animate the girl/boy and bullier
        this.anims.create({
            key: "run",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("bullier", {
                //frames: [6,7,8,9,10]
                frames: [0,1,2,3]
            })
        })

        this.anims.create({
            key: "marmove",
            frameRate: 5,
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
        this.enemyBox.setBounce(0.9);
        // this.enemyBox.body.checkCollision.up = false;
        // this.enemyBox.body.checkCollision.down = false;
        this.physics.add.collider(this.enemyBox, this.invisible_wallTop);
        this.physics.add.collider(this.enemyBox, this.invisible_wallDown);

        // checking for input
        this.input.on("pointerdown", this.jump, this);
    }

    addItems(){
        console.log("call addItems");

        let platform;
        platform = this.physics.add.sprite(this.enemyBox.x + 30, this.enemyBox.y, "cellphoneIcon").setScale(0.39);
        platform.setGravityY(gameOptions.playerGravity);
        this.itemGroup.add(platform);
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
        this.player.x = gameOptions.playerStartPosition; // fix the player to the screen

        // game over
        if(this.player.y > this.game.config.height){    
            this.scene.start('FirstGameScene'); // restart to GameScene
            score=0;    
        }

        // get items whenever overlap the enemy
        this.physics.add.collider(this.player, this.enemyBox, function(){
            // this.addItems();
            console.log("collision event");
            score += 10;
            scoreText.setText('Points: '+score);
            hitten.play(); // sound effect
        });

        // spacebar jump action
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
                if(this.player.body.touching.down){
                    this.playerJumps = 0;
                } // most inner if
                this.player.setVelocityY(gameOptions.jumpForce * -1);
                this.playerJumps ++;
            } // inner if
        } // if

        // when press the pause btn
        if (Phaser.Input.Keyboard.JustDown(PButton)){
            this.scene.pause();
            this.scene.launch('sceneP');
        }

        //Time elapsed
        text.setText(Math.trunc(timedEvent.getProgress().toString().substr(0, 4)*100)).setScale(2);
 
        // recycling platforms
        let minDistance = this.game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2 - 100;///change the width of platform
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // recycling platforms and add function
        this.itemGroup.getChildren().forEach(function(platform){
            if(this.physics.overlap(this.player, platform, null, null, this)){
                this.itemGroup.killAndHide(platform);
                this.itemGroup.remove(platform);
                console.log("getting items");
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

export default FirstGameScene;
