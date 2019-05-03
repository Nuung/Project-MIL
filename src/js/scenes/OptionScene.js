import BaseScene from "./BaseScene";
import TitleScene from "./TitleScene";

class OptionScene extends Phaser.Scene{
    
    constructor(test) {
        super({
            key: 'OptionScene'
        });
        console.log("TitleScene Constructor Data : RECIEVED data ; "+test);
    }
    init(data){
    }
    create(){

        let MusicButton = this.add.image(730,530,"on").setScale(0.15).setDepth(1);
        let BackButton = this.add.image(50,530,"back").setScale(0.2).setDepth(1);

        MusicButton.setInteractive();
        BackButton.setInteractive();

        BackButton.on("pointerup", ()=>{
            this.scene.switch('TitleScene');
        })

        MusicButton.on("pointerover", ()=>{
            console.log("want listen to music?")
        })

        MusicButton.on("pointerout", ()=>{
            console.log("maybe not")
        })

        MusicButton.on("pointerup", ()=>{

        })
    }
}

export default OptionScene;