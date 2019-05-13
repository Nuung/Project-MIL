import BaseScene from "./BaseScene";

// global game options
var spawnAllowed = true; // check the value for spawn 
var spawnTimer = 0;

class SecondGameScene extends BaseScene {

    constructor(test) {
        super({
            key: 'SecondGameScene'
        });
    }

    create(){
        // setting the back ground
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // player assets
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();

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
        
        // animation (for test)
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers('cat', {
                frames: [0,1,2,3]
            })
        })

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
            'cat'
        );
        
        this.physics.moveTo(platform, this.player.x, this.player.y, Phaser.Math.Between(120, 200));
        this.enemyGroup.add(platform);
        platform.play("walk");
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

        // recycling platforms
        this.enemyGroup.getChildren().forEach(function(platform){
            if(platform.x < - platform.displayWidth / 2 || platform.y < - platform.displayHeight / 2 ){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
            } // if

            if(this.physics.overlap(this.player, platform, null, null, this)){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
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