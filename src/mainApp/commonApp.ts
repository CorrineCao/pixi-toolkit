import { Assets, Texture, Container, Application, Graphics } from "pixi.js";
import AlarmCenterPNG from '../../assets/alarmCenter.png';
import { BaseSprite } from "../Component/BaseSprite";
import { MySprite } from "../Component/MySprite";
import { CommonOperationMode } from "../common/app";
import CommonStage from "./commonStage";
import CommonEvent from "./commonEvent";
import CommonApi from "./commonApi";

export default class CommonApp {
    private domElement: HTMLElement;
    private app: Application | null = null;
    private setting: MainAppNPS.SettingsType = {
        appId: 'default',
        mode: 'commonEdit',
        tabId: '',
        operation: CommonOperationMode.common_select,
        range: {
            sMinX: 0,
            sMaxX: 0,
            sMaxY: 0,
            sMinY: 0,
          },
        cache: false
    };
    private commonEvent: CommonEvent | null = null;
    private commonApi: CommonApi | null = null;

    constructor(options: {
        domElement: HTMLElement;
    }) {
        // 基础数据
        this.domElement = options.domElement;
        // app
        this.initAll();
    }

    getApp() {
        return this.app;
    }

    getStage() {
        return this.app?.stage;
    }

    getCommonEvent() {
        return this.commonEvent;
    }

    getCommonApi() {
        return this.commonApi;
    }

    getSetting() {
        return this.setting;
    }

    destoryAll = () => {
        this.getCommonEvent()?.destoryEvent();
    }

    // 后台加载
    private async doBkgLoad() {
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

    private async initAll() {
        // assets
        await this.doBkgLoad();
        // app
        await this.initApp();
        // stage
        CommonStage.initStage(this);
        // event
        this.commonEvent = new CommonEvent(this); 
        // api
        this.commonApi = new CommonApi(this);
        // this.doMask();
    }


    private async initApp () {
        this.app = new Application();
        await this.app.init({
            width: this.domElement.clientWidth,
            height: this.domElement.clientHeight,
            preference: 'webgpu', 
            resizeTo: this.domElement,
            antialias: true,
            // backgroundColor: 'white',
            // useBackBuffer: true, // for webgl
         });
        this.domElement.appendChild(this.app.canvas);
        (globalThis as any).__PIXI_APP__ = this.app;
        this.app.ticker.minFPS = 30;
        this.app.ticker.maxFPS = 60;
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


