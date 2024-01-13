import { Sprite } from "pixi.js";

export class Controller {
	constructor(view, model, app, gravitySpeed) {
		this.view = view;
		this.model = model;
		this.app = app;
		this.gravitySpeed = gravitySpeed;
		this.canvasSize = {
			width: this.model.app.view.width,
			height: this.model.app.view.height,
		};
	}

	addNewElementListener() {
		this.bg.on("pointertap", (e) => {
			this.run(this.gravitySpeed, e.clientX, e.clientY);
		});
	}

	createSpriteBackground() {
		this.bg = new Sprite();
		this.bg.width = this.app.screen.width;
		this.bg.height = this.app.screen.height;
		this.bg.interactive = true;

		this.app.stage.addChild(this.bg);
	}

	run(gravitySpeed, x, y) {
		this.gravitySpeed = gravitySpeed;
		let figure = this.model.addShape(x, y);
		this.view.renderShape(figure, this.gravitySpeed);
		this.model.removeFinishedShapes(this.canvasSize);
		this.view.updateHeaderMetrics(
			this.model.numberOfShapes,
			this.model.occupiedArea
		);

		// Remove figure from the screen after click on it
		figure.on("pointertap", () => {
			this.model.removeShapeFromArray(figure);
			this.view.removeShape(figure);
			this.view.updateHeaderMetrics(
				this.model.numberOfShapes,
				this.model.occupiedArea
			);
		});
	}
}
