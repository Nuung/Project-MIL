import BaseScene from "./BaseScene";

// playGame scene
class PreSecond extends BaseScene {
    constructor(test) {
        super({
            key: 'PreSecond'
        });
    }

    create(){

    // setting the back ground
    this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
    this.background.setDisplaySize(this.game.config.width, this.game.config.height);
    this.add.image(0, 0, "second_intro_1").setOrigin(0).setDepth(0);

    let conti= this.add.image(400,430,"continue");

        conti.setInteractive();
        conti.on("pointerup",()=>{
            this.scene.switch('PreSecond2');
        })
    }
    update(){
    
    }

};

export default PreSecond;