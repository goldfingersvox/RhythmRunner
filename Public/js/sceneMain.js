//basic config object sets the rules for the whole game

var config = {

    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    };
//global background object
let background={};

//global character object
let roxy={};

//global ground object
let ground={}

let health=0;

//constructor creates the game!
var game = new Phaser.Game(config);   

    function preload() {

        ///loading the background 
        this.load.image('background', '../public/assets/background/seamless-pattern-1.jpg');
        //loading ground image
        this.load.image("ground", "../public/assets/enviroment/metal-construction-barriers/metal_plate_shiny_pattern.png");
        //loading the main protagonist and the JSON attached to her with all the info about the spritesheet
        this.load.atlas('roxy', '../public/assets/sprites/Roxy.png', '../public/assets/sprites/Roxy.json');
        //loading in the the enemies you need to press to defeat!
        this.load.image('up', '../public/assets/d-pad up.png')
        this.load.image('left', '../public/assets/d-pad left.png')
        this.load.image('down', '../public/assets/d-pad down.png')
        this.load.image('right', '../public/assets/d-pad right.png')

    }

    function create() {
        //placing the background as a repeating tile
        background = this.add.tileSprite(0, -30, config.width, config.height, "background").setOrigin(0);

        console.log(config.height)

        //adding in main character
        roxy=this.physics.add.sprite(100, 450, 'roxy')
        
        //giving her some physics(bounce and making sure she doesn't go off screen)
        roxy.setBounce(0.2);
        roxy.setCollideWorldBounds(true);

        this.physics.add.collider(roxy, ground);

        //getting main player's running animation frames

        frameNamesRoxyRun = this.anims.generateFrameNames("roxy", {
            start: 0, end: 17, zeroPad: 3,
            prefix: 'Running_', suffix: '.png'
        });

        console.log(frameNames)

        //running animation creator

        this.anims.create({
            key: 'run',
            frames: frameNamesRoxyRun,
            frameRate: 30,
            repeat: -1
        });

        //calling on the animation
        roxy.anims.play('run');

        //creating all the enemy groups
        ups=this.physics.add.group();
        downs=this.physics.add.group();
        rights=this.physics.add.group();
        lefts=this.physics.add.group();


    }

        
    

    

    function update() {

    

    
        //making the background scroll automatically 
        background.tilePositionX += 8;
        //ground.tilePositionXX+=8
    }





    

  