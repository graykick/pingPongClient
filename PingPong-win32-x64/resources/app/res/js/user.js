class User {
    constructor(color) {
        this.state = {
            position: {
                x: 0,
                y: 0
            }
        }

        this.size = {
            width: 20,
            height: 0
        };
        this.color = color;
    }

    update(data) {
        this.state = data;
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2);
        ctx.restore();
    }
}

module.exports.User = User;
