
//starting score
let score=0;

$(document).on("click","#gameStart", function(){
    console.log(result)
    //global background object
let background={};

//global character object
let roxy={};

//global grounds object
let grounds;
//starting health
let health=100;

//some more global vasrs the game needs
let timedEvent;

let ups;

let downs;

let checker;

let lefts;

let rights;

let cursors;

let music;

let scoreText;

let healthText;
//the boot scene
let boot ={
    preload:function(){
        
        this.load.spritesheet('equ', '/assets/sprites/ezgif.com-gif-maker.png')
        this.load.image('rr', '/assets/sprites/rr.png')
        this.load.image('button', '/assets/sprites/start.png')
    },

    create:function(){

        this.anims.create({
            key: 'loop',
            frames: this.anims.generateFrameNumbers('equ', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        let equ=this.physics.add.sprite(550, 200);

        equ.anims.play('loop');

        let text= this.physics.add.static(550, 250);

        let button= this.physics.add.sprite(550,400);
    }
        
}
//the main game scene
let gameScene = {

        preload() {

        ///loading the background 
        this.load.image('background', '/assets/background/seamless-pattern-1.jpg');
        //loading ground image
        this.load.image("ground", "/assets/ground.png");
        //loading the main protagonist and the JSON attached to her with all the info about the spritesheet
        this.load.atlas('roxy', '/assets/sprites/roxy.png',"/assets/sprites/roxy.json");
        //loading in the checker to check for the score
        this.load.image("checker", "/assets/sprites/roxy-run.png")
        //loading in the the enemies you need to press to defeat!
        this.load.image('up', '/assets/d-pad up.png')
        this.load.image('left', '/assets/d-pad left.png')
        this.load.image('down', '/assets/d-pad down.png')
        this.load.image('right', '/assets/d-pad right.png')
        //load the song 
        this.load.audio('song', '../'+songPath)

    },
            
     create:function() {


        //placing the background as a repeating tile
        background = this.add.tileSprite(0, -30, config.width, config.height, "background").setOrigin(0);

        //console.log(config.height)

        //adding in main character
        roxy=this.physics.add.sprite(100, 390, 'roxy')

        //adding in the checker that will know if we miss one
        checker=this.physics.add.sprite(-25,390, 'checker')

        grounds=this.physics.add.staticGroup()
        
        grounds.create(550,860, 'ground')

        
        //giving her some physics(bounce and making sure she doesn't go off screen)
        roxy.setBounce(0.2);
        roxy.setCollideWorldBounds(true);

        //loading in the text for the score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //loading in the text for the health
        healthText = this.add.text(16, 26, 'health: 100', { fontSize: '32px', fill: '#000' });



        //getting main player's running animation frames
        let frameNamesRoxyRun = this.anims.generateFrameNames("roxy", {
            start: 0, end: 17, zeroPad: 3,
            prefix:"Running_", suffix: ".png"
        })

        //running animation creator
        this.anims.create({
            key: 'run',
            frames: frameNamesRoxyRun,
            frameRate: 30,
            repeat: -1
        });

        //getting main player's slashing animation frames
        let frameNamesRoxySlash = this.anims.generateFrameNames("roxy", {
            start: 0, end: 17, zeroPad: 3,
            prefix:"Run Slashing_", suffix: ".png"
        })

        //slashing animation creator
        this.anims.create({
            key: 'slash',
            frames: frameNamesRoxySlash,
            frameRate: 50,
            repeat: -1
        });

        //creating all the enemy and obsticle groups
        ups=this.physics.add.group();
        downs=this.physics.add.group();
        rights=this.physics.add.group();
        lefts=this.physics.add.group();

        timedEvent = this.time.addEvent({
            delay: 1950,
            callback: gameScene.playSong,
            callbackScope: this,
            loop: false
        })
    

        let j;
        
        //this loop creates the enemies from the song information sent back from the API
        for (j=0;j<noteArr.length;j++){
        //this conditional makes sure only above average volume notes are added
        if(noteArr[j].volume>avgVol){
            if (noteArr[j].midi_pitch>noteAvg)
            timedEvent = this.time.addEvent({
                delay: (noteArr[j].onset_time)*1000,
                callback: gameScene.createUps,
                callbackScope: this,
                loop: false
            })

            else if (noteArr[j].midi_pitch>lowMid&&noteArr[j].midi_pitch<noteAvg)
            timedEvent = this.time.addEvent({
                delay: (noteArr[j].onset_time)*1000,
                callback: gameScene.createRights,
                callbackScope: this,
                loop: false
            })

            else if (noteArr[j].midi_pitch<lowMid)
            timedEvent = this.time.addEvent({
                delay: (noteArr[j].onset_time)*1000,
                callback: gameScene.createDowns,
                callbackScope: this,
                loop: false
            })

        }
        else{

        }


        }

        for(let z=0; z<beatArr.length; z+=2){
            if(beatArr[z].downbeat){
                timedEvent = this.time.addEvent({
                    delay: (beatArr[z].time)*1000,
                    callback: gameScene.createDowns,
                    callbackScope: this,
                    loop: false
            })
        }
        }
        //associating cursors variable with the keyboard cursors
        cursors = this.input.keyboard.createCursorKeys();

        //playing the run animation
        roxy.anims.play('run', true);

        //making sure all objects collide with the ground
        this.physics.add.collider(downs, grounds);
        this.physics.add.collider(ups, grounds);
        this.physics.add.collider(downs, grounds);
        this.physics.add.collider(roxy, grounds);


        //these overlaps help determine if the player hits the enemies on time
        this.physics.add.overlap(roxy, ups, gameScene.hitUp, null, this);
        this.physics.add.overlap(roxy, downs, gameScene.hitDown, null, this);
        this.physics.add.overlap(roxy, lefts, gameScene.hitLeft, null, this);
        this.physics.add.overlap(roxy, rights, gameScene.hitRight, null, this);

        //these overlaps help determine if the player loses health since the enemies got past them
        this.physics.add.overlap(checker, rights, gameScene.hit, null, this);
        this.physics.add.overlap(checker, downs, gameScene.hit, null, this);
        this.physics.add.overlap(checker, lefts, gameScene.hit, null, this);
        this.physics.add.overlap(checker, rights, gameScene.hit, null, this);

        //this overlap makes sure you don't get two enemies at once
        this.physics.add.overlap(downs, ups, gameScene.limitUp, null, this);
        this.physics.add.overlap(lefts, downs, gameScene.limitLeft, null, this);
        this.physics.add.overlap(rights, downs, gameScene.limitRight, null, this);



    },

    update:function() {
        //playing the slash animations
        if(cursors.left.isDown){
            roxy.anims.play('slash', true);
        }
        else if (cursors.right.isDown){
            roxy.anims.play('slash', true);
        }
        else if (cursors.up.isDown){
            roxy.anims.play('slash', true);
        }
        else if (cursors.down.isDown){
            roxy.anims.play('slash', true);
        }
        else{
            //making sure roxy keeps running
            roxy.anims.play('run', true);
        }


        //giving all enemies a velocity to travel across the screen
        ups.setVelocityX(-500)
        downs.setVelocityX(-500)
        rights.setVelocityX(-500)
        lefts.setVelocityX(-500)
        //making the background scroll automatically 
        background.tilePositionX += 8;
        //ground.tilePositionXX+=8
    },

    //this function creates up baddies
     createUps:function() {
        let up=ups.create(config.width+10, 400, 'up');
        up.setCollideWorldBounds(false);
        up.allowGravity = false;
    },

    //this function creates down baddies
    createDowns:function() {
        let down=downs.create(config.width+10, 400, 'down');
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
    }, 
    //all of these functions control what happenes if the player presses on a button to kill an enemy
    hitLeft:function(roxy, left)
    {
        if(cursors.left.isDown){
            score+=100
            left.disableBody(true,true)
            scoreText.setText('Score: ' + score);
        }
        else{
            roxy.anims.play('run', true);
        }
    },

    hitRight:function (roxy, right)
    {
        if(cursors.right.isDown){
            score+=100
            right.disableBody(true,true)
            scoreText.setText('Score: ' + score);

        }
        else{
            roxy.anims.play('run', true);
        }

    
    },

    hitUp:function (roxy, up)
    {
        if(cursors.up.isDown){
            score+=100
            up.disableBody(true,true)
            scoreText.setText('Score: ' + score);

        }
        else{
            roxy.anims.play('run', true);
        }
    },

    hitDown:function (roxy, down)
    {
        if(cursors.down.isDown){
            score+=100
            down.disableBody(true,true)
            scoreText.setText('Score: ' + score);


        }
        else{
            roxy.anims.play('run', true);
        }
    },
    //this function is called if player misses an enemy
    hit:function ()
    {
        health=-10
        healthText.setText('Health: ' + health);
    },
    limitUp: function(down, up){
        down.disableBody(true,true)
    } ,  
    limitRight: function(down, right){
        down.disableBody(true,true)
    } , 
    limitLeft: function(down, left){
        down.disableBody(true,true)
    },
    //this function plays the song
    playSong: function(){
        music=this.sound.add('song');
        music.play();
    }

}

let

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
    scene: [boot, gameScene]
    };

    var game = new Phaser.Game(config);   

})



    


    

  