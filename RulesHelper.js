//Support: Patrick

var util = require("util");

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

//Melanie output:
var textAnalyse = {
	"sentences": 5, 
	"average_length": 163, 
	"grammar_errors": 2, 
	"vocals": 242, 
	"e-s" : 4,
	"r-s": 43, 
	"i-s_and_l-s": 71, 
	"words": 132, 
	"nouns": 20, 
	"fem_nouns": 14, 
	"male_nouns": 4, 
	"neutr_nouns": 2, 
	"verbs": 23, 
	"adj": 10, 
	"adv": 20, 
	"kon": 7, 
	"neg": 3, 
	"prep": 13, 
	"article": 12, 
	"fem_article": 6, 
	"male_article": 2, 
	"neutr_article": 4, 
	"unknown_words": 15, 
	"physics": 0, 
	"medicin": 0, 
	"botanic": 0, 
	"zoology": 0, 
	"anatomy": 0, 
	"computer": 5, 
	"biology": 0, 
	"music": 0, 
	"sport": 0, 
	"technic": 0, 
	"chemistry": 0, 
	"jura": 0, 
	"astronomy": 0, 
	"electricity": 0, 
	"religion": 0, 
	"math": 0, 
	"military": 1, 
	"economy": 0, 
	"auto": 0, 
	"gastronomy": 0, 
	"shipping": 0, 
	"biochemistry": 0, 
	"history": 1, 
	"politic": 0, 
	"geology": 0, 
	"railway": 0, 
	"language": 0, 
	"art": 0, 
	"geography": 0, 
	"air": 0, 
	"psychology": 0, 
	"terrorism": 0, 
	"emotions": 0, 
	"color": 0
};

ruleAutomata(textAnalyse, 1);

function ruleAutomata (textA, id){
	
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
			if(p >= min)
				return 1;
			if(p >= med)
				return 2;
			return 3;
		}
	}	

	//Aufbau der Regeln --> Ergebnis ist der Wert, mit dem in der Datenbank gesucht werden soll
	//pRule( pCalculator(adj/words); , 0.05, 0.15, 1);

	var oface = Object.create(objFace); //hier wird ein Object erzeugt, welches alle Attribute von objFace geerbt hat. Silke muss nun nur noch die Gesichtsteile zuweisen, die sie braucht. Der Rest bleibt null

	var mData = Object.create(metaData);

	//Rule 1: gender
	//femal article > male + neutral

	if(textA["fem_article"] > (textA["male_article"] + textA["neutr_article"]) ) {
		mData.gender = 3;
	}else {
		mData.gender = 1;
	}


	//Rule 2: mentalHealth
	//a = (Viele Negationen + Medizin + computer + psychology + math) (a min 5 p(a) > 0.02) (a min 3 p(a) > 0.01) sonst
	//var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"] + textA["math"] ;

	mData.mentalHealth = pRule( pCalculator( (textA["neg"]+textA["medicin"]+textA["psychology"]+textA["computer"]+textA["math"]) ,textA["words"]) , 0.02, 0.31, 'asc');

	//Rule 3: iq
	//Grammar Errors + Spell Errors / words = p	1: sonst 	2:p < 0.20	3:p < 0.05
	mData.iq = pRule( pCalculator(textA["grammar_errors"], textA["words"]) , 0.20, 0.35, 'dsc');

	//Rule 4: age
	//(HIstory + Politik + niedriger Geistiger Zustand)/words
	var b = textA["history"] + textA["politic"] + a;
	mData.age = pRule( pCalculator(b,textA["words"]), 0.20, 0.03, 'dsc' );


	//Rule 5: dangerLevel
	//Terrorismus + Militär + Biochemie + Physik + Chemie + Biologie min 3 und p(Terrorismus + Militär ) > 0.025
	var c = textA["terrorism"] + textA["biology"] + textA["physics"] + textA["chemistry"] + textA["biology"] + textA["technic"];
	mData.dangerLevel = pRule( pCalculator(c,textA["words"]) , 0.20, 0.35, 'asc' );

	//Rule 6: pirat
	//10 * mehr r's als e und min 20 r's
	if( pCalculator(textA["r-s"],textA["e-s"]) > 10) {
		mData.pirat = 1;
	}else {
		mData.pirat = 3;
	}


	console.log(util.inspect(mData));



	//FeceParts

	//Rules : faceForm
	var faceForm = {};
	//Breite:
	faceForm.width = mData.iq;
	//Alter:
	faceForm.age = mData.age;
	//Form:
	//Konsonaten / vocals
	faceForm.form = pRule( pCalculator(textA["kon"], textA["vocals"]) , 0.20, 0.35, 'asc' );

	//TODO 
	console.log(util.inspect(faceForm));

	//Rules : hairs
	var hairs = {};
	//volume:
	//Zoologie + Wortlänge + Elektrizität  - Sport - TEchnik
	hairs.volume = pRule( pCalculator( (textA["zoology"]+textA["electricity"]-textA["sport"]-textA["technic"]), textA["words"] ) ,0.20, 0.35, 'asc' );
	console.log(util.inspect(hairs));
}