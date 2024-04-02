import Cactus from "../object/Cactus.ts";
import CatSprite from "../object/CatSprite.ts";
import Gravity from "../object/Gravity.ts";
import { startGlobals } from "./Globals.ts";
import Render from "./Render.ts";

const $pause = document.querySelector("#pause");
const $start = document.querySelector("#start");

const MakeGame = () => {
	const startGame = (onGameOver) => {
		const GLOBALS = startGlobals();
		let paused = false;

		let ogTime = performance.now();

		const catSpriteLoop = CatSprite();
		const cactusLoop = Cactus();
		const renderLoop = Render();
		const { loop: gravityLoop, jump } = Gravity();

		const onJump = (e) => {
			if (e.key === " " && GLOBALS.dinoY < 0.1) {
				jump();
			}
		};

		const onPause = () => {
			paused = !paused;
			if (!paused) {
				ogTime = performance.now();
				loop();
			}
		};

		window.document.addEventListener("keydown", onJump);
		$pause?.addEventListener("click", onPause);

		const teardown = () => {
			paused = true;
			window.document.removeEventListener("keydown", onJump);
			$pause?.removeEventListener("click", onPause);
		};

		const loop = (time = ogTime) => {
			const frameTime = (time - ogTime) / 1000;
			ogTime = time;
			const speed = 2 + 1 * (GLOBALS.score / 10);
			const normalFrameTime = frameTime * speed;

			gravityLoop(normalFrameTime, GLOBALS);
			cactusLoop(normalFrameTime, GLOBALS);
			catSpriteLoop(normalFrameTime, GLOBALS);

			renderLoop(GLOBALS);

			if (GLOBALS.isGameOver === true) {
				onGameOver();
				teardown();
				return;
			}

			!paused && requestAnimationFrame(loop);
		};
		loop();

		return teardown;
	};

	let teardown = () => {};
	const onStart = () => {
		teardown();
		teardown = startGame(() => {
			alert("game over");
		});
	};

	$start?.addEventListener("click", onStart);
};

export default MakeGame;
