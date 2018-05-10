class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('background1_clouds_1', '../assets/background/background1_clouds_1.png');
        this.load.image('background1_clouds_2', '../assets/background/background1_clouds_2.png');
        this.load.image('background1_clouds_3', '../assets/background/background1_clouds_3.png');
        this.load.image('background1_clouds_4', '../assets/background/background1_clouds_4.png');
        this.load.image('background1_rocks_1', '../assets/background/background1_rocks_1.png');
        this.load.image('background1_rocks_2', '../assets/background/background1_rocks_2.png');
        this.load.image('background1_sky', '../assets/background/background1_sky.png');
    }

    create() {

        // Get the window sizes
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        // Find the center of the top space
        let topBackgroundXOrigin = windowWidth / 2;
        let topBackgroundYOrigin = (windowHeight / 5) * 1.5;
        let topBackgroundHeight = (windowHeight / 5) * 3;
        
        // Base width and height of the images
        let imageBaseWidth = 1920;
        let imageBaseHeight = 1080;
        let heightRatio = topBackgroundHeight / imageBaseHeight;

        // Add the sky image at the right location and resize it to take all the space, no scaling needed
        let skyImage = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'background1_sky');
        skyImage.setDisplaySize(windowWidth, topBackgroundHeight);

        // Add each layer one by one
        this.cloud1 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_clouds_1');
        this.cloud1.setScale(heightRatio);

        this.cloud2 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_clouds_2');
        this.cloud2.setScale(heightRatio);
        
        this.rocks1 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_rocks_1');
        this.rocks1.setScale(heightRatio);
        
        this.cloud3 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_clouds_3');
        this.cloud3.setScale(heightRatio);
        
        this.rocks2 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_rocks_2');
        this.rocks2.setScale(heightRatio);

        this.cloud4 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1_clouds_4');
        this.cloud4.setScale(heightRatio);
    }

    update() {
        this.cloud1.tilePositionX += 0.05;
        this.cloud2.tilePositionX += 0.05;
        this.rocks1.tilePositionX += 0.10;
        this.cloud3.tilePositionX += 0.15;
        this.rocks2.tilePositionX += 0.20;
        this.cloud4.tilePositionX += 0.30;
    }
}
