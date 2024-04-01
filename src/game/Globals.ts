type Obstacle = [height: number, x: number, collides: boolean];
type TGlobals = {
	dinoY: number;
	obstacles: Obstacle[];
	score: 0;
	dinoFrame: 0 | 1;
};

const startGlobals = (): TGlobals => ({
	dinoY: 0,
	obstacles: [],
	score: 0,
	dinoFrame: 0,
});

const STATIC_GLOBALS = {
	dinoOffsetX: 20,
	width: 600,
	height: 200,
	dinoSpriteSize: 24,
	obstacleSpriteSize: 10,
};

export { startGlobals, TGlobals, STATIC_GLOBALS };
