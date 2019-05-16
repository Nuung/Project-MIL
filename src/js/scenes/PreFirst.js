import BaseScene from "./BaseScene";

// playGame scene
class PreFirst extends BaseScene {
    constructor(test) {
        super({
            key: 'PreFirst'
        });
    }

    create(){

    // setting the back ground
    this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);

    let exitM= this.add.image(750,545,'exitR');

        // to go back to main menu
        exitM.setInteractive();
        exitM.on("pointerup", ()=>{
            this.scene.switch('FirstGameScene');
        })

    const creditsTextArray = [
        'YOU WILL PLAY AS MISUN\n',
        'ONE CLASSMATE OF HER IS JELLOUS BECAUSE SHE ALWAYS\n',
        'POSTS IN SOCIAL MEDIA PHOTOS AND ABOUT HER LIFE.',
        'HER CLASSMATE DECIDES TO TAKER HER BAG AS A MISCHIEF AND INSIDE HE FOUND',
        'HER PHONE AND THEN START TEXTING AS HE WAS MISUN',
        'AND CREATED WITH PHASER 3'
    ];

    const creditsText = this.add.bitmapText(
        this.scale.width / 2,
        this.scale.height / 2,
        'font',
        creditsTextArray, 16, 1
    ).setOrigin(0.5);

    /*const textArray = {
        text: [
            'IN THE YEAR OF 200X,\n\nA SUPER ROBOT NAMED MEGAMAN',
            'WAS CREATED.\n\nDR.LIGHT CREATED MEGAMAN',
            'TO STOP THE EVIL DESIRES\n\nOF DR.WILY.',
            'HOWEVER, AFTER HIS DEFEAT,\n\nDR.WILY CREATED EIGHT',
            'OF HIS OWN ROBOTS\n\nTO COUNTER MEGAMAN.'
        ],
        count: 0
    };

    const historyText = this.add.bitmapText(0,0,'font', textArray.text[0])
        .setCenterAlign()
        .setDepth(2);
        Phaser.Display.Align.In.BottomCenter(
            historyText,
            this.add.zone(0, 60, 512, 480).setOrigin(0)
        );*/
    }

    update(){
    
    }

};

export default PreFirst;