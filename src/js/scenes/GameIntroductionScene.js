import BaseScene from "./BaseScene";
import StoryMarkUp from "../simulationGame/story/StoryMarkup";

class GameIntroductionScene extends BaseScene{
    
    constructor(){
        super("GameIntroductionScene");
        this.nextScene = "";
        this.markUpStory = new StoryMarkUp();
        //this.button = new Button(this,20,20,"next story");
    }
    
    init(data){
        this.nextScene = data.nextDisplayItem;
    }

    preload(){
        this.load.json("storyJson",'src/data/story.json');
        this.load.html('intro','src/html/introduction.html');
        this.load.css('introductionCss', 'src/css/game.css');
    }

    create(){
        //var paragraph = document.createElement('p');
        var element = this.add.dom(200, 100).createFromCache('intro');
        var paragraph = document.querySelector(".introduction p");
        element.setPerspective(0);
        this.markUpStory.typeEffect(paragraph, 75, "This is the best story in the world!");
        
        element.addListener('click');
        element.on('click', (event) =>{
        if(event.target.name === "skipbutton"){
            this.changeScene("FirstGameScene");
        }   
        });
    }
}
export default GameIntroductionScene;