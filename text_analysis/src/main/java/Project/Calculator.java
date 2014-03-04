package Project;

import java.io.IOException;
import java.util.List;

import org.languagetool.JLanguageTool;
import org.languagetool.language.German;
import org.languagetool.rules.RuleMatch;

public class Calculator {
	
	public void doCalculations(String enteredText){
		
		JLanguageTool langTool = null;
		try {
			langTool = new JLanguageTool(new German());
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		try {
			langTool.activateDefaultPatternRules();
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		List<RuleMatch> matches = null;
	
	
		try {
			matches = langTool.check(enteredText);
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		for (RuleMatch match : matches) {
			System.out.println("Potential error at line " +
					match.getLine() + ", column " +
					match.getColumn() + ": " + match.getMessage());
			System.out.println("Suggested correction: " +
					match.getSuggestedReplacements());
		}
				
		int numb_sentences = langTool.getSentenceCount();
		System.out.print("SÄTZE: " + numb_sentences);

	}

}
