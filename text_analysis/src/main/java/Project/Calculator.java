package Project;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.languagetool.JLanguageTool;
import org.languagetool.language.German;
import org.languagetool.rules.Rule;
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
			numb_errors++;
		}
		
		//count all sentences
		int numb_sentences = langTool.getSentenceCount();
		
		//count all vocals
		int numb_vocals = 0;
		Pattern p = Pattern.compile("[*a*|*e*|*i*|*o*|*u*|*A*|*E*|*I*|*O*|*U*]");
		Matcher m = p.matcher(enteredText);

		List<String> vocals = new ArrayList<String>();
		while (m.find()) {
			numb_vocals++;
			vocals.add(m.group());
		}
		
		//check for word of the class xx
		int numb_xx = 0;
		
		disableAllRules(langTool);
		langTool.enableDefaultOffRule("xx_RULE");
		
		try {
			langTool.check(enteredText);
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (RuleMatch match : matches) {
			numb_xx++;
		}
			
		//stored information
		System.out.println("sentences:" + numb_sentences);
		System.out.println("errors:" + numb_errors);
		System.out.println("vocals:" + numb_vocals);
		//..
		System.out.println("xx:" + numb_xx);
	}
	
	private void disableAllRules(JLanguageTool lang)
	{
		lang.disableCategory("PERSONAL_EXTENDS");		
		lang.disableCategory("Mögliche Tippfehler");
		lang.disableCategory("Leicht zu verwechselnde Wörter");
		lang.disableCategory("Falschschreibung prominenter/geographischer Eigennamen");
		lang.disableCategory("Zusammen-/Getrenntschreibung");
		lang.disableCategory("Semantische Unstimmigkeiten");
		lang.disableCategory("Redundanz");
		lang.disableCategory("Stil, Umgangssprache");
		lang.disableCategory("Briefe und E-Mails");
		lang.disableCategory("Groß-/Kleinschreibung");
		lang.disableCategory("Grammatik");
		lang.disableCategory("Redewendungen");
		lang.disableCategory("Zeichensetzung");
		lang.disableCategory("Typographie");
		lang.disableCategory("Sonstiges");
		lang.disableCategory("Wikipedia");
	}
}
