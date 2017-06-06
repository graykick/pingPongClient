class Ball {
    constructor(color) {
        this.state = {
            position: {
                x: 0,
                y: 0
            },
            effect: ""
        }

        this.radius = 5;
        this.color = color;
    }

    update(data) {
        this.state = data;
    }

    render(ctx) {
        ctx.save();
        if(this.state.effect == "effect") {
            ctx.restore();
            return;
        }

        ctx.beginPath();
        ctx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

module.exports.Ball = Ball;
