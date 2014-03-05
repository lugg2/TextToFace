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
	
	private String vocals = "(a|e|i|o|u|A|E|I|O|U)";
	private String stringNature = "(Welt|Natur|Himmel|Erde|Wasser|Feuer|Luft|Tiere|Blumen|Umwelt|Mensch)";
	private String stringUni = "(Universität|Student|Dozent|Uni|Vorlesung|Kurs|Doktor|Studentin|Klausur|Immatrikulation|Exmatrikulation)";
	
	private String st_sentences = "sentences";
	private String st_errors = "grammar errors";
	private String st_unknown = "unknown words";
	private String st_vocals = "vocals";
	private String st_nouns = "nouns";
	private String st_verbs = "verbs";
	private String st_adj = "adj";
	private String st_kon = "kon";
	private String st_adv = "adv";
	private String st_neg = "neg";
	private String st_prep = "prep";
	private String st_art = "artikel";
	private String st_uni = "uni";
	private String st_nature = "nature";
	
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
	
		System.out.println("---- grammar errors: ----");
		for (RuleMatch match : matches) {
			System.out.println("Potential error at line " +
				      match.getLine() + ", column " +
				      match.getColumn() + ": " + match.getMessage());
				  System.out.println("Suggested correction: " +
				      match.getSuggestedReplacements());
			numb_errors++;
		}
		
		//count unknown words
		int numb_unknown = 0;
		List<String> liste = langTool.getUnknownWords();
		System.out.println("---- unkown words: ----");
		for(int i=0; i<liste.size(); i++)
		{
			numb_unknown++;
			System.out.println(liste.get(i));
		}
		
		//count all sentences
		int numb_sentences = langTool.getSentenceCount();
		
		//create new Rules
		PersonalRule myRule = new PersonalRule();
		
		//count all VOCALS
		System.out.println("---- vocals: ----");
		int numb_vocals = 0;
		Pattern p = Pattern.compile("(a|e|i|o|u|A|E|I|O|U)");
		Matcher m = p.matcher(enteredText);
		while (m.find())
		{
			System.out.println("found: " + m.toString());
			numb_vocals++;
		}
		
		//check for word of the class NATURE
		System.out.println("---- nature: ----");
		myRule.addPattern(stringNature);
		int numb_nature = 0;
		try {
			numb_nature = myRule.analyse(langTool, langTool.getAnalyzedSentence(enteredText));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//check for word of the class UNI
		System.out.println("---- uni: ----");
		myRule.addPattern(stringUni);
		int numb_uni = 0;
		try {
			numb_uni = myRule.analyse(langTool, langTool.getAnalyzedSentence(enteredText));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
	/*	try {
			AnalyzedSentence sentence = langTool.getRawAnalyzedSentence(enteredText);
			AnalyzedTokenReadings[] tokens = sentence.getTokensWithoutWhitespace();
			for(int i = 0; i<tokens.length; i++)
			{
				System.out.println(tokens[i].getReadingsLength());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	*/
		
		//count nouns, verbs, adj, ...
		int numb_noun = 0;
		int numb_ver = 0;
		int numb_adj = 0;
		int numb_adv = 0;
		int numb_kon = 0;
		int numb_neg = 0;
		int numb_prp = 0;
		int numb_art = 0;
		
		System.out.println("---- sub/ver: ----");
		try {
			AnalyzedSentence sentence = langTool.getRawAnalyzedSentence(enteredText);
			AnalyzedTokenReadings[] tokens = sentence.getTokensWithoutWhitespace();
			for(int i = 0; i<tokens.length; i++) 
			{
				AnalyzedToken tok = tokens[i].getAnalyzedToken(0);
				if(!tok.hasNoTag())
				{
					//System.out.println(tok.getToken() + " " + tok.getPOSTag());
					if(tok.getPOSTag().startsWith("SUB"))
					{
						numb_noun++;
						System.out.println("substantiv: " + tok.getToken());
					}
					if (tok.getPOSTag().startsWith("VER"))
					{
						System.out.println("verb: " + tok.getToken());
						numb_ver++;
					}
					if (tok.getPOSTag().startsWith("ADJ"))
					{
						System.out.println("adjektiv: " + tok.getToken());
						numb_adj++;
					}
					if (tok.getPOSTag().startsWith("ADV"))
					{
						System.out.println("adverb: " + tok.getToken());
						numb_adv++;
					}
					if (tok.getPOSTag().startsWith("KON"))
					{
						System.out.println("konjunktion: " + tok.getToken());
						numb_kon++;
					}
					if (tok.getPOSTag().startsWith("NEG"))
					{
						System.out.println("negation: " + tok.getToken());
						numb_neg++;
					}
					if (tok.getPOSTag().startsWith("PRP"))
					{
						System.out.println("preposition: " + tok.getToken());
						numb_prp++;
					}
					if (tok.getPOSTag().startsWith("ART"))
					{
						System.out.println("artikel: " + tok.getToken());
						numb_art++;
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		//give stored information
		System.out.println("----JSON----");
		System.out.println("{");
		System.out.println('"' + st_sentences + '"' + ": " + numb_sentences + ",");
		System.out.println('"' + st_errors + '"' + ": " + numb_errors + ",");
		System.out.println('"' + st_unknown + '"' + ": " + numb_unknown + ",");
		System.out.println('"' + st_vocals + ": " + numb_vocals + ",");
		System.out.println('"' + st_nouns + '"' + ": " + numb_noun + ",");
		System.out.println('"' + st_verbs + '"' + ": " + numb_ver + ",");
		System.out.println('"' + st_adj + '"' + ": " + numb_adj + ",");
		System.out.println('"' + st_adv + '"' + ": " + numb_adv + ",");
		System.out.println('"' + st_kon + '"' + ": " + numb_kon + ",");
		System.out.println('"' + st_neg + '"' + ": " + numb_neg + ",");
		System.out.println('"' + st_prep + '"' + ": " + numb_prp + ",");
		System.out.println('"' + st_art + '"' + ": " + numb_art + ",");
		System.out.println('"' + st_uni + '"' + ": " + numb_uni + ",");
		System.out.println('"' + st_nature + '"' + ": " + numb_nature);
		System.out.print("}");
	}
}
