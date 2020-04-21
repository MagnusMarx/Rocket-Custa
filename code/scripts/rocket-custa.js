/**
 * Rocket Custa
 * @constructor
 * @class RocketCusta
 * @namespace RocketCusta
 */
RocketCusta = () => {};

// FPS
RocketCusta.lastCalledTime = Date.now();
RocketCusta.fps = 0;

// Player Attributes
RocketCusta.scale = window.innerHeight / 1000;
RocketCusta.level = 1;
RocketCusta.speed = 1;
RocketCusta.score = 0;
RocketCusta.scoreUpdate = 0;
RocketCusta.gameover = false;
RocketCusta.gameoverTimer = 6;
RocketCusta.timer = setInterval(RocketCusta.spawnComet, 10);
RocketCusta.pause = true;
RocketCusta.audio = true;
RocketCusta.clickPositionY = null;
RocketCusta.clickPositionX = null;
RocketCusta.menu = false;

/**
 * Keyboard Event
 * @type {{left: boolean, right: boolean, up: boolean, down: boolean, esc: boolean}}
 */
RocketCusta.keyboard =
{
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
RocketCusta.rocket = function()
{
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
RocketCusta.thrust = function()
{
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
RocketCusta.star = function()
{
    this.radius = Math.random() * 2;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.speed = Math.random() * RocketCusta.speed / 12;
};
RocketCusta.stars = [];

// Planet image init
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
RocketCusta.planet = function()
{
    this.radius = window.innerHeight / 8 + Math.random() * window.innerHeight / 2;
    this.x = window.innerWidth + this.radius + 500;
    this.y = Math.random() * window.innerHeight;
    this.speed = RocketCusta.speed / 2 + Math.random() * RocketCusta.speed / 4;
    this.color = 'rgb(' + Math.round(Math.random() * 256) + ',' +  Math.round(Math.random() * 256) +',' + Math.round(Math.random() * 256) + ')';
    this.image = RocketCusta.planetImage[Math.floor(Math.random() * RocketCusta.planetImage.length)];
};
RocketCusta.planets = [];

// Moon image init
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
RocketCusta.moon = function()
{
    this.radius = (10 + Math.random() * 125) * RocketCusta.scale;
    this.x = window.innerWidth + this.radius;
    this.y = Math.random() * window.innerHeight;
    this.speed = RocketCusta.speed / 4 + Math.random() * RocketCusta.speed / 8;
    this.image = RocketCusta.moonImage[Math.floor(Math.random() * RocketCusta.moonImage.length)];
    this.color = 'rgb(' + Math.round(Math.random() * 32) + ',' +  Math.round(Math.random() * 32) +',' + Math.round(Math.random() * 128) + ')';
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
RocketCusta.comet = function()
{
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
RocketCusta.explosion = function()
{
    this.y = 0;
    this.x = 0;
    this.alpha = 1;
    this.radius = 1;
    this.color = 'rgba(' + Math.round(Math.random() * 256) + ',' +  Math.round(Math.random() * 5) +',' + Math.round(Math.random() * 5);
};
RocketCusta.explosions = [];

/**
 * Initialize Funtion
 * @method initialize
 */
document.addEventListener("DOMContentLoaded", function()
{
    let pathname = location.pathname;
    let path = pathname.match(/play|options|how-to-play|highscores|credits/gi);

    if(path == null)
        path = '';
    else
        path = '../'

    RocketCusta.planetImage[0].src = path + 'code/resources/planet-1.png';
    RocketCusta.planetImage[1].src = path + 'code/resources/planet-2.png';

    RocketCusta.moonImage[0].src = path + 'code/resources/moon-1.png';
    RocketCusta.moonImage[1].src = path + 'code/resources/moon-2.png';

    RocketCusta.cometImage[0].src = path + 'code/resources/comet-1.png';
    RocketCusta.cometImage[1].src = path + 'code/resources/comet-2.png';

    RocketCusta.rocketImage.src = path + 'code/resources/rocket.png';

    // Init Game
    RocketCusta.canvas = document.getElementById('rocket-custa');
    RocketCusta.context = RocketCusta.canvas.getContext('2d');

    RocketCusta.context.canvas.height = window.innerHeight;
    RocketCusta.context.canvas.width = window.innerWidth;

    // Events
    RocketCusta.keyboardEvent();

    document.addEventListener('click', function (event) {
        if (event.target.matches('#game-audio'))
        {
            RocketCusta.gameAudio();
        }
    })

    const {gameStart} = RocketCusta;
    setTimeout(gameStart, 100);
});

/**
 * Initalize Game Function
 * @method initGame
 */
RocketCusta.initGame = function()
{
    // Set score visible
    let gameScore = document.querySelector('#game-score');
    if (gameScore !== null) {
        gameScore.style.display = 'block';
    }

    // Set level visible
    let gameLevel = document.querySelector('#game-level');
    if (gameLevel !== null) {
        gameLevel.style.display = 'block';
    }

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
RocketCusta.pauseGame = function()
{
    RocketCusta.pause = !RocketCusta.pause;

    if (!RocketCusta.pause) {
        RocketCusta.timer = setInterval(RocketCusta.spawnComet, 1000);
        RocketCusta.updateFrame();
    }
    else {
        clearInterval(RocketCusta.timer);
    }
};

/**
 * Start Game Function
 * @method gameStart
 */
RocketCusta.gameStart = function()
{
    if(RocketCusta.pause) {
        RocketCusta.initGame();
        RocketCusta.pause = false;

        RocketCusta.updateFrame();

        console.log(location.pathname)
        let isInGame = location.pathname;
        if(isInGame === '/play/') {
            RocketCusta.timer = setInterval(RocketCusta.spawnComet, 1000);
        }
    }
};

/**
 * Game Over Function
 * @method gameOver
 */
RocketCusta.gameOver = function()
{
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

    let gameNavigation = document.querySelector('.game-navigation');
    gameNavigation.style.display = 'block';

    document.getElementById('audio-explosion').play();
};

/**
 * Game Audio
 * @method gameAudio
 */
RocketCusta.gameAudio = function()
{
    document.querySelector('#game-audio').classList.toggle('off');
    let audioBackground = document.getElementById('audio-background');
    let audioExplosion = document.getElementById('audio-explosion');
    audioBackground.muted = !audioBackground.muted;
    audioExplosion.muted = !audioExplosion.muted;
};

/**
 * Resize Event
 * @method resizeEvent
 */
RocketCusta.resizeEvent = function()
{
    RocketCusta.context.canvas.height = window.innerHeight;
    RocketCusta.context.canvas.width = window.innerWidth;
    if(!RocketCusta.pause) {
        RocketCusta.gameStart();
    }
};

/**
 * Keyboard Event Function
 * @method keyboardEvent
 */
RocketCusta.keyboardEvent = function()
{
    // Key Down
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            // Left & A Key
            case 'a':
            case 'ArrowLeft':
                RocketCusta.keyboard.left = true;
                break;
            // Up & W Key
            case 'w':
            case 'ArrowUp':
                RocketCusta.keyboard.up = true;
                break;
            // Right & D Key
            case 'd':
            case 'ArrowRight':
                RocketCusta.keyboard.right = true;
                break;
            // Down & S Key
            case 's':
            case 'ArrowDown':
                RocketCusta.keyboard.down = true;
                break;
            // Esc Key
            case 'Escape':
                RocketCusta.keyboard.esc = true;
                break;
        }
    });
    // Key Up
    document.addEventListener('keyup', function(event) {
        switch (event.key) {
            // Left & A Key
            case 'a':
            case 'ArrowLeft':
                RocketCusta.keyboard.left = false;
                break;
            // Up & W Key
            case 'w':
            case 'ArrowUp':
                RocketCusta.keyboard.up = false;
                break;
            // Right & D Key
            case 'd':
            case 'ArrowRight':
                RocketCusta.keyboard.right = false;
                break;
            // Down & S Key
            case 's':
            case 'ArrowDown':
                RocketCusta.keyboard.down = false;
                break;
            // Esc Key
            case 'Escape':
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
RocketCusta.drawFrame = function()
{
    // Clear Frame
    RocketCusta.clearFrame();

    // FPS
    RocketCusta.delta = (new Date().getTime() - RocketCusta.lastCalledTime) / 1000;
    RocketCusta.lastCalledTime = Date.now();
    RocketCusta.fps = 1 / RocketCusta.delta;

    // Score
    RocketCusta.updateScore();

    // Rocket Collision
    let collisionObjectsCount = RocketCusta.comets.length;
    for(let i = 0; i < collisionObjectsCount; i++ ) {
        let collisionRocket = RocketCusta.collision(RocketCusta.rockets[0], RocketCusta.comets[i]);
        if(collisionRocket === 1) {
            RocketCusta.gameover = true;
        }
    }

    // Comet Collision
    let cometObjectsCount = RocketCusta.comets.length;
    for(let a = 0; a < cometObjectsCount; a++) {
        for(let b = 0; b < cometObjectsCount; b++) {
            if(a !== b) {
                let collisionComet = RocketCusta.collision(RocketCusta.comets[a], RocketCusta.comets[b]);
                if(collisionComet === 2) {
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
    if(!RocketCusta.gameover && !RocketCusta.menu) {
        RocketCusta.animateRocket();
        RocketCusta.moveComet();
        RocketCusta.moveRocket();
    }

    // Explosion Animation
    if(RocketCusta.gameover) {
        RocketCusta.animateExplosion();
        RocketCusta.gameoverTimer--;
    }

    // Game Over Screen
    if(RocketCusta.gameover && RocketCusta.gameoverTimer < 0)
        RocketCusta.gameOver();

    // Draw Next Frame
    if(!RocketCusta.pause)
        RocketCusta.updateFrame();
};

/**
 * Update Score Function
 * @method updateScore
 */
RocketCusta.updateScore = function()
{
    RocketCusta.score++;
    RocketCusta.scoreUpdate++;

    if(RocketCusta.scoreUpdate > 12) {
        RocketCusta.level = Math.round(RocketCusta.score / 750) + 1;
        RocketCusta.speed = RocketCusta.level + 1;

        let gameScore = document.querySelector('#game-score');
        if(gameScore != null) {
            gameScore.innerHTML = 'Score: ' + RocketCusta.score;
        }

        let gameLevel = document.querySelector('#game-level');
        if(gameLevel != null) {
            gameLevel.innerHTML = 'Level ' + RocketCusta.level;
        }

        let gameFps = document.querySelector('#game-fps');
        if(gameFps != null) {
            gameFps.innerHTML = RocketCusta.fps;
        }

        RocketCusta.scoreUpdate = 0;
    }
};

/**
 * Clear Frame Function
 * @method clearFrame
 */
RocketCusta.clearFrame = function()
{
    RocketCusta.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

/**
 * Update Frame Function
 * @method updateFrame
 */
RocketCusta.updateFrame = function()
{
    window.requestAnimationFrame(() => {
        window.setTimeout(RocketCusta.drawFrame, 1000 / 40);
    });
};

/**
 * Spawn Rocket Function
 * @method spawnRocket
 */
RocketCusta.spawnRocket = function()
{
    let rocket = new RocketCusta.rocket();
    RocketCusta.rockets.push(rocket);

    for(let i = 0; i < 28; i++) {
        let thrust = new RocketCusta.thrust();
        thrust.alpha = 0;
        RocketCusta.thrusts.push(thrust);
    }
};

/**
 * Animate Rocket Function
 * @method animateRocket
 */
RocketCusta.animateRocket = function()
{
    let rocket = RocketCusta.rockets[0];
    let thrustCount = RocketCusta.thrusts.length;

    for(let i = 0; i < thrustCount; i++) {
        let thrust = RocketCusta.thrusts[i];
        thrust.radius -= 0.25;
        thrust.x -= -rocket.velocityX + 3 + 2 * Math.random();
        thrust.y -= rocket.rotation * 10;
        thrust.alpha -= 0.02;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(thrust.x - (rocket.width) + thrust.radius, rocket.y + thrust.y, thrust.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = 'rgba(255,255,255,' + thrust.alpha + ')';
        RocketCusta.context.fill();

        if(thrust.radius  < 1) {
            thrust.y = (Math.random() * 8) - 4;
            thrust.x = rocket.x + (25 * RocketCusta.scale);
            thrust.radius = (12 + 10 * Math.random()) * (RocketCusta.scale);
            thrust.alpha = 1;
        }
    }
};

RocketCusta.moveRocket = function ()
{
    let rocket = RocketCusta.rockets[0];

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

    // Velocity & Rotation
    rocket.velocityY *= rocket.friction;
    rocket.velocityX *= rocket.friction;
    rocket.y += rocket.velocityY;
    rocket.x += rocket.velocityX;
    rocket.rotation = rocket.velocityY / 2 * Math.PI / 180;

    if(rocket.x >= window.innerWidth) {
        rocket.x = window.innerWidth;
        rocket.velocityX = -rocket.velocityX / 4;
    }
    if(rocket.x <= 0) {
        rocket.x = 0;
        rocket.velocityX = -rocket.velocityX / 4;
    }
    if(rocket.y >= window.innerHeight) {
        rocket.y = window.innerHeight;
        rocket.velocityY = -rocket.velocityY / 2;
    }
    if(rocket.y <= 0) {
        rocket.y = 0;
        rocket.velocityY = -rocket.velocityY / 2;
    }

    // Draw Rocket
    RocketCusta.context.save();
    RocketCusta.context.translate(rocket.x,rocket.y);
    RocketCusta.context.rotate(rocket.rotation);
    RocketCusta.context.drawImage(RocketCusta.rocketImage, -rocket.width / 2, -rocket.height / 2, rocket.width, rocket.height);
    RocketCusta.context.restore();
};

/**
 * Spawn Star Function
 * @method spawnStar
 */
RocketCusta.spawnStar = function()
{
    let starCount = Math.round((window.innerHeight * window.innerWidth) / 18000);

    for(let i = 0; i < starCount; i++) {
        let star = new RocketCusta.star();
        RocketCusta.stars.push(star);
    }
};

/**
 * Move Star Function
 * @method moveStar
 */
RocketCusta.moveStar = function()
{
    let starCount = RocketCusta.stars.length;

    for(let i = 0; i < starCount; i++) {
        let star = RocketCusta.stars[i];
        star.x -= star.speed;

        RocketCusta.context.beginPath();
        RocketCusta.context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        RocketCusta.context.fillStyle = 'rgba(255,255,255,.5)';
        RocketCusta.context.fill();

        if(star.x < 0) {
            let starObject = new RocketCusta.star();
            starObject.x = window.innerWidth;
            RocketCusta.stars[i] = starObject;
        }
    }
};

/**
 * Spawn Planet Function
 * @method spawnPlanet
 */
RocketCusta.spawnPlanet = function()
{
    let planet = new RocketCusta.planet();
    RocketCusta.planets.push(planet);
};

/**
 * Move Planet Function
 * @method movePlanet
 */
RocketCusta.movePlanet = function()
{
    let planetCount = RocketCusta.planets.length;

    for(let i = 0; i < planetCount; i++) {
        let planet = RocketCusta.planets[i];
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
        RocketCusta.context.drawImage(planet.image, planet.x - (planet.radius), planet.y  - (planet.radius), planet.radius * 2, planet.radius * 2);
        RocketCusta.context.globalAlpha = 1;

        if(planet.x < 0 - planet.radius - 500) {
            RocketCusta.planets.splice(i,1);
            RocketCusta.spawnPlanet();
        }
    }
};

/**
 * Spawn Comet Function
 * @method spawnComet
 */
RocketCusta.spawnComet = function()
{
    if(RocketCusta.comets.length < Math.round(window.innerHeight / 100) + RocketCusta.speed + RocketCusta.level) {
        let comet = new RocketCusta.comet();
        RocketCusta.comets.push(comet);
    }
};

/**
 * Move Comet Function
 * @method moveComet
 */
RocketCusta.moveComet = function()
{
    let cometCount = RocketCusta.comets.length;

    for(let i = 0; i < cometCount; i++) {
        let comet = RocketCusta.comets[i];
        comet.x -= comet.velocityX;
        comet.y -= comet.velocityY;
        comet.force === 0 ? comet.rotation += comet.speed / 2 : comet.rotation -= comet.speed / 2;
        let rotation = comet.rotation * Math.PI / 180;

        RocketCusta.context.save();
        RocketCusta.context.translate(comet.x,comet.y);
        RocketCusta.context.rotate(rotation);
        RocketCusta.context.drawImage(comet.image, -comet.radius, -comet.radius, comet.radius * 2, comet.radius * 2);
        RocketCusta.context.restore();

        if(comet.x < 0 - comet.radius) {
            RocketCusta.comets[i] = new RocketCusta.comet();
        }
    }
};

/**
 * Spawn Moon Function
 * @method spawnMoon
 */
RocketCusta.spawnMoon = function()
{
    for(let i = 0; i < 2; i++) {
        let moon = new RocketCusta.moon();
        moon.x = window.innerWidth * Math.random();
        RocketCusta.moons.push(moon);
    }
};

/**
 * Move Moon Function
 * @method moveMoon
 */
RocketCusta.moveMoon = function()
{
    let moonCount = RocketCusta.moons.length;

    for(let i = 0; i < moonCount; i++) {
        let moon = RocketCusta.moons[i];
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

        if(moon.x < 0 - (moon.radius * 2 + 300)) {
            RocketCusta.moons[i] = new RocketCusta.moon();
        }
    }
};

/**
 * Collision Detection Function
 * @method collision
 * @param objectA
 * @param objectB
 * @returns {number}
 */
RocketCusta.collision = function(objectA, objectB)
{
    let collisionHeight;
    let collisionWidth;
    let collisionDetection = 0;
    let vectorX = (objectA.x) - (objectB.x);
    let vectorY = (objectA.y) - (objectB.y);

    if(objectA.name === 'rocket') {
        collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        collisionHeight = (objectA.height / 2.5) + (objectB.height / 2.25);
    }
    else if(objectB.name === 'rocket') {
        collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        collisionHeight = (objectA.height / 2.25) + (objectB.height / 2.5);
    }
    else {
        collisionWidth = (objectA.width / 2.25) + (objectB.width / 2.25);
        collisionHeight = (objectA.height / 2.25) + (objectB.height / 2.25);
    }

    if(Math.abs(vectorX) < collisionWidth && Math.abs(vectorY) < collisionHeight) {
        if(objectA.name === 'comet' && objectB.name === 'comet')
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
RocketCusta.spawnExplosion = function() {
    for(let i = 0; i < 10; i++)
    {
        let explosion = new RocketCusta.explosion();
        let rocket = RocketCusta.rockets[0];
        explosion.y = rocket.y + (Math.floor(Math.random() * 51) - 25) - (rocket.height / 2);
        explosion.x = rocket.x + (Math.floor(Math.random() * 101) - 50) - (rocket.width / 2);
        RocketCusta.explosions.push(explosion);
    }
};

/**
 * Explosion Animation
 * @method animateExplosion
 */
RocketCusta.animateExplosion = function ()
{
    let rocket = RocketCusta.rockets[0];
    let explosionCount = RocketCusta.explosions.length;

    for(var i = 0; i < explosionCount; i++) {
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

        if(explosion.alpha < 0) {
            RocketCusta.explosions.shift();
        }
    }
};