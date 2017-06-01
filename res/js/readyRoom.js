const connection = require('./network.js');
const $ = require("jquery");

let id;
let selectedRPS;
let RPSstate = 2;
let roomId;

const init = (userId, roomNum) => {
    id = userId;
    roomId = roomNum;

    $(".my-user-info .fight-div").on("click", function() {
        $(this).toggleClass("selected");
        if (selectedRPS != undefined) {
            selectedRPS.toggleClass("selected");
            selectedRPS = $(this);
        } else {
            selectedRPS = $(this);
        }

        if ($(this).index() === 0) {
            RPSstate = 2;
        } else if ($(this).index() === 1) {
            RPSstate = 0;
        } else {
            RPSstate = 5;
        }
    });
}

const getRoomInfo = (roomId) => {
    console.log("getRoomInfo")
    let jsonSendData = {
        type: "getRoomInfo",
        "room_id": roomId
    }
    connection.sendJson(jsonSendData);
}

const fillUserCard = () => {
    $(".user-name").eq(0).text(id);
    $(".user-div").eq(1).hide();
}

const fillEnemyCard = (data) => {
    console.log("enemy card");
    $(".user-div").eq(1).show();
    $(".user-name").eq(1).text(data);
}

const sendRPS = () => {
    console.log("sendRPS");
    let sendJson = {
        type: "startRPS",
        "room_id": roomId,
        id: id,
        RPS: RPSstate
    };
    connection.sendJson(sendJson);
}

const renderWinner = (data) => {
    if(data) {
        $(".my-user-info").after('<h1>선공</h1>');
    } else {
        $(".enemy-user-info").after('<h1>선공</h1>');
    }
}

const startCountDown = (data) => {
    setTimeout(sendRPS, 10000);
    $('.count').text(10)
    $('.second-count').text(10)
    let count = 8

    let intervalID = null

    let countDown = () => {
        if (count >= 0) {
            $('.count').addClass('enlarge')
            $('.second-count').addClass('enlarge')
            setTimeout(() => {
                let currentCount = count--
                    $('.count').removeClass('enlarge')
                $('.second-count').removeClass('enlarge')
                if (currentCount >= 0) {
                    $('.count').text(currentCount)
                    $('.second-count').text(currentCount)
                }
            }, 1700);
        } else {
            clearInterval(intervalID)
        }
    }
    intervalId = setInterval(countDown, 1000)
}

const callbacks = {
    getRoomInfo: (res) => {

    },
    test: (res) => {
        console.log(res);
    },
    startGame: (res) => {
        if (res.status == "200") {
            fillEnemyCard(res.enemy);
            startCountDown();
        }
    },
    setWinner: (res) => {
        if(res.status == "200") {

        }
    },
    enterGame: (res) => {
        if(res.status == "200") {
            $(".readyRoom-container").toggle("slide");
            $(".game-container").toggle("slide");
        }
    }
}

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.getRoomInfo = getRoomInfo;
module.exports.fillUserCard = fillUserCard;
