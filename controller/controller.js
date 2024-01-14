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
			this.run(e.clientX, e.clientY);
		});
	}

	createSpriteBackground() {
		this.bg = new Sprite();
		this.bg.width = this.app.screen.width;
		this.bg.height = this.app.screen.height;
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
		
		this.model.removeFinishedShapes(this.canvasSize);
		this.view.updateHeaderMetrics(
			this.model.numberOfShapes,
			this.model.occupiedArea
		);

		this.removeShapeListener(this.figure);
	}
}
