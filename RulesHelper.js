//Support: Patrick

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
	mentalHealth : null
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
	if(sortDirection === 1) {
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

//Melanie output:
var textA = {
	 "sentences": 10,
	 "average length": 8,
	 "grammar errors": 3,
	 "vocals": 25,
	 "r-s": 30,
	 "i-s and l-s": 20,
	 "words": 100,
	 "nouns": 10,
	 "fem nouns": 4,
	 "male nouns": 3,
	 "neutr nouns": 3,
	 "verbs": 40,
	 "adj": 20,
	 "adv": 2,
	 "kon": 1,
	 "neg": 4,
	 "prep": 5,
	 "article": 5,
	 "fem article": 2,
	 "male article": 1,
	 "neutr article": 2,
	 "unknown words": 0,
	 "physics": 0,
	 "medicin": 0,
	 "botanic": 0,
	 "zoology": 0,
	 "anatomy": 0,
	 "computer": 0,
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
	 "military": 0,
	 "economy": 0,
	 "auto": 0,
	 "gastronomy": 0,
	 "shipping": 0,
	 "biochemistry": 0,
	 "history": 0,
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





//Aufbau der Regeln --> Ergebnis ist der Wert, mit dem in der Datenbank gesucht werden soll
//pRule( pCalculator(adj/words); , 0.05, 0.15, 1);


var oface = Object.create(objFace); //hier wird ein Object erzeugt, welches alle Attribute von objFace geerbt hat. Silke muss nun nur noch die Gesichtsteile zuweisen, die sie braucht. Der Rest bleibt null

var mData = Object.create(metaData);

//Rule 1: gender
//femal article > male + neutral

if(textA["fem article"] > (textA["male article"] + textA["neutr article"]) ) {
	mData.gender = 3;
}else {
	mData.gender = 1;
}


//Rule 2: mentalHealth
//a = (Viele Negationen + Medizin + computer + psychology + math) (a min 5 p(a) > 0.02) (a min 3 p(a) > 0.01) sonst
var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"] + textA["math"] ;

mData.mentalHealth = pRule( pCalculator(a,textA["words"]) , 0.02, 0.01, 1);

//Rule 3: iq
//Grammar Errors + Spell Errors / words = p	1: sonst 	2:p < 0.20	3:p < 0.05
mData.iq = pRule( pCalculator(textA["grammar errors"], textA["words"]) , 0.20, 0.05, 0);

//Rule 4:
//


console.log(mData.gender);
console.log(mData.mentalHealth);
console.log(mData.iq);





 
