class GameScene extends Phaser.Scene {

    constructor() {
        super({key: "GameScene"});

        this.Speed = 2;

        this.Test = 0;
        this.GetReady = false;
        this.GameOver = false;

        this.BesCount = 0;
        this.TotalCount = 0;

        this.TotalMedalX = 192;
        this.TotalMedalY = 357;
    }

    preload() {

        this.load.image('logo', 'assets/logo.jpg');
        this.load.image('Bird', 'assets/bird.jpg');
        this.load.image('TopTube', 'assets/toptube.jpg');
        this.load.image('BottomTube', 'assets/bottomtube.jpg');
        this.load.image('Ground', 'assets/ground.jpg');
        this.load.image('ready', 'assets/GetReady.jpg');

        this.load.image("table", 'assets/TotalCount.jpg');
        this.load.image("bronze", 'assets/Medal/BronzeMedal.jpg');
        this.load.image("silver", 'assets/Medal/SilverMedal.jpg');
        this.load.image("gold", 'assets/Medal/GoldMedal.jpg');
    }

    create() {
        this.ImageLogo = this.add.sprite(250, 350, 'logo');
        this.ImageLogo.displayWidth = 500;
        this.ImageLogo.displayHeight = 900;

        this.key_spase = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add player on game world
        this.bird = this.physics.add.sprite(100, 300, 'Bird');
        this.bird.displayWidth = 40;
        this.bird.displayHeight = 30;
        this.bird.setCollideWorldBounds(true);

        this.CreateTube();

        this.Table = this.add.image(250, 350, 'table');
        this.Table.displayHeight = 100;
        this.Table.displayWidth = 200;
        this.Table.setVisible(false);

        this.TotalCountText = this.add.text(280, 30, this.TotalCount, {font: " 30px bold"})
        this.bestText = this.add.text(300, 360, this.BesCount, {font: "30px bold"});
        this.bestText.setVisible(false);

        this.CreateMedal();

        this.ready = this.add.sprite(250, 350, 'ready');
        this.ready.displayHeight = 100;
        this.ready.displayWidth = 300;

    }

    update() {
        if (!this.GameOver) {
            if (this.key_spase.isDown) {
                if (this.GetReady)
                    this.bird.body.velocity.y = -150;
                else {
                    this.GetReady = true;
                    this.ready.setVisible(false);
                }
            }
            //if get start
            if (this.GetReady) {

                //this.Top.moveAll(this.Bottom);
                this.bird.setBounce(0.4);
                this.bird.setGravity(0, 400);


                if (this.bird.y > 620) {
                    this.GameOver = true;
                }

                for (let i = 0; i < 5; i++) {
                    this.Bot[i].x -= this.Speed;
                    this.Top[i].x -= this.Speed;

                    if (this.Bot[i].x < -15)
                        this.NewPositionTube(i);
                    //check if the bird has not flown our pipe
                    if (this.Bot[i].x == 60) {
                        this.TotalCount += 1;
                        this.TotalCountText.setText(this.TotalCount);
                    }
                    this.physics.add.overlap(this.bird, this.Bot[i], this.checkOverlap, null, this);
                    this.physics.add.overlap(this.bird, this.Top[i], this.checkOverlap, null, this);

                }
            }
        } else if (this.GameOver) {
            //enable table scope
            this.Table.setVisible(true);
            this.GetMeda();

            //reposition total count
            this.TotalCountText.x = 300;
            this.TotalCountText.y = 320;
            this.BestAndTotalCount();
            this.StopGames();

            if (this.key_spase.isDown)
                this.Resumed();
        }
    }

    checkOverlap(sp1, sp2) {

        if (this.Test == 0)
            this.Test = 1;
        else {
            this.GameOver = true;
            this.Test = 0;
        }
    }

    CreateMedal() {
        this.bronze = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'bronze');
        this.bronze.displayWidth = 35;
        this.bronze.displayHeight = 35;
        this.bronze.setVisible(false);
        this.silver = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'silver');
        this.silver.displayWidth = 35;
        this.silver.displayHeight = 35;
        this.silver.setVisible(false);
        this.gold = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'gold');
        this.gold.displayWidth = 35;
        this.gold.displayHeight = 35;
        this.gold.setVisible(false);
    }

    Resumed() {
        this.TotalCount = 0;
        this.TotalCountText.x = 280;
        this.TotalCountText.y = 30;
        this.TotalCountText.setText(this.TotalCount);
        this.Table.setVisible(false);
        this.bronze.setVisible(false);
        this.silver.setVisible(false);
        this.gold.setVisible(false);
        this.GameOver = false;
        this.GetReady = false;
        this.bestText.setVisible(false);


        for (var i = 0; i < this.Top.length; i++) {
            this.Top[i].destroy();
            this.Bot[i].destroy();
        }
        this.Top = null;
        this.Bot = null;
        this.groundImg.destroy();
        this.CreateTube();
    }

    StopGames() {
        this.bird.body.velocity.y = 0;
        this.bird.setBounce(0);
        this.bird.setGravity(0, 0);
    }

    NewPositionTube(i) {

        if (i == 0) {
            this.Top[i].x = this.Top[this.Top.length - 1].x + 150;
            this.Bot[i].x = this.Top[this.Top.length - 1].x + 150;
        }
        else {
            this.Top[i].x = this.Top[i - 1].x + 150;
            this.Bot[i].x = this.Top[i - 1].x + 150;
        }
        //rand position y..
        var min = 50;
        var max = 150;

        this.Top[i].y = Math.random() * (max - min) + min;
        this.Bot[i].y = 600;

    }


    CreateTube() {

        this.Top = new Array(5);
        this.Bot = new Array(5);

        var XstartPos = 400;
        var Ymin = 50;

        var Height = 150;
        for (var i = 0; i < 5; i++) {
            if (i > 0)
                XstartPos += 150;

            this.Top[i] = this.physics.add.sprite(XstartPos, Math.random() * (Height - Ymin) + Ymin, 'TopTube');
            this.Bot[i] = this.physics.add.sprite(XstartPos, 600, 'BottomTube');

            this.Bot[i].allowGravity = false;
            this.Bot[i].immovable = true;
        }
        //create ground
        this.groundImg = this.add.sprite(250, 700, 'Ground');
        this.groundImg.displayHeight = 100;
        this.groundImg.displayWidth = 500;
    }

    GetMeda() {
        if (this.GameOver) {
            if (this.TotalCount < 15) {
                this.bronze.setVisible(true);
            }
            else if (this.TotalCount > 15 && this.TotalCount < 30) {
                this.silver.setVisible(true);
            }
            else {
                this.gold.setVisible(true);
            }
        }


    }

    BestAndTotalCount() {
        if (this.TotalCount > this.BesCount)
            this.BesCount = this.TotalCount;
        //render best count
        this.bestText.setVisible(true);
        this.bestText.setText(this.BesCount);
    }
}