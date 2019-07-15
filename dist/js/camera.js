

class Camera {
    constructor(app, stage) {
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

        app.view.addEventListener('mousewheel', (e) => {
            let mouse = app.renderer.plugins.interaction.mouse.global;
            if (mouse.x < 0 || mouse.x > app.screen.width || mouse.y < 0 || mouse.y > app.screen.height)
                return;

            e.preventDefault();

            let dir = e.deltaY < 0 ? 1 : -1;
            let factor = (1 + dir * 0.1);

            let beforeTransform = stage.toLocal(app.renderer.plugins.interaction.mouse.global);

            stage.scale.x *= factor;
            stage.scale.y *= factor;

            if (stage.scale.x >= 2) {
                stage.scale.x = 2;
                stage.scale.y= 2;
            }

            if (stage.scale.x <= 0.5) {
                stage.scale.x = 0.5;
                stage.scale.y = 0.5;
            }

            stage.updateTransform();
            let afterTransform = stage.toLocal(app.renderer.plugins.interaction.mouse.global);

            stage.position.x += (afterTransform.x - beforeTransform.x) * stage.scale.x;
            stage.position.y += (afterTransform.y - beforeTransform.y) * stage.scale.y;
            stage.updateTransform();
        });
    }

}

export {Camera};