const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0xAAAAAA, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

let constructions = [];



const grid_size = 32;



class Construction {
    constructor(x, y) {
        this.sprite = new PIXI.Sprite.from('assets/test.png');
        this.sprite.position.x = x;
        this.sprite.position.y = y;

        constructions.push(this);
        app.stage.addChild(this.sprite);
    }


}

app.stage.interactive = true;
app.renderer.plugins.interaction.on("pointerdown", function(e){
    let mouse_x = Math.floor(app.renderer.plugins.interaction.mouse.global.x / grid_size) * grid_size,
        mouse_y = Math.floor(app.renderer.plugins.interaction.mouse.global.y / grid_size) * grid_size;

    console.log("add");
    new Construction(mouse_x, mouse_y);
});

app.ticker.add((delta) => {


    for (let c in constructions) {
        let construct = constructions[c];

    }
});

let text = "hello world";
let downloadButton = document.getElementById('downloadButton');
downloadButton.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
downloadButton.setAttribute('download', 'room.txt');