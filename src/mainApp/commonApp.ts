import { Assets, Application, Point } from "pixi.js";
import AlarmCenterPNG from '../../assets/alarmCenter.png';
import { CommonOperationMode } from "../common/app";
import CommonStage from "./commonStage";
import CommonEvent from "./commonEvent";
import CommonApi from "./commonApi";
import CommonGroup from "./commonGroup";

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
    private mousePosition: Point = new Point(0, 0);
    // 通用图层
    private commonGroup!: CommonGroup;
    private doAppInitFinish?: (app: CommonApp) => void;
    // private probabilityMap!: ProbabilityMap;
    // private bkgGroup!: BkgGroup;

    constructor(options: {
        domElement: HTMLElement;
        doAppInitFinish: (app: CommonApp) => void;
    }) {
        // 基础数据
        this.domElement = options.domElement;
        this.doAppInitFinish = options.doAppInitFinish;
        // app
        this.initAll();
    }

    getApp() {
        return this.app;
    }

    getStage() {
        return this.app?.stage;
    }

    getCommonGroup() {
        return this.commonGroup;
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

    getDomElement = () => {
        return this.domElement;
    }

    /**接口 - 获取当前鼠标所在的位置 */
    getMousePosition = () => {
        return this.mousePosition;
    };

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
        // commonGroup
        this.commonGroup = new CommonGroup({ label: "commonGroup" }, this);
        // event
        this.commonEvent = new CommonEvent(this); 
        // api
        this.commonApi = new CommonApi(this);
        // this.doMask();
        // 回调
        this.doAppInitFinish?.(this);
    }


    private async initApp () {
        this.app = new Application();
        await this.app.init({
            width: this.getDomElement().clientWidth,
            height: this.getDomElement().clientHeight,
            preference: 'webgpu', 
            resizeTo: this.getDomElement(),
            antialias: true,
            // backgroundColor: 'white',
            // useBackBuffer: true, // for webgl
         });
         this.getDomElement().appendChild(this.app.canvas);
        (globalThis as any).__PIXI_APP__ = this.app;
        this.app.ticker.minFPS = 30;
        this.app.ticker.maxFPS = 60;
    }

}


