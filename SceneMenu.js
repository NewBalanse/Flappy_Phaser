class SceneMenu extends Phaser.Scene {
    constructor() {
        super({key: "SceneMenu"});
    }

    //preload function
    preload() {
        this.load.image('logo', 'assets/logo.jpg');
        this.load.image('play_btn', 'assets/playBtn.jpg');
    }

    //create function
    create() {
        this.ImageLogo = this.add.sprite(250, 350, 'logo');
        this.ImageLogo.displayWidth = 500;
        this.ImageLogo.displayHeight = 900;

        this.ImagePlay_btn = this.add.sprite(250, 350, 'play_btn');
        this.ImagePlay_btn.inputEnabled = true;

        this.Key_Spase = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    //update function
    update() {
        if (this.Key_Spase.isDown) {
            this.scene.start("GameScene");
        }
    }

}