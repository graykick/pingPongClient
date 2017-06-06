const connection = require('./network.js');
const $ = require("jquery");
const readyRoom = require('./readyRoom.js');

let id;
let roomId;

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

    $(".roomList-table").on("dblclick", "tr", function() {
        console.log("2 click");
        console.log($(this));
        console.log($(this).children("td").eq(0).text());
        roomId = Number($(this).children("td").eq(0).text());

        let jsonSendData = {
            type: "enterRoom",
            "room_id": Number($(this).children("td").eq(0).text()),
            id: id
        }
        connection.sendJson(jsonSendData);
    });
}

const getRoomList = () => {
    let jsonSendData = {
        type: "getRoomList"
    }
    connection.sendJson(jsonSendData);
}

const fillRooms = (data) => {
    console.log(data[0]);
    for (let i = 0; i < data.length; i++) {
        let newTr = `<tr><td>${data[i]['room_id']}</td><td>${data[i].title}</td><td>${data[i].userList}</td></tr>`;
        $(".roomList-table").append(newTr);
    }
}

const enterRoom = (no) => {
    readyRoom.init(id, no);
    let jsonSendData = {
        type: "enterRoom",
        id: id,
        "room_id": no
    }
    connection.sendJson(jsonSendData);
}

const callbacks = {
    enterRoom: (res) => {
        $(".room-container").toggle("slide");
        $(".readyRoom-container").toggle("slide");

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
            fillRooms(res.roomList);
        }
    }
}

connection.addCallbacks(callbacks);

module.exports.init = init;
module.exports.getRoomList = getRoomList;
module.exports.fillRooms = fillRooms;
module.exports.enterRoom = enterRoom;
