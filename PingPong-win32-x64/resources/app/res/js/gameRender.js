const $ = require("jquery");
const Ball = require("./ball.js");
const User = require("./user.js");
const BlackHole = require("./blackHole.js");



class Game {
    constructor(canvasId, defaultMapSize, userRotationDeg) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.scale = {
            x: 1,
            y: 1
        };

        this.mapSize = {
            width: defaultMapSize.width,
            hieght: defaultMapSize.height
        };
        this.calculScale();

        this.userRotationDeg = userRotationDeg;
        this.setRotation();

        this.ball = new Ball();
        this.players = [];
        this.gameObjects = {
            ball: new Ball("yellow"),
            user1: new User("red"),
            user2: new User("blue"),
            user3: new User("green"),
            user4: new User("pink"),
            blackHole: new blackHole()
        }
    }

    render() {
        this.clearCanvas();
        Object.keys(this.gameObjects).map(function(objectKey, index) {
            var value = object[objectKey];
            value.render();
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    calculScale() {
        let criterion = Math.min(screen.width, screen.height);
        this.scale = criterion / this.mapSize.width;
        this.ctx.scale(criterion, criterion);
    }

    setRotation() {
        $(this.canvas).css({
            transform: `rotate(${this.userRotationDeg}deg)`
        })
    }

    gameObjectUpdate(data) {
        this.gameObjects.ball.update(data.ball)
        this.gameObjects.user1.update(data.user1);
        this.gameObjects.user2.update(data.user2);
        this.gameObjects.user3.update(data.user3);
        this.gameObjects.user4.update(data.user4);

    }
}
