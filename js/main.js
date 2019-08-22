'use strict';

import {Editor} from "./editor.js";
import * as Constructions from "./CONSTRUCTIONS.js";
import {CodeFactory} from "./codeFactory.js";
import {RoadDrawer} from "./roadDrawer.js";
import {EditorGUI} from "./editorGUI.js";

const canvas = document.getElementById("canvas");
const generateCodeButton = document.getElementById('downloadButton');
const removeAllButton = document.getElementById('clearButton');
const code = document.getElementById('code');

const main = () => {

    const app = new PIXI.Application({
        width: 900,
        height: 600,
        backgroundColor: 0x1d1d1d,
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
        antialias: true
    });

    const editor = new Editor(app);
    const editorGUI = new EditorGUI(app, editor);
    const roadDrawer = new RoadDrawer(editor);

    const updateCode = () => {
        code.innerHTML = CodeFactory.generate(editor);
        Prism.highlightElement(code);
    };

    editorGUI.addConstructs(Constructions.CONSTRUCTIONS);
    editorGUI.generateGUI("gui-selection");

    canvas.appendChild(app.view);

    app.view.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    generateCodeButton.onclick = (e) => {
        e.stopPropagation();
        updateCode();
    };

    removeAllButton.onclick = (e) => {
        e.stopPropagation();
        editor.removeAll();
    };

    window.onload = (e) => updateCode();

    editor.on('update', () => roadDrawer.draw());

};

main();