package Project;

import java.io.File;
import java.util.Date;
import java.util.Timer;

public class Analyser {	
	public static void main(String[] args) 
	{
		//get origin path
		String path = new File(System.getProperty("java.class.path")).getAbsoluteFile().getParentFile().toString();

		//definitions
		Calculator calc = new Calculator();
		calc.doInitialisations(path);
			
		//start analyser which is scheduled every 5 seconds
		Timer t = new Timer();
		t.scheduleAtFixedRate(new AnalyserTask(args[0], calc, new Date().getTime(), t, path), 0, 5000);
	}
}