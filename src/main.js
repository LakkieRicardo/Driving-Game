import * as PIXI from 'pixi.js';
import { loadMap } from './js/MapLoader.js';
import './scss/main.scss';

const app = new PIXI.Application({
    width: 800,
    height: 800,
    resolution: 1
});
const contentDiv = document.getElementById("content");
contentDiv.appendChild(app.view);

let carSprite = new PIXI.Graphics();
// Car body
carSprite.lineStyle(4, 0xff0000, 1);
carSprite.beginFill(0x0000ff);
carSprite.drawRect(-20, -60, 40, 120);
carSprite.endFill();
// Center point
carSprite.lineStyle(0, 0xff0000, 1);
carSprite.beginFill(0x00ff00);
carSprite.drawRect(-5, -5, 10, 10);
carSprite.endFill();
carSprite.x = 300;
carSprite.y = 300;
carSprite.zIndex = 1;
app.stage.addChild(carSprite);
app.stage.sortableChildren = true;

/*
  df = delta forward
  dr = delta rotation
*/
const playerMovement = {
    df: 0,
    dr: 0
};

let mapFeatures = [];

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            playerMovement.df = -5;
            break;
        case "s":
            playerMovement.df = 5;
            break;
        case "a":
            playerMovement.dr = -0.05;
            break;
        case "d":
            playerMovement.dr = 0.05;
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
        case "s":
            playerMovement.df = 0;
            break;
        case "a":
        case "d":
            playerMovement.dr = 0;
            break;
    }
});

function gameLoop(delta) {
    carSprite.rotation += playerMovement.dr;
    carSprite.x += Math.sin(-carSprite.rotation) * playerMovement.df;
    carSprite.y += Math.cos(-carSprite.rotation) * playerMovement.df;
}

app.ticker.add(gameLoop);

const mapLoadButton = document.getElementById("load-map-button");
const mapFileInput = document.getElementById("map-file-input");

mapLoadButton.addEventListener("click", () => {
    if (mapFileInput.files.length !== 1 || !mapFileInput.files[0].name.endsWith(".json")) {
        alert("Please select a valid map file!");
        return;
    }
    mapFeatures = loadMap(mapFileInput.files[0], app);
});