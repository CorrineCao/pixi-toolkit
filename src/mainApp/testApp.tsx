import { Assets, Texture, autoDetectRenderer, Container } from "pixi.js";
import AlarmCenterPNG from '../../assets/alarmCenter.png';
import { BaseSprite } from "../Component/BaseSprite";
// import { BaseSprite } from "../Component/BaseSprite";

export default class TestApp {
    private domElement: HTMLElement;
    private appRenderer: any;
    private stage: any;

    constructor(options: {
        domElement: HTMLElement;
    }) {
        // 基础数据
        this.domElement = options.domElement;
        // app
        this.initAppRender();
    }

    private async initAppRender () {
        // init render
        this.appRenderer = await autoDetectRenderer({
            preference: 'webgpu',
            clearBeforeRender: true,
            backgroundAlpha: 1,
            backgroundColor: 0x000000,
            width: 1000,
            height: 600,
            resolution: 1,
            antialias: false,
            hello: true,
            // any settings
        }); // will return a WebGL or WebGPU renderer
        console.log(">>>>renderer:", this.appRenderer);
        this.domElement.appendChild( this.appRenderer.view.canvas as HTMLCanvasElement)
        // (application.renderer as any).autoResize = true;
        
        // init stage
        this.stage = new Container();

        // event
        this.appRenderer.view.canvas.addEventListener('mousedown', (event: any) => {
            console.log(">>>>mousedown:", event);
        });

        // texture
        const texture = await Assets.load(AlarmCenterPNG);
        console.log(">>>texture:", texture);
        this.createSprite(texture);

        // 重渲染
        this.appRenderer.render(this.stage);

    }

    createSprite = (texture: Texture) => {
        const newSprite = new BaseSprite(texture);
        console.log(">>>>newSprite:", newSprite.view);
        this.stage.addChild(newSprite.view);
       
        console.log('children: ', this.stage.children);
    }

}

