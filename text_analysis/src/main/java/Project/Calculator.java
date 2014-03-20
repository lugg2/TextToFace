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
				numb_sentences++;										//numb_sentences
				average_length_sentence += sentences.get(i).length();
			}		
			average_length_sentence /= sentences.size();				//average_length_sentence

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
		int numb_physics = 0;
		int numb_medicin = 0;
		int numb_botanic = 0;
		int numb_zoology = 0;
		int numb_anatomy = 0;
		int numb_computer = 0;
		int numb_biology = 0;
		int numb_music = 0;
		int numb_sport = 0;
		int numb_technic = 0;
		int numb_chemistry = 0;
		int numb_jura = 0;
		int numb_astronomy = 0;
		int numb_electricity = 0;
		int numb_religion = 0;
		int numb_figurative = 0;
		int numb_ugs = 0;
		int numb_math = 0;
		int numb_military = 0;
		int numb_economy = 0;
		int numb_auto = 0;
		int numb_gastronomy = 0;
		int numb_shipping = 0;
		int numb_biochemistry = 0;
		int numb_history = 0;
		int numb_politic = 0;
		int numb_geology = 0;
		int numb_railway = 0;
		int numb_language = 0;
		int numb_geography = 0;
		int numb_air = 0;
		int numb_psychology = 0;
		int numb_terrorism = 0;

		
		Connection c = null;
		try {
			Class.forName("org.sqlite.JDBC");
			c = DriverManager.getConnection("jdbc:sqlite:ttf_komp.db");
		} catch ( Exception e ) {
			System.out.println("no connection to sqlite data base possible: " + e.getClass().getName() + ": " + e.getMessage());
		}

		
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
						//SQLite
						try {
							Statement stat = c.createStatement();
			 
							ResultSet rs = stat.executeQuery(	"SELECT category_name " +
																"FROM category " +
																"WHERE id IN (" +
																	"SELECT  category_id " +
																	"FROM  category_link " +
																	"WHERE synset_id IN (" +
																		"SELECT  synset_id " +
																		"FROM  term " +
																		"WHERE word LIKE '" + tok.getTokenInflected() + "')" +
																	");" +
															"");
							while (rs.next())
							{
								if (rs.getString("category_name").contains("Physik")) numb_physics++;
								if (rs.getString("category_name").contains("Medizin")) numb_medicin++;
								if (rs.getString("category_name").contains("Botanik")) numb_botanic++;
								if (rs.getString("category_name").contains("Zoologie")) numb_zoology++;
								if (rs.getString("category_name").contains("Anatomie")) numb_anatomy++;
								if (rs.getString("category_name").contains("Computer")) numb_computer++;
								if (rs.getString("category_name").contains("Biology")) numb_biology++;
								if (rs.getString("category_name").contains("Musik")) numb_music++;
								if (rs.getString("category_name").contains("Sport")) numb_sport++;
								if (rs.getString("category_name").contains("Technik")) numb_technic++;
								if (rs.getString("category_name").contains("Chemie")) numb_chemistry++;
								if (rs.getString("category_name").contains("Jura")) numb_jura++;
								if (rs.getString("category_name").contains("Astronomie")) numb_astronomy++;
								if (rs.getString("category_name").contains("Elektrizität")) numb_electricity++;
								if (rs.getString("category_name").contains("Religion")) numb_religion++;
								if (rs.getString("category_name").contains("figurativ")) numb_figurative++;
								if (rs.getString("category_name").contains("umgangssprachlich")) numb_ugs++;
								if (rs.getString("category_name").contains("Mathematik")) numb_math++;
								if (rs.getString("category_name").contains("Militär")) numb_military++;
								if (rs.getString("category_name").contains("Ökonomie")) numb_economy++;
								if (rs.getString("category_name").contains("Automobil")) numb_auto++;
								if (rs.getString("category_name").contains("Gastronomie")) numb_gastronomy++;
								if (rs.getString("category_name").contains("Schifffahrt")) numb_shipping++;
								if (rs.getString("category_name").contains("Biochemie")) numb_biochemistry++;
								if (rs.getString("category_name").contains("Geschichte")) numb_history++;
								if (rs.getString("category_name").contains("Politik")) numb_politic++;
								if (rs.getString("category_name").contains("Geologie")) numb_geology++;
								if (rs.getString("category_name").contains("Eisenbahn")) numb_railway++;
								if (rs.getString("category_name").contains("Linguistik/Sprache")) numb_language++;
								if (rs.getString("category_name").contains("Geographie")) numb_geography++;
								if (rs.getString("category_name").contains("Luftfahrt")) numb_air++;
								if (rs.getString("category_name").contains("Psychologie")) numb_psychology++;					
								if (rs.getString("category_name").contains("Terrorismus")) numb_terrorism++;					
							}
							rs.close();
						} catch (SQLException e) {
							System.out.println("failure in sqlite statement");
						}

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
						//SQLite
						try {
							Statement stat = c.createStatement();
			 
							ResultSet rs = stat.executeQuery(	"SELECT category_name " +
																"FROM category " +
																"WHERE id IN (" +
																	"SELECT  category_id " +
																	"FROM  category_link " +
																	"WHERE synset_id IN (" +
																		"SELECT  synset_id " +
																		"FROM  term " +
																		"WHERE word LIKE '" + tok.getTokenInflected() + "')" +
																	");" +
															"");
							while (rs.next())
							{
								if (rs.getString("category_name").contains("Physik")) numb_physics++;
								if (rs.getString("category_name").contains("Medizin")) numb_medicin++;
								if (rs.getString("category_name").contains("Botanik")) numb_botanic++;
								if (rs.getString("category_name").contains("Zoologie")) numb_zoology++;
								if (rs.getString("category_name").contains("Anatomie")) numb_anatomy++;
								if (rs.getString("category_name").contains("Computer")) numb_computer++;
								if (rs.getString("category_name").contains("Biology")) numb_biology++;
								if (rs.getString("category_name").contains("Musik")) numb_music++;
								if (rs.getString("category_name").contains("Sport")) numb_sport++;
								if (rs.getString("category_name").contains("Technik")) numb_technic++;
								if (rs.getString("category_name").contains("Chemie")) numb_chemistry++;
								if (rs.getString("category_name").contains("Jura")) numb_jura++;
								if (rs.getString("category_name").contains("Astronomie")) numb_astronomy++;
								if (rs.getString("category_name").contains("Elektrizität")) numb_electricity++;
								if (rs.getString("category_name").contains("Religion")) numb_religion++;
								if (rs.getString("category_name").contains("figurativ")) numb_figurative++;
								if (rs.getString("category_name").contains("umgangssprachlich")) numb_ugs++;
								if (rs.getString("category_name").contains("Mathematik")) numb_math++;
								if (rs.getString("category_name").contains("Militär")) numb_military++;
								if (rs.getString("category_name").contains("Ökonomie")) numb_economy++;
								if (rs.getString("category_name").contains("Automobil")) numb_auto++;
								if (rs.getString("category_name").contains("Gastronomie")) numb_gastronomy++;
								if (rs.getString("category_name").contains("Schifffahrt")) numb_shipping++;
								if (rs.getString("category_name").contains("Biochemie")) numb_biochemistry++;
								if (rs.getString("category_name").contains("Geschichte")) numb_history++;
								if (rs.getString("category_name").contains("Politik")) numb_politic++;
								if (rs.getString("category_name").contains("Geologie")) numb_geology++;
								if (rs.getString("category_name").contains("Eisenbahn")) numb_railway++;
								if (rs.getString("category_name").contains("Linguistik/Sprache")) numb_language++;
								if (rs.getString("category_name").contains("Geographie")) numb_geography++;
								if (rs.getString("category_name").contains("Luftfahrt")) numb_air++;
								if (rs.getString("category_name").contains("Psychologie")) numb_psychology++;		
								if (rs.getString("category_name").contains("Terrorismus")) numb_terrorism++;	
							}
							rs.close();
						} catch (SQLException e) {
							System.out.println("failure in sqlite statement");
						}

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
		
		try {
			c.close();
		} catch (SQLException e) {
			System.out.println("failure by closing sqlite data base");
		}

		
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
						
		//give stored information
		System.out.println("{");
		System.out.println('"' + "sentences" + '"' + ": " + numb_sentences + ",");
		System.out.println('"' + "average length" + '"' + ": " + average_length_sentence + ",");
		System.out.println('"' + "grammar errors" + '"' + ": " + numb_errors + ",");
		System.out.println('"' + "unknown words" + '"' + ": " + numb_unknown + ",");
		System.out.println('"' + "vocals" + ": " + numb_vocals + ",");
		System.out.println('"' + "rs" + ": " + numb_r + ",");
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
		System.out.println('"' + "physics" + '"' + ": " + numb_physics + ",");
		System.out.println('"' + "medicin" + '"' + ": " + numb_medicin + ",");
		System.out.println('"' + "botanic" + '"' + ": " + numb_botanic + ",");
		System.out.println('"' + "zoology" + '"' + ": " + numb_zoology + ",");
		System.out.println('"' + "anatomy" + '"' + ": " + numb_anatomy + ",");
		System.out.println('"' + "computer" + '"' + ": " + numb_computer + ",");
		System.out.println('"' + "biology" + '"' + ": " + numb_biology + ",");
		System.out.println('"' + "music" + '"' + ": " + numb_music + ",");
		System.out.println('"' + "sport" + '"' + ": " + numb_sport + ",");
		System.out.println('"' + "technic" + '"' + ": " + numb_technic + ",");
		System.out.println('"' + "chemistry" + '"' + ": " + numb_chemistry + ",");
		System.out.println('"' + "jura" + '"' + ": " + numb_jura + ",");
		System.out.println('"' + "astronomy" + '"' + ": " + numb_astronomy + ",");
		System.out.println('"' + "electricity" + '"' + ": " + numb_electricity + ",");
		System.out.println('"' + "religion" + '"' + ": " + numb_religion + ",");
		System.out.println('"' + "figurative" + '"' + ": " + numb_figurative + ",");
		System.out.println('"' + "ugs" + '"' + ": " + numb_ugs + ",");
		System.out.println('"' + "math" + '"' + ": " + numb_math + ",");
		System.out.println('"' + "military" + '"' + ": " + numb_military + ",");
		System.out.println('"' + "economy" + '"' + ": " + numb_economy + ",");
		System.out.println('"' + "auto" + '"' + ": " + numb_auto + ",");
		System.out.println('"' + "gastronomy" + '"' + ": " + numb_gastronomy + ",");
		System.out.println('"' + "shipping" + '"' + ": " + numb_shipping + ",");
		System.out.println('"' + "biochemistry" + '"' + ": " + numb_biochemistry + ",");
		System.out.println('"' + "history" + '"' + ": " + numb_history + ",");
		System.out.println('"' + "politic" + '"' + ": " + numb_politic + ",");
		System.out.println('"' + "geology" + '"' + ": " + numb_geology + ",");
		System.out.println('"' + "railway" + '"' + ": " + numb_railway + ",");
		System.out.println('"' + "language" + '"' + ": " + numb_language + ",");
		System.out.println('"' + "geography" + '"' + ": " + numb_geography + ",");
		System.out.println('"' + "aerospace" + '"' + ": " + numb_air + ",");
		System.out.println('"' + "psychology" + '"' + ": " + numb_psychology + ",");
		System.out.println('"' + "terrorism" + '"' + ": " + numb_terrorism);
		System.out.print("}");
	}
}
