import BaseScene from "./BaseScene";

class WorldMap extends BaseScene {
    constructor(test) {
        super({
            key: 'WorldMap'
        });
        //console.log("TitleScene Constructor Data : RECIEVED data ; "+test);
    }
    init(data){
    }
    create(){

        // setting the back ground
        this.cameras.main.setBackgroundColor('#add8e6');
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'worldmapBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // setting the interactive flags
        let KoreaFlag = this.add.image(this.game.config.width - 120, this.game.config.height - 350, "korea").setScale(0.05);
        let UsaFlag = this.add.image(100, this.game.config.height - 350, "usa").setScale(0.06);
        let FranceFlag = this.add.image(400, this.game.config.height - 400, "france").setScale(0.2);

        // action for flags
        KoreaFlag.setInteractive();
        UsaFlag.setInteractive();
        FranceFlag.setInteractive();
        Text = this.add.text(80, 100, 'Choose the country you want to go').setScale(2);

        KoreaFlag.on("pointerup", () => {
            this.scene.switch('FirstGameScene');
        })
        UsaFlag.on("pointerup", () => {
            this.scene.switch('SecondGameScene');
        })
        
    }
}

export default WorldMap