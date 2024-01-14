import { Sprite } from "pixi.js";

export class Controller {
	constructor(view, model, app, gravitySpeed) {
		this.view = view;
		this.model = model;
		this.app = app;
		this.gravitySpeed = gravitySpeed;
	}

	addNewElementListener() {
		this.bg.on("pointertap", (e) => {
			this.run(e.clientX, e.clientY);
		});
	}

	createSpriteBackground() {
		this.bg = new Sprite();
		this.bg.width = window.innerWidth;
		this.bg.height = window.innerHeight*0.6;
		this.bg.interactive = true;
		this.app.stage.addChild(this.bg);
	}

	removeShapeListener(figure) {
		figure.on("pointertap", () => {
			this.model.removeShapeFromArray(figure);
			this.view.removeShape(figure);
			this.view.updateHeaderMetrics(
				this.model.numberOfShapes,
				this.model.occupiedArea
			);
		});
	}

	addShapeToCanvas(x, y) {
		this.figure = this.model.addShape(x, y);
		this.view.renderShape(this.figure, this.gravitySpeed);
	}

	run(x, y) {
		this.addShapeToCanvas(x, y);

		this.model.removeFinishedShapes(this.bg.height);
		this.view.updateHeaderMetrics(
			this.model.numberOfShapes,
			this.model.occupiedArea
		);

		this.removeShapeListener(this.figure);
	}
}
