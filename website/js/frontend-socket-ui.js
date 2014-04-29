
$(function()
{
    $(document).keyup(function(){
        checkLength($('#textInput').val());
    });

    $(document).ready(function() {
        $("#submitButton").click(function(event){
            var len = $('#textInput').val().length;
            if(100 < len && len < 6000){
                document.getElementById('progressDiv').style.visibility = 'visible';
                document.getElementById('inputDiv').style.display = 'none';
                submitText(event);
            }
        });
    });

    var id;
    var pkey;

    var socket = io.connect();
    $('#text-form').submit(function (e) {
        submitText(e);
    });

    function checkLength(inputText){
        if(inputText.length < 100){
            //border red + text to short
            $("#lengthCheck").text("Es wurde noch nicht genug Text eingegeben, um eine aussagekräftige Analyse bereit zu stellen.");
            document.getElementById("lengthCheck").style.border="thick solid #CA3C3C";
        }else if(inputText.length < 6000){
            //border green + text has right length
            $("#lengthCheck").text("Der eingegeben Text entspricht den Vorgaben.");
            document.getElementById("lengthCheck").style.border="thick solid #1CB841";
        }else {
            //border red + text to long
            $("#lengthCheck").text("Der eingegeben Text ist zu lang.");
            document.getElementById("lengthCheck").style.border="thick solid #CA3C3C";
        }
    }

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
	var l = 0;

        for (var i = 0; i < data.length; i++) {
            text += '<span class="user">' + data[i].toString() + '</span>';
            if(data[i]==false)
            {
                redirect = false;
            } 
	    else
 	    {
		console.log(document.getElementById('p'+i.toString()).src.toString);
		if(!document.getElementById('p'+i.toString()).src.toString().contains("X4.gif")
			&&!document.getElementById('p'+i.toString()).src.toString().contains("haekchen.png"))
		{
			$('#p'+ i.toString()).attr('src','X4.gif');
			if(i==data.length-1)
			{
			    $('#p'+ (i+1).toString()).attr('src','X4.gif');
			}
		}else $('#p'+ i.toString()).attr('src','haekchen.png');
	    }
        }	
	
        if (redirect == true)
        {
            setTimeout(function() {
                var url = "/result?id=" + id + '&&pkey='+pkey ;

               	$(location).attr('href',url);
            }, 2000);

        }
        $('#progress').html(text);
    });
});