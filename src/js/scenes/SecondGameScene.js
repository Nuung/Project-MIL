import BaseScene from "./BaseScene";

// global game options
let gameOptions = {

};

class SecondGameScene extends BaseScene {
    constructor(test) {
        super({
            key: 'SecondGameScene'
        });
    }

    create(){
        // setting the back ground
        this.background = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 800, 600, "secondBackground");
    }

    update(){

    }
};

export default SecondGameScene;