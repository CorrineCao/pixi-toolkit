import { Application } from "pixi.js";
import CommonApp from "./commonApp";
// import Star from "./star";
// import CustomApp from "./customApp";

declare global {
    namespace globalThis {
        type __PIXI_APP__ = Application;
    }
}

// export default Star;
export default CommonApp;
