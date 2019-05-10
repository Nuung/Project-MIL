var ResumeText;

var ScenePause = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function ScenePause (){
        Phaser.Scene.call(this, { key: 'sceneP' });
        console.log("this is sceneP");
    },

    preload: function ()
    {
        //this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function ()
    {
        console.log("YA ENTRE WE")
        //this.add.image(400, 300, 'face').setAlpha(0.5);
        ResumeText = this.add.text(this.game.config.width / 2 - 250, this.game.config.height / 2, 'Pulse anywhere to continue').setScale(2);

        this.add.image(10,10,'tabla').setScale(3);

        this.input.once('pointerdown', function () {
            this.scene.resume('FirstGameScene');
            this.scene.stop();
        }, this);
        
        this.scene.bringToTop();
    }

});

export default ScenePause;