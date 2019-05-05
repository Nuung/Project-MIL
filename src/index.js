import _ from 'lodash';
import Phaser from "phaser";
import BootScene from './js/scenes/BootScene';
import GameScene from './js/scenes/GameScene';
import TitleScene from './js/scenes/TitleScene';
import ScenePause from './js/scenes/ScenePause';
import OptionScene from './js/scenes/OptionScene';
import WorldMap from './js/scenes/WorldMap';
import Ch2GameScene from './js/scenes/Ch2GameScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'game_content',
    width: 800,
    height: 600,
    backgroundColor: 0x444444,
    physics: {
        default: 'arcade',
        arcade: {
        //     gravity: {
        //         y: 800
        //     },
            debug: true
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        ScenePause,
        OptionScene,
        WorldMap,
        Ch2GameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars