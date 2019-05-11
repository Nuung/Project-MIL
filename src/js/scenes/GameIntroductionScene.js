import BaseScene from "./BaseScene";

class GameIntroductionScene extends BaseScene{
    
    constructor(){
        super("GameIntroductionScene");
        this.nextScene = "";
        //this.button = new Button(this,20,20,"next story");
    }
    
    init(data){
        console.log(data)
        this.nextScene = data.nextDisplayItem;
    }

    preload(){
        this.load.html('intro','src/html/introduction.html');
        this.load.css('introductionCss', 'src/css/game.css');
    }

    create(){
        var element = this.add.dom(200, 100).createFromCache('intro');
        element.setPerspective(800);
        element.addListener('click');
        element.on('click', (event) =>{
        if(event.target.name === "skipbutton"){
            this.changeScene("FirstGameScene");
        }   
        });
    }
}
export default GameIntroductionScene;