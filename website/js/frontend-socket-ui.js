

$(function()
{
    $(document).ready(function() {
        $("#submitButton").click(function(event){
            console.log('click');
            submitText(event)
        });
    });

    var id;
    var pkey;

    var socket = io.connect();
    $('#text-form').submit(function (e) {
        submitText(e);
    });

    function submitText(e)
    {
        e.preventDefault();
        var nText = ' ';
        nText += $('#textInput').val();

        socket.emit('newText', nText, function (data) {
            if (data) {
                console.log(data.id);
                console.log(data.pkey);
                id = data.id;
                pkey = data.pkey;
            }
        });
    }



    socket.on('progress', function (data) {
        var text = '';
        var redirect = true;

        for (var i = 0; i < data.length; i++) {
            text += '<span class="user">' + data[i].toString() + '</span>';
            if(data[i]==false)
            {
                redirect = false;
            }
            else if(data[i]==true)
            {
                $('#p'+ i.toString()).attr('src','haekchen.png');
            }
        }
        if (redirect == true)
        {
            //var url = "www.localhost.de/result?id=" + id + '&&pkey='+pkey ;
            var url = "/result?id=" + id + '&&pkey='+pkey ;

            $(location).attr('href',url);
        }
        $('#progress').html(text);
    });
});