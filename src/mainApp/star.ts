import { Assets, Application, Sprite } from "pixi.js";
import StarPNG from '../../assets/star.png';

let cameraZ = 0;
let warpSpeed = 0;
let speed = 0;

const starAmount = 1000;
const fov = 20;
const baseSpeed = 0.025;
const starStretch = 5;
const starBaseSize = 0.05;

export interface StarProps {
    sprite: Sprite;
    z: number;
    x: number;
    y: number;
}

export default class Star {
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
        // this.doMask();
    }

    private async doBackgroundLoad() {
        const manifestExample = {
            bundles: [
                {
                    name: 'pkg1',
                    assets: [
                        {
                            alias: 'star',
                            src: StarPNG,
                        },
                    ],
                },
            ],
        };
        // 后台加载
        await Assets.init({ manifest: manifestExample });
        Assets.backgroundLoadBundle(['pkg1']);
    }

    randomizeStar = (star: StarProps, initial?: boolean) => {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;

        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
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
            // backgroundColor: 'white',
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
        const starTexture = await Assets.load("pkg1-star");

        // Create the stars
        const stars: any[] = [];
        for (let i = 0; i < starAmount; i++) {
            const star: StarProps = {
                sprite: new Sprite(starTexture),
                z: 0,
                x: 0,
                y: 0,
            };

            star.sprite.anchor.x = 0.5;
            star.sprite.anchor.y = 0.7;
            this.randomizeStar(star, true);
            this.app.stage.addChild(star.sprite);
            stars.push(star);
        }

        setInterval(() => {
            warpSpeed = warpSpeed > 0 ? 0 : 1;
        }, 5000);

        // Listen for animate update
        if(this.app) {
            this.app.ticker.add((time) => {
                // Simple easing. This should be changed to proper easing function when used for real.
                speed += (warpSpeed - speed) / 20;
                cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
                for (let i = 0; i < starAmount; i++) {
                    const star = stars[i];
        
                    if (star.z < cameraZ) this.randomizeStar(star);
        
                    // Map star 3d position to 2d with really simple projection
                    const z = star.z - cameraZ;
                    star.sprite.x = star.x * (fov / z) * this.app!.renderer.screen.width + this.app!.renderer.screen.width / 2;
                    star.sprite.y = star.y * (fov / z) * this.app!.renderer.screen.width + this.app!.renderer.screen.height / 2;
        
                    // Calculate star scale & rotation.
                    const dxCenter = star.sprite.x - this.app!.renderer.screen.width / 2;
                    const dyCenter = star.sprite.y - this.app!.renderer.screen.height / 2;
                    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                    const distanceScale = Math.max(0, (2000 - z) / 2000);
        
                    star.sprite.scale.x = distanceScale * starBaseSize;
                    // Star is looking towards center so that y axis is towards center.
                    // Scale the star depending on how fast we are moving, what the stretchfactor is
                    // and depending on how far away it is from the center.
                    star.sprite.scale.y
                        = distanceScale * starBaseSize
                        + (distanceScale * speed * starStretch * distanceCenter) / this.app!.renderer.screen.width;
                    star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
                }
            });
        }
    }

}

