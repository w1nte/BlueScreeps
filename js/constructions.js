import {Instance} from "./instance.js";

class Construction extends Instance {
    constructor(editor, texture) {
        super(editor, texture);
    }
}
Construction.id = 0;
Construction.ingameName = "default";
Construction.type = "";

class Extension extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/extension.png"));
        this.sprite.anchor.set(-0.19);
        this.sprite.scale.x = 0.37;
        this.sprite.scale.y = 0.37;
    }
}
Extension.id = 1;
Extension.ingameName = "Extension";
Extension.type = "STRUCTURE_EXTENSION";

class Road extends Construction {
    constructor(editor) {
        super(editor);
    }
}
Road.id = 2;
    Road.ingameName = "Road";
Road.type = "STRUCTURE_ROAD";

class Lab extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/lab.png"));
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}
Lab.id = 3;
    Lab.ingameName = "Lab";
Lab.type = "STRUCTURE_LAB";

class Link extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/link.png"));
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}
Link.id = 4;
    Link.ingameName = "Link";
Link.type = "STRUCTURE_LINK";

class Spawn extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/spawn.png"));
        this.sprite.height = 45;
        this.sprite.width = 45;
        this.sprite.anchor.set(0.18);
    }
}
Spawn.id = 5;
Spawn.ingameName = "Spawn";
Spawn.type = "STRUCTURE_SPAWN";

class Storage extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/storage.png"));
        this.sprite.anchor.set(0.1, 0.15);
        this.sprite.scale.x = 0.8;
        this.sprite.scale.y = 0.8;
    }
}
Storage.id = 6;
Storage.ingameName = "Storage";
Storage.type = "STRUCTURE_STORAGE";

class Terminal extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/terminal.png"));
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}
Terminal.id = 7;
Terminal.ingameName = "Terminal";
Terminal.type = "STRUCTURE_TERMINAL";

class Tower extends Construction {
    constructor(editor) {
        super(editor, PIXI.Texture.from("assets/tower.png"));
        this.sprite.anchor.set(-0.02, 0);
        this.sprite.scale.x = 0.6;
        this.sprite.scale.y = 0.6;
    }
}
Tower.id = 8;
Tower.ingameName = "Tower";
Tower.type = "STRUCTURE_TOWER";

class Wall extends Construction {
    constructor(editor) {
        super(editor);
        this.sprite.height = 32;
        this.sprite.width = 32;
    }
}
Wall.id = 9;
Wall.ingameName = "Wall";
Wall.type = "STRUCTURE_WALL";

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