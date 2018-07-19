class GameScene extends Phaser.Scene {

    constructor() {
        super({key: "GameScene"});

        this.Speed = 2;


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
        this.TopTube = new Array(5);
        this.BottomTube = new Array(5);

        this.ImageLogo = this.add.sprite(250, 350, 'logo');
        this.ImageLogo.displayWidth = 500;
        this.ImageLogo.displayHeight = 900;
        this.key_spase = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //function create tube;
        this.CreateTube();

        //create ground
        this.groundImg = this.add.sprite(250, 700, 'Ground');
        this.groundImg.displayHeight = 100;
        this.groundImg.displayWidth = 500;

        //add player on game world
        this.bird = this.physics.add.image(100, 300, 'Bird');
        this.bird.displayWidth = 40;
        this.bird.displayHeight = 30;

        this.bird.setCollideWorldBounds(true);

        this.Table = this.add.image(250, 350, 'table');
        this.Table.displayHeight = 100;
        this.Table.displayWidth = 200;
        this.Table.setVisible(false);

        this.TotalCountText = this.add.text(250, 30, this.TotalCount, {font: " 30px bold"})

        this.bronze = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'bronze');
        this.bronze.displayWidth = 35;
        this.bronze.displayHeight = 35;
        this.bronze.setVisible(false);

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

                this.bird.setBounce(0.4);
                this.bird.setGravity(0, 400);
                if (this.bird.y > 620) {
                    this.GameOver = true;
                }

                for (let i = 0; i < this.TopTube.length; i++) {
                    if (this.TopTube[i].x > -15) {
                        this.TopTube[i].x -= this.Speed;
                        this.BottomTube[i].x -= this.Speed;
                    }
                    else {
                        this.NewPositionTube(i);
                    }


                    //check if the bird has not flown our pipe
                    if (this.BottomTube[i].x == 60) {

                        this.TotalCount += 1;
                        this.TotalCountText.setText(this.TotalCount);
                    }

                }
            }
        }
        else if (this.GameOver) {

            //enable table scope
            this.Table.setVisible(true);

            this.GetMeda();
            //reposition total count
            this.TotalCountText.x = 300;
            this.TotalCountText.y = 320;

            this.BestAndTotalCount();
            this.StopGames();

            for (var i = 0; i < this.TopTube.length; i++) {
                this.TopTube[i].x = 1000;
                this.BottomTube[i].x = 1000;
            }

            if (this.key_spase.isDown)
                this.Resumed();
        }
    }

    Resumed() {
        this.Table.setVisible(false);
        this.bronze.setVisible(false);
        this.GameOver = false;
        this.CreateTube();



        this.best.destroy();
    }

    StopGames() {
        this.bird.y = 300;
        this.bird.body.velocity.y = 0;
        this.bird.setBounce(0);
        this.bird.setGravity(0, 0);
    }

    NewPositionTube(i) {
        if (i == 0) {
            this.TopTube[i].x = this.TopTube[this.TopTube.length - 1].x + 180;
            this.BottomTube[i].x = this.TopTube[this.TopTube.length - 1].x + 180;
        } else {
            this.TopTube[i].x = this.TopTube[i - 1].x + 150;
            this.BottomTube[i].x = this.TopTube[i - 1].x + 150;

        }
        //rand position y..
        this.RandPositionY(i)
    }

    RandPositionY(i) {
        this.min = this.TopTube[i].displayHeight / 2;
        this.max = this.TopTube[i].displayHeight;

        this.TopTube[i].y = Math.random() * (this.max - this.min);
        this.BottomTube[i].y = this.TopTube[i].y + 100 + this.BottomTube[i].displayHeight;
    }

    CreateTube() {
        var X = 400;
        var Y = 200;
        var Height = 400;
        var Width = 50;
        //generations tube
        for (var i = 0; i < this.TopTube.length; i++) {

            if (i > 0) {
                X += 180;
            }

            this.TopTube[i] = this.add.sprite(X,
                Math.random() * (Height - Y),
                'TopTube');

            this.BottomTube[i] = this.add.sprite(X,
                this.TopTube[i].y + 100 + Height,
                'BottomTube');

            this.TopTube[i].displayWidth = Width;
            this.TopTube[i].displayHeight = Height;

            this.BottomTube[i].displayHeight = Height;
            this.BottomTube[i].displayWidth = Width;
        }
    }

    GetMeda() {
        if (this.GameOver) {
            if (this.TotalCount < 15) {
                this.bronze.setVisible(true);
            }
            else if (this.TotalCount > 15 && this.TotalCount < 30) {
                this.silver = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'silver');
                this.silver.displayWidth = 35;
                this.silver.displayHeight = 35;
            }
            else {
                this.gold = this.add.sprite(this.TotalMedalX, this.TotalMedalY, 'gold');

                this.gold.displayWidth = 35;
                this.gold.displayHeight = 35;
            }
        }


    }

    BestAndTotalCount() {
        if (this.TotalCount > this.BesCount)
            this.BesCount = this.TotalCount;
        //render best count
        this.best = this.add.text(300, 360, this.BesCount, {font: "30px bold"});
    }
}