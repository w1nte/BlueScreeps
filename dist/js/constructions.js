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
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Road extends Construction {
    constructor(editor) {
        super(editor);
        this.type = "STRUCTURE_ROAD";
        this.name = "Road";
    }
}

class Lab extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/lab.png"));
        this.type = "STRUCTURE_LAB";
        this.name = "Lab";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Link extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/link.png"));
        this.type = "STRUCTURE_LINK";
        this.name = "Link";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Spawn extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/spawn.png"));
        this.type = "STRUCTURE_SPAWN";
        this.name = "Spawn";
        this.sprite.height = 45;
        this.sprite.width = 45;
        this.sprite.anchor.set(0.18);
    }
}

class Storage extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/storage.png"));
        this.type = "STRUCTURE_STORAGE";
        this.name = "Storage";
        this.sprite.anchor.set(0.1, 0.15);
        this.sprite.scale.x = 0.8;
        this.sprite.scale.y = 0.8;
    }
}

class Terminal extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/terminal.png"));
        this.type = "STRUCTURE_TERMINAL";
        this.name = "Terminal";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Tower extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/tower.png"));
        this.type = "STRUCTURE_TOWER";
        this.name = "Tower";
        this.sprite.anchor.set(-0.02, 0);
        this.sprite.scale.x = 0.6;
        this.sprite.scale.y = 0.6;
    }
}

class Wall extends Construction {
    constructor(editor) {
        super(editor);
        this.type = "STRUCTURE_WALL";
        this.name = "Wall";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

export{Construction, Extension, Road, Lab, Link, Spawn, Storage, Terminal, Tower, Wall};