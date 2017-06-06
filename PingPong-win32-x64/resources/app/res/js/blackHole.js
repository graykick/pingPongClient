class BlackHole {
    constructor() {
        this.state = {
            isShow: false
        }
        this.img = new Image();
        this.setImage();
    }

    update(data) {
        this.state = data;
    }

    setImage() {
        this.img.src = "./res/image/blackHole.gif";
    }

    render(ctx) {
        if (this.state.isShow) {
            ctx.save();
            ctx.drawImage()
            ctx.restore();
        }
    }
}

module.exports.BlackHole = BlackHole; 
