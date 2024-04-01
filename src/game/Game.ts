import Cactus from "../object/Cactus.ts";
import CatSprite from "../object/CatSprite.ts";
import Gravity from "../object/Gravity.ts";
import { startGlobals } from "./Globals.ts";
import Render from "./Render.ts";

const $pause = document.querySelector("#pause");

const GLOBALS = startGlobals();

const MakeGame = () => {
	let paused = false;

	let ogTime = 0;

	const catSpriteLoop = CatSprite();
	const cactusLoop = Cactus();
	const renderLoop = Render();
	const { loop: gravityLoop, jump } = Gravity();

	const loop = (time = 0) => {
		const frameTime = (time - ogTime) / 1000;
		ogTime = time;
		const speed = 2 + 1 * (GLOBALS.score / 10);
		const normalFrameTime = frameTime * speed;

		gravityLoop(normalFrameTime, GLOBALS);
		cactusLoop(normalFrameTime, GLOBALS);
		catSpriteLoop(normalFrameTime, GLOBALS);

		renderLoop(GLOBALS);

		!paused && requestAnimationFrame(loop);
	};
	loop();

	window.document.addEventListener("keydown", (e) => {
		if (e.key === " " && GLOBALS.dinoY < 0.1) {
			jump();
		}
	});

	$pause?.addEventListener("click", () => {
		paused = !paused;
		if (!paused) {
			ogTime = performance.now()
			loop();
		}
	});
};

export default MakeGame;
