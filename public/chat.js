$(function(){
    if (!window.WebSocket) {
        alert("No WebSocket!")
        return
    }

    var $opponent = $('#opponent-id')
    var $chatmsg = $('#chat-msg')

    connect = function() {
        ws = new WebSocket("ws://" + window.location.host + "/ws");
        ws.onopen = function(e) {
            console.log("onopen", arguments);
            ws.send(Json.stringify({
                type : "register",
                userid : $opponent.val()
            }));
        };
        ws.onclose = function(e) {
            console.log("onclose", arguments);
        };
        ws.onmessage = function(e) {
            $("#msgarea").prepend("\n" + JSON.parse(e.data).data )
        };
    }

    connect();


    var isBlank = function(string) {
        return string == null || string.trim() === "";
    };
    var username;
    while (isBlank(username)) {
        username = prompt("What's your name?");
        if (!isBlank(username)) {
            $('#user-name').html('<b>' + username + '</b>');
        }
    }

    $('#input-form').on('submit', function(e){
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
                type: "msg",
                user: username,
                data: $chatmsg.val()
            }));
        }
        $chatmsg.val("");
        $chatmsg.focus();
        return false;
    });

})