import { FederatedPointerEvent, FederatedWheelEvent, Point, Sprite } from "pixi.js";
import CommonApp from "./commonApp";

/**
 * 事件
 */
export default class CommonEvent {
  private commonApp: CommonApp;
  private spaceMoveFlag: boolean = false;
  private dragFlag: boolean = false;
  private dragStartPoint = {
    x: 0,
    y: 0,
  };

  private isOutSide: boolean = false;
  constructor(commonApp: CommonApp) {
    this.commonApp = commonApp;

    const commonStage = this.commonApp.getStage();
    if(commonStage) {
        commonStage.eventMode = "static";
        commonStage.on("pointerdown", this.onMouseDown);
        commonStage.on("globalmousemove" as any, this.onMouseMove);
        commonStage.on("pointerup", this.onMouseUp);
        commonStage.on("pointerupoutside", this.onPointerUpOutside);
        commonStage.on("pointerover", this.onPointerover);
        commonStage.on("pointerout", this.onPointerout);
        commonStage.on("rightdown", this.onRightDown);
        commonStage.on("rightup", this.onRightUp);
        commonStage.on("wheel", this.onMouseWheel);
    }
  }

  destoryEvent() {
    const commonStage = this.commonApp.getStage();
    if(commonStage) {
        commonStage.off("pointerdown", this.onMouseDown);
        commonStage.off("globalmousemove" as any, this.onMouseMove);
        commonStage.off("pointerup", this.onMouseUp);
        commonStage.off("pointerupoutside", this.onPointerUpOutside);
        commonStage.off("pointerover", this.onPointerover);
        commonStage.off("pointerout", this.onPointerout);
        commonStage.off("rightdown", this.onRightDown);
        commonStage.off("rightup", this.onRightUp);
        commonStage.off("wheel", this.onMouseWheel);
    }
    
  }

  /**注意此处必须是箭头函数 */
  private onMouseDown = (event: FederatedPointerEvent) => {
    if(event.target instanceof Sprite) {
        const curSprite = (event.target as Sprite);
        const globalPosition = curSprite.toGlobal(new Point(0,0));
        console.log(">>>>>globalPosition:", globalPosition, curSprite.worldTransform, (curSprite as any).worldAlpha);
    }
  };

  private onMouseMove = (event: FederatedPointerEvent) => {
    const stage = this.commonApp.getStage();
    if(stage) {
      console.log("stage globalmousemove 4", event.getLocalPosition(stage));
    }
    // console.log("stage globalmousemove 1", event.target);
    // console.log("stage globalmousemove 2", event.global);
    // console.log("stage globalmousemove 3", event.x, event.y);
  };
  
  private onMouseUp = (event: FederatedPointerEvent) => {
    
  };

  private onPointerUpOutside = (event: FederatedPointerEvent) => {
    
  };

  private onPointerout = () => {
    this.isOutSide = true;
  };

  private onPointerover = () => {
    this.isOutSide = false;
  };

  private onRightDown = (event: FederatedPointerEvent) => {
  };

  private onRightUp = (event: FederatedPointerEvent) => {
  };

  private onMouseWheel = (event: FederatedWheelEvent) => {
    console.log(">>>>>wheel:", event);
  };
}
