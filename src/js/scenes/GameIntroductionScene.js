import BaseScene from "./BaseScene";

class GameIntroductionScene extends BaseScene{
    
    constructor(){
        super("GameIntroductionScene");
        this.nextScene = null;
        //this.button = new Button(this,20,20,"next story");
    }

    init(data){
        //this.nextScene = data.nextScene;
    }
    
    preload(){
        this.load.html('intro','src/html/introduction.html');
        console.log("ha");
        this.load.css('80s', 'src/css/game.css');
        console.log("bla");
        //this.load.css('game', 'src/css/game.css');
    }

    create(){
        var element = this.add.dom(200, 100).createFromCache('intro');
        element.setPerspective(800);
/*
        this.tweens.add({
            targets: [ element ],
            y: 500,
            duration: 3000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });
*/
        //this.add.DOM();
    }
}
export default GameIntroductionScene;