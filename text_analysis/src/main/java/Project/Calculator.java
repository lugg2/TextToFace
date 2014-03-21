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
	
	public void doCalculations(String enteredText){
		
		//access to all rules over langTool
		JLanguageTool langTool = null;
		try {
			langTool = new JLanguageTool(new German());
		} catch (IOException e) {
			System.out.println("no access to languageTool");
		}
		
		//activation of all default pattern rules
		try {
			langTool.activateDefaultPatternRules();
		} catch (IOException e) {
			System.out.println("languageTool default rules cannot be activated");
		}
	
		//check the entered text for errors	
		List<RuleMatch> matches = null;
		int numb_errors = 0;
		
		langTool.setListUnknownWords(true);
		try {
			matches = langTool.check(enteredText);
			numb_errors = matches.size(); 								//numb_errors
		} catch (IOException e) {
			System.out.println("languageTool check failure");
		}
		
		//count unknown words
		int numb_unknown = 0;
		List<String> liste = langTool.getUnknownWords();
		numb_unknown = liste.size();									//numb_unknown
		
		//average length of sentences
		int average_length_sentence = 0;
		//number of all sentences
		int numb_sentences = 0;
			
		//list of all sentences
		List<String> sentences = langTool.sentenceTokenize(enteredText);		
		for(int i=0; i<sentences.size(); i++)
		{
			numb_sentences++;											//numb_sentences
			average_length_sentence += sentences.get(i).length();
		}		
		average_length_sentence /= sentences.size();					//average_length_sentence

		//count all VOCALS
		int numb_vocals = 0;
		Pattern p = Pattern.compile("(a|e|i|o|u|A|E|I|O|U)");
		Matcher m = p.matcher(enteredText);
		while (m.find()) numb_vocals++;								 	//numb_vocals
		
		//count nouns, verbs, adj, ...
		int numb_noun = 0;
		int numb_noun_fem = 0;
		int numb_noun_male = 0;
		int numb_noun_neutr = 0;
		int numb_ver = 0;
		int numb_adj = 0;
		int numb_adv = 0;
		int numb_kon = 0;
		int numb_neg = 0;
		int numb_prp = 0;
		int numb_art = 0;
		int numb_art_fem = 0;
		int numb_art_male = 0;
		int numb_art_neutr = 0;
		
		//count category words
		int[] category_counter  = new int[33];
		String[] category_title = new String[33];
		//category title
		category_title[0] = "physics";
		category_title[1] = "medicin";
		category_title[2] = "botanic";
		category_title[3] = "zoology";
		category_title[4] = "anatomy";
		category_title[5] = "computer";
		category_title[6] = "biology";
		category_title[7] = "music";
		category_title[8] = "sport";
		category_title[9] = "technic";
		category_title[10] = "chemistry";
		category_title[11] = "jura";
		category_title[12] = "astronomy";
		category_title[13] = "electricity";
		category_title[14] = "religion";
		category_title[15] = "figurative";
		category_title[16] = "ugs";
		category_title[17] = "math";
		category_title[18] = "military";
		category_title[19] = "economy";
		category_title[20] = "auto";
		category_title[21] = "gastronomy";
		category_title[22] = "shipping";
		category_title[23] = "biochemistry";
		category_title[24] = "history";
		category_title[25] = "politic";
		category_title[26] = "geology";
		category_title[27] = "railway";
		category_title[28] = "language";
		category_title[29] = "geography";
		category_title[30] = "air";
		category_title[31] = "psychology";
		category_title[32] = "terrorism";
		
		DBAccess db = new DBAccess();
		db.establishConnection();

		try {
			AnalyzedSentence textComplete = langTool.getRawAnalyzedSentence(enteredText);
			AnalyzedTokenReadings[] tokens = textComplete.getTokensWithoutWhitespace();

			for(int i = 0; i<tokens.length; i++) 
			{
				AnalyzedToken tok = tokens[i].getAnalyzedToken(0);
				
				if(!tok.hasNoTag())
				{
					if(tok.getPOSTag().contains("SUB"))
					{
						category_counter = db.checkToken(category_counter, tok.getTokenInflected());							
						numb_noun++;									//numb_noun
						
						if(tok.getPOSTag().contains("FEM"))
						{
							numb_noun_fem++;
						}
						else if(tok.getPOSTag().contains("MAS")) 
							{
								numb_noun_male++;
							}
							else numb_noun_neutr++;
					}
					if (tok.getPOSTag().contains("VER"))
					{
						category_counter = db.checkToken(category_counter, tok.getTokenInflected());							
						numb_ver++;										//numb_ver	
					}
					if (tok.getPOSTag().contains("ADJ"))
					{
						numb_adj++;										//numb_adj
					}
					if (tok.getPOSTag().contains("ADV"))
					{
						numb_adv++;										//numb_adv
					
					}
					if (tok.getPOSTag().contains("KON"))
					{
						numb_kon++;										//numb_kon
						
					}
					if (tok.getPOSTag().contains("NEG"))
					{
						numb_neg++;										//numb_neg
					}
					if (tok.getPOSTag().contains("PRP"))
					{
						numb_prp++;										//numb_prp
					}
					if (tok.getPOSTag().contains("ART") && !tok.getPOSTag().contains("START"))
					{
						numb_art++;										//numb_art
						if(tok.getPOSTag().contains("FEM"))
						{
							numb_art_fem++;
						}
						else 
							if (tok.getPOSTag().contains("MAS")) 
							{
								numb_art_male++;
							}
							else numb_art_neutr++;
					}
				}
			}
		} catch (IOException e) {
			System.out.println("languageTool failure by word group check");
		}
		
		db.closeConnection();
		
		//count all words
		int numb_words = 0;
		Pattern p2 = Pattern.compile("[a-zA-ZäüöÄÜÖ]+");
		Matcher m2 = p2.matcher(enteredText);
		while (m2.find()) numb_words++;												//numb_words
					
		//count all R´s
		int numb_r = 0;
		Pattern p3 = Pattern.compile("(r|R)");
		Matcher m3 = p3.matcher(enteredText);
		while (m3.find()) numb_r++;												 	//numb_r
						
		//count all i´s and l´s 
		int numb_i_l = 0;
		Pattern p4 = Pattern.compile("(i|I|l|L)");
		Matcher m4 = p4.matcher(enteredText);
		while (m4.find()) numb_i_l++;												 //numb_i_l

		//give stored information
		System.out.println("{");
		System.out.println('"' + "sentences" + '"' + ": " + numb_sentences + ",");
		System.out.println('"' + "average length" + '"' + ": " + average_length_sentence + ",");
		System.out.println('"' + "grammar errors" + '"' + ": " + numb_errors + ",");
		System.out.println('"' + "vocals" + ": " + numb_vocals + ",");
		System.out.println('"' + "r-s" + ": " + numb_r + ",");
		System.out.println('"' + "i- and l-s" + ": " + numb_i_l + ",");
		System.out.println('"' + "words" + '"' + ": " + numb_words + ",");
		System.out.println('"' + "nouns" + '"' + ": " + numb_noun + ",");
		System.out.println('"' + "fem nouns" + '"' + ": " + numb_noun_fem + ",");
		System.out.println('"' + "male nouns" + '"' + ": " + numb_noun_male + ",");
		System.out.println('"' + "neutr nouns" + '"' + ": " + numb_noun_neutr + ",");
		System.out.println('"' + "verbs" + '"' + ": " + numb_ver + ",");
		System.out.println('"' + "adj" + '"' + ": " + numb_adj + ",");
		System.out.println('"' + "adv" + '"' + ": " + numb_adv + ",");
		System.out.println('"' + "kon" + '"' + ": " + numb_kon + ",");
		System.out.println('"' + "neg" + '"' + ": " + numb_neg + ",");
		System.out.println('"' + "prep" + '"' + ": " + numb_prp + ",");
		System.out.println('"' + "article" + '"' + ": " + numb_art + ",");
		System.out.println('"' + "fem article" + '"' + ": " + numb_art_fem + ",");
		System.out.println('"' + "male article" + '"' + ": " + numb_art_male + ",");
		System.out.println('"' + "neutr article" + '"' + ": " + numb_art_neutr + ",");
		for (int i=0; i<category_counter.length; i++)
		{
			System.out.println('"' + category_title[i] + '"' + ": " + category_counter[i] + ",");			
		}
		System.out.println('"' + "unknown words" + '"' + ": " + numb_unknown);
		System.out.print("}");
	}
}