import {Instance} from "./instance.js";

class Construction extends Instance {
    static type = "";

    constructor(editor, texture) {
        super(editor, texture);
        this.name = "default";
    }
}

class Extension extends Construction {
    static type = "STRUCTURE_EXTENSION";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/extension.png"));
        this.name = "Extension";
        this.sprite.anchor.set(-0.19);
        this.sprite.scale.x = 0.37;
        this.sprite.scale.y = 0.37;
    }
}

class Road extends Construction {
    static type = "STRUCTURE_ROAD";

    constructor(editor) {
        super(editor);
        this.name = "Road";
    }
}

class Lab extends Construction {
    static type = "STRUCTURE_LAB";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/lab.png"));
        this.name = "Lab";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Link extends Construction {
    static type = "STRUCTURE_LINK";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/link.png"));
        this.name = "Link";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Spawn extends Construction {
    static type = "STRUCTURE_SPAWN";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/spawn.png"));
        this.name = "Spawn";
        this.sprite.height = 45;
        this.sprite.width = 45;
        this.sprite.anchor.set(0.18);
    }
}

class Storage extends Construction {
    static type = "STRUCTURE_STORAGE";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/storage.png"));
        this.name = "Storage";
        this.sprite.anchor.set(0.1, 0.15);
        this.sprite.scale.x = 0.8;
        this.sprite.scale.y = 0.8;
    }
}

class Terminal extends Construction {
    static type = "STRUCTURE_TERMINAL";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/terminal.png"));
        this.name = "Terminal";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

class Tower extends Construction {
    static type = "STRUCTURE_TOWER";

    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/tower.png"));
        this.name = "Tower";
        this.sprite.anchor.set(-0.02, 0);
        this.sprite.scale.x = 0.6;
        this.sprite.scale.y = 0.6;
    }
}

class Wall extends Construction {
    static type = "STRUCTURE_WALL";

    constructor(editor) {
        super(editor);
        this.name = "Wall";
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}

const CONSTRUCTIONS = [
    Road,
    Extension,
    Wall,
    Tower,
    Terminal,
    Storage,
    Spawn,
    Link,
    Lab
];

export{CONSTRUCTIONS, Construction, Extension, Road, Lab, Link, Spawn, Storage, Terminal, Tower, Wall};