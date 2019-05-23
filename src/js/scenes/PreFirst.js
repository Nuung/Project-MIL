import BaseScene from "./BaseScene";

// playGame scene
class PreFirst extends BaseScene {
    constructor(test) {
        super({
            key: 'PreFirst'
        });
    }

    create(){

    // setting the back ground
    this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
    this.add.image(0, 0, "first_intro_1").setOrigin(0).setDepth(0);

    let conti= this.add.image(400,430,"continue");

        conti.setInteractive();
        conti.on("pointerup",()=>{
            this.scene.switch('PreFirst2');
        })
    }
    update(){
    
    }

};



export default PreFirst;