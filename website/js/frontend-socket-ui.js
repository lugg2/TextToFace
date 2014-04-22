$(function() {
    var socket = io.connect();
    $('#text-form').submit(function (e) {
        e.preventDefault();
        var nText = $('#textInput').val();
        socket.emit('newText', nText, function (data) {
            if (data) {
                console.log(data.id);
                console.log(data.pKey);
            }
        });


    });
    socket.on('progress', function (data) {
        var text = '';

        for (var i = 0; i < data.length; i++) {
            text += '<span class="user">' + data[i].toString() + '</span>';
        }

        $('#progress').html(text);
    });
});