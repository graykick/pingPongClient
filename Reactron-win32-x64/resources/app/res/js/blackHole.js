class BlackHole {
    constructor(center, radius) {
        this.state = {
            isShow: false
        }
        this.size = radius
        this.position = {
            x: center.x,
            y: center.y
        }
        this.img = new Image();
        // this.setImage();

        // this.update = this.update.bind(this);
    }

    update(data) {
        this.state = data;
    }

    setImage() {
        // this.img.src = "./res/image/blackHole.gif";
        this.img = document.getElementById("blackHole");
    }

    render(ctx) {
        console.info(this.state);
        console.info(this.size);
        console.info(this.position);
        console.info(this.img);
        if (this.state.isShow) {
            ctx.save();
            // ctx.drawImage(this.img, this.position.x - this.size, this.position.y - this.size, this.size * 2, this.size * 2)
            ctx.fillStyle = "green";
            ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }
}

module.exports.BlackHole = BlackHole;
