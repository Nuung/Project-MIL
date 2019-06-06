import BaseScene from "./BaseScene";
import i18next from 'i18next';

var isSpawned = false;
var imgTimer = 0;
var imgComingsoon;
var emotionImg = new Array(4); // to control emotion img
var quizImg; // to control pop up quiz

class WorldMap extends BaseScene {
    constructor(test) {
        super({
            key: 'WorldMap'
        });
    }
    init(data){
        console.log("im worldmap");
    }
    create(){
        // game width and height
        var gWidth = this.game.config.width / 2;
        var gHeight = this.game.config.height / 2;
        // Phaser.Math.Between(0, 1); // random pop quiz

        let exitM = this.add.image(750, 545,'exit');

        // to go back to main menu
        exitM.setInteractive();
        exitM.on("pointerup", ()=>{
            this.scene.switch('TitleScene');
        })

        // setting the back ground
        this.cameras.main.setBackgroundColor('#add8e6');
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'worldmapBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // setting the interactive flags
        const flagSize = 4;
        this.KoreaFlag = this.add.image(this.game.config.width - 193, this.game.config.height - 365,"flags","koreaFlag").setScale(flagSize);
        this.UsaFlag = this.add.image(180, this.game.config.height - 370,"flags", "unitedStatesFlag").setScale(flagSize);
        this.FranceFlag = this.add.image(400, this.game.config.height - 400,"flags", "franceFlag").setScale(flagSize);
        this.FranceFlag.alpha = 0.5;

        // action for flags
        this.KoreaFlag.setInteractive();
        this.UsaFlag.setInteractive();
        this.FranceFlag.setInteractive();
        this.infoText = this.add.text(80, 100, i18next.t('visitCountry')).setScale(2);

        this.KoreaFlag.on("pointerup", () => {
            //this.scene.switch('FirstGameScene');
            this.scene.launch('PreFirst',"1");
        })
        this.UsaFlag.on("pointerup", () => {
            this.scene.launch('PreFirst',"2");
        })
        this.FranceFlag.on("pointerup", () => {
            imgComingsoon = this.add.image(400, this.game.config.height - 400, "comingsoon").setScale(1.0);
            isSpawned = true;
        })

        ///////////////////////////////////////////////////////////////////////////
        /*
        emotionImg[0] = this.add.image(110, 490, "happy"); // pop up quiz emotion
        emotionImg[1] = this.add.image(110, 490, "sad"); // pop up quiz emotion
        emotionImg[2] = this.add.image(110, 490, "think"); // pop up quiz emotion
        emotionImg[3] = this.add.image(110, 490, "normal"); // pop up quiz emotion

        for(var i = 1; i < 4; i++){
            emotionImg[i].setVisible(false);
        }

        quizImg = this.add.image(gWidth, gHeight, "quiz1").setScale(2.0); // pop up quiz

        quizImg.setInteractive();
        quizImg.on("pointerup", ()=> {
            quizImg.destroy(); 
            emotionImg[0].setVisible(false);
            emotionImg[1].setVisible(true);
        });        

        // this.input.once('pointerdown', function () {   
        //    console.log(emotionImg.texture.key);
        // });
        */
    }
    update(){
        // img timer (img effect)
        if(isSpawned) {
            imgTimer++;
        }

        // delete img 
        if(imgTimer > 60) {
            imgComingsoon.destroy();
            isSpawned = false;
            imgTimer = 0;
        }
    }
}

export default WorldMap