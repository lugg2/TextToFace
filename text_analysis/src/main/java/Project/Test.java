package Project;

import java.io.IOException;
import java.util.List;
import org.languagetool.language.*;
import org.languagetool.rules.*;
import org.languagetool.*;

public class Test {
		public static void main(String[] args) {
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
				matches = langTool.check("Hallo Welt. Dies ist ein schöner Ort. Auch wenn es schon sehr spät ist.");
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			int numb_sentences = langTool.getSentenceCount();

			for (RuleMatch match : matches) {
			  System.out.println("Potential error at line " +
			      match.getLine() + ", column " +
			      match.getColumn() + ": " + match.getMessage());
			  System.out.println("Suggested correction: " +
			      match.getSuggestedReplacements());
			}
			
			String att_geschlecht = "weiblich";
			int att_alter = 20;
					
			System.out.println("GESCHLECHT: " + att_geschlecht);
			System.out.println("ALTER: " + att_alter);
			System.out.print("SÄTZE: " + numb_sentences);
		}
}
