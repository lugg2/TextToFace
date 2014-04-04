package Project;

import java.util.Date;
import java.util.Timer;

public class Analyser {	
	public static void main(String[] args) 
	{
		//definitions
		Calculator calc = new Calculator();
		calc.doInitialisations();
		
		//start analyser which is scheduled every 5 seconds
		Timer t = new Timer();
		t.scheduleAtFixedRate(new AnalyserTask(args[0], calc, new Date().getTime(), t), 0, 5000);
	}
}