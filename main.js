var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
    
 function preload(){
     
        game.load.audio('march', 'starwars.mp3');
        game.load.audio('academy', 'policeacademy.mp3');
        game.load.audio('sting', 'sting.mp3');
     
        this.load.image('vader', 'VICTOLY.png');
        this.load.image('police', 'policeofficer.jpg');
        this.load.image('song', 'song.jpg');
    }

var march;
var academy;
var sting;

var text;
var textAdd;
var text1;
var text2;
var text3

 function create() {
     
        game.stage.backgroundColor = '#414040';
        
        var style = { font: "65px Arial", fill: "#52bace", align: "center" };
        text = game.add.text(game.world.centerX, 100, "decoding", style);
        text.anchor.set(0.5);
     

        march = game.add.audio('march');
        academy = game.add.audio('academy');
        sting = game.add.audio('sting');
        
        game.sound.setDecodedCallback([ march, academy, sting ], start, this);
     
    }

var keys;

  function start() {

    text.text = 'Choose your DESTINY';

    var style = { font: "48px Arial", fill: "#a8a8a8", align: "center" }; // fill: "#cdba52"
    var style1 = { font: "48px Arial", fill: "#52bace", align: "center" };

    textAdd = game.add.text(game.world.centerX, 170, "(Select 1, 2 or 3)", style1);
    textAdd.anchor.set(0.5);

    text1 = game.add.text(game.world.centerX, 300, "March: Stopped", style);
    text1.anchor.set(0.5);

    text2 = game.add.text(game.world.centerX, 400, "Academy: Stopped", style);
    text2.anchor.set(0.5);

    text3 = game.add.text(game.world.centerX, 500, "Sting: Stopped", style);
    text3.anchor.set(0.5);
      

    academy.onStop.add(soundStopped, this);
    sting.onStop.add(soundStopped, this);
    march.onStop.add(soundStopped, this);

    keys = game.input.keyboard.addKeys({ march: Phaser.Keyboard.ONE, academy: Phaser.Keyboard.TWO, sting: Phaser.Keyboard.THREE });

    keys.march.onDown.add(playFx, this);
    keys.academy.onDown.add(playFx, this);
    keys.sting.onDown.add(playFx, this);

    //  And for touch devices you can also press the top, middle or bottom of the screen
    game.input.onDown.add(onTouch, this);

    }

    function onTouch(pointer) {

            var b = game.height / 3;

            if (pointer.y < b)
            {
                playFx(keys.march);
            }
            else if (pointer.y > b * 2)
            {
                playFx(keys.sting);
            }
            else
            {
                playFx(keys.academy);
            }

        }

    function playFx(key){

            switch (key.keyCode)
            {
                case Phaser.Keyboard.ONE:
                    academy.stop();
                    sting.stop();
                    text1.text = "March: Playing";
                    this.vader = this.game.add.sprite(800, 280, 'vader');
                    march.play();
                    break;

                case Phaser.Keyboard.TWO:
                    march.stop();
                    sting.stop();
                    text2.text = "Academy: Playing";
                    this.police = this.game.add.sprite(800, 280, 'police');
                    academy.play();
                    break;

                case Phaser.Keyboard.THREE:
                    march.stop();
                    academy.stop();
                    text3.text = "Sting: Playing";
                    this.song = this.game.add.sprite(800, 280, 'song');
                    sting.play();
                    break;
            }

        }

     function soundStopped(sound){

            if (sound === march)
            {
                text1.text = "March: Complete";
            }
            else if (sound === academy)
            {
                text2.text = "Academy: Complete";
            }
            else if (sound === sting)
            {
                text3.text = "Sting: Complete";
            }

        }
