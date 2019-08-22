import * as Constructions from "./constructions.js";

class RoadDrawer {

    constructor(editor) {
        this.editor = editor;
        this.roads = new PIXI.Graphics();
        this.walls = new PIXI.Graphics();
        editor.stage.addChild(this.roads);
        editor.stage.addChild(this.walls);
    }

    draw() {

        this.roads.clear();
        this.walls.clear();

        let instances = this.editor.instances;

        for (let i = 0; i < instances.length; i++) {
            if (instances[i] instanceof Constructions.Wall) {
                let c1 = instances[i];
                c1.neighbor = {top:false, bottom:false, left:false, right:false};
                for (let j = 0; j < instances.length; j++) {
                    if (instances[j] instanceof Constructions.Wall) {
                        let c2 = instances[j];
                        if ((c2.position.y + 32) === c1.position.y && c2.position.x === c1.position.x)
                            c1.neighbor.top = true;
                        if ((c2.position.y - 32) === c1.position.y && c2.position.x === c1.position.x)
                            c1.neighbor.bottom = true;
                        if ((c2.position.x - 32) === c1.position.x && c2.position.y === c1.position.y)
                            c1.neighbor.right = true;
                        if ((c2.position.x + 32) === c1.position.x && c2.position.y === c1.position.y)
                            c1.neighbor.left = true;
                    }
                }
            }

            if (instances[i] instanceof Constructions.Road) {
                let c1 = instances[i];
                c1.neighbor = {top:false, bottom:false, left:false, right:false, topright:false, topleft:false, bottomright:false, bottomleft:false};
                for (let j = 0; j < instances.length; j++) {
                    if (instances[j] instanceof Constructions.Road) {
                        let c2 = instances[j];
                        if ((c2.position.y + 32) === c1.position.y && c2.position.x === c1.position.x)
                            c1.neighbor.top = true;
                        if ((c2.position.y - 32) === c1.position.y && c2.position.x === c1.position.x)
                            c1.neighbor.bottom = true;
                        if ((c2.position.x - 32) === c1.position.x && c2.position.y === c1.position.y)
                            c1.neighbor.right = true;
                        if ((c2.position.x + 32) === c1.position.x && c2.position.y === c1.position.y)
                            c1.neighbor.left = true;

                        if ((c2.position.y + 32) === c1.position.y && (c2.position.x - 32) === c1.position.x)
                            c1.neighbor.topright = true;
                        if ((c2.position.y + 32) === c1.position.y && (c2.position.x + 32) === c1.position.x)
                            c1.neighbor.topleft = true;
                        if ((c2.position.y - 32) === c1.position.y && (c2.position.x + 32) === c1.position.x)
                            c1.neighbor.bottomleft = true;
                        if ((c2.position.y - 32) === c1.position.y && (c2.position.x - 32) === c1.position.x)
                            c1.neighbor.bottomright= true;
                    }
                }
            }
        }

        this.roads.beginFill('0x828282');
        this.roads.lineStyle(12, 0x828282, 1);

        for (let i = 0; i < instances.length; i++) {
            let construct = instances[i];

            if (construct instanceof Constructions.Road) {
                this.roads.lineStyle(0, 0x828282, 1);
                this.roads.drawCircle(construct.position.x + 16, construct.position.y + 16, 4);

                this.roads.lineStyle(8, 0x828282, 1);
                if (construct.neighbor.top) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x + 16, construct.position.y);
                }
                if (construct.neighbor.right) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x + 32, construct.position.y + 16);
                }
                if (construct.neighbor.bottom) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x + 16, construct.position.y + 32);
                }
                if (construct.neighbor.left) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x, construct.position.y + 16);
                }

                if (construct.neighbor.topright) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x + 32, construct.position.y);
                }

                if (construct.neighbor.topleft) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x, construct.position.y);
                }

                if (construct.neighbor.bottomright) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x + 32, construct.position.y + 32);
                }

                if (construct.neighbor.bottomleft) {
                    this.roads.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.roads.lineTo(construct.position.x, construct.position.y + 32);
                }

            }

            this.walls.beginFill(0x0b0b0b);
            if (construct instanceof Constructions.Wall) {
                this.walls.lineStyle(0, 0x0b0b0b, 1);
                this.walls.drawCircle(construct.position.x + 16, construct.position.y + 16, 16);

                this.walls.lineStyle(32, 0x0b0b0b, 1);
                if (construct.neighbor.top) {
                    this.walls.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.walls.lineTo(construct.position.x + 16, construct.position.y);
                }
                if (construct.neighbor.right) {
                    this.walls.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.walls.lineTo(construct.position.x + 32, construct.position.y + 16);
                }
                if (construct.neighbor.bottom) {
                    this.walls.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.walls.lineTo(construct.position.x + 16, construct.position.y + 32);
                }
                if (construct.neighbor.left) {
                    this.walls.moveTo(construct.position.x + 16, construct.position.y + 16);
                    this.walls.lineTo(construct.position.x, construct.position.y + 16);
                }

            }

        }

        this.walls.endFill();
        this.walls.updateTransform();
        this.roads.endFill();
        this.roads.updateTransform();

    }
}

export {RoadDrawer};