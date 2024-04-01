import MakeCatSprite from './object/CatSprite.js';
import MakeGravity from './object/Gravity.js';


const $pause = document.querySelector('#pause');
const $game = document.querySelector('#game');
const $score = document.querySelector('#score');
const $cactii = [...document.querySelector('#cactus').children];


const OBSTACLES_AT_ONCE = 4;

//OBSTACLE = [height, x]

const GLOBALS = {
    dinoY: 0,
}

const MakeGame = () => {
    let paused = false;

    let ogTime = 0;

    let obstacles = [];

    let score = 0;

    const catSpriteLoop = MakeCatSprite();
    const [gravityLoop, jump] = MakeGravity();

    const loop = (time = 0) => {
        const frameTime = (time - ogTime) / 1000;
        ogTime = time;
        const speed = 2 + (1 * (score / 10))
        const normalFrameTime = (frameTime * speed);
        console.log(score, speed);

        //cactii
        while (obstacles.length < OBSTACLES_AT_ONCE) {
            const previousObstacleAt = obstacles.length ? obstacles[obstacles.length - 1][1] : 0;
            obstacles.push([Math.random() * 50, previousObstacleAt + 100 + (100 * Math.random())]);
        }

        for (i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            obstacle[1] -= 30 * normalFrameTime;
            $cactii[i].style.transform = `translateX(${obstacle[1]}px)`;
            $cactii[i].style.height = `${obstacle[0]}px`;
        }

        if (obstacles[0][1] < 1) {
            if (GLOBALS.dinoY < obstacles[0][0]) {
                //alert('Game Over');
            } else {
                score++;
            }
        }
        if (obstacles[0][1] < 0) {
            obstacles = obstacles.slice(1);
        }

        // dino
        gravityLoop(normalFrameTime, GLOBALS);
        catSpriteLoop(normalFrameTime);

        //score
        $score.innerText = score;


        !paused && requestAnimationFrame(loop)
    }
    loop();

    $game.addEventListener('keydown', (e) => {
        if (e.key === ' ' && GLOBALS.dinoY < .1) {
            jump();
        }
    });

    $pause.addEventListener('click', () => {
        paused = !paused;
        if (!paused) {
            loop();
        }
    });
}

MakeGame();