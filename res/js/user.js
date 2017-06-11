class User {
    constructor(color, barSize) {
        this.state = {
            position: {
                x: 0,
                y: 0
            }
        }
        this.size = {
            width: barSize.width,
            height: barSize.height
        };
        this.color = color;
    }

    update(data) {
        this.state = data;
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.state.position.x - this.size.width, this.state.position.y - this.size.height, this.size.width * 2, this.size.height * 2);
        ctx.restore();
    }
}

module.exports.User = User;
