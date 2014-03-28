package Project;

import java.util.Date;
import java.util.Timer;

public class Analyser {	
	public static void main(String[] args) 
	{
		//definitions
		Calculator calc = new Calculator();
		calc.doInitialisations();
		
		//start analyser which is scheduled every 10 seconds
		Timer timer = new Timer();
		timer.scheduleAtFixedRate(new AnalyserTask(args[0], calc, new Date().getTime()), 0, 10000);
	}
}