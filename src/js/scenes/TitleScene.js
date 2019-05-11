import BaseScene from "./BaseScene";

// for control of music
var music;
var prueba = 0;

class TitleScene extends BaseScene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
      //  console.log("TitleScene Constructor Data : RECIEVED data ; "+test);
    }
    init(data){
       // console.log("TitleScene Init Data : RECIEVED");
       // console.log(data);
    }
    create(){

        //CREATE IMAGES
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);

        //btn setting
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1);
        let OptionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1);

        //SPRITES
        let hoverSprite = this.add.sprite(100, 100, "cat");
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);

        //SOUND!
        //this.sound.pauseOnBlur = false; //only to keep playing music
        music = this.sound.add("title_music", {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            //loop: true
        })
        music.play();
        //ANIMATION
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("cat", {
                frames: [0,1,2,3]
            })
        })

        //POINTEREVENTS
        playButton.setInteractive();
        OptionButton.setInteractive();

        playButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
        })

        playButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
            console.log("out of here")
        })

        playButton.on("pointerup", ()=>{ // starting the game -> to GameScene
            // super.changeScene('FirstGameScene');
            // console.log("open the gates please")
            this.changeScene("GameIntroductionScene", {nextDisplayItem:"FirstGameScene"});
        })

        OptionButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y + 100;
        })

        OptionButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
            console.log("out of here")
        })

        OptionButton.on("pointerup", ()=>{
            this.createWindow(OptionSetting);
        })
    }

    createWindow(func) {
        var x = 0;
        var y = 0;

        var handle = 'window' + this.count++;
        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT);
        var demo = new func(handle, win);
        this.scene.add(handle, demo, true);
        demo.refresh();
    }
}

class OptionSetting extends Phaser.Scene {

    constructor (handle, parent)
    {
        super(handle);
        this.parent = parent;
    }

    create ()
    {
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);

        // It should be changed relative to the window size.
        var MusicButton = this.add.image(730,530,"on").setScale(0.15).setDepth(1);
        var BackButton = this.add.image(50,530,"back").setScale(0.2).setDepth(1);

        MusicButton.setInteractive();
        BackButton.setInteractive();

        BackButton.on("pointerup", ()=>{
            this.scene.remove(this.handle);
        })

        MusicButton.on("pointerover", ()=>{
            console.log("want listen to music?")
        })

        MusicButton.on("pointerout", ()=>{
            console.log("maybe not")
        })

        MusicButton.on("pointerup", ()=>{
            if(prueba == 0){
                console.log("turn off")
                music.pause();
                prueba = 1;
            }else{
                console.log("turn on")
                music.resume();
                prueba = 0;
            }
        })
    }

    update ()
    {

    }

    refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
    }

}


export default TitleScene;