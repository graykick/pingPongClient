const $ = require("jquery");
const connection = require('./network.js');
const gameRender = require('./gameRender.js');


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
        game.gameObjectUpdate(gameDataBuffer.shift());
        game.render();
    }
    // window.requestAnimationFrame(gameInfoUpdate);
}

const init = (mapSize, rotateDeg, barSize, blackHoleRadius, ballRadius) => {
    console.info("inGmae init");
    game = new gameRender.Game("canvas", mapSize, rotateDeg, barSize, blackHoleRadius, ballRadius);

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
    gameInterval = setInterval(gameInfoUpdate, 30);
    inputInterval = setInterval(userInput, 10);
}

const getGameInfo = () => {
    let sendJson = {
        type: "getGameInfo",
        roomId: roomId
    }
    connection.sendJson(sendJson);
};

// const callbacks = {
//     getGameInfo: (res) => {
//         if (res.status == "200") {
//             let rotationDeg = res.userPosition * 90;
//             init(res.mapSize, rotationDeg);
//         }
//     },
//     sendGameInfo: (res) => {
//         console.log("sendGameInfo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//
//     }
// };
//
// connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.setInfo = setInfo;
