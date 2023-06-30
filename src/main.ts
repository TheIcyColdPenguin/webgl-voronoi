import "./style.css";
import init, { initialise, create_app } from "innards";

init().then(() => {
    initialise();

    const canvas = document.querySelector("canvas");
    if (!canvas) {
        alert("canvas not found");
        return;
    }

    const context = canvas.getContext("webgl2");
    if (!context) {
        alert("Couldn't get context");
        return;
    }

    const app = create_app(context, canvas.width, canvas.height);

    requestAnimationFrame(function animate(time) {
        let u_time = time / 1000;
        app.draw(u_time);
        app.update(u_time);
        requestAnimationFrame(animate);
    });
});
