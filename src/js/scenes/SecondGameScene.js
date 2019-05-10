import BaseScene from "./BaseScene";

// global game options
var spawnAllowed = true; // check the value for spawn 
var enemyGroup;

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
        this.hoverSprite = this.add.sprite(100, 100, 'cat'); // add test sprite
        this.hoverSprite.setScale(2);
        this.hoverSprite.setVisible(false);
        enemyGroup = this.add.group(); // create group

        // Phaser.Math.Between(0, this.game.config.width) 
        // Phaser.Math.Between(0, this.game.config.height)
        
        // animation (for test)
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers('cat', {
                frames: [0,1,2,3]
            })
        })
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
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            // player.anims.play('right', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            // player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            // player.anims.play('turn');
        }
    }
};

export default SecondGameScene;