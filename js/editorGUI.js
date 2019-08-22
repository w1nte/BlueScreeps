"use strict";

class EditorGUI {
    constructor(app, editor) {
        this.app = app;
        this.editor = editor;
        this.constructions = [];
        this.selectedElement = null;
    }

    addConstruct(construct) {
        // TODO: typecheck
        this.constructions.push(construct);
        if (this.selectedElement == null)
            this.selectedElement = construct;
    }

    addConstructs(constructs) {
        // TODO. typecheck
        for (let i = 0; i < constructs.length; i++) {
            this.addConstruct(constructs[i]);
        }
    }

    generateGUI(elementId) {
        const self = this;

        let gui_sel = document.getElementById(elementId);
        for (let i = 0; i < self.constructions.length; i++) {
            let construct = self.constructions[i];
            let elm = document.createElement('a');
            elm.href = '#';
            elm.id = construct.type;
            elm.innerHTML = construct.name;

            gui_sel.append(elm);
            elm.onclick = (e) => {
                self.selectedElement = construct;
            };
        }

        // register events
        this.app.stage.interactive = true;
        this.app.renderer.plugins.interaction.on("mousedown", function(e) {
            if (!self.editor.isInMode()) {
                let click = e.data.originalEvent.which;
                if (click === 1) {
                    let mouse_grid_x = Math.floor(self.editor.stage.toLocal(self.app.renderer.plugins.interaction.mouse.global).x / self.editor.GRID_BOX_SIZE) * self.editor.GRID_BOX_SIZE,
                        mouse_grid_y = Math.floor(self.editor.stage.toLocal(self.app.renderer.plugins.interaction.mouse.global).y / self.editor.GRID_BOX_SIZE) * self.editor.GRID_BOX_SIZE;

                    let c = new self.selectedElement(self.editor);
                    c.position.x = mouse_grid_x;
                    c.position.y = mouse_grid_y;
                    self.editor.add(c);
                }
            }
        });
    }
}

export {EditorGUI};