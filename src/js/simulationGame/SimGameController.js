import StoryFactory from "./story/StoryFactory";

class SimGameController{
    constructor(scene){
        this.initialChapter = "c1";
        this.initialId = 1;
        this.isStopped = false;
        this.scene = scene;
        this.storyFact = null;
    }
    
    index(){
        this.storyFact = new StoryFactory();
        //this.loadChapter();
        console.log("Booh");
        //console.log(this.scene.cache.json.get("descriptions"));
        this.startStory();
    }

    startStory(){
        console.log("Start the Game");
        
    }

    loadChapter(){
        //this.storyFact.createChapter(this.initialChapter,this.initialId);
    }
}
export default SimGameController;