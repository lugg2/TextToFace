/*
 * Autor: Melanie Hammerschmidt
 * Reviewer: Lukas, Patrick
 * 
 * Description: Calculator
 * calculations for a certain text
 * 
 */

package Project;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.languagetool.AnalyzedSentence;
import org.languagetool.AnalyzedToken;
import org.languagetool.AnalyzedTokenReadings;
import org.languagetool.JLanguageTool;
import org.languagetool.language.German;

public class Calculator 
{
	private JLanguageTool langTool;

	private int[] counter;
	private int[] category_counter;
	private String[] counter_title;
	private String[] category_title;
	
	private DBAccess db;
	private String errorID;
	
	private String[] str;
	private String[] str_cat;
	
	private String str_start;
	private String str_end;
	
	private Pattern p;
	private Matcher m;
		
	public void doInitialisations(String path)
	{
		initErrorID();
		langTool = null;
	
		//access to all rules over langTool plus activation of all default pattern rules
		try {
			langTool = new JLanguageTool(new German());
			langTool.activateDefaultPatternRules();
			langTool.setListUnknownWords(true);
		} catch (IOException e) {
			errorID = "05";
		}
		
		//Thesaurus-DB access
		db = new DBAccess();
		db.establishConnection(path);
		if(db.isError()) errorID = db.getErrorID();
		
		category_title = new String[34];
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
		category_title[15] = "math";
		category_title[16] = "military";
		category_title[17] = "economy";
		category_title[18] = "auto";
		category_title[19] = "gastronomy";
		category_title[20] = "shipping";
		category_title[21] = "biochemistry";
		category_title[22] = "history";	
		category_title[23] = "politic";
		category_title[24] = "geology";
		category_title[25] = "railway";
		category_title[26] = "language";
		category_title[27] = "art";
		category_title[28] = "geography";
		category_title[29] = "air";
		category_title[30] = "psychology";
		category_title[31] = "terrorism";
		category_title[32] = "emotions";
		category_title[33] = "color";

		counter_title = new String[28];
		counter_title[0] = "sentences";
		counter_title[1] = "average_sentence_length";
		counter_title[2] = "grammar_errors";
		counter_title[3] = "vocals";
		counter_title[4] = "r-s";
		counter_title[5] = "i-s_and_l-s";
		counter_title[6] = "words";
		counter_title[7] = "nouns";
		counter_title[8] = "fem_nouns";
		counter_title[9] = "male_nouns";
		counter_title[10] = "neutr_nouns";
		counter_title[11] = "verbs";
		counter_title[12] = "adj";
		counter_title[13] = "adv";
		counter_title[14] = "kon";
		counter_title[15] = "neg";
		counter_title[16] = "prep";
		counter_title[17] = "article";
		counter_title[18] = "fem_article";
		counter_title[19] = "male_article";
		counter_title[20] = "neutr_article";
		counter_title[21] = "unknown_words";
		counter_title[22] = "e-s";
		counter_title[23] = "spaces";
		counter_title[24] = "average_word_length";
		counter_title[25] = "numbers";
		counter_title[26] = "grammars";
		counter_title[27] = "pro";
		
		category_counter  = new int[category_title.length];
		counter  = new int[counter_title.length];
		
		str_start = "{";
		str_end = "}";
		
		str = new String[counter.length];
		str_cat = new String[category_counter.length];
		
		initializeJSON();
	}
	
	public void initErrorID()
	{
		errorID = "00";
	}

	public void initializeJSON()
	{
		for(int i=0; i<counter.length; i++) counter[i] = 0;
		for(int k=0; k<category_counter.length; k++) category_counter[k] = 0;
	}
	
	public String doCalculations(String enteredText)
	{	
		List<String> words = new ArrayList<String>();
		//count all words
		p = Pattern.compile("[a-zA-Z‰¸ˆƒ‹÷ﬂ-]+");
		m = p.matcher(enteredText);
		while (m.find()) 
		{
			words.add(m.group());
		}
		
		for(int l=0; l<words.size(); l++)
		{
			counter[6]++;												//numb_words				
			counter[24] += words.get(l).length();
		}
		if(counter[6]!=0) counter[24] /= counter[6];					//average_word_length
		
		//check if there have been words included and there was no db access error
		if(counter[6]!=0 && !db.isError())
		{
			//------------------------languageTool access---------------------------
			
			//check the entered text for errors	
			try {
				counter[2] = langTool.check(enteredText).size(); 				//numb_errors
			} catch (IOException e) {
				errorID = "06";
				return ""; 
			}
		
			//count unknown words
			counter[21] = langTool.getUnknownWords().size();					//numb_unknown
		
			//list of all sentences
			List<String> listSentences = langTool.sentenceTokenize(enteredText);		
			for(int i=0; i<listSentences.size(); i++)
			{
				counter[0]++;													//numb_sentences
				counter[1] += listSentences.get(i).length();
			}		
			counter[1] /= listSentences.size();									//average_sentence_length
			
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
							//-----------------------Thesaurus-DB access---------------------------
							category_counter = db.checkToken(category_counter, tok.getTokenInflected());
							counter[7]++;									//numb_noun
						
							if(tok.getPOSTag().contains("FEM"))
							{
								counter[8]++;								//numb_fem_noun
							}
							else if(tok.getPOSTag().contains("MAS")) 
								{
									counter[9]++;							//numb_male_noun
								}
								else counter[10]++;							//numb_neutr_noun
						}
						
						if (tok.getPOSTag().startsWith("VER")){
							//-----------------------Thesaurus-DB access---------------------------
							category_counter = db.checkToken(category_counter, tok.getTokenInflected());
							counter[11]++;									//numb_ver	
						}
						
						if (tok.getPOSTag().startsWith("ADJ")){
							//-----------------------Thesaurus-DB access---------------------------
							category_counter = db.checkToken(category_counter, tok.getTokenInflected());
							counter[12]++;									//numb_adj
						}
						
						if (tok.getPOSTag().startsWith("ADV")){
							//-----------------------Thesaurus-DB access---------------------------
							category_counter = db.checkToken(category_counter, tok.getTokenInflected());
							counter[13]++;									//numb_adv
						}
						
						if (tok.getPOSTag().startsWith("NEG")){
							//-----------------------Thesaurus-DB access---------------------------
							category_counter = db.checkToken(category_counter, tok.getTokenInflected());
							counter[15]++;									//numb_neg
						}
						if (tok.getPOSTag().startsWith("PRO")) counter[27]++;		//numb_pro
						if (tok.getPOSTag().startsWith("KON")) counter[14]++;		//numb_kon
						if (tok.getPOSTag().startsWith("PRP")) counter[16]++;		//numb_prp
						if (tok.getPOSTag().startsWith("ART"))
						{
							counter[17]++;										//numb_art

							if(tok.getPOSTag().contains("FEM"))
							{
								counter[18]++;								//numb_art_fem
							}	
							else 
								if (tok.getPOSTag().contains("MAS")) 
								{
									counter[19]++;							//numb_art_male
								}
								else counter[20]++;							//numb_art_neut
						}	
					}
				}
			} catch (IOException e) {
				errorID = "07";
				return "";
			}
			
			if(db.isError()) errorID = db.getErrorID();

			//--------------------------------regular expressions---------------------------------
			//count all VOCALS
			counter[3] = regExp("(a|e|i|o|u|A|E|I|O|U)", enteredText);			//numb_vocals
			//count all R¥s
			counter[4] = regExp("(r|R)", enteredText);							//numb_r
			//count all i¥s and l¥s 
			counter[5] = regExp("(i|I|l|L)", enteredText);						//numb_i_l
			//count all e¥s
			counter[22] = regExp("e|E", enteredText);							//numb_e		
		}
		
		//count all spaces
		counter[23] = regExp(" ", enteredText);									//numb_spaces		
		//count all numbers
		counter[25] = regExp("(0|1|2|3|4|5|6|7|8|9)+", enteredText);			//numb_numbers		
		//count all grammar symbols
		counter[26] = regExp("(,|\\.|;|\\?|!|\\/|&|%|<|>)+", enteredText);		//numb_grammars		
																
		//give stored information
		for (int k=0; k<counter.length; k++) str[k] = ('"' + counter_title[k] + '"' + ": " + counter[k] + ", ");			
		for (int i=0; i<category_counter.length-1; i++) str_cat[i] = ('"' + category_title[i] + '"' + ": " + category_counter[i] + ", ");			
		str_cat[category_counter.length-1] = ('"' + category_title[category_counter.length-1] + '"' + ": " + category_counter[category_counter.length-1]);			
		
		//concatenation of the complete JSON-String
		String completeJSON = "";
		completeJSON += str_start;
		for(int k=0; k<counter.length; k++) completeJSON += str[k];
		for(int i=0; i<category_counter.length; i++) completeJSON += str_cat[i];
		completeJSON += str_end;
			
		return completeJSON;
	}
	
	public int regExp(String pattern, String text)
	{
		int c = 0;
		p = Pattern.compile(pattern);
		m = p.matcher(text);
		while (m.find()) c++;
		return c;
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
		
	public void closeDB()
	{
		db.closeConnection();
	}
}