import { Container, Graphics, Texture } from "pixi.js";
import BaseGroup from "../Component/BaseGroup";
import { BaseSprite } from "../Component/BaseSprite";
import { MySprite } from "../Component/MySprite";
import CommonApp from "./commonApp";

export interface CommonGroupType {
    label: string;
}

export default class CommonGroup extends Container {
    private commonApp: CommonApp;

    constructor(options: CommonGroupType, commonApp: CommonApp) {
        super();
        this.label = options.label;
        this.visible = true;
        this.sortableChildren = true;
        this.interactiveChildren = true;
        this.eventMode = "passive";

        const stage = commonApp.getStage();
        if(stage) {
            stage.addChild(this);
        }
        this.commonApp = commonApp;
    }

    createGroup = () => {
        const group = new BaseGroup({
            label: "testGroup"
        });
        group.eventMode = "passive";
        group.visible = true;
        this.addChild(group);
        // return group;
    }

    createSprite = (texture: Texture, group?: Container) => {
        const curGroup = group || this;
        const newSprite = new BaseSprite(texture);
        newSprite.view.eventMode = "static";
        // newSprite.view.interactive = true;
        curGroup.addChild(newSprite.view);

        // console.log(">>>>createSprite 3: ");
        // const newSprite3 = new Sprite(texture);
        // const newSprite3 = new MySprite(texture);
        // console.log(">>>>createSprite end, ", newSprite3);

        const newSprite2 = MySprite.from(texture);
        console.log(">>>>createSprite end, ", newSprite2);
        newSprite2.eventMode = "static";
        newSprite2.label = "testSprite";
        newSprite2.position.x = 2;
        newSprite2.position.y = 2;
        newSprite2.width = 3;
        newSprite2.height = 3;
        newSprite2.tint = Math.random() * 0x808080;
        curGroup.addChild(newSprite2);

        const curSprite = curGroup.getChildByName("testSprite");
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
        .rect(2, 2, 1, 1)
        .fill(0xFF0000);
        graphics.eventMode = "static";
        curGroup.addChild(graphics);
       
        // console.log('children: ', this.app?.stage.children);
    }
}