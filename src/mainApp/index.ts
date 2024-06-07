import { Application } from "pixi.js";
import Star from "./star";
// import CustomApp from "./customApp";
declare global {
    namespace globalThis {
        type __PIXI_APP__ = Application;
    }
}

export default Star;
