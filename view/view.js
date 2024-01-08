export class View {
    constructor(app) {
        this.app = app;
        this.numberOfShapesElement = document.getElementById("number-of-shapes");
        this.occupiedArea = document.getElementById("occupied-area");
    }

    removeShape(shape) {
        this.app.stage.removeChild(shape);
    }

    updateHeaderMetrics(numberOfShapes, occupiedArea) {
        this.numberOfShapesElement.innerText = numberOfShapes;
        this.occupiedArea.innerText = occupiedArea;
    }

    renderShape(createdShape, gravitySpeed) {
        this.app.stage.addChild(createdShape);
        this.app.ticker.add(() => {
            createdShape.y += gravitySpeed;
        });
    }
}