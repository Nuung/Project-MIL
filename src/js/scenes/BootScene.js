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
        this.load.image("title_bg", "./src/img/title_bg.jpg");
        this.load.image("options_button", "./src/img/options_button.png");
        this.load.image("play_button", "./src/img/play_button.png");
        this.load.image("logo", "./src/img/logo.png");
        this.load.image("on", "./src/img/icon_nofree.png");
        this.load.image("off", "./src/img/icon_nofree2.png");
        this.load.image("back", "./src/img/Back_b.png");
        this.load.spritesheet("cat", "./src/img/cat.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.audio("title_music", "./src/sounds/shuinvy-childhood.mp3");

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
    }
    create(){
        super.changeScene('TitleScene', "from the BootScene");
    }
}

export default BootScene;