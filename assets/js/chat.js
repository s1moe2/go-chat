$(() => {
    let socket = null;

    $("#chatbox").submit(() => {
        const msgBox = $("#chatbox textarea");

        if (!msgBox.val()) return false;
        if (!socket) {
            alert("Error: There is no socket connection.");
            return false;
        }

        socket.send(msgBox.val());
        msgBox.val("");
        
        return false;
    });

    if (!window["WebSocket"]) {
        alert("Error: Your browser does not support web sockets.")
        return false;
    }

    socket = new WebSocket("ws://{{.Host}}/room");
    socket.onclose = () => alert("Connection has been closed.");
    socket.onmessage = (e) => $("#messages").append($("<li>").text(e.data));
});