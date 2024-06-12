import { Application } from "pixi.js";
import { APP_CONST } from "../common/app";
import CommonApp from "./commonApp";

  /**获取舞台边界 */
const reGetStageRange = (app: Application | null) => {
    if(app) {
        const { stage, renderer } = app;
        const { x: stageX, y: stageY } = stage.position;
        // 获取边界范围
        const sMinX = (0 - stageX) / stage.scale.x;
        const sMinY = (renderer.height - stageY) / stage.scale.y;
        const sMaxX = (renderer.width - stageX) / stage.scale.x;
        const sMaxY = (0 - stageY) / stage.scale.y;
        return {
          sMinX,
          sMinY,
          sMaxX,
          sMaxY,
        };
    }
    return null;
};

/**
   * 重新设置当前舞台的范围
   * @returns
   */
const setStageRange = (commonApp: CommonApp) => {
    const range = reGetStageRange(commonApp.getApp());
    if(range) {
        commonApp.getSetting().range = range;
    }
    // this.onRulerDataChange(this.setting.range);
};

/**
   * 重置舞台位置
   */
const setStageOrigin = (app: Application | null, originPoint?: { x: number; y: number }) => {
    if(app) {
        const { stage, renderer } = app;
        if (originPoint) {
          stage.x = 0 - originPoint.x;
          stage.y = renderer.height - originPoint.y;
        } else {
          stage.x = 0;
          stage.y = renderer.height;
        }
    }
};

const initStage = (commonApp: CommonApp) => {
    const app = commonApp.getApp();
    const stage = commonApp.getStage();
    if(app && stage) {
        stage.scale.x = APP_CONST.baseScale;
        stage.scale.y = -APP_CONST.baseScale; 
        setStageOrigin(app);
        // 设置stage的范围
        setStageRange(commonApp);
    }
}

const CommonStage = {
    initStage
}

export default CommonStage;