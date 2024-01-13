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
		this.addNewElementListener(gravitySpeed);
	}

	addNewElementListener(gravitySpeed) {
		let bg = new Sprite();
		bg.width = this.app.screen.width;
		bg.height = this.app.screen.height;
		bg.interactive = true;

		this.app.stage.addChild(bg);

		bg.on("click", (e) => {
			this.run(gravitySpeed, e.clientX, e.clientY);
		});
	}

	run(gravitySpeed, x, y) {
		let figure = this.model.addShape(x, y);
		this.view.renderShape(figure, gravitySpeed);
		this.model.removeFinishedShapes(this.canvasSize);
		this.view.updateHeaderMetrics(
			this.model.numberOfShapes,
			this.model.occupiedArea
		);

		// Remove figure from the screen after click on it
		figure.on("click", () => {
			this.model.removeShapeFromArray(figure);
			this.view.removeShape(figure);
			this.view.updateHeaderMetrics(
				this.model.numberOfShapes,
				this.model.occupiedArea
			);
		});
	}
}
