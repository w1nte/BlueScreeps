import {Instance} from "./instance.js";
import {Camera} from "./camera.js";

const MODE_DEFAULT = 0, MODE_DRAGGING = 1, MODE_MOVING = 2;

class Editor extends PIXI.utils.EventEmitter {

    constructor(app, options) {
        super();

        if (!app instanceof PIXI.Application) {
            console.error("Argument app must be an PIXI.Application!");
        } else {
            options = Object.assign({
                grid_box_size: 32,
                stage: new PIXI.Container(),
                posX: app.renderer.width / 2,
                posY: app.renderer.height / 2
            }, options);

            this.app = app;
            this.stage = options.stage;
            this.stage.position.x = options.posX;
            this.stage.position.y += options.posY;

            this.GRID_BOX_SIZE = options.grid_box_size;

            this.app.stage.addChild(this.stage);
            this.instances = [];
            this.mode = 0;

            // background
            let tiling_size = 100000;
            let tiling = new PIXI.TilingSprite(PIXI.Texture.from("./assets/bg.jpg"), tiling_size, tiling_size);
            tiling.position.set(-tiling_size / 2, -tiling_size / 2);
            this.stage.addChild(tiling);

            // coordinates
            let coordinates = new PIXI.Text('', {fontFamily: 'Yanone Kaffeesatz, Arial', fontSize: 13, fill: 0xFFFFFF, align: 'left'});
            coordinates.position.x = 10;
            coordinates.position.y = 10;
            app.stage.addChild(coordinates);

            // cursor
            let buildBlock = new PIXI.Graphics();
            buildBlock.beginFill(0xFFFFFF, 0.1);
            buildBlock.drawRect(0, 0, this.GRID_BOX_SIZE, this.GRID_BOX_SIZE);
            this.stage.addChild(buildBlock);

            let self = this;
            app.renderer.plugins.interaction.on("mousemove", function(e) {
                let {x, y} = self.getGridPos(self.stage.toLocal(e.data.global).x, self.stage.toLocal(e.data.global).y);
                buildBlock.position.x = x;
                buildBlock.position.y = y;
                coordinates.text = "X: " + x / self.GRID_BOX_SIZE + " Y: " + y / self.GRID_BOX_SIZE;
            });

            // zero line
            let line = new PIXI.Graphics();
            line.lineStyle(2, 0x888888, 1);
            line.moveTo(this.GRID_BOX_SIZE / 2, -10000);
            line.lineTo(this.GRID_BOX_SIZE / 2, 10000);
            line.moveTo(-10000, this.GRID_BOX_SIZE / 2);
            line.lineTo(10000, this.GRID_BOX_SIZE / 2);
            this.stage.addChild(line);

            // camera
            let camera = new Camera(this.app, this.stage);
        }
    }

    add(instance) {
        if (!instance instanceof Instance)
            return false;

        this.instances.push(instance);
        this.stage.addChild(instance);

        return true;
    }

    remove(instance) {
        let index = this.instances.indexOf(instance);
        if (index !== -1)
            this.instances.splice(index, 1);
        this.stage.removeChild(instance);
    }

    getGridPos(posX, posY) {
        posX = Math.floor(posX / this.GRID_BOX_SIZE) * this.GRID_BOX_SIZE;
        posY = Math.floor(posY / this.GRID_BOX_SIZE) * this.GRID_BOX_SIZE;
        return {x: posX,
            y: posY };
    }

    isInMode() {
        return this.mode !== MODE_DEFAULT;
    }

}

export {Editor, MODE_DEFAULT, MODE_DRAGGING, MODE_MOVING};