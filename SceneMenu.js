class SceneMenu extends Phaser.Scene {
    constructor() {
        super({key: "SceneMenu"});
    }

    //preload function
    preload() {
        this.load.image('logo', 'assets/logo.jpg');
    }

    //create function
    create() {
        this.ImageLogo = this.add.sprite(250, 350, 'logo');
        this.ImageLogo.displayWidth = 500;
        this.ImageLogo.displayHeight = 900;

        this.LogoText= this.add.text(220, 300, "click spase", {font: " 30px bold"})
        this.Key_Spase = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    //update function
    update() {
        if (this.Key_Spase.isDown) {
            this.scene.start("GameScene");
        }
    }

}