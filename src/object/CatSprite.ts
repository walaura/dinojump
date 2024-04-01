import { TGlobals } from "../game/Globals";

const CatSprite = () => {
	let secondsElapsed = 0;

	return (frameTime, GLOBALS: TGlobals) => {
		secondsElapsed += frameTime;
		if (secondsElapsed > 0.6) {
			GLOBALS.dinoFrame = GLOBALS.dinoFrame === 1 ? 0 : 1;
			secondsElapsed = 0;
		}
	};
};

export default CatSprite;
