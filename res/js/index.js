const connection = require('./Network');
console.log(connection);

const $ = require("jquery");
const mainWindow = require('electron').remote.getCurrentWindow();

let id;

const callbacks = {
    login: (res) => {
        console.log(res);
        if (res.status == "200") {
            $(".login-container").toggle("slide");
            $(".room-container").toggle("slide");
            id = $("#login-id").val();
            roomListLoad();
        }
    },
    register: (res) => {
        console.log(res)
        if (res.status == "200") {
            $(".login-form").toggle("slide");
            $(".register-form").toggle("slide");
        }
    },
    getRoomList: (res) => {
        console.log(res)
        if (res.status == "200") {
            getRoomList();
        }
    },
    enterRoom: (res) => {
        $(".room-container").toggle("slide");
        $(".readyRoom-container").toggle("slide");

        if (res.status == "200") {
            getRoomInfo(res["room_id"]);
        }
    },
    createRoom: (res) => {
        if (res.status == "200") {
            console.log("getRoomList");
            enterRoom(res.no);
        }
    },
    getRoomList: (res) => {
        if (res.status == "200") {
            fillRooms(res.roomList);
        }
    },
    getRoomInfo: (res) => {
        if (res.status == "200") {
            fillUserCard(res.roomList);
        }
    }
};

connection.addCallbacks(callbacks);

mainWindow.onbeforeunload = function(e) {
    alert("close");
    let jsonSendData = {
        type: "logout",
        id: $("#login-id").val()
    }
    connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
};

(function() {
    $(".login-container").toggle("slide");

    $(".login-form a").on("click", function() {
        $(".login-form").toggle("slide");
        $(".register-form").toggle("slide");
    });

    $(".register-form a").on("click", function() {
        $(".login-form").toggle("slide");
        $(".register-form").toggle("slide");
    });

    $("#login-btn").on("click", function() {
        let jsonSendData = {
            type: "login",
            id: $("#login-id").val(),
            password: $("#login-password").val()
        }
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });

    $("#register-btn").on("click", function() {
        let jsonSendData = {
            type: "register",
            id: $("#register-id").val(),
            password: $("#register-password").val(),
            username: $("#register-username").val()
        }
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });
})();

function roomListLoad() {
    console.log("create room1");

    $("#createRoom-btn").on("click", function() {
        let jsonSendData = {
            type: "createRoom",
            id: id,
            title: $("#room-title").val()
        }
        console.log("create room2");
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });

    $(".roomList-table tr").on("dblclick", "tr", function() {
        let jsonSendData = {
            type: "enterRoom",
            no: $(this).children("td").eq(0).val()
        }
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });
}
``

function getRoomList() {
    let jsonSendData = {
        type: "getRoomList"
    }
    connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
}

function fillRooms(data) {
    console.log(data[0]);
    for (let i = 0; i < data.length; i++) {
        let newTr = `<tr><td>${data[i]['room_id']}</td><td>${data[i].title}</td><td>${data[i].userList}</td></tr>`;
        $(".roomList-table").append(newTr);
    }
}

function enterRoom(no) {
    let jsonSendData = {
        type: "enterRoom",
        id: id,
        "room_id": no
    }
    connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
}

function getRoomInfo(roomId) {
    let jsonSendData = {
        type: "getRoomInfo",
        "room_id": roomId
    }
    connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
}

function fillUserCard(data) {
    $(".user-name").eq(0).text(id);
    if (data.user == "") {
        $(".user-div").eq(1).hide();
    } else {
        $(".user-name").eq(1).text(data.user);
    }
}
