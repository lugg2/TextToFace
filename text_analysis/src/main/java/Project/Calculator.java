package Project;

import java.io.IOException;
import java.util.List;

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
			e.printStackTrace();
		}
		
		//activation of all default pattern rules
		try {
			langTool.activateDefaultPatternRules();
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		//check the entered text	
		List<RuleMatch> matches = null;
		int numb_errors = 0;
		try {
			matches = langTool.check(enteredText);
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		for (RuleMatch match : matches) {
			/*System.out.println("Potential error at line " +
					match.getLine() + ", column " +
					match.getColumn() + ": " + match.getMessage());
			System.out.println("Suggested correction: " +
					match.getSuggestedReplacements());*/
			numb_errors++;
		}
		
		//count all sentences
		int numb_sentences = langTool.getSentenceCount();
		
		//stored information
		System.out.println("sentences:" + numb_sentences);
		System.out.println("errors:" + numb_errors);
	}
}
