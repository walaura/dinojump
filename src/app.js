
const $dino = document.querySelector('#dino');
const $pause = document.querySelector('#pause');
const $game = document.querySelector('#game');
const $cactus = document.querySelector('#cactus');
const $score = document.querySelector('#score');
const $cactii = [...document.querySelector('#cactus').children];
const gravity = 9.8;

const SIZE = 1000;
const OBSTACLES_AT_ONCE = 4;
const WEIGHT = 5;

//OBSTACLE = [height, x]

console.log($cactii);

const MakeGame = () => {
    let paused = false;

    let dinoY = 0;
    let vertSpeed = 0;

    let ogTime = 0;

    let obstacles = [];

    let score = 0;

    const loop = (time = 0) => {
        const frameTime = (time - ogTime) / 1000;
        ogTime = time;
        const speed = 2 + (1 * (score / 10))
        const normalFrameTime = (frameTime * speed);
        console.log(score, speed);

        //cactii
        while (obstacles.length < OBSTACLES_AT_ONCE) {
            obstacles.push([Math.random() * 50, (obstacles.length + 1) * 200]);
        }

        for (i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            obstacle[1] -= 30 * normalFrameTime;
            $cactii[i].style.transform = `translateX(${obstacle[1]}px)`;
            $cactii[i].style.height = `${obstacle[0]}px`;
        }

        if (obstacles[0][1] < 1) {
            if (dinoY < obstacles[0][0]) {
                //alert('Game Over');
            } else {
                score++;
            }
        }
        if (obstacles[0][1] < 0) {
            obstacles = obstacles.slice(1);
        }

        // dino
        if (vertSpeed > 0) {
            vertSpeed -= normalFrameTime;
            dinoY += (vertSpeed * 57) * normalFrameTime;
        }

        if (dinoY > 0) {
            dinoY -= (gravity * 30) * normalFrameTime;
        }

        dinoY = Math.max(0, dinoY);
        $dino.style.transform = `translateY(-${dinoY}px)`;

        //score
        $score.innerText = score;

        !paused && requestAnimationFrame(loop)
    }
    loop();

    $game.addEventListener('keydown', (e) => {
        if (e.key === ' ' && dinoY < .5) {
            vertSpeed = 7;
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