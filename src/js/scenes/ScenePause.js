import BaseScene from "./BaseScene";
import i18next from "i18next";

var ResumeText;
var recieved;

var ScenePause = new Phaser.Class({

    Extends: BaseScene,

    initialize:

    function ScenePause (){
        Phaser.Scene.call(this, { key: 'sceneP' });
        console.log("this is sceneP");
    },

    init: function(data){
        console.log('init', data);
        recieved = data;
    },

    preload: function ()
    {
        //this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function ()
    {
        //console.log('Im good', recieved);
        //this.add.image(400, 300, 'face').setAlpha(0.5);
        var W=this.game.config.width / 2;
        var H=this.game.config.height / 2;
        
       // let ResumeText = this.add.text( W- 250, H+100, i18next.t('exitpause')).setScale(2);

        let pause = this.add.image(W,H,'play_again').setScale(3);

        let contenedor = this.add.container(0,-300);
        contenedor.add([pause]);

        this.tweens.add({
            targets: contenedor,
            duration: 600,
            ease: 'Power1',
            y: 0
        });

         this.input.once('pointerdown', function () {
             if(recieved=='1'){
                this.scene.resume('FirstGameScene');
             }else if(recieved == '2'){
                // (hyeon) change to start, cuz data of game
                this.scene.start('SecondGameScene');
             }else {
                this.scene.resume('SecondGameScene');
             }
             this.scene.stop();
         }, this);

        this.scene.bringToTop();
    }

});

export default ScenePause;