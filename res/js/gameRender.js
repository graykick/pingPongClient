const $ = require("jquery");
const ball = require("./ball.js");
const user = require("./user.js");
const blackHole = require("./blackHole.js");

const Ball = ball.Ball;
const User = user.User;
const BlackHole = blackHole.BlackHole;



class Game {
    constructor(canvasId, defaultMapSize, userRotationDeg, barSize, blackHallRadius, ballRadius) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(100, 100, 50, 50);

        this.scale = {
            x: 1,
            y: 1
        };

        this.mapSize = {
            width: defaultMapSize.width,
            height: defaultMapSize.height
        };

        // this.calculScale();

        this.userRotationDeg = userRotationDeg;
        this.setRotation();

        this.ball = new Ball();
        this.players = [];
        this.gameObjects = {
            ball: new Ball("yellow", ballRadius),
            user1: new User("red", {
                width: barSize.width,
                height: barSize.height
            }),
            user2: new User("blue", {
                height: barSize.width,
                width: barSize.height
            }),
            user3: new User("green", {
                width: barSize.width,
                height: barSize.height
            }),
            user4: new User("pink", {
                height: barSize.width,
                width: barSize.height
            }),
            blackHole: new BlackHole({
                x: this.mapSize.width / 2,
                y: this.mapSize.height / 2
            }, blackHallRadius)
        }
        this.render = this.render.bind(this);
        this.gameObjectUpdate = this.gameObjectUpdate.bind(this);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clearCanvas();
        this.gameObjects.ball.render(this.ctx);
        this.gameObjects.user1.render(this.ctx);
        this.gameObjects.user2.render(this.ctx);
        this.gameObjects.user3.render(this.ctx);
        this.gameObjects.user4.render(this.ctx);
        this.gameObjects.blackHole.render(this.ctx);
    }

    calculScale() {
        let criterion = Math.min(screen.width, screen.height);
        this.scale = criterion / this.mapSize.width;
        this.ctx.scale(criterion, criterion);
    }

    setRotation() {
        $(this.canvas).css({
            transform: `translateY(-50%) translateX(-50%) rotate(${this.userRotationDeg}deg) `
        })
    }

    gameObjectUpdate(data) {
        const ballState = {
            position: {
                x: data.Ball.x,
                y: data.Ball.y
            },
            effect: data.Ball.effect
        }
        this.gameObjects.ball.update(ballState);
        for (let i = 0; i < data.userList.length; i++) {
            let state = {
                position: {
                    x: data.userList[i].barPositionX,
                    y: data.userList[i].barPositionY
                }
            }
            this.gameObjects[`user${i + 1}`].update(state);
        }
        this.gameObjects.blackHole.update({
            isShow: data.isBlackHoleRender
        });
        // this.gameObjects.user1.update(data.user1);
        // this.gameObjects.user2.update(data.user2);
        // this.gameObjects.user3.update(data.user3);
        // this.gameObjects.user4.update(data.user4);
    }
}
class AIGame {
    constructor(canvasId, defaultMapSize, userRotationDeg, barSize, blackHallRadius, ballRadius) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(100, 100, 50, 50);

        this.scale = {
            x: 1,
            y: 1
        };

        this.mapSize = {
            width: defaultMapSize.width,
            height: defaultMapSize.height
        };

        // this.calculScale();

        this.userRotationDeg = userRotationDeg;
        this.setRotation();

        this.ball = new Ball();
        this.players = [];
        this.gameObjects = {
            ball: new Ball("yellow", ballRadius),
            user1: new User("red", {
                width: barSize.width,
                height: barSize.height
            }),
            user2: new User("blue", {
                width: barSize.width,
                height: barSize.height
            }),
            blackHole: new BlackHole({
                x: this.mapSize.width / 2,
                y: this.mapSize.height / 2
            }, blackHallRadius)
        }
        this.render = this.render.bind(this);
        this.gameObjectUpdate = this.gameObjectUpdate.bind(this);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clearCanvas();
        this.gameObjects.ball.render(this.ctx);
        this.gameObjects.user1.render(this.ctx);
        this.gameObjects.user2.render(this.ctx);
        this.gameObjects.blackHole.render(this.ctx);
    }

    calculScale() {
        let criterion = Math.min(screen.width, screen.height);
        this.scale = criterion / this.mapSize.width;
        this.ctx.scale(criterion, criterion);
    }

    setRotation() {
        $(this.canvas).css({
            // border: "1px solid white",
            // position: "relative",
            // height: "760px",
            // width: "760px",
            // top: "50%",
            // left: "50%",
            transform: `translateY(-50%) translateX(-50%) rotate(${this.userRotationDeg}deg)`
        })
    }

    gameObjectUpdate(data) {
        const ballState = {
            position: {
                x: data.Ball.x,
                y: data.Ball.y
            },
            effect: data.Ball.effect
        }
        this.gameObjects.ball.update(ballState);
        for (let i = 0; i < data.userList.length; i++) {
            let state = {
                position: {
                    x: data.userList[i].barPositionX,
                    y: data.userList[i].barPositionY
                }
            }
            this.gameObjects[`user${i + 1}`].update(state);
        }
        this.gameObjects.blackHole.update({
            isShow: data.isBlackHoleRender
        });
        // this.gameObjects.user1.update(data.user1);
        // this.gameObjects.user2.update(data.user2);
        // this.gameObjects.user3.update(data.user3);
        // this.gameObjects.user4.update(data.user4);
    }
}

module.exports.Game = Game;
module.exports.AIGame = AIGame;
