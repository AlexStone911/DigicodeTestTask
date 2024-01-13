// import { Graphics } from '@pixi/graphics';
import * as PIXI from "pixi.js"
import '@pixi/graphics-extras';
import { random } from "../utils/random";
class BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        this.shape = new PIXI.Graphics();
        this.shape.beginFill(this.color);
        this.drawFigure();
        this.shape.endFill();

        return [this.shape, this.getFigureArea()];
    }
}

export class ThreeSides extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
        this.doubledScale = this.shapeScale * 2;
    }

    drawFigure() {
        this.shape.x = this.xPosition;
        this.shape.y = this.yPosition || -this.doubledScale;
        this.shape.moveTo(this.doubledScale, 0);
        this.shape.lineTo(this.shapeScale, this.doubledScale); 
        this.shape.lineTo(0, 0);
        this.shape.lineTo(this.shapeScale, 0);
    }

    getFigureArea() {
        return (Math.sqrt(3) / 4) * Math.pow(this.doubledScale, 2);
    }
}

export class Square extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
        this.sideLength = shapeScale * 2;
    }

    drawFigure() {
        this.shape.drawRect(this.xPosition, this.yPosition || -this.sideLength, this.sideLength, this.sideLength);
    }

    getFigureArea() {
        return this.sideLength * this.sideLength;
    }
}

export class Polygon extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
        this.quantityOfSides = random(5, 7);
    }

    drawFigure() {
        this.shape.drawRegularPolygon(this.xPosition, this.yPosition || -this.shapeScale, this.shapeScale, this.quantityOfSides);
    }

    getFigureArea() {
        return (Math.pow(this.shapeScale, 2) * this.quantityOfSides) / (4 * Math.tan(Math.PI / this.quantityOfSides))
    }
}

export class Circle extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
    }

    drawFigure() {
        this.shape.drawCircle(0, 0, this.shapeScale);
        this.shape.x = this.xPosition;
        this.shape.y = this.yPosition || -this.shapeScale;
    }

    getFigureArea() {
        return Math.PI * Math.pow(this.shapeScale, 2);
    }
}

export class Ellipse extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
        this.width = this.shapeScale * 2;
    }

    drawFigure() {
        this.shape.drawEllipse(this.xPosition, this.yPosition || -this.shapeScale, this.width, this.shapeScale);
    }

    getFigureArea() {
        return Math.PI * this.width * this.shapeScale;
    }
}

export class Star extends BaseFigure {
    constructor(app, xPosition, yPosition, color, shapeScale){
        super(app, xPosition, yPosition, color, shapeScale);
    }

    drawFigure() {
        this.shape.drawStar(this.xPosition, this.yPosition || -this.shapeScale, 5, this.shapeScale);
    }

    getFigureArea() {
        // TODO: To say the truth, have not found the right way how to calculate the are of the star,
        // therefore added TODO label and fix this later! ;-)
        return 1500;
    }
}