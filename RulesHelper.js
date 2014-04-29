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
var body13 = eval("("+'{"sentences": 7, "average_sentence_length": 55, "grammar_errors": 5, "vocals": 121, "r-s": 24, "i-s_and_l-s": 40, "words": 58, "nouns": 10, "fem_nouns": 7, "male_nouns": 3, "neutr_nouns": 0, "verbs": 9, "adj": 0, "adv": 4, "kon": 2, "neg": 1, "prep": 4, "article": 5, "fem_article": 4, "male_article": 1, "neutr_article": 0, "unknown_words": 19, "e-s": 59, "spaces": 58, "average_word_length": 5, "numbers": 3, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 1, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 2, "emotions": 1, "color": 0}'+")");
//dangerous
var body14 = eval("("+'{"sentences": 3, "average_sentence_length": 65, "grammar_errors": 0, "vocals": 63, "r-s": 13, "i-s_and_l-s": 25, "words": 33, "nouns": 7, "fem_nouns": 2, "male_nouns": 2, "neutr_nouns": 3, "verbs": 8, "adj": 0, "adv": 3, "kon": 0, "neg": 1, "prep": 3, "article": 1, "fem_article": 1, "male_article": 0, "neutr_article": 0, "unknown_words": 2, "e-s": 32, "spaces": 32, "average_word_length": 4, "numbers": 0, "grammars": 4, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 0, "color": 0}'+")");
var body15 = eval("("+'{"sentences": 5, "average_sentence_length": 67, "grammar_errors": 2, "vocals": 109, "r-s": 23, "i-s_and_l-s": 37, "words": 51, "nouns": 10, "fem_nouns": 7, "male_nouns": 3, "neutr_nouns": 0, "verbs": 9, "adj": 0, "adv": 4, "kon": 2, "neg": 1, "prep": 4, "article": 5, "fem_article": 4, "male_article": 1, "neutr_article": 0, "unknown_words": 11, "e-s": 54, "spaces": 53, "average_word_length": 5, "numbers": 3, "grammars": 8, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 1, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 2, "emotions": 1, "color": 0}'+")");
var body16 = eval("("+'{"sentences": 1, "average_sentence_length": 315, "grammar_errors": 3, "vocals": 98, "r-s": 14, "i-s_and_l-s": 31, "words": 53, "nouns": 5, "fem_nouns": 4, "male_nouns": 1, "neutr_nouns": 0, "verbs": 9, "adj": 1, "adv": 7, "kon": 3, "neg": 2, "prep": 3, "article": 5, "fem_article": 4, "male_article": 0, "neutr_article": 1, "unknown_words": 11, "e-s": 44, "spaces": 53, "average_word_length": 4, "numbers": 0, "grammars": 0, "physics": 1, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 1, "religion": 0, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body17 = eval("("+'{"sentences": 2, "average_sentence_length": 183, "grammar_errors": 1, "vocals": 120, "r-s": 28, "i-s_and_l-s": 46, "words": 58, "nouns": 0, "fem_nouns": 0, "male_nouns": 0, "neutr_nouns": 0, "verbs": 0, "adj": 0, "adv": 0, "kon": 0, "neg": 0, "prep": 0, "article": 0, "fem_article": 0, "male_article": 0, "neutr_article": 0, "unknown_words": 53, "e-s": 52, "spaces": 56, "average_word_length": 5, "numbers": 1, "grammars": 1, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body20 = eval("("+'{"sentences": 5, "average_sentence_length": 101, "grammar_errors": 1, "vocals": 169, "r-s": 30, "i-s_and_l-s": 53, "words": 67, "nouns": 20, "fem_nouns": 8, "male_nouns": 8, "neutr_nouns": 4, "verbs": 7, "adj": 3, "adv": 4, "kon": 2, "neg": 1, "prep": 6, "article": 8, "fem_article": 5, "male_article": 2, "neutr_article": 1, "unknown_words": 9, "e-s": 77, "spaces": 66, "average_word_length": 6, "numbers": 0, "grammars": 8, "physics": 2, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 1, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 2, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 1, "geography": 0, "air": 0, "psychology": 0, "terrorism": 2, "emotions": 0, "color": 0}'+")");
var body25 = eval("("+'{"sentences": 5, "average_sentence_length": 106, "grammar_errors": 3, "vocals": 155, "r-s": 33, "i-s_and_l-s": 44, "words": 74, "nouns": 21, "fem_nouns": 6, "male_nouns": 11, "neutr_nouns": 4, "verbs": 9, "adj": 3, "adv": 1, "kon": 4, "neg": 0, "prep": 7, "article": 12, "fem_article": 7, "male_article": 5, "neutr_article": 0, "unknown_words": 14, "e-s": 71, "spaces": 75, "average_word_length": 5, "numbers": 3, "grammars": 11, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 1, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 1, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 4, "emotions": 0, "color": 0}'+")");
var body27 = eval("("+'{"sentences": 10, "average_sentence_length": 119, "grammar_errors": 3, "vocals": 378, "r-s": 76, "i-s_and_l-s": 116, "words": 159, "nouns": 35, "fem_nouns": 16, "male_nouns": 11, "neutr_nouns": 8, "verbs": 22, "adj": 8, "adv": 4, "kon": 5, "neg": 3, "prep": 17, "article": 19, "fem_article": 11, "male_article": 5, "neutr_article": 3, "unknown_words": 20, "e-s": 187, "spaces": 159, "average_word_length": 6, "numbers": 1, "grammars": 19, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 4, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 1, "language": 1, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 1, "color": 0}'+")");
var body29 = eval("("+'{"sentences": 1, "average_sentence_length": 128, "grammar_errors": 1, "vocals": 43, "r-s": 4, "i-s_and_l-s": 17, "words": 21, "nouns": 2, "fem_nouns": 2, "male_nouns": 0, "neutr_nouns": 0, "verbs": 4, "adj": 0, "adv": 4, "kon": 1, "neg": 1, "prep": 1, "article": 1, "fem_article": 1, "male_article": 0, "neutr_article": 0, "unknown_words": 3, "e-s": 20, "spaces": 20, "average_word_length": 4, "numbers": 0, "grammars": 2, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 1, "color": 0}'+")");
//normal
var body18 = eval("("+'{"sentences": 6, "average_sentence_length": 104, "grammar_errors": 1, "vocals": 195, "r-s": 49, "i-s_and_l-s": 57, "words": 83, "nouns": 14, "fem_nouns": 6, "male_nouns": 6, "neutr_nouns": 2, "verbs": 6, "adj": 1, "adv": 6, "kon": 3, "neg": 0, "prep": 7, "article": 14, "fem_article": 8, "male_article": 5, "neutr_article": 1, "unknown_words": 21, "e-s": 86, "spaces": 82, "average_word_length": 6, "numbers": 0, "grammars": 12, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 2, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body19 = eval("("+'{"sentences": 8, "average_sentence_length": 152, "grammar_errors": 3, "vocals": 369, "r-s": 81, "i-s_and_l-s": 104, "words": 160, "nouns": 36, "fem_nouns": 13, "male_nouns": 16, "neutr_nouns": 7, "verbs": 19, "adj": 5, "adv": 18, "kon": 2, "neg": 0, "prep": 15, "article": 25, "fem_article": 13, "male_article": 11, "neutr_article": 1, "unknown_words": 16, "e-s": 177, "spaces": 159, "average_word_length": 6, "numbers": 1, "grammars": 18, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 1}'+")");
var body21 = eval("("+'{"sentences": 18, "average_sentence_length": 95, "grammar_errors": 1, "vocals": 503, "r-s": 97, "i-s_and_l-s": 146, "words": 241, "nouns": 48, "fem_nouns": 18, "male_nouns": 22, "neutr_nouns": 8, "verbs": 27, "adj": 15, "adv": 11, "kon": 14, "neg": 2, "prep": 27, "article": 37, "fem_article": 21, "male_article": 10, "neutr_article": 6, "unknown_words": 35, "e-s": 235, "spaces": 252, "average_word_length": 5, "numbers": 21, "grammars": 34, "physics": 1, "medicin": 3, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 4, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 1, "math": 1, "military": 2, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 0, "color": 0}'+")");
var body22 = eval("("+'{"sentences": 20, "average_sentence_length": 113, "grammar_errors": 1, "vocals": 690, "r-s": 132, "i-s_and_l-s": 235, "words": 332, "nouns": 74, "fem_nouns": 16, "male_nouns": 35, "neutr_nouns": 23, "verbs": 40, "adj": 27, "adv": 34, "kon": 11, "neg": 2, "prep": 32, "article": 34, "fem_article": 19, "male_article": 10, "neutr_article": 5, "unknown_words": 24, "e-s": 301, "spaces": 328, "average_word_length": 5, "numbers": 1, "grammars": 44, "physics": 1, "medicin": 1, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 3, "biology": 0, "music": 1, "sport": 5, "technic": 2, "chemistry": 4, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 2, "geology": 0, "railway": 3, "language": 1, "art": 0, "geography": 0, "air": 1, "psychology": 0, "terrorism": 0, "emotions": 1, "color": 0}'+")");
var body23 = eval("("+'{"sentences": 11, "average_sentence_length": 140, "grammar_errors": 5, "vocals": 482, "r-s": 98, "i-s_and_l-s": 159, "words": 212, "nouns": 43, "fem_nouns": 14, "male_nouns": 21, "neutr_nouns": 8, "verbs": 20, "adj": 12, "adv": 25, "kon": 7, "neg": 2, "prep": 22, "article": 31, "fem_article": 21, "male_article": 9, "neutr_article": 1, "unknown_words": 23, "e-s": 216, "spaces": 211, "average_word_length": 6, "numbers": 5, "grammars": 25, "physics": 0, "medicin": 1, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 1, "biology": 0, "music": 0, "sport": 2, "technic": 1, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 1, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 1, "color": 0}'+")");
var body24 = eval("("+'{"sentences": 13, "average_sentence_length": 114, "grammar_errors": 4, "vocals": 451, "r-s": 93, "i-s_and_l-s": 136, "words": 208, "nouns": 42, "fem_nouns": 19, "male_nouns": 15, "neutr_nouns": 8, "verbs": 25, "adj": 18, "adv": 12, "kon": 6, "neg": 2, "prep": 18, "article": 26, "fem_article": 17, "male_article": 5, "neutr_article": 4, "unknown_words": 25, "e-s": 218, "spaces": 206, "average_word_length": 5, "numbers": 1, "grammars": 23, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 1, "technic": 3, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 1, "military": 0, "economy": 1, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 2, "color": 0}'+")");
var body26 = eval("("+'{"sentences": 12, "average_sentence_length": 117, "grammar_errors": 8, "vocals": 430, "r-s": 94, "i-s_and_l-s": 141, "words": 183, "nouns": 41, "fem_nouns": 12, "male_nouns": 19, "neutr_nouns": 10, "verbs": 26, "adj": 17, "adv": 12, "kon": 7, "neg": 1, "prep": 14, "article": 18, "fem_article": 8, "male_article": 4, "neutr_article": 6, "unknown_words": 22, "e-s": 189, "spaces": 184, "average_word_length": 6, "numbers": 4, "grammars": 30, "physics": 1, "medicin": 1, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 1, "biology": 0, "music": 0, "sport": 1, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 1, "military": 0, "economy": 1, "auto": 0, "gastronomy": 1, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 3, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 1, "terrorism": 0, "emotions": 1, "color": 0}'+")");
var body28 = eval("("+'{"sentences": 13, "average_sentence_length": 90, "grammar_errors": 3, "vocals": 342, "r-s": 64, "i-s_and_l-s": 89, "words": 170, "nouns": 33, "fem_nouns": 6, "male_nouns": 17, "neutr_nouns": 10, "verbs": 26, "adj": 8, "adv": 20, "kon": 2, "neg": 0, "prep": 19, "article": 13, "fem_article": 4, "male_article": 7, "neutr_article": 2, "unknown_words": 20, "e-s": 142, "spaces": 171, "average_word_length": 5, "numbers": 5, "grammars": 19, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 1, "biology": 0, "music": 1, "sport": 6, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 0, "emotions": 2, "color": 0}'+")");
//obigen Beispielen fehlt pro-Feld!!!! 
var body30 = eval("("+'{"sentences": 4, "average_sentence_length": 146, "grammar_errors": 1, "vocals": 51, "r-s": 5, "i-s_and_l-s": 20, "words": 24, "nouns": 2, "fem_nouns": 2, "male_nouns": 0, "neutr_nouns": 0, "verbs": 4, "adj": 0, "adv": 4, "kon": 1, "neg": 1, "prep": 1, "article": 1, "fem_article": 1, "male_article": 0, "neutr_article": 0, "unknown_words": 3, "e-s": 25, "spaces": 23, "average_word_length": 4, "numbers": 0, "grammars": 2, "pro": 6, "physics": 0, "medicin": 0, "botanic": 0, "zoology": 0, "anatomy": 0, "computer": 0, "biology": 0, "music": 0, "sport": 0, "technic": 0, "chemistry": 0, "jura": 0, "astronomy": 0, "electricity": 0, "religion": 0, "math": 0, "military": 0, "economy": 0, "auto": 0, "gastronomy": 0, "shipping": 0, "biochemistry": 0, "history": 0, "politic": 0, "geology": 0, "railway": 0, "language": 0, "art": 0, "geography": 0, "air": 0, "psychology": 0, "terrorism": 1, "emotions": 1, "color": 0}'+")");

ruleAutomata(body30, 1);
*/
function ruleAutomata (textA, id, callbackMetaData, callbackFullData){
	//Aufbau der Regeln --> Ergebnis ist der Wert, mit dem in der Datenbank gesucht werden soll (1 oder 2 oder 3)

	//Inheritance from defined prototypes
	var oface = Object.create(objFace); 
	var mData = Object.create(metaData);

	//mData Rule 1: gender
	if(textA["fem_article"]+textA["fem_nouns"]  > (1.5*textA["male_article"] + textA["neutr_article"] + textA["male_nouns"] + textA["neutr_nouns"]) ) {
		mData.gender = 3;
	}else {
		mData.gender = 1;
	}
	console.log("gender:"+mData.gender);

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

//	mData.mentalHealth = pRule( pCalculator( a ,textA["words"]) , 0.01, 0.035, 'dsc');
//	console.log("MENTAL HEALTH --- words: " + textA["words"] + " 0.7*spaces: " + 0.7*textA["spaces"] + " a/w: "+pCalculator(a,textA["words"]) + " g/w: " + pCalculator(textA["grammars"], textA["words"]) + " uw/w: " + pCalculator(textA["unknown_words"],textA["words"]) + " v/w: " + pCalculator(textA["vocals"],textA["words"]) + " spaces: " + textA["spaces"]);
	console.log("mH:"+mData.mentalHealth);

	//mData Rule 3: iq
	mData.iq = pRule( pCalculator((textA["unknown_words"]+textA["grammar_errors"]), textA["words"]) , 0.1, 0.21, 'asc');
	console.log("iq:"+ pCalculator(textA["unknown_words"]+textA["grammar_errors"], textA["words"]) );
	console.log(mData.iq);

	//mData Rule 4: age
	var a = textA["neg"] + textA["medicin"] + textA["psychology"] + textA["computer"]+textA["math"];
	if(textA["average_sentence_length"]>150&&pCalculator(a,textA["words"])>1.5){
		mData.age = 3;
	}else if (pCalculator(a,textA["words"])==0){
		mData.age = 1;
	}else mData.age = 2;

//	mData.age = pRule( pCalculator( (textA["history"]+textA["politic"]+a) ,textA["words"]), 0.01, 0.04, 'dsc' );
//	console.log("age:"+pCalculator( (textA["history"]+textA["politic"]+a) ,textA["words"]));
	console.log("age"+mData.age);

	//mData Rule 5: dangerLevel
	//var c = textA["terrorism"] + textA["biology"] + textA["physics"] + textA["chemistry"] + textA["biology"] + textA["technic"];
//	mData.dangerLevel = pRule( pCalculator( (textA["terrorism"]+textA["biology"]+textA["physics"]+textA["chemistry"]+textA["biology"]+textA["technic"]+textA["emotions"]+textA["unknown_words"]+textA["words"]+textA["grammar_errors"]),textA["words"] ) , 0.3, 1.0, 'asc' );
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
//	console.log("terror/words: "+ pCalculator(textA["terrorism"],textA["words"]) + " c/words: " + pCalculator(c,textA["words"]) + "grammars/words: " +pCalculator(textA["grammars"],textA["words"])); 
//	mData.dangerLevel = pRule( pCalculator( (textA["terrorism"]+textA["unknown_words"]+textA["grammar_errors"]),textA["words"] ) , 0.09, 0.95, 'asc' );
//	console.log("dangerLevel:"+ pCalculator( (textA["terrorism"]+textA["biology"]+textA["physics"]+textA["chemistry"]+textA["technic"]+textA["emotions"]+textA["unknown_words"]+textA["grammar_errors"]),textA["words"] ));
	console.log("DANGERLEVEL: " + mData.dangerLevel);

	//mData Rule 6: pirat
	//2 * mehr r's als e
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

	if (mData.pirat === 3){

	
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
			//scar:
			var scar;
			if(2*textA["sentences"] < textA["neg"]+textA["pro"])
			{
				scar = 3;
			}else scar = 1;
			console.log("------------------SCAR: " + scar);
			queryArray = addToQueryArray("scar", scar, queryArray);
			
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
				//hairlength = pRule( (pCalculator( (textA["adj"]), textA["words"] )+0.2) , 0.0010, 0.1, 'asc' );
				//console.log("hairlength"+ (pCalculator( (textA["adj"]), textA["words"] ) + 0.2) );
				
				//1.25 is womenfactor
				hairlength = pRule( (textA["average_sentence_length"])*2 , 90, 180, 'asc' );
				//console.log("hairlength param: "+ (textA["average_sentence_length"]*1.25));
				console.log("HL: "+hairlength);
			}else {
				//hairlength = pRule( pCalculator(textA["adj"] , textA["words"] ) , 0.0010, 0.1, 'asc' );
				//console.log("hairlength"+ pCalculator( (textA["adj"]), textA["words"] ) );

				hairlength = pRule( textA["average_sentence_length"] , 90, 180, 'asc' );
				//console.log("hairlength param: "+ (textA["average_sentence_length"]));
				console.log("HL: "+hairlength);
			}
			
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
			var eyebrowWidth = ( (mData.iq + mData.mentalHealth)/2 ).toFixed(0);
			console.log("eyebrow_width:"+((mData.iq + mData.mentalHealth)/2));
			console.log(eyebrowWidth);

			queryArray = addToQueryArray("width", eyebrowWidth, queryArray);
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
			queryArray = addToQueryArray("gender", mData.gender, queryArray);

			var beard;
			if(mData.gender === 3){
				beard = 1;
			}else{
				beard = pRule( pCalculator( textA["prep"], textA["words"] ) , 0.05, 0.10, 'asc');
				console.log("beard:"+pCalculator( textA["prep"], textA["words"] ) );
			}
			queryArray = addToQueryArray("beard", beard);
	        
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
			//console.log(util.inspect(oface));
			if (typeof callbackFullData == 'function') {
				callbackFullData(oface);
			}

			});
	}else {
		oface.id = id;
		oface.faceForm = '/man/pirat';
		if (typeof callbackFullData == 'function') {
			callbackFullData(oface);
		}
	}
}

exports.evaluateAnalyserOutput = ruleAutomata;
