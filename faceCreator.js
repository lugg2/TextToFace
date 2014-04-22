//Support: Patrick
//Use: The image of the face is created
//Requirements: A valid objFace has to be passed


//required libraries
var invoke = require("invoke");
var images = require("node-images");

//constants depending on the x and y scale of the face part images
var imageWidth = 1754;
var imageHeight = 2480;




function faceCreator(objFace, callbackFinish){

    function loadImage(name){
        if(objFace[name] != null) {
            try{
                objFace[name] = images(__dirname + '/TextToFaceBilder' + objFace[name] + '.png');		//Load backgroundimage from file
            }catch(err){
                //In case of not loading the image the default value null is set. This causes not drawing this part of the face but the rest will be created normally.
                objFace[name] = null;
            }
        }
    }

	//invoke.and starts a asynchron function
	//invoke.end is called if all asynchron functions are terminated
	//the images are load from the filesystem asychron. The order of the loadImage() calls is not important
	invoke(function (data, callback) {
		//TODO communicate postfix 
		//load image of hair2 with another postfix  
		objFace.hair1 = objFace.hair2 + 'back';
		loadImage("hair1");
		callback();
	}).and( function (data, callback) {
		loadImage("faceForm");
		callback();
	}).and( function (data, callback) {
		loadImage("eye");
		callback();
	}).and( function (data, callback) {
		loadImage("eyebrow");
		callback();
	}).and( function (data, callback) {
		loadImage("mouth");
		callback();
	}).and( function (data, callback) {
		loadImage("nose");
		callback();
	}).and( function (data, callback) {
		loadImage("ear");
		callback();
	}).and( function (data, callback) {
		loadImage("hair2");
		callback();
	}).end( objFace, function (data, callback) {

		//this end segment runns sequencial because the created Face needs to be composed in the right order.
		try{
			//TODO Pfad Hintergrundweiß ändern
			var face = images( __dirname + '/TextToFaceBilder/' + "Hintergrundweiß.png");	//load backgroundimage from file
		}
		catch(err){
			//In case of not loading the background an own background is created with imageWidth and imageHeight. This new background has the color white.
			var face = images(imageWidth, imageHeight).fill(0xff, 0xff, 0xff, 1.0);
		}
		//Loops through all key's of the object
		for(var key in objFace) {
			if(objFace.hasOwnProperty(key)){
				//check if the value of the key is an image, which can be added on the var face (created face)
				if(objFace[key]!=null && key!="horizontal" && key!="vertical" && key!="id"){
					//The resulting face is created here. Each part of the face is added in the right order.
					face.draw(objFace[key], 0, 0);
				}
			}
		}
		if(objFace.horizontal != null){
			//The image is streched or compressed in the width. 1 is 100%, 0.5 is compressing to 50%, 1.5 is streching to 150%
			face.width(objFace.horizontal*imageWidth);
		}
		if(objFace.vertical != null){
			//The image is streched or compressed in the height. 1 is 100%, 0.5 is compressing to 50%, 1.5 is streching to 150%
			face.height(objFace.vertical*imageHeight);
		}
		//the resulting image is saved and named after the id.
		//existing files will be overwritten but the id should be unique so that a new file is created
		face.save(__dirname+'/website/pictures/face' + objFace.id+".png", {
			quality : 50
		});
		callbackFinish(objFace.id);
	})
}
exports.createFaceParts = faceCreator;
