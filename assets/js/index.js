RocketCusta = () => {};

// FPS
RocketCusta.lastCalledTime = Date.now();
RocketCusta.fps = 0;
function audio() {
    let audio1 = document.getElementById("audio-background");
    audio1.play();
  }

// Player Attributes
RocketCusta.scale = window.innerHeight / 1000;
RocketCusta.level = 1;
RocketCusta.speed = 1;
RocketCusta.score = 0;
RocketCusta.scoreUpdate = 0;
RocketCusta.gameover = false;
RocketCusta.gameoverTimer = 6;
RocketCusta.timer = null;
RocketCusta.pause = true;
RocketCusta.audio = true;
RocketCusta.clickPositionY = null;
RocketCusta.clickPositionX = null;
RocketCusta.menu = false;
RocketCusta.mobile = false;

/**
 * Keyboard Event
 * @type {{left: boolean, right: boolean, up: boolean, down: boolean, esc: boolean}}
 */
RocketCusta.keyboard = {
    left: false,
    right: false,
    up: false,
    down: false,
    esc: false
};

// Rocket
RocketCusta.rocketImage = new Image();
/**
 * Rocket
 * @type rocket
 * @param {String} [name="rocket"] Name of the rocket for collision purposes
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @param {Number} speed
 * @param {Number} velocityX
 * @param {Number} velocityY
 * @param {Number} friction
 * @param {Number} speedFactorX
 * @param {Number} speedFactorY
 * @param {Number} rotation
 */
RocketCusta.rocket = function () {
    this.name = 'rocket';
    this.width = 100 * (window.innerHeight / 1000);
    this.height = 65 * (window.innerHeight / 1000);
    this.x = Math.round(window.innerWidth / 5);
    this.y = window.innerHeight / 2;
    this.speed = 38;
    this.velocityX = 0;
    this.velocityY = 0;
    this.friction = 0.98;
    this.speedFactorX = 2;
    this.speedFactorY = 2;
    this.rotation = 0;
};
RocketCusta.rockets = [];

/**
 * Rocket Thruster Animation Objects
 * @type thrust
 * @param {Number} y Y Position of the thrust circle
 * @param {Number} x X Position of the thrust circle
 * @param {Number} radius Radius of the thrust circle
 * @param {Number} alpha Alpha of the thrust circle
 */
RocketCusta.thrust = function () {
    this.y = (Math.random() * 10) - 5;
    this.x = Math.round(window.innerWidth / 5);
    this.radius = (12 + 10 * Math.random()) * (RocketCusta.scale);
    this.alpha = 1;
};
RocketCusta.thrusts = [];

/**
 * Star
 * @type star
 * @param {Number} radius Radius of the star
 * @param {Number} x X Position of the star
 * @param {Number} y Y Position of the star
 * @param {Number} speed Speed of the star
 */
RocketCusta.star = function () {
    this.radius = Math.random() * 2;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.speed = Math.random() * RocketCusta.speed / 12;
};
RocketCusta.stars = [];

// Planet
RocketCusta.planetImage = [
    new Image(),
    new Image()
];
/**
 * Planet
 * @type planet
 * @param {Number} radius Radius of the planet
 * @param {Number} x X Position of the planet
 * @param {Number} y Y Position of the planet
 * @param {Number} speed Speed of the planet
 * @param {String} color Color of the planet
 * @param {Image} image Image of the planet
 */
RocketCusta.planet = function () {
    this.radius = window.innerHeight / 8 + Math.random() * window.innerHeight / 2;
    this.x = window.innerWidth + this.radius + 500;
    this.y = Math.random() * window.innerHeight;
    this.speed = RocketCusta.speed / 2 + Math.random() * RocketCusta.speed / 4;
    this.color = 'rgb(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 256) + ')';
    this.image = RocketCusta.planetImage[Math.floor(Math.random() * RocketCusta.planetImage.length)];
};
RocketCusta.planets = [];

// Moon
RocketCusta.moonImage = [
    new Image(),
    new Image()
];
/**
 * Moon
 * @type moon
 * @param {Number} radius Radius of the moon
 * @param {Number} x X Position of the moon
 * @param {Number} y Y Position of the moon
 * @param {Number} speed Speed of the moon
 * @param {Image} image Image of the moon
 * @param {String} color Color of the moon
 */
RocketCusta.moon = function () {
    this.radius = (10 + Math.random() * 125) * RocketCusta.scale;
    this.x = window.innerWidth + this.radius;
    this.y = Math.random() * window.innerHeight;
    this.speed = RocketCusta.speed / 4 + Math.random() * RocketCusta.speed / 8;
    this.image = RocketCusta.moonImage[Math.floor(Math.random() * RocketCusta.moonImage.length)];
    this.color = 'rgb(' + Math.round(Math.random() * 32) + ',' + Math.round(Math.random() * 32) + ',' + Math.round(Math.random() * 128) + ')';
};
RocketCusta.moons = [];

/**
 * Comet Image
 * @type {*[Image,Image]}
 */
RocketCusta.cometImage = [
    new Image(),
    new Image()
];
/**
 * Comet
 * @type comet
 * @param {String} [name="comet"] Name of the object for collision purposes
 * @param {Number} radius Radius of the comet
 * @param {Number} width Width of the comet
 * @param {Number} height Height of the comet
 * @param {Number} y Y Position of the comet
 * @param {Number} x X Position of the comet
 * @param {Number} velocityX X Velocity of the comet
 * @param {Number} [velocityY=0] Y Velocity of the comet
 * @param {Number} speed Current speed of the comet
 * @param {Number} rotation Rotation of the comet
 * @param {Image} image Image of the comet
 * @param {Number} force Rotation direction of the comet
 */
RocketCusta.comet = function () {
    this.name = 'comet';
    this.radius = Math.round(window.innerHeight / 100) + Math.random() * (Math.round(window.innerHeight / 18) + RocketCusta.level);
    this.width = (this.radius * 2) - (Math.round(this.radius / 5));
    this.height = (this.radius * 2) - (Math.round(this.radius / 5));
    this.y = Math.random() * window.innerHeight;
    this.x = window.innerWidth + (this.radius * 2);
    this.velocityX = (RocketCusta.speed * 1.5 * window.innerWidth / 1000) + (Math.random() * RocketCusta.speed);
    this.velocityY = 0;
    this.speed = (RocketCusta.speed * 1.5) + (Math.random() * RocketCusta.speed);
    this.rotation = 0;
    this.image = RocketCusta.cometImage[Math.floor(Math.random() * RocketCusta.cometImage.length)];
    this.force = Math.round((Math.random() * 9) % 2);
};
RocketCusta.comets = [];

/**
 * Explosion
 * @type explosion
 * @param {Number} y Y Position explosion circle
 * @param {Number} x X Position of explosion circle
 * @param {Number} alpha Alpha of explosion circle in order to fade in & out
 * @param {Number} radius Radius of the exlosion circle
 * @param {String} color Color of the explosion circle
 */
RocketCusta.explosion = function () {
    this.y = 0;
    this.x = 0;
    this.alpha = 1;
    this.radius = 1;
    this.color = 'rgba(' + Math.round(Math.random() * 256) + ',' + Math.round(Math.random() * 5) + ',' + Math.round(Math.random() * 5);
};
RocketCusta.explosions = [];

/**
 * Initialize Funtion
 * @method initialize
 */
jQuery(document).ready(() => {
    RocketCusta.planetImage[0].src = './assets/img/planet-1.png';
    RocketCusta.planetImage[1].src = './assets/img/planet-2.png';

    RocketCusta.moonImage[0].src = './assets/img/moon-1.png';
    RocketCusta.moonImage[1].src = './assets/img/moon-2.png';

    RocketCusta.cometImage[0].src = './assets/img/comet-1.png';
    RocketCusta.cometImage[1].src = './assets/img/comet-2.png';

    RocketCusta.rocketImage.src = './assets/img/rocket.png';

    // Init Game
    RocketCusta.canvas = document.getElementById('rocket-custa');
    RocketCusta.context = RocketCusta.canvas.getContext('2d');

    RocketCusta.context.canvas.height = window.innerHeight;
    RocketCusta.context.canvas.width = window.innerWidth;

    RocketCusta.keyboardEvent();
    RocketCusta.clickEvent();
    //RocketCusta.motionEvent();

    jQuery(window).resize(RocketCusta.resizeEvent);

    jQuery('#game-start').click(() => {
        jQuery('.game-navigation').slideUp();
        jQuery('#game-score').delay(500).fadeIn(500);
        jQuery('#game-level').delay(300).fadeIn(500);
        jQuery('#game-credits').fadeIn(500);
        RocketCusta.menu = false;
        RocketCusta.comets = []
        RocketCusta.gameStart();
    });
    jQuery('#game-audio').click(RocketCusta.gameAudio);

    // Device Detection
    //if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) RocketCusta.mobile = true;

    // Submit Highscore Event Handler
    jQuery('#game-submit-highscore').click(() => {
        jQuery('#game-username').fadeOut();
        jQuery('#game-submit-highscore').fadeOut();
        jQuery('#game-user-level').fadeOut();
        jQuery('#game-user-score').fadeOut();
        RocketCusta.getScoreTop();
        RocketCusta.submitScore();
    });

    RocketCusta.menu = true;
    RocketCusta.gameStart();
    jQuery('.game-navigation').slideToggle(true);

});


/**
 * Get Top Scores Function
 * @method getScoreTop
 */
RocketCusta.getScoreTop = function () {
    var url = RocketCusta.requestUrl + '?action=getHighScoreByTop';

    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            jQuery('#game-highscore ul').empty();
            jQuery('#game-highscore ul').append('<li class="legenda"><span class="rank">Rank</span><span class="name">Name</span><span class="score">Score</span><span class="level">Level</span><span class="date">Date</span></li>');
            jQuery.each(JSON.parse(request.response), function (id, obj) {
                if (id % 2 == 0) {
                    jQuery('#game-highscore ul').append('<li><span class="rank">' + obj.Rank + '</span><span class="name">' + obj.Name + '</span><span class="score">' + obj.Score + '</span><span class="level">Level ' + obj.Level + '</span><span class="date">' + obj.DateCreated + '</span></li>');
                } else {
                    jQuery('#game-highscore ul').append('<li class="odd"><span class="rank">' + obj.Rank + '</span><span class="name">' + obj.Name + '</span><span class="score">' + obj.Score + '</span><span class="level">Level ' + obj.Level + '</span><span class="date">' + obj.DateCreated + '</span></li>');
                }
            });
            jQuery('#game-highscore').slideDown(true);
        } else {
            jQuery('#game-highscore').slideDown(true);
            jQuery('#game-highscore ul').empty();
            jQuery('#game-highscore ul').append('<li>No High Scores Available.</li>');
        }
    };

    request.open('GET', url, true);
    request.send();
};

/**
 * Submit Score Function
 * @method submitScore
 */
RocketCusta.submitScore = function () {
    var url = RocketCusta.requestUrl + '?username=' + jQuery('#game-username').val() + '&score=' + RocketCusta.score + '&level=' + RocketCusta.level;

    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
};

/**
 * Initalize Game Function
 * @method initGame
 */
RocketCusta.initGame = function () {
    // Spawn Objects
    RocketCusta.spawnStar();
    RocketCusta.spawnPlanet();
    RocketCusta.spawnMoon();
    RocketCusta.spawnRocket();
    RocketCusta.spawnExplosion();

    // Set Parameters
    RocketCusta.score = 0;
    RocketCusta.level = 1;
    RocketCusta.speed = 2;

    // Draw First Frame
    RocketCusta.drawFrame();
};

/**
 * Pause Game
 * @method pauseGame
 */
RocketCusta.pauseGame = function () {
    RocketCusta.pause = !RocketCusta.pause;

    if (!RocketCusta.pause) {
        RocketCusta.timer = setInterval(RocketCusta.spawnComet, 1000);
        RocketCusta.updateFrame();
    } else {
        clearInterval(RocketCusta.timer);
    }
};

/**
 * Start Game Function
 * @method gameStart
 */
RocketCusta.gameStart = function () {
    if (RocketCusta.pause) {
        RocketCusta.initGame();

        RocketCusta.pause = false;

        //jQuery('#game-start').fadeOut();
        //jQuery('#game-name').slideUp();
        //jQuery('#game-highscore').slideUp();

        //jQuery('#game-username').fadeOut();
        //jQuery('#game-submit-highscore').fadeOut();
        //jQuery('#game-user-level').fadeOut();
        //jQuery('#game-user-score').fadeOut();

        if (!RocketCusta.menu) {
            jQuery('.game-navigation, .game-section').slideUp();
            jQuery('.game-over').fadeOut(500);
            jQuery('#game-score').delay(500).fadeIn(500);
            jQuery('#game-level').delay(300).fadeIn(500);
            jQuery('#game-credits').fadeIn(500);
        }

        RocketCusta.updateFrame();
        RocketCusta.timer = setInterval(RocketCusta.spawnComet, 1000);
    }
};

/**
 * Game Over Function
 * @method gameOver
 */
RocketCusta.gameOver = function () {
    clearInterval(RocketCusta.timer);
    RocketCusta.pause = true;
    RocketCusta.gameover = false;
    RocketCusta.gameoverTimer = 6;

    RocketCusta.rockets = [];
    RocketCusta.stars = [];
    RocketCusta.planets = [];
    RocketCusta.moons = [];
    RocketCusta.comets = [];
    RocketCusta.thrusts = [];
    RocketCusta.explosions = [];

    RocketCusta.getScoreTop();

    jQuery(".game-navigation").css({
        left: 0,
        marginLeft: 0
    });
    jQuery('.game-navigation').slideToggle(true);
    jQuery('.game-section').slideToggle(true);
    jQuery('.game-over, #game-username, #game-submit-highscore, #game-user-level, #game-user-score').fadeIn(750);
    jQuery('#game-level,#game-score,#game-credits').hide();
    //jQuery('#game-score').fadeOut();
    //jQuery('#game-level').fadeOut();
    //jQuery('#game-start').delay(500).fadeIn();
    //jQuery('#game-highscore').delay(500).slideDown();
    //jQuery('#game-username').delay(750).fadeIn();
    //jQuery('#game-submit-highscore').delay(750).fadeIn();
    //jQuery('#game-user-level').delay(750).fadeIn();
    //jQuery('#game-user-score').delay(750).fadeIn();

    document.getElementById('audio-explosion').play();
};

/**
 * Game Audio
 * @method gameAudio
 */
RocketCusta.gameAudio = function () {
    jQuery('#game-audio').toggleClass('off');
    var audioBackground = document.getElementById('audio-background');
    var audioExplosion = document.getElementById('audio-explosion');
    audioBackground.muted = !audioBackground.muted;
    audioExplosion.muted = !audioExplosion.muted;
};

/**
 * Resize Event
 * @method resizeEvent
 */
RocketCusta.resizeEvent = function () {
    RocketCusta.context.canvas.height = window.innerHeight;
    RocketCusta.context.canvas.width = window.innerWidth;
    if (!RocketCusta.pause)
        RocketCusta.gameStart();
};

/**
 * Motion Event Function
 * @method motionEvent
 */
RocketCusta.motionEvent = function () {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (event) {

            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = event.gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = event.beta;

            // alpha is the compass direction the device is facing in degrees
            var dir = event.alpha;

            var rocketCount = RocketCusta.rockets.length;
            for (var i = 0; i < rocketCount; i++) {
                RocketCusta.rockets[i].speedFactorY = tiltFB / 180;
                RocketCusta.rockets[i].speedFactorX = tiltLR / 180;
            }

        }, false);
    }

};

/**
 * Click / Touch Event Function
 * @method clickEvent
 */
RocketCusta.clickEvent = function () {
    // Mouse Down Event
    jQuery(document).on('mousedown touchstart', '#rocket-custa', event => {
        if (!RocketCusta.pause) {
            if (event.type == 'touchstart') {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var positionX = touch.pageX;
                var positionY = touch.pageY;
            } else {
                var positionX = event.pageX;
                var positionY = event.pageY;
            }

            // Y Position
            if (positionY < RocketCusta.rockets[0].y)
                RocketCusta.keyboard.up = true;
            else if (positionY > RocketCusta.rockets[0].y)
                RocketCusta.keyboard.down = true;

            // X Position
            if (positionX < RocketCusta.rockets[0].x)
                RocketCusta.keyboard.left = true;
            else if (positionX > RocketCusta.rockets[0].x)
                RocketCusta.keyboard.right = true;

        }
    });

    // Mouse Up Event
    jQuery(document).on('mouseup touchend', () => {
        RocketCusta.keyboard.up = false;
        RocketCusta.keyboard.down = false;
        RocketCusta.keyboard.left = false;
        RocketCusta.keyboard.right = false;
    });
};

/**
 * Keyboard Event Function
 * @method keyboardEvent
 */
RocketCusta.keyboardEvent = function () {
    // Key Down
    jQuery(document).keydown(event => {
        switch (event.keyCode) {
            // Left & A Key
            case 37:
            case 65:
                RocketCusta.keyboard.left = true;
                break;
                // Up & W Key
            case 38:
            case 87:
                RocketCusta.keyboard.up = true;
                break;
                // Right & D Key
            case 39:
            case 68:
                RocketCusta.keyboard.right = true;
                break;
                // Down & S Key
            case 40:
            case 83:
                RocketCusta.keyboard.down = true;
                break;
                // Esc Key
            case 27:
                RocketCusta.keyboard.esc = true;
                break;
        }
    });
    // Key Up
    jQuery(document).keyup(event => {
        switch (event.keyCode) {
            // Left & A Key
            case 37:
            case 65:
                RocketCusta.keyboard.left = false;
                break;
                // Up & W Key
            case 38:
            case 87:
                RocketCusta.keyboard.up = false;
                break;
                // Right & D Key
            case 39:
            case 68:
                RocketCusta.keyboard.right = false;
                break;
                // Down & S Key
            case 40:
            case 83:
                RocketCusta.keyboard.down = false;
                break;
                // Esc Key
            case 27:
                RocketCusta.keyboard.esc = false;
                RocketCusta.pauseGame();
                break;
        }
    });
};

/**
 * Draw Frame Function
 * @method drawFrame
 */
RocketCusta.drawFrame = function () {
    // Clear Frame
    RocketCusta.clearFrame();

    // FPS
    RocketCusta.delta = (new Date().getTime() - RocketCusta.lastCalledTime) / 1000;
    RocketCusta.lastCalledTime = Date.now();
    RocketCusta.fps = 1 / RocketCusta.delta;

    // Score
    if (!RocketCusta.menu)
        RocketCusta.updateScore();

    // Rocket Collision
    var collisionObjectsCount = RocketCusta.comets.length;
    for (var i = 0; i < collisionObjectsCount; i++) {
        var collisionRocket = RocketCusta.collision(RocketCusta.rockets[0], RocketCusta.comets[i]);
        if (collisionRocket == 1)
            RocketCusta.gameover = true;
    }

    // Comet Collision
    var cometObjectsCount = RocketCusta.comets.length;
    for (var a = 0; a < cometObjectsCount; a++) {
        for (var b = 0; b < cometObjectsCount; b++) {
            if (a != b) {
                var collisionComet = RocketCusta.collision(RocketCusta.comets[a], RocketCusta.comets[b]);
                if (collisionComet == 2) {
                    RocketCusta.comets[a].velocityX = RocketCusta.comets[b].velocityX;
                    RocketCusta.comets[b].velocityX = RocketCusta.comets[a].velocityX;
                }
            }
        }
    }

    // Game Movement & Animations
    RocketCusta.moveStar();
    RocketCusta.moveMoon();
    RocketCusta.movePlanet();

    // Game Is Not On Pause
    if (!RocketCusta.gameover && !RocketCusta.menu) {
        RocketCusta.animateRocket();
        RocketCusta.moveComet();
        RocketCusta.moveRocket();
    }

    // Explosion Animation
    if (RocketCusta.gameover) {
        RocketCusta.animateExplosion();
        RocketCusta.gameoverTimer--;
    }

    // Game Over Screen
    if (RocketCusta.gameover && RocketCusta.gameoverTimer < 0)
        RocketCusta.gameOver();

    // Draw Next Frame
    if (!RocketCusta.pause)
        RocketCusta.updateFrame();
};

/**
 * Update Score Function
 * @method updateScore
 */
RocketCusta.updateScore = function () {
    RocketCusta.score++;
    RocketCusta.scoreUpdate++;

    if (RocketCusta.scoreUpdate > 12) {
        RocketCusta.level = Math.round(RocketCusta.score / 750) + 1;
        RocketCusta.speed = RocketCusta.level + 1;
        jQuery('#game-score, #game-user-score').text('Score: ' + RocketCusta.score);
        jQuery('#game-level, #game-user-level').text('Level ' + RocketCusta.level);
        jQuery('#game-fps').text(Math.round(RocketCusta.fps));
        RocketCusta.scoreUpdate = 0;
    }
};

/**
 * Clear Frame Function
 * @method clearFrame
 */
RocketCusta.clearFrame = function () {
    RocketCusta.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

/**
 * Update Frame Function
 * @method updateFrame
 */
RocketCusta.updateFrame = function () {
    window.requestAnimationFrame(() => {
        window.setTimeout(RocketCusta.drawFrame, 1000 / 30);
    });
};

/**
 * Spawn Rocket Function
 * @method spawnRocket
 */
RocketCusta.spawnRocket = function () {
    var rocket = new RocketCusta.rocket();
    RocketCusta.rockets.push(rocket);

    for (var i = 0; i < 28; i++) {
        var thrust = new RocketCusta.thrust();
        thrust.alpha = 0;
        RocketCusta.thrusts.push(thrust);
    }
};

/**
 * Animate Rocket Function
 * @method animateRocket
 */
RocketCusta.animateRocket = function () {
    var rocket = RocketCusta.rockets[0];
    var thrustCount = RocketCusta.thrusts.length;

    for (var i = 0; i < thrustCount; i++) {
        var thrust = RocketCusta.thrusts[i];
        thrust.radius -= 0.25;
        thrust.x -= -rocket.velocityX + 3 + 2 * Math.random();
        thrust.y -= rocket.rotation * 10;
        thrust.alpha -= 0.02;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(thrust.x - (rocket.width) + thrust.radius, rocket.y + thrust.y, thrust.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = 'rgba(255,255,255,' + thrust.alpha + ')';
        RocketCusta.context.fill();

        if (thrust.radius < 1) {
            thrust.y = (Math.random() * 8) - 4;
            thrust.x = rocket.x + (25 * RocketCusta.scale);
            thrust.radius = (12 + 10 * Math.random()) * (RocketCusta.scale);
            thrust.alpha = 1;
        }
    }
};

RocketCusta.moveRocket = function () {
    var rocket = RocketCusta.rockets[0];

    // Player Keyboard
    if (RocketCusta.keyboard.down && rocket.velocityY < rocket.speed) {
        rocket.velocityY += rocket.speedFactorY;
    }
    if (RocketCusta.keyboard.up && rocket.velocityY > -rocket.speed) {
        rocket.velocityY -= rocket.speedFactorY;
    }
    if (RocketCusta.keyboard.right && rocket.velocityX < rocket.speed) {
        rocket.velocityX += rocket.speedFactorX / 3;
    }
    if (RocketCusta.keyboard.left && rocket.velocityX > -rocket.speed) {
        rocket.velocityX -= rocket.speedFactorX / 3;
    }
    if (window.DeviceOrientationEvent && RocketCusta.mobile) {
        rocket.velocityY += rocket.speedFactorY;
        rocket.velocityX += rocket.speedFactorX / 3;
    }

    // Velocity & Rotation
    rocket.velocityY *= rocket.friction;
    rocket.velocityX *= rocket.friction;
    rocket.y += rocket.velocityY;
    rocket.x += rocket.velocityX;
    rocket.rotation = rocket.velocityY / 2 * Math.PI / 180;

    if (rocket.x >= window.innerWidth) {
        rocket.x = window.innerWidth;
        rocket.velocityX = -rocket.velocityX / 4;
    }
    if (rocket.x <= 0) {
        rocket.x = 0;
        rocket.velocityX = -rocket.velocityX / 4;
    }
    if (rocket.y >= window.innerHeight) {
        rocket.y = window.innerHeight;
        rocket.velocityY = -rocket.velocityY / 2;
    }
    if (rocket.y <= 0) {
        rocket.y = 0;
        rocket.velocityY = -rocket.velocityY / 2;
    }

    // Draw Rocket
    RocketCusta.context.save();
    RocketCusta.context.translate(rocket.x, rocket.y);
    RocketCusta.context.rotate(rocket.rotation);
    RocketCusta.context.drawImage(RocketCusta.rocketImage, -rocket.width / 2, -rocket.height / 2, rocket.width, rocket.height);
    RocketCusta.context.restore();
};

/**
 * Spawn Star Function
 * @method spawnStar
 */
RocketCusta.spawnStar = function () {
    var starCount = Math.round((window.innerHeight * window.innerWidth) / 9000);

    for (var i = 0; i < starCount; i++) {
        var star = new RocketCusta.star();
        RocketCusta.stars.push(star);
    }
};

/**
 * Move Star Function
 * @method moveStar
 */
RocketCusta.moveStar = function () {
    var starCount = RocketCusta.stars.length;

    for (var i = 0; i < starCount; i++) {
        var star = RocketCusta.stars[i];
        star.x -= star.speed;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = 'rgba(255,255,255,.5)';
        RocketCusta.context.fill();

        if (star.x < 0) {
            var starObject = new RocketCusta.star();
            starObject.x = window.innerWidth;
            RocketCusta.stars[i] = starObject;
        }
    }
};

/**
 * Spawn Planet Function
 * @method spawnPlanet
 */
RocketCusta.spawnPlanet = function () {
    var planet = new RocketCusta.planet();
    RocketCusta.planets.push(planet);
};

/**
 * Move Planet Function
 * @method movePlanet
 */
RocketCusta.movePlanet = function () {
    var planetCount = RocketCusta.planets.length;

    for (var i = 0; i < planetCount; i++) {
        var planet = RocketCusta.planets[i];
        planet.x -= planet.speed;

        RocketCusta.context.globalAlpha = 0.04;
        RocketCusta.context.beginPath();
        RocketCusta.context.arc(planet.x, planet.y, planet.radius + 500, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = planet.color;
        RocketCusta.context.fill();

        RocketCusta.context.globalAlpha = 0.08;
        RocketCusta.context.beginPath();
        RocketCusta.context.arc(planet.x, planet.y, planet.radius + 250, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = planet.color;
        RocketCusta.context.fill();
        RocketCusta.context.globalAlpha = 1;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = planet.color;

        RocketCusta.context.shadowBlur = planet.radius / 8;
        RocketCusta.context.shadowColor = planet.color;
        RocketCusta.context.fill();
        RocketCusta.context.shadowBlur = 0;

        RocketCusta.context.globalAlpha = 0.5;
        RocketCusta.context.drawImage(planet.image, planet.x - (planet.radius), planet.y - (planet.radius), planet.radius * 2, planet.radius * 2);
        RocketCusta.context.globalAlpha = 1;

        if (planet.x < 0 - planet.radius - 500) {
            RocketCusta.planets.splice(i, 1);
            RocketCusta.spawnPlanet();
        }
    }
};

/**
 * Spawn Comet Function
 * @method spawnComet
 */
RocketCusta.spawnComet = function () {
    if (RocketCusta.comets.length < Math.round(window.innerHeight / 100) + RocketCusta.speed + RocketCusta.level) {
        var comet = new RocketCusta.comet();
        RocketCusta.comets.push(comet);
    }
};

/**
 * Move Comet Function
 * @method moveComet
 */
RocketCusta.moveComet = function () {
    var cometCount = RocketCusta.comets.length;

    for (var i = 0; i < cometCount; i++) {
        var comet = RocketCusta.comets[i];
        comet.x -= comet.velocityX;
        comet.y -= comet.velocityY;
        comet.force == 0 ? comet.rotation += comet.speed / 2 : comet.rotation -= comet.speed / 2;
        var rotation = comet.rotation * Math.PI / 180;

        RocketCusta.context.save();
        RocketCusta.context.translate(comet.x, comet.y);
        RocketCusta.context.rotate(rotation);
        RocketCusta.context.drawImage(comet.image, -comet.radius, -comet.radius, comet.radius * 2, comet.radius * 2);
        RocketCusta.context.restore();

        if (comet.x < 0 - comet.radius) {
            var cometObject = new RocketCusta.comet();
            RocketCusta.comets[i] = cometObject;
        }
    }
};

/**
 * Spawn Moon Function
 * @method spawnMoon
 */
RocketCusta.spawnMoon = function () {
    for (var i = 0; i < 2; i++) {
        var moon = new RocketCusta.moon();
        moon.x = window.innerWidth * Math.random();
        RocketCusta.moons.push(moon);
    }
};

/**
 * Move Moon Function
 * @method moveMoon
 */
RocketCusta.moveMoon = function () {
    var moonCount = RocketCusta.moons.length;

    for (var i = 0; i < moonCount; i++) {
        var moon = RocketCusta.moons[i];
        moon.x -= moon.speed;

        RocketCusta.context.globalAlpha = 0.12;
        RocketCusta.context.beginPath();
        RocketCusta.context.arc(moon.x, moon.y, moon.radius + 150, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = moon.color;
        RocketCusta.context.fill();

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(moon.x, moon.y, moon.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = moon.color;

        RocketCusta.context.shadowBlur = moon.radius / 1.2;
        RocketCusta.context.shadowColor = moon.color;
        RocketCusta.context.fill();
        RocketCusta.context.shadowBlur = 0;
        RocketCusta.context.globalAlpha = 0.75;

        RocketCusta.context.drawImage(moon.image, moon.x - moon.radius, moon.y - moon.radius, moon.radius * 2, moon.radius * 2);

        RocketCusta.context.globalAlpha = 1;

        if (moon.x < 0 - (moon.radius * 2 + 300)) {
            var moonObject = new RocketCusta.moon();
            RocketCusta.moons[i] = moonObject;
        }
    }
};

/**
 * Collision Detection Function
 * @method collision
 * @param objectA
 * @param objectB
 * @returns {boolean}
 */
RocketCusta.collision = function (objectA, objectB) {
    var collisionDetection = 0;
    var vectorX = (objectA.x) - (objectB.x);
    var vectorY = (objectA.y) - (objectB.y);

    if (objectA.name == 'rocket') {
        var collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        var collisionHeight = (objectA.height / 2.5) + (objectB.height / 2.25);
    } else if (objectB.name == 'rocket') {
        var collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        var collisionHeight = (objectA.height / 2.25) + (objectB.height / 2.5);
    } else {
        var collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        var collisionHeight = (objectA.height / 2.25) + (objectB.height / 2.25);
    }

    if (Math.abs(vectorX) < collisionWidth && Math.abs(vectorY) < collisionHeight) {
        if (objectA.name == 'comet' && objectB.name == 'comet')
            collisionDetection = 2;
        else
            collisionDetection = 1;
    }

    return collisionDetection;
};

/**
 * Generate Explosion
 * @method spawnExplosion
 */
RocketCusta.spawnExplosion = function () {
    for (var i = 0; i < 10; i++) {
        var explosion = new RocketCusta.explosion();
        var rocket = RocketCusta.rockets[0];
        explosion.y = rocket.y + (Math.floor(Math.random() * 51) - 25) - (rocket.height / 2);
        explosion.x = rocket.x + (Math.floor(Math.random() * 101) - 50) - (rocket.width / 2);
        RocketCusta.explosions.push(explosion);
    }
};

/**
 * Explosion Animation
 * @method animateExplosion
 */
RocketCusta.animateExplosion = function () {
    var rocket = RocketCusta.rockets[0];
    var explosionCount = RocketCusta.explosions.length;

    for (var i = 0; i < explosionCount; i++) {
        var explosion = RocketCusta.explosions[i];
        explosion.x = rocket.x + ((Math.random() * 251) - 125);
        explosion.y = rocket.y + ((Math.random() * 251) - 125);
        explosion.radius += Math.random() * 500;
        explosion.alpha -= 0.04;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(explosion.x + Math.round(Math.random() * 51) - 25, explosion.y + Math.round(Math.random() * 51) - 25, explosion.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = 'rgba(200,200,0,' + explosion.alpha + ')';
        RocketCusta.context.fill();

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = explosion.color + ',' + explosion.alpha + ')';
        RocketCusta.context.fill();

        if (explosion.alpha < 0) {
            RocketCusta.explosions.shift();
        }
    }
};