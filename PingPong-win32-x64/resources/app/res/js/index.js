const connection = require('./network.js');

console.log(connection);

const $ = require("jquery");
const mainWindow = require('electron').remote.getCurrentWindow();
const roomList = require('./roomList.js');

let id;

const callbacks = {
    login: (res) => {
        console.log(res);
        if (res.status == "200") {
            $(".login-container").toggle("slide");
            $(".room-container").toggle("slide");
            id = $("#login-id").val();
            roomList.init(id);
            roomList.getRoomList();
        }
    },
    register: (res) => {
        console.log(res)
        if (res.status == "200") {
            $(".login-form").toggle("slide");
            $(".register-form").toggle("slide");
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
    connection.sendJson(jsonSendData);
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
        connection.sendJson(jsonSendData);
    });

    $("#register-btn").on("click", function() {
        let jsonSendData = {
            type: "register",
            id: $("#register-id").val(),
            password: $("#register-password").val(),
            username: $("#register-username").val()
        }
        connection.sendJson(jsonSendData);
    });
})();
