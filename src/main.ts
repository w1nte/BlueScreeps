'use strict';

import {Editor} from "./editor.js";
import * as Constructions from "./constructions.js";
import {CodeFactory} from "./codeFactory.js";
import {RoadDrawer} from "./roadDrawer.js";
import {EditorGUI} from "./editorGUI.js";
import {Loader} from "./codeFactory.js";

const canvas = document.getElementById("canvas");
const generateCodeButton = document.getElementById('generateCodeButton');
const removeAllButton = document.getElementById('clearButton');
const code = document.getElementById('code');
const shareButton = document.getElementById('shareButton');
const shareTextBox = document.getElementById('shareTextBox');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');

const main = () => {

    const app = new PIXI.Application({
        height: 1,
        width: 1,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
        antialias: true,
    });

    const editor = new Editor(app);
    const editorGUI = new EditorGUI(app, editor);
    const roadDrawer = new RoadDrawer(editor);

    const updateCode = () => {
        code.innerHTML = CodeFactory.generate(editor);
        Prism.highlightElement(code);
        console.log("update code");
    };

    editorGUI.addConstructs(Constructions.CONSTRUCTIONS);
    editorGUI.generateGUI("gui-selection");

    canvas.appendChild(app.view);

    app.view.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    if (generateCodeButton != null)
        generateCodeButton.onclick = (e) => {
            e.preventDefault();
            updateCode();
        };

    if (removeAllButton != null)
        removeAllButton.onclick = (e) => {
            e.preventDefault();
            editor.removeAll();
        };

    if (zoomInButton != null)
        zoomInButton.onclick = (e) => {
            e.preventDefault();
            editor.camera.zoom(1.1);
        };

    if (zoomOutButton != null)
        zoomOutButton.onclick = (e) => {
            e.preventDefault();
            editor.camera.zoom(0.9);
        };

    let debounceUpdate;
    editor.on('update', () => {
        if (debounceUpdate != null)
            clearInterval(debounceUpdate);
        debounceUpdate = setInterval(() => {
            roadDrawer.draw();
            updateCode();
            clearInterval(debounceUpdate);
        }, 50);
    });

    // if (loadButton != null)
    //     loadButton.onclick = (e) => {
    //         e.stopPropagation();
    //         editor.removeAll();
    //         let unserializedData = FileManager.unserialize(editor, code.innerText);
    //         for (let i in unserializedData) {
    //             editor.add(unserializedData[i]);
    //         }
    //     };

    if (shareButton != null)
        shareButton.onclick = (e) => {
            e.preventDefault();
            let elm = document.createElement("textarea");
            elm.value = location.protocol + '//' + location.host + location.pathname + '?code=' + Loader.serialize(editor);
            document.body.appendChild(elm);
            elm.focus();
            elm.select();
            elm.setSelectionRange(0, 99999);
            try {
                let successful = document.execCommand('copy');
                console.log('Fallback: Copying text command was ' + successful ? 'successful' : 'unsuccessful');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(elm);

            shareButton.innerHTML = "Copied!";
            debounce(() => {shareButton.innerHTML = "Share"}, 2000)();
        };

    let unserializedData = Loader.loadFromCode(editor, "[[STRUCTURE_EXTENSION, -7, -2], [STRUCTURE_EXTENSION, -7, -1], [STRUCTURE_EXTENSION, -7, 0], [STRUCTURE_EXTENSION, -7, 1], [STRUCTURE_EXTENSION, -7, 2],        [STRUCTURE_EXTENSION, -6, 0], [STRUCTURE_EXTENSION, -5, 0], [STRUCTURE_EXTENSION, -5, -1], [STRUCTURE_EXTENSION, -5, -2], [STRUCTURE_EXTENSION, -5, 1],        [STRUCTURE_EXTENSION, -5, 2], [STRUCTURE_EXTENSION, -3, -2], [STRUCTURE_EXTENSION, -3, -1], [STRUCTURE_EXTENSION, -3, 0], [STRUCTURE_EXTENSION, -3, 1],        [STRUCTURE_EXTENSION, -3, 2], [STRUCTURE_EXTENSION, -2, 2], [STRUCTURE_EXTENSION, -2, 0], [STRUCTURE_EXTENSION, -2, -2], [STRUCTURE_EXTENSION, 0, -2],        [STRUCTURE_EXTENSION, 0, -1], [STRUCTURE_EXTENSION, 0, 0], [STRUCTURE_EXTENSION, 0, 1], [STRUCTURE_EXTENSION, 0, 2], [STRUCTURE_EXTENSION, 1, 2],        [STRUCTURE_EXTENSION, 3, -2], [STRUCTURE_EXTENSION, 3, 0], [STRUCTURE_EXTENSION, 3, -1], [STRUCTURE_EXTENSION, 3, 1], [STRUCTURE_EXTENSION, 3, 2],        [STRUCTURE_EXTENSION, 4, 2], [STRUCTURE_EXTENSION, 6, -1], [STRUCTURE_EXTENSION, 6, 0], [STRUCTURE_EXTENSION, 6, 1], [STRUCTURE_EXTENSION, 7, 2],        [STRUCTURE_EXTENSION, 8, 1], [STRUCTURE_EXTENSION, 8, 0], [STRUCTURE_EXTENSION, 8, -1], [STRUCTURE_EXTENSION, 7, -2]]");
    let url = new URL(window.location.href);
    let urlcode = url.searchParams.get("code");
    if (urlcode != null) {
        unserializedData = Loader.unserialize(editor, urlcode);
    }

    for (let i in unserializedData) {
        editor.add(unserializedData[i]);
    }

    function debounce(func, time){
        var time = time || 100; // 100 by default if no param
        var timer;
        return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    // Listen for window resize events
    window.addEventListener('resize', () => {
        app.renderer.resize(1, 1);
        debounce(resize)();
    });

    // Resize function window
    function resize() {

        // Get the p
        const parent = app.view.parentNode;

        // Resize the renderer
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }

    resize();
    editor.camera.setPosition(0, 0);

};

main();