import { Controller } from './controller/controller';
import { View } from './view/view';
import { Model } from './model/model';
import { Application } from "pixi.js"

const appContainer = document.getElementById('app');
const app = new Application();
app.renderer.resize(window.innerWidth, window.innerHeight*0.6);
app.renderer.view.interactive = true;
app.renderer.view.cursor = 'pointer';
appContainer.appendChild(app.view);

const genSpeedHTML = document.getElementById("generation-speed");
const genGravityHTML = document.getElementById("gravity-speed");
let generationSpeed = genSpeedHTML.value * 1000;
let gravitySpeed = genGravityHTML.value / 10;

genSpeedHTML.addEventListener('change', (e) => {
    generationSpeed = parseInt(1000 / e.target.value);
});

genGravityHTML.addEventListener('change', (e) => {
    gravitySpeed = e.target.value / 10;
});

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight*0.6);
});

const view = new View(app);
const model = new Model(app);
const controller = new Controller(view, model, app, gravitySpeed);

controller.createSpriteBackground();
controller.addNewElementListener();

function startApplicatonLoop() {
    controller.gravitySpeed = gravitySpeed;
    controller.run();
    window.setTimeout(startApplicatonLoop, generationSpeed);
}

startApplicatonLoop();