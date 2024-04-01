const $dino = document.querySelector('#dino');
const gravity = 9.8;

const OBSTACLES_AT_ONCE = 4;

//OBSTACLE = [height, x]

const MakeGravity = () => {
    let vertSpeed = 0;

    const loop = (normalFrameTime, GLOBALS) => {
        // dino
        if (vertSpeed > 0) {
            vertSpeed -= normalFrameTime;
            GLOBALS.dinoY += (vertSpeed * 57) * normalFrameTime;
        }

        if (GLOBALS.dinoY > 0) {
            GLOBALS.dinoY -= (gravity * 30) * normalFrameTime;
        }

        GLOBALS.dinoY = Math.max(0, GLOBALS.dinoY);
        $dino.style.transform = `translateY(-${GLOBALS.dinoY}px)`;
    }

    const jump = () => {
        vertSpeed = 6.9;
    };

    return [loop, jump]
}

export default MakeGravity;