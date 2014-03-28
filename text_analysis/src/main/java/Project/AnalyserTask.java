package Project;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
	
	AnalyserTask(String wid, Calculator c, long s)
	{
		adress = "http://www.texttoface.de/getworklist";
		adressFinish = "http://www.texttoface.de/finished";

		workerid = wid;
		calc = c;
		start = s;
		
		http = new HttpConnection();
		inputFiles = new ArrayList<String>();
		reader = new Reader();
	}

	public void run() 
	{
		if(!calc.isError())	
		{
			// calculate complete time and cancel run if time over
			time = new Date().getTime() - start;
			if(time>=15000) cancel();	

			http.setAdress(adress, adressFinish);		
			http.initializeLists();
			inputFiles = http.getContent(workerid); 	//list of files to read and analyse
		
			if(!http.isError())
			{
				for(int i=1; i<inputFiles.size(); i++)
				{
					//1st step: read entered text
					try {
						enteredText = reader.readData(inputFiles.get(i));
					} catch (IOException e) {
						http.postContent("", workerid, reader.getErrorID(), 0);
					}
			
					if(!reader.isError())
					{
						//2nd step: doCalculations and POST the results
						if(!enteredText.isEmpty())
						{
							if(!calc.isError())
							{
								
								http.postContent(calc.doCalculations(enteredText), workerid, calc.getErrorID(), i);
								calc.doInitialisations();
								
							}else http.postContent("", workerid, calc.getErrorID(), 0);
							
						}else http.postContent("", workerid, "04", 0);
					}else http.postContent("", workerid, reader.getErrorID(), 0);
					reader.initializeEID();
				}
			}else http.postContent("", workerid, http.getErrorID(), 0);
		}else http.postContent("", workerid, calc.getErrorID(), 0);
	}
}