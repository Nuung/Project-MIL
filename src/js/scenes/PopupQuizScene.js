import BaseScene from "./BaseScene";
import i18next from 'i18next';

var recieved; // value from other scene

class PopupQuizScene extends BaseScene {
    constructor(test) {
        super({
            key: 'PopupQuizScene'
        });
        //console.log("TitleScene Constructor Data : RECIEVED data ; "+test);
    }
    init(data){
        console.log("im PopupQuizScene");
        recieved = data;
    }
    create(){
        // game width and height
        var gWidth = this.game.config.width / 2;
        var gHeight = this.game.config.height / 2;

        // test img
        var teste = this.add.image(gWidth, gHeight, 'howto').setScale(0.8);
        let contenedor = this.add.container(0,0);
        contenedor.add([teste]);

        let exitM = this.add.image(750,545,'exit');
        // to go back to main menu
        exitM.setInteractive();
        exitM.on("pointerup", ()=>{
            this.scene.switch('TitleScene');
        })

    }
    update(){
       
    }
}

export default PopupQuizScene