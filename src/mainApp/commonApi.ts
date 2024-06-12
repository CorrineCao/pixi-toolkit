import CommonApp from "./commonApp";

export default class CommonApi {
    private commonApp: CommonApp;

    constructor(commonApp: CommonApp) {
        this.commonApp = commonApp;
    }

    // 调用公共方法
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
}