'use strict';

import {Editor} from "./editor.js";
import * as Constructions from "./constructions.js";


const app = new PIXI.Application({
    width: 1200, height: 800, backgroundColor: 0x2b2b2b, resolution: window.devicePixelRatio || 1,
});
document.getElementById("canvas").appendChild(app.view);
app.view.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

const editor = new Editor(app);



let selected = Constructions.Road;
document.getElementById('extensionButton').onclick = (e) => {
    selected = Constructions.Extension;
};

document.getElementById('roadButton').onclick = (e) => {
    selected = Constructions.Road;
};


app.stage.interactive = true;
app.renderer.plugins.interaction.on("mousedown", function(e) {
    if (!editor.isInMode()) {
        let click = e.data.originalEvent.which;
        if (click === 1) {
            let mouse_grid_x = Math.floor(editor.stage.toLocal(app.renderer.plugins.interaction.mouse.global).x / editor.GRID_BOX_SIZE) * editor.GRID_BOX_SIZE,
                mouse_grid_y = Math.floor(editor.stage.toLocal(app.renderer.plugins.interaction.mouse.global).y / editor.GRID_BOX_SIZE) * editor.GRID_BOX_SIZE;

            let c = new selected(editor);
            c.position.x = mouse_grid_x;
            c.position.y = mouse_grid_y;
            editor.add(c);
            //c.onDragStart(e);
        }
    }
});

let downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = (e) => {
    e.stopPropagation();

    let content = "let blueprint = [";
    let breakAfter = 5;

    for (let i in editor.instances) {
        let construct = editor.instances[i];
        if (construct instanceof Constructions.Construction) {
            if (i % breakAfter === 0 && parseInt(i) !== 0 && parseInt(i) !== editor.instances.length-1)
                content += "\r\n";
            let {x, y} = editor.getGridPos(construct.position.x, construct.position.y);
            content += "[" + construct.type + ", " + x / editor.GRID_BOX_SIZE + ", " + y / editor.GRID_BOX_SIZE + "], ";
        }
    }
    if (editor.instances.length > 0)
        content = content.slice(0, content.length - 2);
    content += "];\r\n\r\nmodule.exports = {blueprint};";

    let code = document.getElementById('code');
    code.innerHTML = content;
    Prism.highlightElement(code);

    //downloadButton.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(content));
    //downloadButton.setAttribute('download', 'room.txt');
};

let clearButton = document.getElementById('clearButton');
clearButton.onclick = (e) => {
    e.stopPropagation();

    let instances = editor.instances.slice();
    for (let i = 0; i < instances.length; i++) {
        let construct = instances[i];
        editor.remove(construct);
    }

};

