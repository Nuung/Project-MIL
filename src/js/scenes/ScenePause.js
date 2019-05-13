import BaseScene from "./BaseScene";

var ResumeText;

var ScenePause = new Phaser.Class({

    Extends: BaseScene,

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
        //console.log("YA ENTRE WE")
        //this.add.image(400, 300, 'face').setAlpha(0.5);
        var W=this.game.config.width / 2;
        var H=this.game.config.height / 2;
        let ResumeText = this.add.text( W- 250, H+100, 'Pulse anywhere to continue').setScale(2);

        let exitB= this.add.image(W,H,'exit');

        exitB.setInteractive();
        exitB.on("pointerdown", () => {
            //this.scene.remove('FirstGameScene');
            //this.scene.stop();
            //this.scene.launch('TitleScene');
            // this.changeScene('TitleScene');
            console.log("Lets See");
            
            // this.scene.launch('TitleScene');
        });

        let pause = this.add.image(W,H,'tabla').setScale(3);

        let contenedor = this.add.container(0,-300);
        contenedor.add([ResumeText,pause,exitB]);

        this.tweens.add({
            targets: contenedor,
            duration: 600,
            ease: 'Power1',
            y: 0
        });

         this.input.once('pointerdown', function () {
             this.scene.resume('FirstGameScene');
             this.scene.stop();
         }, this);

        this.scene.bringToTop();
    }

});

export default ScenePause;