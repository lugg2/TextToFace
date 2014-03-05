package Project;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.languagetool.AnalyzedSentence;
import org.languagetool.AnalyzedTokenReadings;
import org.languagetool.JLanguageTool;

public class PersonalRule {
	
	private String pattern = "";
	
	public int analyse(JLanguageTool lang, final AnalyzedSentence sentence)
	{
		int counter = 0;
		final AnalyzedTokenReadings[] tokens = sentence.getTokensWithoutWhitespace();
		for(int i = 1; i<tokens.length; i++)
		{
			final String token = tokens[i].getToken();
	        if (matches(token)) {
				System.out.println("token: " + token);
	          counter++;
	        }
		}
		return counter;
	}
	
	
	public void addPattern(String newPattern)
	{
		pattern = newPattern;
	}
	
	private boolean matches(String token)
	{
		boolean matches = false; 
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(token);
		if (m.find())
		{
			matches = true;
		}
		return matches;
	}
}
