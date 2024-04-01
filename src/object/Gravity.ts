import { TGlobals } from "../game/Globals";

const gravity = 9.8;
const accel = 4;

const Gravity = () => {
	let vertSpeed = 0;

	const loop = (normalFrameTime: number, GLOBALS: TGlobals) => {
		if (vertSpeed > 0) {
			vertSpeed -= normalFrameTime;
			GLOBALS.dinoY += (accel * vertSpeed * 60) * normalFrameTime;
		}

		if (GLOBALS.dinoY > 0) {
			GLOBALS.dinoY -= (gravity * 30 * accel) * normalFrameTime;
		}

		GLOBALS.dinoY = Math.max(0, GLOBALS.dinoY);
	};

	const jump = () => {
		vertSpeed = 6;
	};

	return { loop, jump };
};

export default Gravity;
