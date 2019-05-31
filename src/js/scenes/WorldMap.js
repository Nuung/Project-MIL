import BaseScene from "./BaseScene";
import i18next from 'i18next';

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
        const flagSize = 4;
        this.KoreaFlag = this.add.image(this.game.config.width - 193, this.game.config.height - 365,"flags","koreaFlag").setScale(flagSize);
        this.UsaFlag = this.add.image(180, this.game.config.height - 370,"flags", "unitedStatesFlag").setScale(flagSize);
        this.FranceFlag = this.add.image(400, this.game.config.height - 400,"flags", "franceFlag").setScale(flagSize);

        // draw the line from lands to flags 
        // line[0] = new Phaser.Curves.Line(0, 0, KoreaFlag.x, KoreaFlag.y);
        // line[1] = new Phaser.Curves.Line(0, 0, UsaFlag.x, UsaFlag.y);
        // line[2] = new Phaser.Curves.Line(0, 0, FranceFlag.x, FranceFlag.y);

        this.FranceFlag.alpha = 0.5;

        // action for flags
        this.KoreaFlag.setInteractive();
        this.UsaFlag.setInteractive();
        this.FranceFlag.setInteractive();
        this.infoText = this.add.text(80, 100, i18next.t('visitCountry')).setScale(2);

        this.KoreaFlag.on("pointerup", () => {
            //this.scene.switch('FirstGameScene');
            this.scene.launch('PreFirst',"1");
        })
        this.UsaFlag.on("pointerup", () => {
            this.scene.launch('PreFirst',"2");
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