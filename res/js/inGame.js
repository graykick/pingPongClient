const $ = require("jquery");
const connection = require('./network.js');
const gameRender = require('./gameRender.js');
const roomList = require('./roomList.js');



let roomId;
let id;
let game;
let gameInterval;
let inputInterval;
let AIInterval;
let AIName;
let moveState = {
    left: false,
    right: false
}

let AImoveDirection = 0;

let moveDirection = "";

const setInfo = (roomNo, userId) => {
    roomId = roomNo;
    id = userId;
    console.info("setInfo inin!!!!!!!!!!!!!!!!!11  = " + id + ", " + roomId);
}

let gameDataBuffer = [];


function userInput() {
    console.info("move state = " + moveState.left + ", " + moveState.right);

    let direction;
    if (moveState.left && moveState.right) {
        return;
    }

    if (!moveState.left && !moveState.right) {
        return;
    }

    direction = moveState.left ? -3 : 3;

    console.info("id = " + id);

    let sendJson = {
        "room_id": roomId,
        id: id,
        barMoving: direction,
        type: "setBarPosition"
    };
    connection.sendJson(sendJson);
}

function gameInfoUpdate() {
    if (gameDataBuffer.length > 0) {
        const gameData = gameDataBuffer.shift();
        console.warn(gameDataBuffer.length);
        game.gameObjectUpdate(gameData);
        AIInfo(gameData);
        game.render();
    }
    // window.requestAnimationFrame(gameInfoUpdate);
}

function AIInfo(gameDataBuffer) {
    console.info("AIINFO !!!!!!!!!!!!!!!!!!!!!!!!");
    console.info("Ball X = " + gameDataBuffer.Ball.x + ", " + gameDataBuffer.userList[1].barPositionX);
    if (gameDataBuffer.Ball.x > gameDataBuffer.userList[1].barPositionX) {
        AImoveDirection = 3;
        console.info("AIINFO 11111 !!!!!!!!!!!!!!!!!!!!!!!!");

    } else if (gameDataBuffer.Ball.x < gameDataBuffer.userList[1].barPositionX) {
        console.info("AIINFO 22222 !!!!!!!!!!!!!!!!!!!!!!!!");
        AImoveDirection = -3;
    }

}

function sendAIInfo() {

    let sendJson = {
        "room_id": roomId,
        id: AIName,
        barMoving: AImoveDirection,
        type: "setBarPosition"
    };
    connection.sendJson(sendJson);
}

const init = (mapSize, rotateDeg, barSize, blackHoleRadius, ballRadius, isAI, AIId) => {
    console.info("inGmae init");
    if (isAI) {
        console.info("in AI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");

        AIName = AIId;
        game = new gameRender.AIGame("canvas", mapSize, rotateDeg, barSize, blackHoleRadius, ballRadius);
        AIInterval = setInterval(sendAIInfo, 30);
    } else {
        game = new gameRender.Game("canvas", mapSize, rotateDeg, barSize, blackHoleRadius, ballRadius);
    }

    let newCallbacks = {
        sendGameInfo: (res) => {
            // console.info(gameDataBuffer.length);
            gameDataBuffer.push(res);
            // game.gameObjectUpdate(res);
        }
    };
    connection.addCallbacks(newCallbacks);

    $('body').on('keydown', (e) => {
        console.info("key down");
        if (e.which == 37) {
            moveState.left = true;
        } else if (e.which == 39) {
            moveState.right = true;
        }
    });

    $('body').on('keyup', () => {
        console.info("key up");
        if (event.which == 37) {
            moveState.left = false;

        } else if (event.which == 39) {
            moveState.right = false;
        }
    });

    // $(".game-container").keyup((event) => {
    //     console.info("key up");
    //     if (event.which == 37) {
    //         moveState.left = false;
    //
    //     } else if (event.which == 39) {
    //         moveState.right = false;
    //     }
    // });

    console.info($(".game-container"));

    // window.requestAnimationFrame(gameInfoUpdate);
    gameInterval = setInterval(gameInfoUpdate, 29);
    inputInterval = setInterval(userInput, 30);
}

const getGameInfo = () => {
    let sendJson = {
        type: "getGameInfo",
        roomId: roomId
    }
    connection.sendJson(sendJson);
};

const callbacks = {
    endGame: (res) => {
        alert("Loser : " + res.loser);
        $(".room-container").toggle("slide");
        $(".game-container").toggle("slide");
        roomList.setGetRoomListInterval();
    }
};

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.setInfo = setInfo;
