import BaseScene from "./BaseScene";
import { setInterval } from "timers";

// global game options
var spawnAllowed = true; // check the value for spawn 
var spawnTimer = 0;

var timedEvent2;
var text2;
var scoreText2;

var touch;
var ResumeText;

class SecondGameScene extends BaseScene {

    constructor(test) {
        super({
            key: 'SecondGameScene'
        });
    }

    create(){

        // for the HP bar
        touch = 0;

        // setting the back ground
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // player assets
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();

        // Ading pause btn and pause scene and score and Time /// AKA HUD
        let PauseButton2 = this.add.image(625,65,"pause").setScale(0.8).setDepth(1);
        this.add.image(275,95, "green3").setScale(2); //original
        this.Green = this.add.image(275,125, "green2").setScale(2);
        scoreText2 = this.add.text(150, 100, 'Score: 0').setScale(2);
        timedEvent2 = this.time.addEvent({ delay: 100000, loop: true });
        text2 = this.add.text(this.game.config.width / 2, 50);
        var start = this.add.image(400,300, "rect").setScale(0.6);

        start.alpha = 0.5;

        // enemy assets (Objects to Avoid)
        // group with all active platforms.
        this.enemyGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.enemyPool.add(platform);
            }
        });
 
        // pool
        this.enemyPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.enemyGroup.add(platform);
            }
        });

        // to pause the game
        PauseButton2.setInteractive();
        PauseButton2.on("pointerup", ()=>{ 
            this.scene.pause();
            this.scene.launch('sceneP', "2");
        });

        // to limit player area
        {
            this.invisible_wallLeft = this.physics.add.sprite(100, 0, 'invisible_wall');
            this.invisible_wallRight = this.physics.add.sprite(this.game.config.width - 100, 0, 'invisible_wall');
            this.invisible_wallLeft.setDisplaySize(30, this.game.config.height * 2);
            this.invisible_wallRight.setDisplaySize(30, this.game.config.height * 2);
            this.invisible_wallLeft.fixedToCamera = true;
            this.invisible_wallLeft.body.immovable = true;
            this.invisible_wallLeft.body.allowGravity = false;
            this.invisible_wallRight.fixedToCamera = true;
            this.invisible_wallRight.body.immovable = true;
            this.invisible_wallRight.body.allowGravity = false;
            this.physics.add.collider(this.player, this.invisible_wallLeft);
            this.physics.add.collider(this.player, this.invisible_wallRight);
        }
    }

    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(){

        let platform;
        
        platform = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), 
            Phaser.Math.Between(0, this.game.config.height), 
            'badWords'+ Phaser.Math.Between(1, 18)
        ).setScale(0.5);
        
        // the last parameter is speed
        this.physics.moveTo(platform, this.player.x, this.player.y, Phaser.Math.Between(120, 200));
        this.enemyGroup.add(platform);
    }

    setPercent(percent){
        percent = percent/100;
        this.Green.setDisplaySize(300*percent*2, 145*2);
        if(percent == 0){
            this.scene.start('SecondGameScene');            
        }
    }

    update(){
        // char moving actions and Animations (keyboard isDown)
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            // player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            // player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown && this.player.y > 0) {
            this.player.setVelocityY(-160);
            // player.anims.play('right', true);
        }
        else if (this.cursors.down.isDown && this.player.y < this.game.config.height) {
            this.player.setVelocityY(160);
            // player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            // player.anims.play('turn');
        }

        //Time elapsed
        text2.setText(Math.trunc(timedEvent2.getProgress().toString().substr(0, 4)*100)).setScale(2);

        // recycling platforms
        this.enemyGroup.getChildren().forEach(function(platform){
            if(platform.x < - platform.displayWidth / 2 || platform.y < - platform.displayHeight / 2 ){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
            } // if

            if(this.physics.overlap(this.player, platform, null, null, this)){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
                touch++;
                this.setPercent(50-touch*5);
                console.log(touch);
            }
        }, this);
    
        // adding new platforms
        if(spawnTimer > 40 && spawnAllowed){
            this.addPlatform();
            spawnTimer = 0;
        }

        // spawn Time counter
        spawnTimer++;
    }
};

export default SecondGameScene;