import dino1 from '../walk1.gif';
import dino2 from '../walk2.gif';
const dinos = [dino1, dino2];

const $dino = document.querySelector('#dino');

const MakeCatSprite = () => {
    let secondsElapsed = 0;
    let dinoFrame = 1;

    $img = document.createElement('img');
    $img.src = dinos[dinoFrame];
    $dino.appendChild($img);

    return (frameTime) => {
        secondsElapsed += frameTime;
        if (secondsElapsed > .6) {
            dinoFrame = dinoFrame === 1 ? 0 : 1;
            $img.src = dinos[dinoFrame];
            secondsElapsed = 0;
        }
    }
}

export default MakeCatSprite;