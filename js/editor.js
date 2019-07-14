const MODE_DEFAULT = 0, MODE_DRAGGING = 1, MODE_MOVING = 2;

class Editor {

    constructor(app, options) {
        if (!app instanceof PIXI.Application) {
            console.error("Argument app must be an PIXI.Application!");
        } else {
            options = Object.assign({
                grid_size: 50,
            }, options);

            this.app = app;
            this.stage = new PIXI.Container();
            this.app.stage.addChild(this.stage);

            this.GRID_SIZE = options.grid_size;
            this.GRID_BOX_SIZE = 32;

            this.instances = [];

            this.mode = 0;
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
        if (posX < 0)
            posX = 0;
        if (posX > this.GRID_SIZE * this.GRID_BOX_SIZE)
            posX = (this.GRID_SIZE - 1) * this.GRID_BOX_SIZE;
        if (posY < 0)
            posY = 0;
        if (posY > this.GRID_SIZE * this.GRID_BOX_SIZE)
            posY = (this.GRID_SIZE - 1) * this.GRID_BOX_SIZE;
        return {x: posX,
                y: posY };
    }

    isInMode() {
        return this.mode !== MODE_DEFAULT;
    }

}

class Instance extends PIXI.Sprite {

    constructor(editor, texture) {
        super(texture);

        if (!editor instanceof Editor)
            console.error("Argument editor must be an Editor!");

        this.editor = editor;

        this.interactive = true;
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
                this.editor.remove(this);
            });
    }

    onDragStart(e) {
        e.stopPropagation();
        this.data = e.data;
        this.dragging = true;
        this.alpha = 0.5;
        this.editor.mode = MODE_DRAGGING;
        this.posOld = {x: this.position.x, y: this.position.y };
    }

    onDragMove(e) {
        if (this.dragging) {
            let newPosition = this.data.getLocalPosition(this.parent);
            let {x, y} = this.editor.getGridPos(newPosition.x, newPosition.y);

            this.position.x = x;
            this.position.y = y;
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

    }

}

export {Editor, Instance};