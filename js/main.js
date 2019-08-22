'use strict';

import {Editor} from "./editor.js";
import * as Constructions from "./constructions.js";
import {CodeFactory} from "./codeFactory.js";
import {RoadDrawer} from "./roadDrawer.js";
import {EditorGUI} from "./editorGUI.js";
import {FileManager} from "./codeFactory.js";

const canvas = document.getElementById("canvas");
const generateCodeButton = document.getElementById('generateCodeButton');
const removeAllButton = document.getElementById('clearButton');
const code = document.getElementById('code');
const shareButton = document.getElementById('shareButton');
const loadButton = document.getElementById('loadButton');
const shareTextBox = document.getElementById('shareTextBox');

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

    window.onload = (e) => updateCode();

    generateCodeButton.onclick = (e) => {
        e.stopPropagation();
        updateCode();
    };

    removeAllButton.onclick = (e) => {
        e.stopPropagation();
        editor.removeAll();
    };

    editor.on('update', () => {
        roadDrawer.draw();
    });

    loadButton.onclick = (e) => {
        e.stopPropagation();
        editor.removeAll();
        let unserializedData = FileManager.unserialize(editor, code.innerText);
        for (let i in unserializedData) {
            editor.add(unserializedData[i]);
        }
    };

    shareButton.onclick = (e) => {
        e.preventDefault();
        shareTextBox.style.visibility = 'visible';
        shareTextBox.value = location.protocol + '//' + location.host + location.pathname + '?code=' + btoa(CodeFactory.generate(editor));
        shareTextBox.select();
        document.execCommand("copy");
    };

    let unserializedData = FileManager.unserialize(editor, "[STRUCTURE_SPAWN, 0, 0], [STRUCTURE_ROAD, 1, 0], [STRUCTURE_ROAD, 0, -1], [STRUCTURE_ROAD, -1, 0], [STRUCTURE_ROAD, 0, 1]," +
        "[STRUCTURE_ROAD, 1, 1], [STRUCTURE_ROAD, 1, -1], [STRUCTURE_ROAD, -1, -1], [STRUCTURE_ROAD, -1, 1]");

    let url = new URL(window.location.href);
    let urlcode = url.searchParams.get("code");
    if (urlcode != null) {
        unserializedData = FileManager.unserialize(editor, atob(urlcode));
    }

    for (let i in unserializedData) {
        editor.add(unserializedData[i]);
    }

};

main();