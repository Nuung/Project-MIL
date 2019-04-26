import Phaser from "phaser";
import {CST} from "../CST"; 

// img loading
import title_bgImg from "./assets/title_bg.png";
// import options_buttonImg from "./assets/options_button.png";
// import play_buttonImg from "./assets/play_button.png";
// import logoImg from "./assets/logo.png";
// import icon_nofreeImg from "./assets/icon_nofree.png";
// import icon_nofree2Img from "assets/icon_nofree2.png";
// import catImg from "assets/cat.png";
// import titleMusic from "assets/shuinvy-childhood.mp3"

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // load image assets
        this.load.image("title_bg", title_bgImg);
        // this.load.image("options_button", options_buttonImg);
        // this.load.image("play_button", play_buttonImg);
        // this.load.image("logo", logoImg);
        // this.load.image("on", icon_nofreeImg);
        // this.load.image("off", icon_nofree2Img);
        // this.load.spritesheet("cat", catImg, {
        //     frameHeight: 32,
        //     frameWidth: 32
        // });

        // load music assets
        // this.load.audio("title_music", titleMusic);

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff  //white
            }
        })

        // loading scene
        this.load.on("progress", (percent)=>{
            //loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
            percentText.setText(parseInt(percent * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * percent, 30);
        })

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        })

        this.load.on("complete", ()=>{ // end of the loading
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
        })
    }
    create(){
        this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
    }
}