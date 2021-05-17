import * as PIXI from 'pixi.js';

/**
 * Class to help you manage what you are rendering onto the screen
 */
export class RenderableEntity {

    /**
     * @param {PIXI.Sprite} sprite The rendered sprite
     * @param {PIXI.Application} app Application to render entity onto
     */
    constructor(sprite, app) {
        this.sprite = sprite;
        this.app = app;
    }

    get sprite() {
        return this.sprite;
    }

    get app() {
        return this.app;
    }

}