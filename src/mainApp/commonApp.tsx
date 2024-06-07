import { Assets, Texture, autoDetectRenderer, Container, Application, Graphics, Sprite, Point, Text, Ticker } from "pixi.js";
import AlarmCenterPNG from '../../assets/alarmCenter.png';
import { BaseSprite } from "../Component/BaseSprite";
import { MySprite } from "../Component/MySprite";


export default class CommonApp {
    private domElement: HTMLElement;
    private app: Application | null = null;
    // private stage: any;

    constructor(options: {
        domElement: HTMLElement;
    }) {
        // 基础数据
        this.domElement = options.domElement;
        // app
        this.init();
    }


    private async init() {
        await this.initApp();
        this.doSomething();
        // this.doMask();
    }

    pointDown = (event: any) => {
        // console.log("stage pointerdown", event.target);
    }

    pointMove = (event: any) => {
        // console.log("stage pointermove", event.target);
    }

    globalmousemove = (event: any) => {
        if(event.target instanceof Sprite) {
            const curSprite = (event.target as Sprite);
            const globalPosition = curSprite.toGlobal(new Point(0,0));
            // console.log(">>>>>globalPosition:", globalPosition, curSprite.worldTransform, (curSprite as any).worldAlpha);
        }
        // console.log("stage globalmousemove", event.target, event.global);
    }

    private async doMask() {
        // Create window frame
        let frame = new Graphics({
            x:320 - 104,
            y:180 - 104
        })
        .rect(0, 0, 208, 208)
        .fill(0x666666)
        .stroke({ color: 0xffffff, width: 4, alignment: 0 })
  
        this.app?.stage.addChild(frame);
  
        // Create a graphics object to define our mask
        let mask = new Graphics()
        // Add the rectangular area to show
        .rect(0,0,200,200)
        .fill(0xffffff);
  
        // Add container that will hold our masked content
        let maskContainer = new Container();
        // Set the mask to use our graphics object from above
        maskContainer.mask = mask;
        // Add the mask as a child, so that the mask is positioned relative to its parent
        maskContainer.addChild(mask);
        // Offset by the window's frame width
        maskContainer.position.set(4,4);
        // And add the container to the window!
        frame.addChild(maskContainer);
  
        // Create contents for the masked container
        let text = new Text({
            text: 'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
            'You can put anything in the container and it will be masked!',
            style: {
                fontSize: 24,
                fill: 0x1010ff,
                wordWrap: true,
                wordWrapWidth: 180
            },
            x:-10
        });
        
        maskContainer.addChild(text);
  
        // Add a ticker callback to scroll the text up and down
        let elapsed = 0.0;
        this.app?.ticker.add((data: Ticker) => {
            // Update the text's y coordinate to scroll it
            // console.log(">>>>>data.delta:", data.deltaTime);
            elapsed += data.deltaTime;
            text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0;
        });
    }

    private async doSomething() {
        const group = this.createGroup();
        // 读取
        const alarmTexture = await Assets.load('alarm');
        // const cur = await Assets.loadBundle('pkg1');

        // texture 1
        // const texture = await Assets.load(AlarmCenterPNG);
        // console.log(">>>texture:", texture);
        // this.createSprite(texture);

        // texture 2
        // await Assets.add({ alias: 'alarm', src: AlarmCenterPNG});
        // const textureMap = await Assets.load(['alarm']); // => Pro
        // console.log(">>>textureList:", textureMap);
        // this.createSprite(textureMap.alarm);

        // texture 3
        // Assets.addBundle('pkg', {
        //     alarm: AlarmCenterPNG
        // });
        // const assets = await Assets.loadBundle('pkg');
        // console.log(">>>assets:", assets);
        // this.createSprite(assets['pkg-alarm']);
        
        this.createSprite(alarmTexture, group);
    }

    private async doBackgroundLoad() {
        const manifestExample = {
            bundles: [
                {
                    name: 'pkg1',
                    assets: [
                        {
                            alias: 'alarm',
                            src: AlarmCenterPNG,
                        },
                    ],
                },
            ],
        };
        // 后台加载
        await Assets.init({ manifest: manifestExample });
        Assets.backgroundLoadBundle(['pkg1']);
    }

    private async initApp () {
        const appWidth = 1000;
        const appHeight = 600;
        this.app = new Application();
        (globalThis as any).__PIXI_APP__ = this.app;
        await this.app.init({
            width: appWidth, 
            height: appHeight, 
            preference: 'webgpu', 
            resizeTo: this.domElement,
            antialias: true,
            backgroundColor: 'white',
            // useBackBuffer: true, // for webgl
         });
        this.domElement.appendChild(this.app.canvas);

        this.app.ticker.minFPS = 30;
        this.app.ticker.maxFPS = 60;

        this.doBackgroundLoad();

        // event function 1
        // this.app.stage.interactive = true;
        this.app.stage.eventMode = "static";
        // this.app.stage.hitArea = this.app.screen;
        // console.log(">>>>>stage:", this.app.stage.width, this.app.stage.height);
        this.app?.stage.on("pointerdown", this.pointDown);
        // this.app?.stage.on("mousemove", this.pointMove);
        this.app?.stage.on("globalmousemove" as any, this.globalmousemove);
        console.log(">>>>this.app.renderer:", this.app.renderer);

        // event funtion 2
    }

    destoryApp = () => {
        this.app?.stage.off("pointerdown", this.pointDown);
        this.app?.stage.off("globalmousemove" as any, this.globalmousemove);
    }

    createGroup = () => {
        // console.log(">>>>width, height: ", this.app?.screen.width, this.app?.screen.height);
        // const width = (this.app?.screen.width || 0);
        // const height = (this.app?.screen.height || 0);
        const group = new Container();
        group.eventMode = "passive";
        group.visible = true;
        this.app?.stage.addChild(group);
        // console.log(">>>>group:", group.position, group.pivot, group.scale, group.renderable);
        return group;
    }

    createSprite = (texture: Texture, group: Container) => {
        const newSprite = new BaseSprite(texture);
        newSprite.view.eventMode = "static";
        // newSprite.view.interactive = true;
        group.addChild(newSprite.view);
        

        console.log(">>>>createSprite 3: ");
        // const newSprite3 = new Sprite(texture);
        // const newSprite3 = new MySprite(texture);
        // console.log(">>>>createSprite end, ", newSprite3);

        const newSprite2 = MySprite.from(texture);
        console.log(">>>>createSprite end, ", newSprite2);
        newSprite2.eventMode = "static";
        newSprite2.label = "testSprite";
        newSprite2.position.x = 10;
        newSprite2.position.y = 10;
        newSprite2.tint = Math.random() * 0x808080;
        group.addChild(newSprite2);
        const curSprite = group.getChildByName("testSprite");
        console.log(">>>>>curSprite:", curSprite);

        // todo test
        // newSprite2.renderable = false;
        
        // console.log(">>>>newSprite:", newSprite2.view);
        // newSprite.view.addChild(newSprite2.view);

        // const newSprite2 = new MySprite({texture: Texture.WHITE});
        // // newSprite2.texture = texture;
        // newSprite2.interactive = true;
        // newSprite2.anchor.set(0.5, 0.5);
        // newSprite2.width = 100;
        // newSprite2.height = 100;
        // newSprite2.position.x = 10;
        // newSprite2.position.y = 10;
        // console.log(">>>>newSprite:", newSprite2);
        // newSprite2.addChild();
        // group.addChild(newSprite2);

        const graphics = new Graphics()
        .rect(50, 50, 100, 100)
        .fill(0xFF0000);
        graphics.eventMode = "static";
        group.addChild(graphics);
       
        console.log('children: ', this.app?.stage.children);
    }

}

