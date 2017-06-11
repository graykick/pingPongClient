const connection = require('./network.js');
const $ = require("jquery");
const readyRoom = require('./readyRoom.js');

let id;
let roomId;
let getRoomListInterval;
let gameNo;
let AIName;

const getRoomList = () => {
    let jsonSendData = {
        type: "getRoomList"
    }
    connection.sendJson(jsonSendData);
}

const enterRoom = (no) => {
    readyRoom.init(id, no, AIName);
    console.info("enter room req" + id + ", " + no);
    let jsonSendData = {
        type: "enterRoom",
        id: id,
        "room_id": no
    }
    connection.sendJson(jsonSendData);
}

const init = (userId) => {
    console.log("create room1");

    id = userId;

    $("#createRoom-btn").on("click", function() {
        let jsonSendData = {
            type: "createRoom",
            id: id,
            title: $("#room-title").val()
        }
        connection.sendJson(jsonSendData);
    });

    $("#quick-game-btn").on("click", function() {
        console.log(gameNo);
        if (gameNo == undefined) {
            return;
        }
        enterRoom(gameNo['room_id']);
    })

    $("#ai-game-btn").on("click", function() {
        let jsonSendData = {
            type: "startAI",
            id: id
        };
        connection.sendJson(jsonSendData);
    })

    $(".roomList-table").on("dblclick", "tr", function() {
        console.log("2 click");
        console.log($(this));
        console.log($(this).children("td").eq(0).text());
        roomId = Number($(this).children("td").eq(0).text());

        enterRoom(Number($(this).children("td").eq(0).text()));

        // let jsonSendData = {
        //     type: "enterRoom",
        //     "room_id": Number($(this).children("td").eq(0).text()),
        //     id: id
        // }
        // connection.sendJson(jsonSendData);
    });

    getRoomListInterval = setInterval(getRoomList, 3000);
}

function setGetRoomListInterval() {
    getRoomListInterval = setInterval(getRoomList, 3000);

}

const fillRooms = (data) => {
    console.log(data[0]);
    for (let i = 0; i < data.length; i++) {
        let newTr = `<tr><td>${data[i]['room_id']}</td><td>${data[i].title}</td><td>${data[i].userList}</td></tr>`;
        $(".roomList-table").append(newTr);
    }
}

const cleanRooms = () => {
    $(".roomList-table").html(`<tr>
        <th>방 번호</th>
        <th>방 제목</th>
        <th>개설자</th>
    </tr>`);
}

const quickGameFind = (data) => {
    let filteredArr = data.filter(function(data) {
        return !data['isPlaying'];
    })

    if (filteredArr.length > 0) {
        gameNo = filteredArr[0];
        for (let i = 1; i < data.length; i++) {
            if (gameNo['user'].length < filteredArr[i]['user'].length) {
                gameNo = filteredArr[i];
            }
        }
    }
}



const callbacks = {
    enterRoom: (res) => {
        if (!readyRoom.isEnter) {
            $(".room-container").toggle("slide");
            $(".readyRoom-container").toggle("slide");
            readyRoom.isEnter = true;
        }
        clearInterval(getRoomListInterval);
        if (res.status == "200" || res.status == "201") {
            // readyRoom.getRoomInfo(res["room_id"]);
            readyRoom.fillUser(res.userList);
        }
    },
    createRoom: (res) => {
        if (res.status == "200") {
            enterRoom(res.no);
        }
    },
    getRoomList: (res) => {
        if (res.status == "200") {
            cleanRooms();
            fillRooms(res.roomList);
            quickGameFind(res.roomList);
        }
    },
    startAI: (res) => {
        if (res.status == "200") {
            AIName = res.aiName
            enterRoom(res['room_id']);
            let jsonSendData = {
                type: "enterRoom",
                id: res.aiName,
                "room_id": res['room_id']
            }
            connection.sendJson(jsonSendData);
        }
    }
}

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.getRoomList = getRoomList;
module.exports.fillRooms = fillRooms;
module.exports.enterRoom = enterRoom;
module.exports.setGetRoomListInterval = setGetRoomListInterval;
