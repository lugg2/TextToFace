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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Calculator {
	
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
			//System.out.println("Chech output: " + matches.toString());
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
		Connection c = null;
		try {
			Class.forName("org.sqlite.JDBC");
			c = DriverManager.getConnection("jdbc:sqlite:ttf.db");
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		//System.out.println("Opened database successfully");
	

		Pattern p2 = Pattern.compile("[a-zA-ZäüöÄÜÖ]+");
		Matcher m2 = p2.matcher(enteredText);
		while (m2.find())
		{	
			numb_words++;												//numb_words
			//System.out.println(m2.group());	
		
		//SQLite
			try {
				Statement stat = c.createStatement();
 
				ResultSet rs = stat.executeQuery("SELECT category_name FROM cat WHERE id IN (SELECT  category_id FROM  cat_link WHERE synset_id IN (SELECT  synset_id FROM  term WHERE word LIKE '" + m2.group() + "'));");
				while (rs.next())
				{
					// count here according to the category
					//System.out.println("category_name von " + m2.group() + " = " + rs.getString("category_name"));
				}
			
				//System.out.println("Ausgabe Ende");
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		try {
			c.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
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
		System.out.print("}");
	}
}
