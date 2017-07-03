class Ball {
    constructor(color, ballRadius) {
        this.state = {
            position: {
                x: 0,
                y: 0
            },
            effect: 0
        }

        this.radius = ballRadius;
        this.color = color;
    }

    update(data) {
        this.state = data;
    }

    render(ctx) {
        ctx.save();
        if (this.state.effect == 0) {
            ctx.fillStyle = "white";

        } else if (this.state.effect == 1) {
            ctx.fillStyle = "red";
        } else if (this.state.effect == 2) {
            ctx.fillStyle = "rgba(255, 119, 119, 0.01)";
        } else if (this.state.effect == 3) {
            ctx.fillStyle = "greeen";
        } else if (this.state.effect == 4) {
            ctx.fillStyle = "yellow";

        }

        if (this.state.effect == 4) {
            let direction = Math.random() < 0.5 ? -1 : 1;
            ctx.beginPath();
            ctx.arc(this.state.position.x - (Math.random() * 50 * direction), this.state.position.y - (Math.random() * 50 * direction), this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.state.position.x - (Math.random() * 50 * direction), this.state.position.y - (Math.random() * 50 * direction), this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.state.position.x, this.state.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

module.exports.Ball = Ball;
