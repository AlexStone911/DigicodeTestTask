import { Graphics } from '@pixi/graphics';
import * as PIXI from "pixi.js"

import '@pixi/graphics-extras';

export class ThreeSides {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        const shape = new PIXI.Graphics();

        shape.x = this.xPosition;
        shape.y = this.yPosition || -this.shapeScale*2;
        shape.beginFill(this.color);
        shape.moveTo(this.shapeScale*2, 0);
        shape.lineTo(this.shapeScale, this.shapeScale*2); 
        shape.lineTo(0, 0);
        shape.lineTo(this.shapeScale, 0);
        
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return (Math.sqrt(3) / 4) * Math.pow(this.shapeScale*2, 2);
    }
}

export class FourSides {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
        this.sideLength = shapeScale * 2;
    }
    create() {
        const shape = new PIXI.Graphics();
        shape.beginFill(this.color);
        shape.drawRect(this.xPosition, this.yPosition || -this.shapeScale, this.sideLength, this.sideLength);
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return this.sideLength * this.sideLength;
    }
}

export class FiveSides {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        const shape = new Graphics();
        shape.lineStyle(0);
        shape.beginFill(this.color);
        shape.drawRegularPolygon(this.xPosition, this.yPosition || -this.shapeScale, this.shapeScale * 1.2, 5);
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return (Math.pow(this.shapeScale, 2) * 5) / (4 * Math.tan(Math.PI / 5))
    }
}

export class SixSides {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        const shape = new Graphics();
        shape.lineStyle(0);
        shape.beginFill(this.color);
        shape.drawRegularPolygon(this.xPosition, this.yPosition || -this.shapeScale, this.shapeScale * 1.2, 6);
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return (Math.pow(this.shapeScale, 2) * 6) / (4 * Math.tan(Math.PI / 6))
    }
}

export class Circle {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        const shape = new PIXI.Graphics();
        shape.beginFill(this.color);
        shape.drawCircle(0, 0, this.shapeScale);
        shape.x = this.xPosition;
        shape.y = this.yPosition || -this.shapeScale;
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return Math.PI * Math.pow(this.shapeScale, 2);
    }
}

export class Ellipse {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
        this.width = this.shapeScale * 2;
    }

    create() {
        const shape = new PIXI.Graphics();
        shape.beginFill(this.color, 1);
        shape.drawEllipse(this.xPosition, this.yPosition || -this.shapeScale, this.shapeScale * 2, this.shapeScale);
        shape.endFill();

        return [shape, this.getArea()];
    }

    getArea() {
        return Math.PI * this.width * this.shapeScale;
    }
}

export class Star {
    constructor(app, xPosition, yPosition, color, shapeScale){
        this.app = app;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.shapeScale = shapeScale;
    }

    create() {
        const shape = new Graphics();
        shape.lineStyle(this.color);
        shape.beginFill(this.color, 1);
        shape.drawStar(this.xPosition, this.yPosition || -this.shapeScale, 5, this.shapeScale * 1.2);
        shape.endFill();
        return [shape, this.getArea()];
    }

    getArea() {
        // TODO: To say the truth, have not found the right way how to calculate the are of the star,
        // therefore added TODO label and fix this later! ;-)
        return 1500;
    }
}