/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { Texture } from 'pixi.js';
import { Sprite } from 'pixi.js';

export class BaseSprite {

    view: Sprite;

    constructor(texture: Texture) {
        this.view = new Sprite(texture);
        this.view.anchor.set(0.5, 0.5);
        this.view.width = 2;
        this.view.height = 2;
        this.view.position.x = 0;
        this.view.position.y = 0;
    }
   
    render(x: number, y: number) {
       
    }
}
