import {MODE_DRAGGING, MODE_MOVING, MODE_DEFAULT, Editor} from "./editor.js";

class Instance extends PIXI.Graphics {

    constructor(editor, texture) {
        super();

        if (!editor instanceof Editor)
            console.error("Argument editor must be an Editor!");

        this.hitArea = new PIXI.Rectangle(0, 0, editor.GRID_BOX_SIZE, editor.GRID_BOX_SIZE);
        this.sprite = new PIXI.Sprite(texture);
        this.addChild(this.sprite);

        this.editor = editor;

        this.interactive = true;
        this.cursor = 'pointer';
        this
            .on('onload', this.onDragStart)
            // events for drag start
            .on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            // events for drag end
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            // events for drag move
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove)
            .on('rightclick', (e) => {
                editor.emit("update");
                editor.remove(this);
            });
    }

    onDragStart(e) {
        e.stopPropagation();
        this.data = e.data;
        this.dragging = true;
        this.alpha = 0.5;
        this.editor.mode = MODE_DRAGGING;
        this.posOld = {x: this.position.x, y: this.position.y};
        this.posTemp = {x: this.position.x, y: this.position.y};
    }

    onDragMove(e) {
        if (this.dragging) {
            let newPosition = this.data.getLocalPosition(this.parent);
            let {x, y} = this.editor.getGridPos(newPosition.x, newPosition.y);

            this.position.x = x;
            this.position.y = y;

            if (this.posTemp.x !== x || this.posTemp.y !== y) {
                this.posTemp = {x: x, y: y};
                this.editor.emit("update");
            }

        }
    }

    onDragEnd(e) {
        this.data = null;
        this.dragging = false;
        this.alpha = 1;
        this.editor.mode = MODE_DEFAULT;

        for (let i in this.editor.instances) {
            let instance = this.editor.instances[i];
            if (instance !== this && instance.position.x === this.position.x && instance.position.y === this.position.y) {
                this.position.x = this.posOld.x;
                this.position.y = this.posOld.y;
                break;
            }
        }
        this.editor.emit("update");

    }

}

export {Instance};