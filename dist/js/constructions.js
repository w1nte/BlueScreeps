import {Instance} from "./instance.js";

class Construction extends Instance {
    constructor(editor, texture) {
        super(editor, texture);
        this.type = "";
        this.name = "default";
    }
}

class Extension extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/extension.png"));
        this.type = "STRUCTURE_EXTENSION";
        this.name = "Extension";
        this.height = 32;
        this.width = 32;
    }
}

class Road extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/road.png"));
        this.type = "STRUCTURE_ROAD";
        this.name = "Road";
        this.height = 16;
        this.width = 16;
        this.anchor.set(-0.5);
    }
}

class Lab extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/lab.png"));
        this.type = "STRUCTURE_LAB";
        this.name = "Lab";
        this.height = 32;
        this.width = 32;
    }
}

class Link extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/link.png"));
        this.type = "STRUCTURE_LINK";
        this.name = "Link";
        this.height = 32;
        this.width = 32;
    }
}

class Spawn extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/spawn.png"));
        this.type = "STRUCTURE_SPAWN";
        this.name = "Spawn";
        this.height = 32;
        this.width = 32;
    }
}

class Storage extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/storage.png"));
        this.type = "STRUCTURE_STORAGE";
        this.name = "Storage";
        this.height = 32;
        this.width = 32;
    }
}

class Terminal extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/terminal.png"));
        this.type = "STRUCTURE_TERMINAL";
        this.name = "Terminal";
        this.height = 32;
        this.width = 32;
    }
}

class Tower extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/tower.png"));
        this.type = "STRUCTURE_TOWER";
        this.name = "Tower";
        this.height = 32;
        this.width = 32;
    }
}

class Wall extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/wall.png"));
        this.type = "STRUCTURE_WALL";
        this.name = "Wall";
        this.height = 32;
        this.width = 32;
    }
}

export{Construction, Extension, Road, Lab, Link, Spawn, Storage, Terminal, Tower, Wall};