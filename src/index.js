import _ from 'lodash';
import Phaser from "phaser";
import BootScene from './js/scenes/BootScene';
import TitleScene from './js/scenes/TitleScene';
import ScenePause from './js/scenes/ScenePause';
import SimulationScene from './js/scenes/SimulationScene';
import DiscussionScene from './js/scenes/DiscussionScene';
import DescriptionScene from './js/scenes/DescriptionScene';
import GameIntroductionScene from './js/scenes/GameIntroductionScene';

// For Mini Game Scenes
import WorldMap from './js/scenes/WorldMap';
import FirstGameScene from './js/scenes/FirstGameScene';
import SecondGameScene from './js/scenes/SecondGameScene';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'game_content',
    width: 800,
    height: 595,
    backgroundColor: 0x444444,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        BootScene,
        GameIntroductionScene,
        TitleScene,
        WorldMap,
        ScenePause,
        SimulationScene,
        DiscussionScene,
        DescriptionScene,
        FirstGameScene,
        SecondGameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars