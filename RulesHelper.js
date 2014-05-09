//Author : Patrick & Melanie
//Description : find image parts for the analysed text.
//Reviewer : Victor

//hint: this document is named RulesHelper but it is the real Ruleengine/Automata

//The rules are used to assign values between 1 and 3. Normal texts should give a 2.
//The values for the rules have been optimsed by using more than 40 example texts. 
//The values were choosen so that the 2 appears often at normal texts and only extreme texts will be 1 or 3.

//required libraries
var invoke = require("invoke");
var facePartsDB = require("./FacePartsDBInterface.js");

//Function for the easy creation of objects, which are inherited objFace or metaData (or any other object)
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototye = o;
		return new F();
	};
}

//Basis object from which other objFace's can inherit their atributes
//prototype for oface objects
var objFace = {
	hair1 : null,
	faceForm : null,
	eye : null,
	eyebrow : null,
	mouth : null,
	beard : null,
	nose : null,
	hair2 : null,
	horizontal : null,
	vertical : null,
	id : null
};

//prototype for mData objects
var metaData = {
	gender : null,
	age : null,
	dangerLevel : null,
	iq : null,
	mentalHealth : null,
	pirat : null
};

//Helper Functions:

//dividing with 0 is prevented
function pCalculator(z, n) {
	if(n != 0){
		return z/n;
	}
	else
		return 0;
}

//min = limit for 1
//med = limit for 2
//sortDirection = ascading or descading
function pRule(p, min, med, sortDirection) {	
	if(sortDirection === 'asc') {
		if(p <= min)
			return 1;
		if(p <= med)
			return 2;
		return 3;
	}
	else{
		if(p <= min)
			return 3;
		if(p <= med)
			return 2;
		return 1;
	}
}	

function QueryParameter(key, value){
		this.key = key;
		this.value = value;
}

function addToQueryArray(key, value, QuerryArray)
{
	//a Querry Array is created, if it does not exists
	if(typeof QuerryArray == 'undefined')
	{
		QuerryArray = [];
	}
	//a key value pair is added to the queryarray
	QuerryArray.push(new QueryParameter(key,value));
	return QuerryArray;
}

//RuleAutomata
function ruleAutomata (textA, id, callbackMetaData, callbackFullData){
	//Rules assign a value from 1 to 3 to search the DB. Then the DB interface is called to return the path to the best matching image

	//Inheritance from defined prototypes
	var oface = Object.create(objFace); 
	var mData = Object.create(metaData);

	//mData Rule 1: gender
	if(textA["fem_article"]+textA["fem_nouns"]  > (1.5*textA["male_article"] + textA["neutr_article"] + textA["male_nouns"] + textA["neutr_nouns"]) ) {
		mData.gender = 3;
	}else {
		mData.gender = 1;
	}

	//mData Rule 2: mentalHealth
	var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"] + textA["math"];
	if((textA["words"]-1 < 0.7*textA["spaces"])
		|| (pCalculator(a,textA["words"]) > 0.027)
		|| (pCalculator(textA["grammars"], textA["words"]) < 0.028) 
		|| (pCalculator(textA["unknown_words"],textA["words"]) > 0.45)) {
		mData.mentalHealth = 1;
	}else if ((textA["words"]-1 >= textA["spaces"]) 
			&& (pCalculator(textA["vocals"],textA["words"])>2.151)){
		mData.mentalHealth = 3;
	}else mData.mentalHealth = 2;

	//mData Rule 3: iq
	mData.iq = pRule( pCalculator((textA["unknown_words"]+textA["grammar_errors"]), textA["words"]) , 0.1, 0.21, 'asc');

	//mData Rule 4: age
	var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"]+textA["math"];
	if(textA["average_sentence_length"]>150&&pCalculator(a,textA["words"])>1.5){
		mData.age = 3;
	}else if (pCalculator(a,textA["words"])==0){
		mData.age = 1;
	}else mData.age = 2;

	//mData Rule 5: dangerLevel
	var c = textA["biology"]+textA["physics"]+textA["chemistry"]+textA["technic"]+textA["emotions"];
	if((pCalculator(textA["terrorism"],textA["words"])>0.005) 
		|| (pCalculator(c,textA["words"])>0.01 && (pCalculator(textA["terrorism"],textA["words"])>0.001 || pCalculator(textA["grammars"],textA["words"])<0.05)) 
		|| (pCalculator(textA["grammars"],textA["words"])<0.019)){
		mData.dangerLevel = 1;
	}else if (pCalculator(textA["terrorism"],textA["words"])==0 
		&& pCalculator(c,textA["words"])<0.05 
		&& pCalculator(textA["grammars"],textA["words"])>0.12) {
		mData.dangerLevel = 3;
	}else mData.dangerLevel = 2;

	//mData Rule 6: pirat
	if( textA["r-s"] > 2*textA["e-s"]) {
		mData.pirat = 1;
	}else {
		mData.pirat = 3;
	}
	console.log("pirat:"+mData.pirat);

	//callback for wantedPosterCreator
	if (typeof callbackMetaData == 'function') {
		callbackMetaData(id, mData);
	}


	//If a pirat is detected, a special picture is created
	if (mData.pirat === 3){
		//FaceParts

		//asynchronous Rules with DB calls. Description for invoke see faceCreator.js
		invoke(function (data, callback) {
			//faceForm
			//width:
	        var queryArray = addToQueryArray("width", mData.iq);
			//age:
			queryArray = addToQueryArray("age", mData.age, queryArray);
			//form:
			var form = pRule( pCalculator(textA["kon"], textA["vocals"]) , 0.01, 0.02, 'asc' );
			queryArray = addToQueryArray("form", form, queryArray);
			//scar:
			var scar;
			if(2*textA["sentences"] < textA["neg"]+textA["pro"])
			{
				scar = 3;
			}else scar = 1;
			queryArray = addToQueryArray("scar", scar, queryArray);
			
			//facePartDB gives fitting image (filename) for the queryArray
	        facePartsDB.queryDB("head", queryArray, function(name)
			{
	            oface.faceForm = name;
	            callback(); 
			});

		}).and( function (data, callback) {
			//Rules : hair
			//volume:
			var hairVolume = pRule( (textA["average_word_length"]) , 2, 8, 'asc' );
			//length:
			var hairlength;
			if (mData.gender === 3){
				// *2 is womenfactor
				hairlength = pRule( (textA["average_sentence_length"])*2 , 90, 180, 'asc' );
			}else {
				hairlength = pRule( textA["average_sentence_length"] , 90, 180, 'asc' );
			}
			
			//special rule for no hairs (only available for a man)
			if(hairVolume===1 && hairlength===1 && mData.gender === 1)
			{
				oface.hair2 = null;
				callback();
			}else{
				var queryArray = addToQueryArray("volumen", hairVolume, queryArray);
				queryArray = addToQueryArray("length", hairlength, queryArray);
				queryArray = addToQueryArray("gender", mData.gender, queryArray);
				
				facePartsDB.queryDB("hair", queryArray, function(name)
				{
	            	oface.hair2 = name;
	            	callback(); 
				});
			}

		}).and( function (data, callback) {
			//Rules: eye
			//length:
			var eyeLength = pRule( pCalculator(textA["i-s_and_l-s"], textA["r-s"]), 2.0, 3.0, 'asc' );
			var queryArray = addToQueryArray("length", eyeLength);
			//width:
			var eyeWidth = pRule( pCalculator(textA["average_sentence_length"], textA["words"]), 0.9, 1.5, 'asc' );
			queryArray = addToQueryArray("height", eyeWidth, queryArray);

	        facePartsDB.queryDB("eye", queryArray, function(name)
			{
	            oface.eye = name;
	            callback(); 
			});

		}).and( function (data, callback) {
			//Rules : eyebrow
			//height:
			var eyebrowHeight = pRule( pCalculator( (textA["neutr_nouns"]+textA["unknown_words"]) , textA["words"]), 0.1, 0.15, 'asc' );
			var queryArray = addToQueryArray("height", eyebrowHeight);
			//width:
			var eyebrowWidth = ( (mData.iq + mData.mentalHealth)/2 ).toFixed(0);
			queryArray = addToQueryArray("width", eyebrowWidth, queryArray);
			//gender:
			queryArray = addToQueryArray("gender", mData.gender, queryArray);
	        
	        facePartsDB.queryDB("brow", queryArray, function(name)
			{
	            oface.eyebrow = name;
	            callback(); 
			});

		}).and( function (data, callback) {
			//Rules : nose
			//width:
			var noseWidth = pRule( pCalculator( (textA["verbs"]+textA["geology"]), textA["words"] ), 0.17, 0.25, 'asc' );
			var queryArray = addToQueryArray("width", noseWidth);
			//length:
			var noseLength = pRule( pCalculator( (textA["air"]+textA["average_word_length"]), textA["words"] ), 0.03, 0.1, 'asc' );
			queryArray = addToQueryArray("height", noseLength, queryArray);
			//form:
			var noseForm = pRule( pCalculator( (textA["numbers"]+textA["kon"]+textA["vocals"]) , textA["words"] ) , 1.8, 2.1, 'asc' );

	        facePartsDB.queryDB("nose", queryArray, function(name)
			{
	            oface.nose = name;
	            callback(); 
			});

		}).and( function (data, callback) {
			//Rules: mouth
			//width:
			var mouthWidth = pRule( (textA["average_word_length"]+textA["average_sentence_length"]), 55, 75, 'asc' );
			var queryArray = addToQueryArray("width", mouthWidth);
			//height:
			var mouthHeight = pRule( pCalculator( (textA["verbs"]+textA["adv"]+textA["prep"]), textA["words"] ), 0.5, 2, 'asc' );
			queryArray = addToQueryArray("height", mouthHeight, queryArray);
			//gender:
			queryArray = addToQueryArray("gender", mData.gender, queryArray);
			//beard:
			var beard;
			if(mData.gender === 3){
				beard = 1;
			}else{
				beard = pRule( pCalculator( textA["prep"], textA["words"] ) , 0.05, 0.10, 'asc');
				console.log("beard:"+pCalculator( textA["prep"], textA["words"] ) );
			}
			queryArray = addToQueryArray("beard", beard, queryArray);
	        
	        facePartsDB.queryDB("mouth", queryArray, function(name)
			{
	            oface.mouth = name;
	            callback(); 
			});
		}).end( oface, function(data, callback){
			oface.id = id;
			//add a scretching factor to image depending on the iq
			if(mData.iq === 1){
				oface.horizontal = 1.2;
			}else if(mData.iq ===3){
				oface.vertical = 1.2;
			}
			if (typeof callbackFullData == 'function') {
				//callback for faceCrator
				callbackFullData(oface);
			}

			});
	}else {
		oface.id = id;
		//only the pirate image and the id are assigned to oface. The rest is null and therefore will not be created
		oface.faceForm = '/man/pirat';
		if (typeof callbackFullData == 'function') {
			//callback for faceCreator
			callbackFullData(oface);
		}
	}
}

exports.evaluateAnalyserOutput = ruleAutomata;
