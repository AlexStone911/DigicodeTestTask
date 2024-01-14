import { random } from "../utils/random";
import { ThreeSides, Square, Polygon, Circle, Ellipse, Star } from "./shapes";

export class Model {
    constructor(app) {
        this.app = app;
        this.shapes = [];
        this.shapesOccupiedArea = [];
        this.shapeScale = 30;
        this.shapeColors = [
            "#00FFFF",
            "#DC143C",
            "#B8860B",
            "#FF8C00",
            "#FF1493",
            "#FFD700",
            "#ADFF2F",
            "#FFB6C1",
            "#00FF00",
            "#FFEFD5",
            "#00FF7F",
            "#FFFF00"
        ];
        this.shapeClasses = [
            ThreeSides,
            Square,
            Polygon,
            Circle,
            Ellipse,
            Star
        ];
    }

    addShape(x, y) {
        const ShapeClass = this.shapeClasses[random(0, this.shapeClasses.length)];
        const shapeColor = this.shapeColors[random(0, this.shapeColors.length)];
        const xPosition = x || random(0, window.innerWidth);
        const yPosition = y;

        const [newShape, newShapeArea] = new ShapeClass(this.app, xPosition, yPosition, shapeColor, this.shapeScale).create();
        newShape.interactive = true;
        newShape.cursor = 'pointer';
        this.shapes.push(newShape);
        this.shapesOccupiedArea.push(newShapeArea);
        return newShape;
    }

    removeShapeFromArray(shapeToRemove) {
        const shapeIndex = this.shapes.findIndex(shape => shape.id === shapeToRemove.id);
        this.shapes.splice(shapeIndex, 1);
        this.shapesOccupiedArea.splice(shapeIndex, 1);
    }

    removeFinishedShapes(height) {
        this.shapes
            .filter(shape => (shape.y - this.shapeScale) >= height)
            .forEach((shape) => {
                this.removeShapeFromArray(shape);
                this.app.stage.removeChild(shape);
            });
    }

    get numberOfShapes() {
        return this.shapes.length;
    }

    get occupiedArea() {
        return Math.ceil(this.shapesOccupiedArea.reduce((prev, curr) => prev + curr, 0));
    }
}