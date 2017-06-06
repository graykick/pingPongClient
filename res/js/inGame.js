const $ = require("jquery");
const connection = require('./network.js');
const gameRender = require('./network.js');


let roomId;
let id;
let game;
let gameInterval;
let inputInterval;
let moveState = {
    left: false,
    right: false
}

let moveDirection = "";

const setInfo = (roomNo, userId) => {
    roomId = roomNo;
    id = id;
}

const init = (mapSize, rotateDeg) => {
    game = gameRender.Game("canvas", mapSize);

    $(game.canvas).keydown((event) => {
        if (event.which == 37) {
            moveState.left = true;
        } else if (event.which == 39) {
            moveState.right = true;
        }
    });

    $(game.canvas).keyup((event) => {
        if (event.which == 37) {
            moveState.left = false;

        } else if (event.which == 39) {
            moveState.right = false;
        }
    });

    gameInterval = setInterval(game.render, 10);
    inputInterval = setInterval(userInput, 10);

}

const userInput = () => {
    let direction;
    if(moveState.left && moveState.right) {
        return;
    }

    if(!moveState.left && !moveState.right) {
        return;
    }

    direction = moveState.left ? -1 : 1;

    let sendJson = {
        "room_id": roomId,
        id: id,
        direction: direction
    };
    connection.sendJson(sendJson);
}

const getGameInfo = () => {
    let sendJson = {
        type: "getGameInfo",
        roomId: roomId
    }
    connection.sendJson(sendJson);
}

const callbacks = {
    getGameInfo: (res) => {
        if (res.status == "200") {
            let rotationDeg = res.userPosition * 90;
            init(res.mapSize, rotationDeg);
        }
    },
    gameInfo: (res) => {
        if (res.status == "200") {
            game.gameObjectUpage(res);
        }
    }
}

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.setInfo = setInfo;
