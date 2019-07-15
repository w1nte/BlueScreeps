'use strict';

import {Editor} from "./editor.js";
import * as Constructions from "./constructions.js";


const app = new PIXI.Application({
    width: 900, height: 600, backgroundColor: 0x1d1d1d, resolution: window.devicePixelRatio || 1, autoResize: true
});
document.getElementById("canvas").appendChild(app.view);
app.view.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

const editor = new Editor(app);

let selected = Constructions.Road;
let gui_sel = document.getElementById('gui-selection');
let constructs = [Constructions.Road, Constructions.Extension, Constructions.Wall, Constructions.Tower, Constructions.Terminal, Constructions.Storage, Constructions.Spawn, Constructions.Link, Constructions.Lab];
for (let i = 0; i < constructs.length; i++) {
    let construct = constructs[i];
    let elm = document.createElement('a');
    elm.href = '#';
    elm.id = construct.type;
    elm.innerHTML = construct.name;

    gui_sel.append(elm);
    elm.onclick = (e) => {
        selected = construct;
    };
}

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

let generateCode = (editor) => {
    let content = "//Generated by BlueScreeps 1.0.0\r\nlet blueprint = [";
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

    return content;
};

let downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = (e) => {
    e.stopPropagation();

    let content = generateCode(editor);

    let code = document.getElementById('code');
    code.innerHTML = content;
    Prism.highlightElement(code);

    //downloadButton.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(content));
    //downloadButton.setAttribute('download', 'room.txt');
};

window.onload = (e) => {
    let content = generateCode(editor);

    let code = document.getElementById('code');
    code.innerHTML = content;
    Prism.highlightElement(code);
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

