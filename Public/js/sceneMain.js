//basic config object sets the rules for the whole game

var config = {

    type: Phaser.AUTO,
    width: 1100,
    height: 500,
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

//global grounds object
let grounds;

let health=0;

let timedEvent;

let ups;

let downs;

let lefts;

let rights;

//constructor creates the game!
var game = new Phaser.Game(config);   

    function preload() {

        ///loading the background 
        this.load.image('background', '../public/assets/background/seamless-pattern-1.jpg');
        //loading ground image
        this.load.image("ground", "../public/assets/ground.jpg");
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

        //console.log(config.height)

        //adding in main character
        roxy=this.physics.add.sprite(100, 350, 'roxy')

        grounds=this.physics.add.staticGroup()
        
        grounds.create(550,900, 'ground').setScale(3)
        
        //giving her some physics(bounce and making sure she doesn't go off screen)
        roxy.setBounce(0.2);

        this.physics.add.collider(roxy, grounds);

        //getting main player's running animation frames

        frameNamesRoxyRun = this.anims.generateFrameNames("roxy", {
            start: 0, end: 17, zeroPad: 3,
            prefix: 'Running_', suffix: '.png'
        });

        //console.log(frameNamesRoxyRun)

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

        
        //this.physics.add.collider(ground, ups);
        //this.physics.add.collider(ups, downs);
        //this.physics.add.collider(ground, rights);
        //this.physics.add.collider(ground, lefts);

        this.physics.add.collider(downs, grounds);

        /*timedEvent = this.time.addEvent({
            delay: 500,
            callback: createDowns,
            callbackScope: this,
            loop: true
        })*/

        this.physics.add.collider(downs, grounds);



        createDowns();

        


    }

        
   

    

    function update() {



        ups.setVelocityX(-100)
        downs.setVelocityX(-500)
        rights.setVelocityX(-100)
        lefts.setVelocityX(-100)
        //making the background scroll automatically 
        background.tilePositionX += 8;
        //ground.tilePositionXX+=8
    }

    //this function creates up baddies
    function createUps() {
        let up=ups.create(config.width-10, 400, 'up');
        up.setCollideWorldBounds(false);
        up.allowGravity = true;
    }

    //this function creates down baddies
    function createDowns() {
        let down=downs.create(config.width+10, 380, 'down');
        down.setCollideWorldBounds(false);
        down.allowGravity = false;
    }

    //this function creates right baddies
    function createRights() {
        let right=rights.create(config.width+10, 400, 'right');
        right.setCollideWorldBounds(false);
        right.allowGravity = true;
    }

    //this function creates left baddies
    function createLefts() {
        let left=lefts.create(config.width+10, 400, 'left');
        left.setCollideWorldBounds(false);
        left.allowGravity = true;
    }



    

  