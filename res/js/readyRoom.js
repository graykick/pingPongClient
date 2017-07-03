const connection = require('./network.js');
const $ = require("jquery");
const inGame = require("./inGame.js");

let id;
let selectedRPS;
let RPSstate = 2;
let roomId;
let isEnter = false;
let isAI = false;
let AIName;

const init = (userId, roomNum, AIId) => {
    AIName = AIId;
    id = userId;
    roomId = roomNum;
    console.info("readyRoom inin!!!!!!!!!!!!!!!!!11  = " + id + ", " + roomId);
};

const getRoomInfo = (roomId) => {
    console.log("getRoomInfo")
    let jsonSendData = {
        type: "getRoomInfo",
        "room_id": roomId
    }
    connection.sendJson(jsonSendData);
};

const fillUser = (names) => {
    for (let i = 0; i < names.length; i++) {
        $(`.user-name`).eq(i).text(names[i]);
    }
};

const callbacks = {
    getRoomInfo: (res) => {

    },
    startGame: (res) => {
        if (res.status == "200") {
            if (res.userList.length < 3) {
                isAI = true;
            }
        }
    },
    setWinner: (res) => {
        if (res.status == "200") {}
    },
    enterGame: (res) => {
        if (res.status == "200") {
            console.info("enterGame !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");

            $(".readyRoom-container").toggle("slide");
            $(".game-container").toggle("slide");
            inGame.setInfo(roomId, id);

            let rotationDeg;
            if (res.direction == 0) {
                rotationDeg = 180;
            } else if (res.direction == 1) {
                rotationDeg = 90;
            } else if (res.direction == 2) {
                rotationDeg = 0;
            } else if (res.direction == 3) {
                rotationDeg = -90;
            }

            let mapSize = {
                width: res.mapWidth,
                height: res.mapHeight
            }
            let barSize = {
                width: res.barWidth,
                height: res.barHeight
            }
            inGame.init(mapSize, rotationDeg, barSize, res.blackHallRadius, res.ballRadius, isAI, AIName);
        }
    }
};

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.getRoomInfo = getRoomInfo;
module.exports.fillUser = fillUser;
module.exports.isEnter = isEnter;
