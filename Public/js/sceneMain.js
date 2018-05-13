

$(document).on("click","#gameStart", function(){
    console.log(result)
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

let gameScene = {

        preload() {

        ///loading the background 
        this.load.image('background', '../public/assets/background/seamless-pattern-1.jpg');
        //loading ground image
        this.load.image("ground", "../public/assets/ground.png");
        //loading the main protagonist and the JSON attached to her with all the info about the spritesheet
        this.load.atlas('roxy', '../public/assets/sprites/roxy.png', '../public/assets/sprites/roxy.json');
        //loading in the the enemies you need to press to defeat!
        this.load.image('up', '../public/assets/d-pad up.png')
        this.load.image('left', '../public/assets/d-pad left.png')
        this.load.image('down', '../public/assets/d-pad down.png')
        this.load.image('right', '../public/assets/d-pad right.png')

    },

     create:function() {


        //placing the background as a repeating tile
        background = this.add.tileSprite(0, -30, config.width, config.height, "background").setOrigin(0);

        //console.log(config.height)

        //adding in main character
        roxy=this.physics.add.sprite(100, 390, 'roxy')

        grounds=this.physics.add.staticGroup()
        
        grounds.create(550,860, 'ground')

        
        //giving her some physics(bounce and making sure she doesn't go off screen)
        roxy.setBounce(0.2);
        roxy.setCollideWorldBounds(true);

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

        

        timedEvent = this.time.addEvent({
            delay: 500,
            callback: gameScene.createDowns,
            callbackScope: this,
            loop: false
        })

        timedEvent = this.time.addEvent({
            delay: 1500,
            callback: gameScene.createUps,
            callbackScope: this,
            loop: false
        })

        
        //this.physics.add.collider(roxy, grounds);
        this.physics.add.collider(downs, grounds);
        this.physics.add.collider(ups, grounds);
        



    },

        
   

    

    update:function() {

        downs.allowGravity = false;

        roxy.setVelocityY(200)

        ups.setVelocityX(-500)
        downs.setVelocityX(-500)
        rights.setVelocityX(-100)
        lefts.setVelocityX(-100)
        //making the background scroll automatically 
        background.tilePositionX += 8;
        //ground.tilePositionXX+=8
    },

    //this function creates up baddies
     createUps:function() {
        let up=ups.create(config.width-10, 440, 'up');
        up.setCollideWorldBounds(false);
        up.allowGravity = false;
    },

    //this function creates down baddies
    createDowns:function() {
        let down=downs.create(config.width+10, 300, 'down');
        down.setCollideWorldBounds(false);
        down.allowGravity = false;
    },

    //this function creates right baddies
    createRights:function() {
        let right=rights.create(config.width+10, 400, 'right');
        right.setCollideWorldBounds(false);
        right.allowGravity = true;
    },

    //this function creates left baddies
    createLefts:function() {
        let left=lefts.create(config.width+10, 400, 'left');
        left.setCollideWorldBounds(false);
        left.allowGravity = true;
    }

}

var config = {

    type: Phaser.AUTO,
    width: 1100,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [gameScene]
    };

    var game = new Phaser.Game(config);   

})



    


    

  