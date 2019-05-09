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
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "player");
        this.cursors = this.input.keyboard.createCursorKeys();

        // enemy assets (Objects to Avoid)
        enemyGroup = this.game.add.group(); // create group

    }

    createNewEnemy() {
        if (spawnAllowed) {
            enemyGroup.create(x, y, cacheKey, frame); // add sprite to group
            queueEnemy(this.game.rnd.integerInRange(2500, 5000));// call enemy queue for random between 2.5 and 5 seconds
        }
    }

    queueEnemy(time) { // to prevent the collision -> using the queue
        this.game.time.addOnce(time, createNewEnemy); // add a timer that gets called once, then auto disposes to create a new enemy after the time given
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
         
        // if (cursors.up.isDown && player.body.touching.down) {
        //     player.setVelocityY(-330);
        // }
    }
};

export default SecondGameScene;