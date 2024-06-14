import { Assets } from "pixi.js";
import { UnitType, UnitTypeEnum } from "../common/unit";
import CommonApp from "./commonApp";

export default class CommonApi {
    private commonApp: CommonApp;

    private baseListener: Record<string, ((
      data?: Record<MainAppNPS.BusinessOperationType, any>,
      cbk?: (data: Record<string, any>) => void
    ) => any)> = {};

    constructor(commonApp: CommonApp) {
        this.commonApp = commonApp;
    }

    /** 注册监听 */
    addListener = (
        type: 'endLoading' | string,
        value: (data?: Record<string, any>) => void
    ) => {
        this.baseListener[type] = value;
    };

    /** 调整比例 */
    updateScale = (
        scaleFlag: string,
        option?: {
            wheelOrigin?: {
                x: number;
                y: number;
            };
            scaleValue?: number;
            needInitPosition: boolean,
            isCheck: boolean,
            cbk?: () => void;
        }
    ) => {
        const oldScale = this.commonApp?.getStage()?.scale.x;
        console.log("scaleFlag", scaleFlag , oldScale);
    }

    /**添加组件 */
    addUnitList = async (type: UnitType) => {
        if(type === UnitTypeEnum.elements) {
            const alarmTexture = await Assets.load('alarm');
            console.log(">>>>alarmTexture:", alarmTexture);
            this.commonApp.getCommonGroup().createSprite(alarmTexture);
        }
    }
}