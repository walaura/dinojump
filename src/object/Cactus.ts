import { STATIC_GLOBALS, TGlobals } from "../game/Globals";

const OBSTACLES_AT_ONCE = 6;

const Cactus = () => {
	const loop = (normalFrameTime: number, GLOBALS: TGlobals) => {
		while (GLOBALS.obstacles.length < OBSTACLES_AT_ONCE) {
			const previousObstacleAt = GLOBALS.obstacles.length
				? GLOBALS.obstacles[GLOBALS.obstacles.length - 1][1]
				: 0;
			GLOBALS.obstacles.push([
				20 + Math.random() * 30,
				previousObstacleAt + 100 + 100 * Math.random(),
				true,
			]);
		}

		for (let i = 0; i < GLOBALS.obstacles.length; i++) {
			const obstacle = GLOBALS.obstacles[i];
			obstacle[1] -= 30 * normalFrameTime;

			if (obstacle[2]) {
				if (
					obstacle[1] <
					STATIC_GLOBALS.dinoOffsetX + STATIC_GLOBALS.dinoSpriteSize / 2
				) {
					if (GLOBALS.dinoY < obstacle[0]) {
						GLOBALS.isGameOver = true;
					} else {
						GLOBALS.score++;
					}
					obstacle[2] = false;
				}
			}
		}

		if (GLOBALS.obstacles[0][1] < STATIC_GLOBALS.obstacleSpriteSize * -1.5) {
			GLOBALS.obstacles = GLOBALS.obstacles.slice(1);
		}
	};

	return loop;
};

export default Cactus;
