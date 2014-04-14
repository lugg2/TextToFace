package Project;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class AnalyserTask extends TimerTask{
	Calculator calc;
	HttpConnection http;
	Reader reader;
	long start;
	long time;
	List<String> inputFiles;
	String workerid;
	String adress;
	String adressFinish;
	String enteredText;
	Timer t;
	
	AnalyserTask(String wid, Calculator c, long s, Timer timer)
	{
		adress = "http://www.texttoface.de/getworklist";
		adressFinish = "http://www.texttoface.de/finished";

		workerid = wid;
		calc = c;
		start = s;
		t = timer;
		
		http = new HttpConnection();
		inputFiles = new ArrayList<String>();
		reader = new Reader();
	}

	public void run() 
	{
		// calculate complete time and cancel run if time over (120 min)
		time = new Date().getTime() - start;
//		if(time>=7200000)
		if(time >= 5000)
		{
			calc.closeDB();
			t.cancel();
			return;
		}
		
		if(!calc.isError())	
		{
			http.setAdress(adress, adressFinish);		
			http.initializeLists();
			inputFiles = http.getContent(workerid); 	//list of files to read and analyse
		
			if(!http.isError())
			{
				if(!inputFiles.isEmpty())
				{
					start = new Date().getTime();
					for(int i=0; i<inputFiles.size(); i++)
					{	
						//1st step: read entered text
						try {
							enteredText = reader.readData(inputFiles.get(i));
						} catch (IOException e) {
							http.postError(workerid, "12", i);
						}
			
						if(!reader.isError())
						{
							//2nd step: doCalculations and POST the results
							if(!enteredText.isEmpty())
							{
								String output = calc.doCalculations(enteredText);
								if(!calc.isError())
								{					
									http.postContent(output, workerid, calc.getErrorID(), i);
								}else http.postError(workerid, calc.getErrorID(), i);								
								calc.initializeJSON();
								calc.initErrorID();
							}else http.postError(workerid, "04", i);
						}else http.postError(workerid, reader.getErrorID(), i);
					}
				}
			}else http.postError(workerid, http.getErrorID());
		}else http.postError(workerid, calc.getErrorID());
	}
}