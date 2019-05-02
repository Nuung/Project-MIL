import BaseScene from "./BaseScene";

class OptionScene extends BaseScene {
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
            if(prueba==0){
                console.log("turn off")
                music.pause();
                prueba=1;
            }else{
                console.log("turn on")
                music.resume();
                prueba=0;
            }
        })
    }
}

export default OptionScene;