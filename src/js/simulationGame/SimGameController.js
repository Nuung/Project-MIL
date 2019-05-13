import StoryFactory from "./story/StoryFactory";
import StoryMarkUp from "./story/StoryMarkup";


class SimGameController{
    constructor(scene){
        this.initialChapter = "c1";
        this.initialId = 1;
        this.isStopped = false;
        this.scene = scene;
        this.markup = new StoryMarkUp();
        this.storyFact = new StoryFactory();
    }
    
    index(){
        this.startStory();
    }

    startStory(){
        console.log("Start the Game");
        this.loadNextChapter();
        
        this.markup.setSimulationViewVisible("Discussion");
        this.markup.setSimulationViewVisible("Description");
    }

    loadNextChapter(){

        // Create callback for the next chapter.
        // load description or discussion;
        // call back to load new chapter

        // if(this.isStopped){
        //     this.hasEnded();
        // }else{
        //     this.loadNextChapter();
        // }
        

    }

    hasEnded(){
        this.scene.changeScene("BootScene");
    }
}
export default SimGameController;