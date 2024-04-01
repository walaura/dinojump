console.log('Hello world!');


const makeGame = () => {
    let paused = false;
    const $dino = document.querySelector('#dino');
    const $pause = document.querySelector('#pause');
    const $game = document.querySelector('#game');

    const loop = (time) => {
        console.log(time)
        !paused && requestAnimationFrame(loop)
    }

    $game.addEventListener('keydown', (e) => {
        console.log(e.key);
    });

    $pause.addEventListener('click', () => {
        paused = !paused;
        if(!paused){
            loop();
        }
    });
}

makeGame();