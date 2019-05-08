class WorldMap extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'WorldMap'
        });
        //console.log("TitleScene Constructor Data : RECIEVED data ; "+test);
    }
    init(data){
    }
    create(){

        let KoreaFlag = this.add.image(600,300,"korea").setScale(0.1).setDepth(1);
        let UsaFlag = this.add.image(200,300,"usa").setScale(0.125).setDepth(1);
        let FranceFlag = this.add.image(400,300,"france").setScale(0.5).setDepth(1);

        KoreaFlag.setInteractive();
        UsaFlag.setInteractive();
        FranceFlag.setInteractive();
        Text = this.add.text(80, 100, 'Choose the country you want to go').setScale(2);

        
        KoreaFlag.on("pointerup", ()=>{
            this.scene.switch('GameScene');
        })
        UsaFlag.on("pointerup", ()=>{
            this.scene.switch('Ch2GameScene');
        })
    }
}

export default WorldMap