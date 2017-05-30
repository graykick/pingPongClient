(function() {
    $("#createRoom-btn").on("click", function() {
        let jsonSendData = {
            type: "createRoom",
            id: id,
            title: $("#room-title").val()
        }
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });

    $(".roomList-table tr").on("dblclick", "tr", function() {
        let jsonSendData = {
            type: "enterRoom",
            no: $(this).children("td").eq(0).val()
        }
        connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
    });
})();

function roomListLoad() {
    let jsonSendData = {
        type: "getRoomList"
    }
    connection.connection.write(JSON.stringify(jsonSendData) + '\r\n');
}

function fillRooms(data) {
    for (let i = 0; i < data.length; i++) {
        let newTr = `<tr><td>${data[i][room_id]}</td><td>${data[i].title}</td><td>${data[i].userList}</td></tr>`;
        $(".roomList-table").append(newTr);
    }
}
