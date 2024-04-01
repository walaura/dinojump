import { TGlobals, STATIC_GLOBALS } from "./Globals.ts";
// @ts-ignore
import dino1 from "../walk1.gif";
// @ts-ignore
import dino2 from "../walk2.gif";
// @ts-ignore
import holdThingy from "../holdThingy.gif";

const makeImage = (url) => {
	const img = new Image();
	img.src = url;
	return img;
};

const DINOS = [dino1, dino2];
const DINO_IMAGES = DINOS.map(makeImage);
const CACTUS_IMAGE = makeImage(holdThingy);

const $score = document.querySelector("#score");
const $canvas = document.querySelector("#canvas");

const Render = () => {
	const ctx = $canvas instanceof HTMLCanvasElement && $canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas not found");
	ctx.imageSmoothingEnabled = false;

	const loop = (GLOBALS: TGlobals) => {
		ctx.clearRect(0, 0, STATIC_GLOBALS.width, STATIC_GLOBALS.height);
		ctx.drawImage(
			DINO_IMAGES[GLOBALS.dinoFrame],
			STATIC_GLOBALS.dinoOffsetX,
			STATIC_GLOBALS.height - STATIC_GLOBALS.dinoSpriteSize - GLOBALS.dinoY,
			STATIC_GLOBALS.dinoSpriteSize,
			STATIC_GLOBALS.dinoSpriteSize
		);

		for (let i = 0; i < GLOBALS.obstacles.length; i++) {
			const obstacle = GLOBALS.obstacles[i];

			ctx.drawImage(
				CACTUS_IMAGE,
				obstacle[1],
				STATIC_GLOBALS.height - obstacle[0],
				STATIC_GLOBALS.obstacleSpriteSize,
				CACTUS_IMAGE.height
			);
		}
		// @ts-ignore
		$score.innerText = GLOBALS.score;
	};

	return loop;
};

export default Render;
