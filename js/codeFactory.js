'use strict';

import * as Constructions from "./constructions.js";

class CodeFactory {

    /**
     * Generate code
     */
    static generate(editor) {
        const blueprintName = "blueprint";

        let content = "//Generated by BlueScreeps 1.1.0\r\nconst " + blueprintName + " = (room_, x, y) => _.each([";
        let breakAfter = 5;

        for (let i in editor.instances) {
            let construct = editor.instances[i];
            if (construct instanceof Constructions.Construction) {
                if (i % breakAfter === 0 && parseInt(i) !== 0 && parseInt(i) !== editor.instances.length-1)
                    content += "\r\n";
                let {x, y} = editor.getGridPos(construct.position.x, construct.position.y);
                content += "[" + construct.constructor.type + ", " + x / editor.GRID_BOX_SIZE + ", " + y / editor.GRID_BOX_SIZE + "], ";
            }
        }
        if (editor.instances.length > 0)
            content = content.slice(0, content.length - 2);
        content += "], (s) => {room_.createConstructionSite(x+s[1], y+s[2], s[0]);});\r\n\r\nmodule.exports = {" + blueprintName + "};";

        return content;
    }
}

// just a test
class FileManager {

    static unserialize(editor, string) {
        let instancesList = [];
        let instances = string.match(new RegExp(/\[[A-Z_]*,\s?[0-9\-+\.]*,\s?[0-9\-+\.]*\]/gms));

        let constrMap = {};
        for (let i in Constructions.CONSTRUCTIONS) {
            constrMap[Constructions.CONSTRUCTIONS[i].type] = Constructions.CONSTRUCTIONS[i].name;
        }

        for (let i in instances) {
            let className, x, y;
            let data = instances[i].trim().slice(1, instances[i].length-1).split(',');
            className = constrMap[data[0]];
            x = parseFloat(data[1]);
            y = parseFloat(data[2]);

            const construct = new Constructions[className](editor);
            construct.position.x = x * editor.GRID_BOX_SIZE;
            construct.position.y = y * editor.GRID_BOX_SIZE;

            instancesList.push(construct);
        }

        return instancesList;
    }
}

export {CodeFactory, FileManager};