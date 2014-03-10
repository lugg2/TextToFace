package Project;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.languagetool.AnalyzedSentence;
import org.languagetool.AnalyzedToken;
import org.languagetool.AnalyzedTokenReadings;
import org.languagetool.JLanguageTool;
import org.languagetool.language.German;
import org.languagetool.rules.RuleMatch;


public class Calculator {
	
	//private String stringNature = "(Welt|Natur|Himmel|Erde|Wasser|Feuer|Luft|Tiere|Blumen|Umwelt|Mensch)";
//	private String stringUni = "(Universität|Student|Dozent|Uni|Vorlesung|Kurs|Doktor|Studentin|Klausur|Immatrikulation|Exmatrikulation|Bachelor|Master|Doktor)";
	//private String stringHuman = "(Mensch|Körper|Hals|Rachen|Kehle|Gurgel|Kinn|Haare|Augenbrauen|Augenwimpern|Bart|Gesichtshaar|Schnurrbart|Hand|Arm|Ohr|Gehör|Nasenlöcher|Nüstern|Rücken|Nase|Brustwarzen|Fuß|Bein|Auge|Zehen|Finger|Zunge|Herz|Lungen|Achseln|Schultern|Stirn|Gesicht|duschen|Blut|Mund|Zähne|Körperteil)";
	//...TO DO... look at http://rowa.giso.de/languages/toki-pona/german/latex/Thematische_Wortliste.html 
	
	public void doCalculations(String enteredText){
		
		//access to all rules over langTool
		JLanguageTool langTool = null;
		try {
			langTool = new JLanguageTool(new German());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//activation of all default pattern rules
		try {
			langTool.activateDefaultPatternRules();
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		//check the entered text for errors	
		List<RuleMatch> matches = null;
		int numb_errors = 0;
		langTool.setListUnknownWords(true);
		try {
			matches = langTool.check(enteredText);
		} catch (IOException e) {
			e.printStackTrace();
		}
		numb_errors = matches.size(); 									//numb_errors
		
		//count unknown words
		int numb_unknown = 0;
		List<String> liste = langTool.getUnknownWords();
		numb_unknown = liste.size();									//numb_unknown
		
		//average length of sentences
		int average_length_sentence = 0;
			//list of all sentences
		List<String> sentences = langTool.sentenceTokenize(enteredText);		
		for(int i=0; i<sentences.size(); i++)
		{
			average_length_sentence += sentences.get(i).length()-1;
		}		
		average_length_sentence /= sentences.size();					//average_length_sentence

		//number of all sentences
		int numb_sentences = 0;
		numb_sentences = sentences.size();								//numb_sentence
		
		//count all VOCALS
		int numb_vocals = 0;
		Pattern p = Pattern.compile("(a|e|i|o|u|A|E|I|O|U)");
		Matcher m = p.matcher(enteredText);
		while (m.find())
		{
			numb_vocals++;												//numb_vocals
		}
				
		//count nouns, verbs, adj, ...
		int numb_noun = 0;
		int numb_ver = 0;
		int numb_adj = 0;
		int numb_adv = 0;
		int numb_kon = 0;
		int numb_neg = 0;
		int numb_prp = 0;
		int numb_art = 0;

		
		try {
			AnalyzedSentence textComplete = langTool.getRawAnalyzedSentence(enteredText);
			AnalyzedTokenReadings[] tokens = textComplete.getTokensWithoutWhitespace();
			for(int i = 0; i<tokens.length; i++) 
			{
				AnalyzedToken tok = tokens[i].getAnalyzedToken(0);
				if(!tok.hasNoTag())
				{
					if(tok.getPOSTag().startsWith("SUB"))
					{
						numb_noun++;									//numb_noun
					//	System.out.println("Token: " + tok.getTokenInflected());
					}
					if (tok.getPOSTag().startsWith("VER"))
					{
						numb_ver++;										//numb_ver
					}
					if (tok.getPOSTag().startsWith("ADJ"))
					{
						numb_adj++;										//numb_adj
					}
					if (tok.getPOSTag().startsWith("ADV"))
					{
						numb_adv++;										//numb_adv
					}
					if (tok.getPOSTag().startsWith("KON"))
					{
						numb_kon++;										//numb_kon
					}
					if (tok.getPOSTag().startsWith("NEG"))
					{
						numb_neg++;										//numb_neg
					}
					if (tok.getPOSTag().startsWith("PRP"))
					{
						numb_prp++;										//numb_prp
					}
					if (tok.getPOSTag().startsWith("ART"))
					{
						numb_art++;										//numb_art
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//count all words
		int numb_words = 0;
		//look for word categories
		int numb_fach = 0;
		int numb_umg = 0;
		int numb_derb = 0;
		int numb_vulg = 0;
		int numb_gehoben = 0;
		String output = "";

		Pattern p2 = Pattern.compile("[a-zA-ZäüöÄÜÖ]+");
		Matcher m2 = p2.matcher(enteredText);
		while (m2.find())
		{	
			numb_words++;												//numb_words
			System.out.println(m2.group());
			ThesaurusRequest request = new ThesaurusRequest(m2.group(), "de_DE", "RfsrOE9pqomqemzCsbCl", "json");
			output = request.getList();
			if(output.contains("fachsprachlich"))
			{
				numb_fach++;
				System.out.println("fachsprache");
			}
			if(output.contains("umgangssprachlich"))
			{
				numb_umg++;
				System.out.println("umgangsprache");
			}
			if(output.contains("derb"))
			{
				numb_derb++;
				System.out.println("derb");
			}
			if(output.contains("vulgär"))
			{
				numb_vulg++;
				System.out.println("vulgär");
			}
			if(output.contains("gehoben"))
			{
				numb_gehoben++;
				System.out.println("gehoben");
			}
		
		}
		
		/*
		//create own rules
		PersonalRule myRule = new PersonalRule();

		//check for word of the class NATURE
		myRule.addPattern(stringNature);
		int numb_nature = 0;											//numb_nature
		try {
			numb_nature = myRule.analyse(langTool, langTool.getAnalyzedSentence(enteredText));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//check for word of the class UNI
		myRule.addPattern(stringUni);
		int numb_uni = 0;												//numb_uni
		try {
			numb_uni = myRule.analyse(langTool, langTool.getAnalyzedSentence(enteredText));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//check for word of the class HUMAN
		myRule.addPattern(stringHuman);
		int numb_human = 0;												//numb_human
		try {
			numb_human = myRule.analyse(langTool, langTool.getAnalyzedSentence(enteredText));
		} catch (IOException e) {
			e.printStackTrace();
		}
		*/
		
		//give stored information
		System.out.println("{");
		System.out.println('"' + "sentences" + '"' + ": " + numb_sentences + ",");
		System.out.println('"' + "average length" + '"' + ": " + average_length_sentence + ",");
		System.out.println('"' + "grammar errors" + '"' + ": " + numb_errors + ",");
		System.out.println('"' + "unknown words" + '"' + ": " + numb_unknown + ",");
		System.out.println('"' + "vocals" + ": " + numb_vocals + ",");
		System.out.println('"' + "words" + '"' + ": " + numb_words + ",");
		System.out.println('"' + "nouns" + '"' + ": " + numb_noun + ",");
		System.out.println('"' + "verbs" + '"' + ": " + numb_ver + ",");
		System.out.println('"' + "adj" + '"' + ": " + numb_adj + ",");
		System.out.println('"' + "adv" + '"' + ": " + numb_adv + ",");
		System.out.println('"' + "kon" + '"' + ": " + numb_kon + ",");
		System.out.println('"' + "neg" + '"' + ": " + numb_neg + ",");
		System.out.println('"' + "prep" + '"' + ": " + numb_prp + ",");
		System.out.println('"' + "article" + '"' + ": " + numb_art);
		System.out.println('"' + "fach" + '"' + ": " + numb_fach + ",");
		System.out.println('"' + "umg" + '"' + ": " + numb_umg + ",");
		System.out.println('"' + "vulg" + '"' + ": " + numb_vulg + ",");
		System.out.println('"' + "derb" + '"' + ": " + numb_derb + ",");
		System.out.println('"' + "gehoben" + '"' + ": " + numb_gehoben);
		//System.out.println('"' + "uni" + '"' + ": " + numb_uni + ",");
		//System.out.println('"' + "nature" + '"' + ": " + numb_nature + ",");
		//System.out.println('"' + "human" + '"' + ": " + numb_human);
		System.out.print("}");
	}
}
