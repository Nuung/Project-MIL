import BaseScene from "./BaseScene";

// line drawing setting
var line = new Array(3);

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

        let exitM= this.add.image(750,545,'exit');

        // to go back to main menu
        exitM.setInteractive();
        exitM.on("pointerup", ()=>{
            this.scene.switch('TitleScene');
        })

        // setting the back ground
        this.cameras.main.setBackgroundColor('#add8e6');
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'worldmapBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // setting the interactive flags
        this.KoreaFlag = this.add.image(this.game.config.width - 120, this.game.config.height - 350, "korea").setScale(0.05);
        this.UsaFlag = this.add.image(100, this.game.config.height - 350, "usa").setScale(0.06);
        this.FranceFlag = this.add.image(400, this.game.config.height - 400, "france").setScale(0.2);

        // draw the line from lands to flags 
        // line[0] = new Phaser.Curves.Line(0, 0, KoreaFlag.x, KoreaFlag.y);
        // line[1] = new Phaser.Curves.Line(0, 0, UsaFlag.x, UsaFlag.y);
        // line[2] = new Phaser.Curves.Line(0, 0, FranceFlag.x, FranceFlag.y);

        // action for flags
        this.KoreaFlag.setInteractive();
        this.UsaFlag.setInteractive();
        this.FranceFlag.setInteractive();
        this.infoText = this.add.text(80, 100, 'Choose the country you want to go').setScale(2);

        this.KoreaFlag.on("pointerup", () => {
            //this.scene.switch('FirstGameScene');
            this.scene.switch('PreFirst');
        })
        this.UsaFlag.on("pointerup", () => {
            this.scene.switch('SecondGameScene');
        })
    }
    // update(){
    //     line[0].fromSprite(this.KoreaFlag, false);
    // }
    // render(){
    //     for (let index = 0; index < line.length; index++) {
    //         this.game.debug.geom(line[index]);
    //     } // for
    // }
}

export default WorldMap