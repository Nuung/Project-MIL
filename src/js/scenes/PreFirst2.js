import BaseScene from "./BaseScene"

class PreFirst2 extends BaseScene{

    constructor(test){
        super({
            key: 'PreFirst2'
        });
    }

    create(){
        this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
        this.add.image(0, 0, "first_intro_2").setOrigin(0).setDepth(0);

        let go = this.add.image(400,450,"go");

            go.setInteractive();
            go.on("pointerup",()=>{
                this.scene.switch('FirstGameScene');
            })
    }
    update(){

    }
};

export default PreFirst2;