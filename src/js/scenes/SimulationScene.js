import BaseScene from "./BaseScene";
import SimGameController from "../simulationGame/SimGameController";

class SimulationScene extends BaseScene{
    constructor() {
        super({
            key: 'SimulationScene'
        });
        //this.simctrl = null;
    }

    preload(){
        //this.load.json('descriptions', './src/data/descriptions.json');
    }

    create(){
       //this.simctrl = new SimGameController(this);
       //this.simctrl.index();
       this.changeScene("DescriptionScene");
    }
}
export default SimulationScene;
