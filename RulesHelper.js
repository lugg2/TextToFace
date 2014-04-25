//Support: Patrick

var util = require("util");
var invoke = require("invoke");
var facePartsDB = require("./FacePartsDBInterface.js");

//Function for the easy creation of objects, which are inherited from objFace
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototye = o;
		return new F();
	};
}
//Basis object from which other objFace's can inherit their atributes
var objFace = {
	hair1 : null,
	faceForm : null,
	eye : null,
	eyebrow : null,
	mouth : null,
	beard : null,
	nose : null,
	ear : null,
	hair2 : null,
	horizontal : null,
	vertical : null,
	id : null
};

var metaData = {
	gender : null,
	age : null,
	dangerLevel : null,
	iq : null,
	mentalHealth : null,
	pirat : null
};

//Helper Function
function pCalculator(z, n) {
	if(n != 0){
		return z/n;
	}
	else
		return 0;
}

//min = Grenze für 1
//med = Grenze für 2
//sortDirection = Grenze für 3
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
	if(typeof QuerryArray == 'undefined')
	{
		QuerryArray = [];
	}
	QuerryArray.push(new QueryParameter(key,value));
	return QuerryArray;
}
/*
var body1 = eval("("+'{"sentences": 1, "average_sentence_length": 36, "grammar_errors": 0, "vocals": 11, "r-s": 3, "i-s_and_l-s": 4, "words": 7, "nouns": 2, "fem_nouns": 0, "male_nouns": 1, "neutr_nouns": 1, "verbs": 1, "adj": 0, "adv": 1, "kon": 0, "neg": 0, "prep": 0, "article": 1, "fem_article": 1, "male_article": 0, "neutr_article": 0, "unknown_words": 0, "e-s": 6, "spaces": 6, "average_word_length": 4, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 1, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body2 = eval("("+'{"sentences": 5, "average_sentence_length": 156, "grammar_errors": 2, "vocals": 266, "r-s": 49, "i-s_and_l-s": 94, "words": 105, "nouns": 22, "fem_nouns": 14, "male_nouns": 5, "neutr_nouns": 3, "verbs": 16, "adj": 2, "adv": 8, "kon": 5, "neg": 0, "prep": 13, "article": 19, "fem_article": 16, "male_article": 0, "neutr_article": 3, "unknown_words": 11, "e-s": 132, "spaces": 105, "average_word_length": 6, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 1, "computer": 2, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 2, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 1, "geology": 0, "railway": 0, "language": 1, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body3 = eval("("+'{"sentences": 7, "average_sentence_length": 80, "grammar_errors": 2, "vocals": 183, "r-s": 18, "i-s_and_l-s": 52, "words": 81, "nouns": 19, "fem_nouns": 5, "male_nouns": 7, "neutr_nouns": 7, "verbs": 20, "adj": 3, "adv": 6, "kon": 4, "neg": 0, "prep": 9, "article": 6, "fem_article": 1, "male_article": 3, "neutr_article": 2, "unknown_words": 7, "e-s": 80, "spaces": 83, "average_word_length": 5, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 1, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 0, "color": 0}'+")");
var body4 = eval("("+'{"sentences": 13, "average_sentence_length": 87, "grammar_errors": 4, "vocals": 349, "r-s": 61, "i-s_and_l-s": 113, "words": 166, "nouns": 40, "fem_nouns": 18, "male_nouns": 19, "neutr_nouns": 3, "verbs": 33, "adj": 6, "adv": 18, "kon": 6, "neg": 0, "prep": 10, "article": 17, "fem_article": 13, "male_article": 0, "neutr_article": 4, "unknown_words": 13, "e-s": 149, "spaces": 167, "average_word_length": 5, "physics": 0, "medicin": 2, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 2, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 1, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 3, "color": 0}'+")");
var body5 = eval("("+'{"sentences": 7, "average_sentence_length": 156, "grammar_errors": 12, "vocals": 310, "r-s": 49, "i-s_and_l-s": 102, "words": 164, "nouns": 22, "fem_nouns": 11, "male_nouns": 4, "neutr_nouns": 7, "verbs": 29, "adj": 17, "adv": 28, "kon": 8, "neg": 1, "prep": 12, "article": 11, "fem_article": 8, "male_article": 1, "neutr_article": 2, "unknown_words": 17, "e-s": 131, "spaces": 164, "average_word_length": 5, "physics": 0, "medicin": 1, "botanic": 0, "zoology": 0, "anatomy": 1, "computer": 2, "biology": 0, "music": 1, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 1, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 2, "color": 0}'+")");
var body6 = eval("("+'{"sentences": 2, "average_sentence_length": 112, "grammar_errors": 0, "vocals": 73, "r-s": 13, "i-s_and_l-s": 26, "words": 34, "nouns": 6, "fem_nouns": 1, "male_nouns": 4, "neutr_nouns": 1, "verbs": 10, "adj": 3, "adv": 6, "kon": 0, "neg": 0, "prep": 1, "article": 4, "fem_article": 3, "male_article": 1, "neutr_article": 0, "unknown_words": 1, "e-s": 35, "spaces": 33, "average_word_length": 5, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 1, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body7 = eval("("+'{"sentences": 3, "average_sentence_length": 66, "grammar_errors": 1, "vocals": 63, "r-s": 13, "i-s_and_l-s": 25, "words": 33, "nouns": 7, "fem_nouns": 2, "male_nouns": 2, "neutr_nouns": 3, "verbs": 8, "adj": 0, "adv": 3, "kon": 0, "neg": 1, "prep": 3, "article": 1, "fem_article": 1, "male_article": 0, "neutr_article": 0, "unknown_words": 1, "e-s": 32, "spaces": 34, "average_word_length": 4, "numbers": 0, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body8 = eval("("+'{"sentences": 5, "average_sentence_length": 67, "grammar_errors": 1, "vocals": 109, "r-s": 23, "i-s_and_l-s": 37, "words": 51, "nouns": 10, "fem_nouns": 7, "male_nouns": 3, "neutr_nouns": 0, "verbs": 9, "adj": 0, "adv": 4, "kon": 2, "neg": 1, "prep": 4, "article": 6, "fem_article": 4, "male_article": 2, "neutr_article": 0, "unknown_words": 10, "e-s": 54, "spaces": 54, "average_word_length": 5, "numbers": 3, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 1, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 1, "color": 0}'+")");
var body9 = eval("("+'{"sentences": 2, "average_sentence_length": 183, "grammar_errors": 1, "vocals": 120, "r-s": 28, "i-s_and_l-s": 46, "words": 58, "nouns": 0, "fem_nouns": 0, "male_nouns": 0, "neutr_nouns": 0, "verbs": 0, "adj": 0, "adv": 0, "kon": 0, "neg": 0, "prep": 0, "article": 0, "fem_article": 0, "male_article": 0, "neutr_article": 0, "unknown_words": 52, "e-s": 52, "spaces": 57, "average_word_length": 5, "numbers": 1, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 1, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body10 = eval("("+'{"sentences": 1, "average_sentence_length": 315, "grammar_errors": 2, "vocals": 98, "r-s": 14, "i-s_and_l-s": 31, "words": 53, "nouns": 5, "fem_nouns": 4, "male_nouns": 1, "neutr_nouns": 0, "verbs": 10, "adj": 1, "adv": 7, "kon": 3, "neg": 2, "prep": 3, "article": 5, "fem_article": 4, "male_article": 0, "neutr_article": 1, "unknown_words": 10, "e-s": 44, "spaces": 54, "average_word_length": 4, "numbers": 0, "physics": 1, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 1, "religion": 0, "math": 1, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body11 = eval("("+'{"sentences": 8, "average_sentence_length": 152, "grammar_errors": 3, "vocals": 369, "r-s": 81, "i-s_and_l-s": 104, "words": 160, "nouns": 36, "fem_nouns": 13, "male_nouns": 16, "neutr_nouns": 7, "verbs": 30, "adj": 7, "adv": 18, "kon": 2, "neg": 0, "prep": 15, "article": 26, "fem_article": 13, "male_article": 12, "neutr_article": 1, "unknown_words": 16, "e-s": 177, "spaces": 159, "average_word_length": 6, "numbers": 1, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 1, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 1}'+")");
var body12 = eval("("+'{"sentences": 6, "average_sentence_length": 104, "grammar_errors": 1, "vocals": 195, "r-s": 49, "i-s_and_l-s": 57, "words": 83, "nouns": 14, "fem_nouns": 6, "male_nouns": 6, "neutr_nouns": 2, "verbs": 8, "adj": 1, "adv": 6, "kon": 3, "neg": 0, "prep": 7, "article": 16, "fem_article": 8, "male_article": 5, "neutr_article": 3, "unknown_words": 21, "e-s": 86, "spaces": 82, "average_word_length": 6, "numbers": 0, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 1, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");


ruleAutomata(body12, 1);
*/
function ruleAutomata (textA, id, callbackMetaData, callbackFullData){
	//Aufbau der Regeln --> Ergebnis ist der Wert, mit dem in der Datenbank gesucht werden soll
	
	/*
	//the values of textA should only be numbers but they are transfered as strings. This is a "cast" into numbers
	for(var key in textA) {
		if(textA.hasOwnProperty(key)){
			textA[key] = parseInt(textA[key]);
		}
	}
	*/
	
	var oface = Object.create(objFace); //hier wird ein Object erzeugt, welches alle Attribute von objFace geerbt hat. Silke muss nun nur noch die Gesichtsteile zuweisen, die sie braucht. Der Rest bleibt null

	var mData = Object.create(metaData);

	//Rule 1: gender
	//femal article > male + neutral
	if(textA["fem_article"]+textA["fem_nouns"]  > (1.5*textA["male_article"] + textA["neutr_article"] + textA["male_nouns"] + textA["neutr_nouns"]) ) {
		mData.gender = 3;
	}else {
		mData.gender = 1;
	}
	console.log("gender:"+mData.gender);

	//Rule 2: mentalHealth
	//a = (Viele Negationen + Medizin + computer + psychology + math) (a min 5 p(a) > 0.02) (a min 3 p(a) > 0.01) sonst
	var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"] + textA["math"];
	if(textA["words"]-1 < 0.8*textA["spaces"]|| pCalculator(a,textA["words"]) > 0.05) {
		console.log(pCalculator(a,textA["words"]));
		mData.mentalHealth = 1;
	}else if (textA["words"]-1 < 0.8*textA["spaces"]&&pCalculator(a,textA["words"])<0.001){
		mData.mentalHealth = 3;
	}else mData.mentalHealth = 2;

//	mData.mentalHealth = pRule( pCalculator( a ,textA["words"]) , 0.01, 0.035, 'dsc');
//	console.log("mentalHealth:"+(a/textA["words"]));
	console.log("mH:"+mData.mentalHealth);

	//Rule 3: iq
	//Grammar Errors + Spell Errors / words = p	1: sonst 	2:p < 0.20	3:p < 0.05
	mData.iq = pRule( pCalculator((textA["unknown_words"]+textA["grammar_errors"]), textA["words"]) , 0.15, 0.4, 'asc');
	console.log("iq:"+ pCalculator(textA["unknown_words"]+textA["grammar_errors"], textA["words"]) );
	console.log(mData.iq);

	//Rule 4: age
	//(History + Politik + niedriger Geistiger Zustand)/words
	//var b = textA["history"] + textA["politic"] + a;
	var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"]+textA["math"];
	if(textA["average_sentence_length"]>150&&pCalculator(a,textA["words"])>1.5){
		mData.age = 3;
	}else if (pCalculator(a,textA["words"])==0){
		mData.age = 1;
	}else mData.age = 2;

//	mData.age = pRule( pCalculator( (textA["history"]+textA["politic"]+a) ,textA["words"]), 0.01, 0.04, 'dsc' );
//	console.log("age:"+pCalculator( (textA["history"]+textA["politic"]+a) ,textA["words"]));
	console.log("age"+mData.age);

	//Rule 5: dangerLevel
	//Terrorismus + Militär + Biochemie + Physik + Chemie + Biologie min 3 und p(Terrorismus + Militär ) > 0.025
	//var c = textA["terrorism"] + textA["biology"] + textA["physics"] + textA["chemistry"] + textA["biology"] + textA["technic"];
	mData.dangerLevel = pRule( pCalculator( (textA["terrorism"]+textA["biology"]+textA["physics"]+textA["chemistry"]+textA["biology"]+textA["technic"]+textA["emotions"]+textA["unknown_words"]+textA["words"]+textA["grammar_errors"]),textA["words"] ) , 0.3, 1.0, 'asc' );
	console.log("dangerLevel:"+ pCalculator( (textA["terrorism"]+textA["biology"]+textA["physics"]+textA["chemistry"]+textA["biology"]+textA["technic"]+textA["emotions"]+textA["unknown_words"]+textA["words"]+textA["grammar_errors"]),textA["words"] ));
	console.log(mData.dangerLevel);

	//Rule 6: pirat
	//10 * mehr r's als e und min 20 r's
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


	//FaceParts
	invoke(function (data, callback) {
		//faceForm
		//width:
        var queryArray = addToQueryArray("width", mData.iq);
		//age:
		queryArray = addToQueryArray("age", mData.age, queryArray);
		//form:
		var form = pRule( pCalculator(textA["kon"], textA["vocals"]) , 0.01, 0.02, 'asc' );
		console.log("faceForm_form:"+(pCalculator(textA["kon"], textA["vocals"])));
		console.log(form);

		queryArray = addToQueryArray("form", form, queryArray);

		//facePartDB gives fitting image (filename) for the queryArray
        facePartsDB.queryDB("head", queryArray, function(name)
		{
            oface.faceForm = name;
            callback(); // ich glaube das muss auch hier rein und soll anzeigen, dass der and teil jetzt abgeschlossen ist
            //console.log('faceForm :'+ oface.faceForm);
		});

	}).and( function (data, callback) {
		//Rules : hair
		//volume:
		var hairVolume = pRule( (textA["average_word_length"]) , 2, 8, 'asc' );
		console.log("hair_volume:"+textA["average_word_length"]);
		console.log(hairVolume);
		
		//length:
		var hairlength;
		if (mData.gender === 3){
			//0.2 is womenfactor
			hairlength = pRule( (pCalculator( (textA["adj"]), textA["words"] )+0.2) , 0.0010, 0.1, 'asc' );
			console.log("hairlength"+ (pCalculator( (textA["adj"]), textA["words"] ) + 0.2) );
			console.log(hairlength);
		}else {
			hairlength = pRule( pCalculator(textA["adj"] , textA["words"] ) , 0.0010, 0.1, 'asc' );
			console.log("hairlength"+ pCalculator( (textA["adj"]), textA["words"] ) );
			console.log(hairlength);
		}
		
		if(hairVolume===1 && hairlength===1 && mData.gender === 1)
		{
			oface.hair2 = null;
			callback();
		}else{
			var queryArray = addToQueryArray("volumen", hairVolume, queryArray);
			queryArray = addToQueryArray("length", hairlength, queryArray);
			//gender:
			//queryArray = addToQueryArray("gender", mData.gender, queryArray);
			//TODO gender is wrong
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
		console.log("eye_length"+pCalculator(textA["i-s_and_l-s"], textA["r-s"]));
		console.log(eyeLength);

		var queryArray = addToQueryArray("length", eyeLength);
		//width:
		var eyeWidth = pRule( pCalculator(textA["average_sentence_length"], textA["words"]), 0.9, 1.5, 'asc' );
		console.log("eye_width:"+pCalculator(textA["average_sentence_length"], textA["words"]));
		console.log(eyeWidth);

		queryArray = addToQueryArray("height", eyeWidth, queryArray);

        facePartsDB.queryDB("eye", queryArray, function(name)
		{
            oface.eye = name;
            callback(); 
		});

	}).and( function (data, callback) {
		//Rules : eyebrow
		//height:
		//TODO add literature to taxtA 
		var eyebrowHeight = pRule( pCalculator( (textA["neutr_nouns"]+textA["unknown_words"]) , textA["words"]), 0.1, 0.15, 'asc' );
		console.log("eyebrow_height:"+ pCalculator( (textA["neutr_nouns"]+textA["unknown_words"]) , textA["words"]));
		console.log(eyebrowHeight);

		var queryArray = addToQueryArray("height", eyebrowHeight);
		//width:
		//TODO fix .toFixed(0) --> kein string als output
		eyebrowWidth = ( (mData.iq + mData.mentalHealth)/2 ).toFixed(0);
		console.log("eyebrow_width:"+((mData.iq + mData.mentalHealth)/2));
		console.log(eyebrowWidth);

		queryArray = addToQueryArray("width", eyebrowWidth, queryArray);
		//gender:
		//queryArray = addToQueryArray("gender", mData.gender, queryArray);
        // TODO gender is wrong

        facePartsDB.queryDB("brow", queryArray, function(name)
		{
            oface.eyebrow = name;
            callback(); 
		});

	}).and( function (data, callback) {
		//Rules : nose
		//width:
		var noseWidth = pRule( pCalculator( (textA["verbs"]+textA["geology"]), textA["words"] ), 0.17, 0.25, 'asc' );
		console.log("nose_width:"+ pCalculator( (textA["verbs"]+textA["geology"]), textA["words"] ) );
		console.log(noseWidth);

		var queryArray = addToQueryArray("width", noseWidth);
		//length:
		var noseLength = pRule( pCalculator( (textA["air"]+textA["average_word_length"]), textA["words"] ), 0.03, 0.1, 'asc' );
		console.log("nose_length"+ pCalculator( (textA["air"]+textA["average_word_length"]), textA["words"] ) );
		console.log(noseLength);

		queryArray = addToQueryArray("height", noseLength, queryArray);
		//form:
		var noseForm = pRule( pCalculator( (textA["numbers"]+textA["kon"]+textA["vocals"]) , textA["words"] ) , 1.8, 2.1, 'asc' );
		console.log("nose_form:"+ pCalculator( (textA["numbers"]+textA["kon"]+textA["vocals"]) , textA["words"] ) );
		console.log(noseForm);

	//	queryArray = addToQueryArray("form", noseForm, queryArray);
    // TODO Form in 1-3 abaendern
        facePartsDB.queryDB("nose", queryArray, function(name)
		{
            oface.nose = name;
            //console.log('nose' + name);
            callback(); 
		});

	}).and( function (data, callback) {
		//TODO Regeln definieren und implementieren
		//Rules: mouth
		//width:
		var mouthWidth = pRule( (textA["average_word_length"]+textA["average_sentence_length"]), 55, 75, 'asc' );
		console.log("mouthWidth"+ (textA["average_word_length"]+textA["average_sentence_length"]) );
		console.log(mouthWidth);

		var queryArray = addToQueryArray("width", mouthWidth);

		//height:
		var mouthHeight = pRule( pCalculator( (textA["verbs"]+textA["adv"]+textA["prep"]), textA["words"] ), 0.5, 2, 'asc' );
		console.log("mouthHeight"+ pCalculator( (textA["verbs"]+textA["adv"]+textA["prep"]), textA["words"] ) );
		console.log(mouthHeight);
		queryArray = addToQueryArray("height", mouthHeight, queryArray);
		//gender:
		//queryArray = addToQueryArray("gender", mData.gender, queryArray);
        // TODO implement gender
        facePartsDB.queryDB("mouth", queryArray, function(name)
		{
            oface.mouth = name;
            callback(); 
		});
	}).and( function (data, callback) {
    //TODO Beard null bug + rule
		//Rules : beard
		var beard;
		if(mData.gender === 3){
			beard = 1;
		}else{
			//Zoologie + Religion + Kunst <0,005
			beard = pRule( pCalculator( (textA["zoology"]+textA["religion"]+textA["art"]), textA["words"] ) , 0.20, 0.35, 'asc');
			console.log("beard:"+pCalculator( (textA["zoology"]+textA["religion"]+textA["art"]), textA["words"] ) );
		}
		var queryArray = addToQueryArray("beard", beard);

        facePartsDB.queryDB("beard", queryArray, function(name)
		{
            oface.beard = name;
            callback(); 
		});
	}).end( oface, function(data, callback){
		oface.id = id;
		//console.log(util.inspect(oface));
		if (typeof callbackFullData == 'function') {
			callbackFullData(oface);
		}

	});

}

exports.evaluateAnalyserOutput = ruleAutomata;
