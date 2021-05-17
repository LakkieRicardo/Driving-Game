import * as PIXI from 'pixi.js';
const loader = new PIXI.Loader();

/**
 * Loads a tilesheet for a grid map
 * @returns {Promise} which does not yield anything
 */
export function loadTilesheet() {
    return new Promise((resolve, reject) => {
        loader.add("res/tilesheet.json").load(() => {
            resolve();
        }).onError.add(() => reject());
    });
}

/**
 * 
 * @param {} map 
 * @param {*} app 
 * @returns 
 */
export async function loadGridMap(map, app) {
    let mapFeatures = [];

    await loadTilesheet();

    // load roads
    map.roads.forEach(road => {
        let spriteArray = [];
        for (let i = 0; i < road.position.length; i++) {
            let roadSprite = new PIXI.Sprite(PIXI.utils.TextureCache["road-tile.png"]);
            roadSprite.anchor.set(0.5);
            roadSprite.zIndex = -1;
            switch (road.position.direction) {
                case "right":
                    roadSprite.x = (road.position.x + i) * 64;
                    roadSprite.y = road.position.y * 64;
                    roadSprite.rotation = Math.PI / 2;
                    break;
                case "left":
                    roadSprite.x = (road.position.x - i) * 64;
                    roadSprite.y = road.position.y * 64;
                    roadSprite.rotation = Math.PI * 3 / 2;
                    break;
                case "up":
                    roadSprite.x = road.position.x * 64;
                    roadSprite.y = (road.position.y - i) * 64;
                    roadSprite.rotation = 0;
                    break;
                case "down":
                    roadSprite.x = road.position.x * 64;
                    roadSprite.y = (road.position.y + i) * 64;
                    roadSprite.rotation = Math.PI;
                    break;
            }
            roadSprite.x += 32;
            roadSprite.y += 32;
            roadSprite.id
            spriteArray.push(roadSprite);
            app.stage.addChild(roadSprite);
        }
        let mapFeature = {
            id: road.id,
            name: road.name,
            sprites: spriteArray
        };
        mapFeatures.push(mapFeature);
    });

    // load decorations
    map.decorations.forEach(decoration => {

        let decorationSprite = new PIXI.Sprite(PIXI.utils.TextureCache[decoration.sprite]);
        decorationSprite.anchor.set(0.5);
        decorationSprite.width = decoration.position.grid_width * 64;
        decorationSprite.height = decoration.position.grid_height * 64;
        decorationSprite.x = decoration.position.x * 64 + decorationSprite.width / 2;
        decorationSprite.y = decoration.position.y * 64 + decorationSprite.height / 2;
        decorationSprite.rotation = decoration.position.rotation * Math.PI / 180;

        app.stage.addChild(decorationSprite);

        let mapFeature = {
            id: decoration.id,
            name: decoration.name,
            sprites: [decorationSprite]
        };
        mapFeatures.push(mapFeature);
    });

    return mapFeatures;
}

/**
 * 
 * @param {PIXI.} mapFile 
 * @param {*} app 
 * @returns 
 */
export async function loadMap(mapFile, app) {
    console.log("Loading map: " + mapFile.name);
    let mapFileContent = await mapFile.text();
    let map = JSON.parse(mapFileContent);
    console.log(map);
    if (map["position_mode"] === "grid") {
        return await loadGridMap(map, app);
    }
};