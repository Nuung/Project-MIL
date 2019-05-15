import BaseScene from "./BaseScene";

class BootScene extends BaseScene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
        console.log("BootScene Constructor Data : RECIEVED"+test);
    }
    init() {
        // init
    }
    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // loading the menu img
        //this.load.image("title_bg", "./src/img/title_bg.jpg");
        this.load.image("title_bg", "./src/img/urban8.jpg");
        this.load.image("options_button", "./src/img/options_button.png");
        this.load.image("play_button", "./src/img/play_button.png");
        
        this.load.image("green3", "./src/img/greenbar3.png");
        this.load.image("green2", "./src/img/greenbar2.png");
        this.load.image("rect", "./src/img/start.jpg");

        this.load.image("logo", "./src/img/logo.png");
        this.load.image("on", "./src/img/icon_nofree.png");
        this.load.image("off", "./src/img/icon_nofree2.png");
        this.load.image("back", "./src/img/Back_b.png");
        this.load.image("korea","./src/img/koreaflag.png");
        this.load.image("usa","./src/img/usaflag.png");
        this.load.image("france","./src/img/franceflag.png");
        this.load.image("tabla","./src/img/tabla.png");
        this.load.image("exit","./src/img/exitLeft.png");
        this.load.spritesheet("cat", "./src/img/cat.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("bullier", "./src/img/monks.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("mar", "./src/img/Girly.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        //this.load.audio("title_music", "./src/sounds/shuinvy-childhood.mp3");
        this.load.audio("title_music", "./src/sounds/Roots_of_Legend.mp3");

        this.load.audio("hit", "./src/sounds/SFX_Hit01.ogg");

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff  //white
            }
        })

        this.load.on("progress", (percent)=>{
            //loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
            percentText.setText(parseInt(percent * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * percent, 30);
        })

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        })

        this.load.on("complete", ()=>{
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
        })

        // for FirstGameScene img
        this.load.image("platform", "./src/img/testPlatform6432.png");
        this.load.image("player", "./src/img/testPlayer3232.png");
        this.load.image("enemyBox","./src/img/testEnemy3232.png");
        this.load.image("pause", "./src/img/pause2.png");
        this.load.image("invisible_wall","./src/img/invisible_wall.png")
        //this.load.image("firstBackground", "./src/img/Background_Level_1.bmp")
        this.load.image("firstBackground", "./src/img/Blue.bmp")
        this.load.image("secondBackground", "./src/img/Background_Level_2.bmp")
        this.load.image("worldmapBackground", "./src/img/V2World.png")
        
    }
    create(){
        // super.changeScene('SimulationScene', "from the BootScene");
        this.scene.start('TitleScene');
    }
}

export default BootScene;