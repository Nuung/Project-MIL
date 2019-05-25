import BaseScene from "./BaseScene"

class PreSecond2 extends BaseScene{

    constructor(test){
        super({
            key: 'PreSecond2'
        });
    }

    create(){
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);
    this.add.image(0, 0, "second_intro_2").setOrigin(0).setDepth(0);


        let go = this.add.image(400,450,"go");

            go.setInteractive();
            go.on("pointerup",()=>{
                this.scene.switch('SecondGameScene');
            })
    }
    update(){

    }
};

export default PreSecond2;