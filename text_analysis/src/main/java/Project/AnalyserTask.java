package Project;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class AnalyserTask extends TimerTask{
	private Calculator calc;
	private HttpConnection http;
	private Reader reader;
	private long start;
	private long time;
	private List<String> inputFiles;
	private String workerid;
	private String adress;
	private String adressFinish;
	private String enteredText;
	private Timer t;
	private String path;
		
	AnalyserTask(String workerid, String host, Calculator c, long s, Timer timer, String p)
	{
		this.workerid = workerid;
		this.calc = c;
		this.start = s;
		this.t = timer;
		this.path = p;
		
		if(host.equals("-localhost"))
		{
			adress = "http://localhost/getworklist";
			adressFinish = "http://localhost/finished";
		}else{
			adress = "http://www.texttoface.de/getworklist";
			adressFinish = "http://www.texttoface.de/finished";
		}
		
		http = new HttpConnection();
		inputFiles = new ArrayList<String>();
		reader = new Reader();
		
		//set adresses for GET and POST requests
		http.setAdress(adress, adressFinish);		
	}

	public void run() 
	{
		// calculate complete time and cancel run if time over (120 min)
		time = new Date().getTime() - start;
		if(time>=7200000)
		{
			calc.closeDB();
			t.cancel();
			return;
		}
		
		try
		{
			if(calc.isError())	throw new AnalyserException(calc.getErrorID());			//check for calculator-error
			
			//initialize lists for HTTP handling (GET and POST)
			http.initializeLists();
			
			//GET Content from Server --> list of files to read and analyse (if server sends "kill" signal - stop AnalyserTask)
			inputFiles = http.getContent(workerid); 		
			if(http.stopAnalyser())
			{
				calc.closeDB();
				t.cancel();
				return;
			}
			
			if(http.isError())	throw new AnalyserException(http.getErrorID());			//check for http-error			
			if(!inputFiles.isEmpty())													//check if there are messages to analyse
			{
				//if there are files to analyse - start timer again
				start = new Date().getTime();			
				
				for(int i=0; i<inputFiles.size(); i++)
				{	
					//ANALYSIS START
					//1st step: read entered text (according to message name and absolute path)
						enteredText = reader.readData(inputFiles.get(i), path);
						if(reader.isError())	throw new AnalyserException(reader.getErrorID(), i);	//check for reader-error
						if(enteredText.isEmpty())	throw new AnalyserException("04", i);				//check for empty files

					//2nd step: doCalculations with the text and POST the results
						String output = calc.doCalculations(enteredText);
						if(calc.isError())	throw new AnalyserException(calc.getErrorID(), i);			//check for calculator-error
					
						//post Content to website/localhost
						http.postContent(output, workerid, calc.getErrorID(), i);
					
					//initialisations for next calculation (JSON-Output and calculator ErrorID)
					calc.initializeJSON();
					calc.initErrorID();
				}
			}
		}catch (AnalyserException e){
			if(!e.MID_set())
			{
				http.postError(workerid, e.getErrorID());
			}else http.postError(workerid, e.getErrorID(), e.getMessageID());
		}
	}
}