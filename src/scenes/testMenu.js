import Phaser from "phaser";

/*
// image assets
import backgroundImg from "./assets/image/title_bg.png";
import playbtnImg from "./assets/image/play_button.png"
import optionbtnImg from "./assets/image/options_button.png"
import logoImg from "./assets/image/logo.png.png"

var Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    function Menu() {
        Phaser.Scene.call(this, 'menu');
    },

    preload: function() {
        this.load.image("background", backgroundImg);
        this.load.image("playbtn", playbtnImg);
        this.load.image("optionbtn", optionbtnImg);
        this.load.image("logo", logoImg);
    },

    create: function() {
        this.input.keyboard.once('keyup_ONE', function () {
            this.scene.start('demo', { id: 0, image: 'acryl-bladerunner.png' });
        }, this);

        this.input.keyboard.once('keyup_TWO', function () {
            this.scene.start('demo', { id: 1, image: 'babar-phaleon-coco.png' });
        }, this);

        this.input.keyboard.once('keyup_THREE', function () {
            this.scene.start('demo', { id: 2, image: 'babar-pym-wait.png' });
        }, this);

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});
*/