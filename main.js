var configGame = {
    type: Phaser.AUTO,
    width: 500,
    height: 700,

    physics: {
        default: 'arcade',
        gravity: {y: 200},
        debug: false
    },
    scene: [SceneMenu,GameScene]

};

var game = new Phaser.Game(configGame);

