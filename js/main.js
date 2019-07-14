'use strict';

import {Editor, Instance} from "./editor.js";

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x2b2b2b, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);
app.view.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});


const editor = new Editor(app);



class Construction extends Instance {
    constructor(editor, texture) {
        super(editor, texture);
        this.type = "t";
    }
}

class Extension extends Construction {
    constructor() {
        super(editor, PIXI.Texture.from("assets/extension.png"));
        this.type = "extension";
        this.height = 32;
        this.width = 32;
    }
}



app.stage.interactive = true;
app.renderer.plugins.interaction.on("mousedown", function(e) {
    if (!editor.isInMode()) {
        let click = e.data.originalEvent.which;
        if (click === 1) {
            let mouse_grid_x = Math.floor(app.renderer.plugins.interaction.mouse.global.x / editor.GRID_BOX_SIZE) * editor.GRID_BOX_SIZE,
                mouse_grid_y = Math.floor(app.renderer.plugins.interaction.mouse.global.y / editor.GRID_BOX_SIZE) * editor.GRID_BOX_SIZE;

            let c = new Extension();
            c.position.x = mouse_grid_x;
            c.position.y = mouse_grid_y;
            editor.add(c);
            c.onDragStart(e);
        }
    }
});

// app.ticker.add((delta) => {
//
//
//     for (let c in constructions_list) {
//         let construct = constructions_list[c];
//
//     }
// });

let to2DArray = () => {
    let array2d = Array.from(Array(editor.GRID_SIZE), () => new Array(editor.GRID_SIZE));
    for (let i in editor.instances) {
        let instance = editor.instances[i];
        array2d[Math.floor(instance.position.y / editor.GRID_BOX_SIZE)][Math.floor(instance.position.x / editor.GRID_BOX_SIZE)] = instance;
    }
    return array2d;
};

let downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = (e) => {
    e.stopPropagation();

    let content = "";
    let array = to2DArray();

    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[0].length; x++) {
                let construct = array[y][x];

                content += (construct instanceof Construction ? construct.type : " ") + ";";
        }
        content += "\r\n";
    }

    downloadButton.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    downloadButton.setAttribute('download', 'room.csv');
};
