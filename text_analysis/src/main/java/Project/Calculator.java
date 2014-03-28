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

public class Calculator 
{
	private JLanguageTool langTool;
	private List<RuleMatch> matches;
	private int numb_errors;
	private int numb_unknown;
	private int average_length_sentence;
	private int numb_sentences;
	private int numb_vocals;
	private Pattern p;
	private Matcher m;
	private int numb_noun;
	private int numb_noun_fem;
	private int numb_noun_male;
	private int numb_noun_neutr;
	private int numb_ver;
	private int numb_adj;
	private int numb_adv;
	private int numb_kon;
	private int numb_neg;
	private int numb_prp;
	private int numb_art;
	private int numb_art_fem;
	private int numb_art_male;
	private int numb_art_neutr;
	private int[] category_counter;
	private String[] category_title;
	private DBAccess db;
	private int numb_words;
	private int numb_r;
	private int numb_i_l;
	private String errorID;
	
	public void doInitialisations()
	{
		errorID = "00";
		langTool = null;
	
		//access to all rules over langTool plus activation of all default pattern rules
		try {
			langTool = new JLanguageTool(new German());
			langTool.activateDefaultPatternRules();
			langTool.setListUnknownWords(true);
		} catch (IOException e) {
			errorID = "05";
		}

		matches = null;
		numb_errors = 0;
		numb_unknown = 0;
		average_length_sentence = 0;
		numb_sentences = 0;
		numb_vocals = 0;
		numb_noun = 0;
		numb_noun_fem = 0;
		numb_noun_male = 0;
		numb_noun_neutr = 0;
		numb_ver = 0;
		numb_adj = 0;
		numb_adv = 0;
		numb_kon = 0;
		numb_neg = 0;
		numb_prp = 0;
		numb_art = 0;
		numb_art_fem = 0;
		numb_art_male = 0;
		numb_art_neutr = 0;
		numb_words = 0;
		numb_r = 0;
		numb_i_l = 0;		
		db = new DBAccess();
		category_counter  = new int[36];
		for(int i=0; i<category_counter.length; i++) category_counter[i] = 0;
		category_title = new String[36];
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
		category_title[29] = "art";
		category_title[30] = "geography";
		category_title[31] = "air";
		category_title[32] = "psychology";
		category_title[33] = "terrorism";
		category_title[34] = "emotions";
		category_title[35] = "color";
	}
	
	public String doCalculations(String enteredText)
	{		
		//check the entered text for errors	
		try {
			matches = langTool.check(enteredText);
			numb_errors = matches.size(); 									//numb_errors
		} catch (IOException e) {
			errorID = "06";
			return ""; 
		}
		
		//count unknown words
		List<String> listUnknown = langTool.getUnknownWords();
		numb_unknown = listUnknown.size();									//numb_unknown
		
		//list of all sentences
		List<String> listSentences = langTool.sentenceTokenize(enteredText);		
		for(int i=0; i<listSentences.size(); i++)
		{
			numb_sentences++;												//numb_sentences
			average_length_sentence += listSentences.get(i).length();
		}		
		average_length_sentence /= listSentences.size();					//average_length_sentence

		//count all VOCALS
		p = Pattern.compile("(a|e|i|o|u|A|E|I|O|U)");
		m = p.matcher(enteredText);
		while (m.find()) numb_vocals++;									 	//numb_vocals
		
		//Thesaurus-DB access
		db.establishConnection();

		if(!db.isError())
		{
			try {
				AnalyzedSentence textComplete = langTool.getRawAnalyzedSentence(enteredText);
				AnalyzedTokenReadings[] tokens = textComplete.getTokensWithoutWhitespace();

				for(int i = 0; i<tokens.length; i++) 
				{
					AnalyzedToken tok = tokens[i].getAnalyzedToken(0);
					if(!tok.hasNoTag())
					{
						category_counter = db.checkToken(category_counter, tok.getTokenInflected());							
						if(tok.getPOSTag().contains("SUB"))
						{
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
						if (tok.getPOSTag().contains("VER")) numb_ver++;	//numb_ver	
						if (tok.getPOSTag().contains("ADJ")) numb_adj++;	//numb_adj
						if (tok.getPOSTag().contains("ADV")) numb_adv++;	//numb_adv
						if (tok.getPOSTag().contains("KON")) numb_kon++;	//numb_kon
						if (tok.getPOSTag().contains("NEG")) numb_neg++;	//numb_neg
						if (tok.getPOSTag().contains("PRP")) numb_prp++;	//numb_prp
						
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
				errorID = "07";
				return "";
			}
		}else errorID = db.getErrorID();
		
		db.closeConnection();
		if(db.isError()) errorID = db.getErrorID();
		
		//count all words
		p = Pattern.compile("[a-zA-ZäüöÄÜÖß]+");
		m = p.matcher(enteredText);
		while (m.find()) numb_words++;												//numb_words
		
		//count all R´s
		p = Pattern.compile("(r|R)");
		m = p.matcher(enteredText);
		while (m.find()) numb_r++;												 	//numb_r
						
		//count all i´s and l´s 
		p = Pattern.compile("(i|I|l|L)");
		m = p.matcher(enteredText);
		while (m.find()) numb_i_l++;												 //numb_i_l

		
		//give stored information
		String str_start = "{";
		String[] str = new String[22];
		str[0] = ('"' + "sentences" + '"' + ": " + numb_sentences + ", ");
		str[1] = ('"' + "average length" + '"' + ": " + average_length_sentence + ", ");
		str[2] = ('"' + "grammar errors" + '"' + ": " + numb_errors + ", ");
		str[3] = ('"' + "vocals" + ": " + numb_vocals + ", ");
		str[4] = ('"' + "r-s" + ": " + numb_r + ", ");
		str[5] = ('"' + "i- and l-s" + ": " + numb_i_l + ", ");
		str[6] = ('"' + "words" + '"' + ": " + numb_words + ", ");
		str[7] = ('"' + "nouns" + '"' + ": " + numb_noun + ", ");
		str[8] = ('"' + "fem nouns" + '"' + ": " + numb_noun_fem + ", ");
		str[9] = ('"' + "male nouns" + '"' + ": " + numb_noun_male + ", ");
		str[10] = ('"' + "neutr nouns" + '"' + ": " + numb_noun_neutr + ", ");
		str[11] = ('"' + "verbs" + '"' + ": " + numb_ver + ", ");
		str[12] = ('"' + "adj" + '"' + ": " + numb_adj + ", ");
		str[13] = ('"' + "adv" + '"' + ": " + numb_adv + ", ");
		str[14] = ('"' + "kon" + '"' + ": " + numb_kon + ", ");
		str[15] = ('"' + "neg" + '"' + ": " + numb_neg + ", ");
		str[16] = ('"' + "prep" + '"' + ": " + numb_prp + ", ");
		str[17] = ('"' + "article" + '"' + ": " + numb_art + ", ");
		str[18] = ('"' + "fem article" + '"' + ": " + numb_art_fem + ", ");
		str[19] = ('"' + "male article" + '"' + ": " + numb_art_male + ", ");
		str[20] = ('"' + "neutr article" + '"' + ": " + numb_art_neutr + ", ");
		str[21] = ('"' + "unknown words" + '"' + ": " + numb_unknown + ", ");
		String[] str_cat = new String[category_counter.length];
		for (int i=0; i<category_counter.length-1; i++)
		{
			str_cat[i] = ('"' + category_title[i] + '"' + ": " + category_counter[i] + ", ");			
		}
		str_cat[category_counter.length-1] = ('"' + category_title[category_counter.length-1] + '"' + ": " + category_counter[category_counter.length-1]);			

		String str_end = "}";
		
		//concatenation of the complete JSON-String
		String completeJSON = "";
		completeJSON += str_start;
		for(int i=0; i<22; i++)
		{
			completeJSON += str[i];
		}
		for(int i=0; i<category_counter.length; i++)
		{
			completeJSON += str_cat[i];
		}
		completeJSON += str_end;
		
		return completeJSON;
	}
	
	public boolean isError()
	{
		if(errorID.contains("00"))
		{
			return false;
		}else return true;
	}
	
	public String getErrorID()
	{
		return errorID;
	}
}