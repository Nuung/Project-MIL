import BaseScene from "./BaseScene";
//import SimulationGame from "../simulationGame/SimulationGameController";

class SimulationScene extends BaseScene{
    constructor() {
        super({
            key: 'SimulationScene'
        });
        this.simctrl;
    }

    preload(){
        this.load.json('jsonData', './src/data/story.json');
    }

    create(){
       // var sim = new SimulationGame();
       // sim.playStory(this);

        /*
        let singlePlayerButton = new Button(this, 10, 10, 'PLAY SINGLE PLAYER');
        singlePlayerButton.buttonDown(() => {
            console.log("Coolio!");
        // this.changeToScene('CharacterSelectionScene', {type: 'single_player'});
        });
        var q = new Question("What is the home varient of a tiger?", "cat");
        q.display();*/
    }
}
export default SimulationScene;
