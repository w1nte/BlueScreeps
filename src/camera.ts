

class Camera {
    constructor(app, stage) {
        this.app = app;
        this.stage = stage;

        let isDragging = false,
            prevX,
            prevY;

        app.renderer.plugins.interaction
            .on('mousedown', (e) => {
                let click = e.data.originalEvent.which;
                if (click === 2) {
                    e.data.originalEvent.preventDefault();
                    let pos = e.data.global;
                    prevX = pos.x; prevY = pos.y;
                    isDragging = true;
                }
            })
            .on('mousemove', (e) => {
                if (!isDragging)
                    return;

                let pos = e.data.global;
                let dx = pos.x - prevX;
                let dy = pos.y - prevY;

                stage.position.x += dx;
                stage.position.y += dy;
                prevX = pos.x; prevY = pos.y;
            })
            .on('mouseup', (e) => {
                isDragging = false;
            });

        const scrollEvent = (e) => {
            let mouse = app.renderer.plugins.interaction.mouse.global;
            if (mouse.x < 0 || mouse.x > app.screen.width || mouse.y < 0 || mouse.y > app.screen.height)
                return;

            let dir = (e.deltaY || e.detail) < 0 ? 1 : -1;
            let factor = (1 + dir * 0.1);

            this.zoom(factor);
        };

        let mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent("on"+mousewheelevt, scrollEvent);
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(mousewheelevt, scrollEvent, false);
    }

    setPosition(x, y) {
        this.stage.position.x = x + (this.app.renderer.width * this.stage.scale.x) / 2;
        this.stage.position.y = y + (this.app.renderer.height * this.stage.scale.y) / 2;
    }

    zoom(factor) {
        let beforeTransform = this.stage.toLocal(this.app.renderer.plugins.interaction.mouse.global);

        this.stage.scale.x *= factor;
        this.stage.scale.y *= factor;

        if (this.stage.scale.x >= 2) {
            this.stage.scale.x = 2;
            this.stage.scale.y= 2;
        }

        if (this.stage.scale.x <= 0.2) {
            this.stage.scale.x = 0.2;
            this.stage.scale.y = 0.2;
        }

        this.stage.updateTransform();
        let afterTransform = this.stage.toLocal(this.app.renderer.plugins.interaction.mouse.global);

        this.stage.position.x += (afterTransform.x - beforeTransform.x) * this.stage.scale.x;
        this.stage.position.y += (afterTransform.y - beforeTransform.y) * this.stage.scale.y;
        this.stage.updateTransform();
    }

}

export {Camera};