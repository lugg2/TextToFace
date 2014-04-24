package Project;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HttpConnection 
{	
	private String adress = null;
	private String adressFinish = null;
	private BufferedReader reader = null;
	private String input = null;
	private List<String> files;
	private List<String> messageID;
	private Pattern p;
	private Matcher m;
	private String errorID;	
	private URL url;
	private URLConnection urlConnection;
	private DataInputStream inStream;
	private boolean stopAnalyser;
	
	HttpConnection()
	{
		System.setProperty("http.proxyHost", "localhost");
		System.setProperty("http.proxyPort", "8888");
	
		files = new ArrayList<String>();
		messageID = new ArrayList<String>();
		
		stopAnalyser = false;
	}
	
	public void initializeLists()
	{
		errorID = "00";
		files.clear();
		messageID.clear();
	}
	
	public void setAdress(String newAdress, String newAdressFinish)
	{
		adress = newAdress;
		adressFinish = newAdressFinish;
	}

	//GET MessageParameter from website (LISTE)
	public List<String> getContent(String workerid)
	{	
		HttpURLConnection connection = null;
		try {
			URL urlConnect = new URL(adress + "?workerid=" + workerid);						
			connection = (HttpURLConnection) urlConnect.openConnection();
			connection.setRequestMethod("GET");
			connection.setDoInput(true);
			connection.connect();
			InputStream in = connection.getInputStream();
			reader = new BufferedReader(new InputStreamReader(in));
			input = reader.readLine();
			connection.disconnect();
		} catch (MalformedURLException e) {
			errorID = "01";
			return files;
		} catch (IOException e) {
			errorID = "02";
			return files;
		}	

		if(input!=null)
		{
			if(input.equals("kill"))
			{
				System.out.println("kill");
				stopAnalyser = true;
				return files;
			}
		
			p = Pattern.compile("[0-9]+: ([a-zA-ZüäöÜÄÖ]+)([0-9]+)");
			if(input!=null)
			{
				m = p.matcher(input);
				while (m.find())
				{
					messageID.add(m.group(2));
					files.add(m.group(1)+m.group(2));
				}		
			}
			return files;
		}
		else
		{
			return files;
		}
	}

	
	//POST (workid, errormessage, messageID)
	/*error messages:
	 * 00: OK
	 * 01: URL not well formed
	 * 02: GET connection problem
	 * 03: no access to text file 
	 * 04: no text entered in file
	 * 05: no access to languagetool DB (initialisation) 
	 * 06: check failure (languagetool)
	 * 07: word grouping failure (languagetool)
	 * 08: no access to sqlite driver
	 * 09: Thesaurus DB close problem
	 * 10: SQL statement failure (DB access failure)
	 * 11: ResultSet of SQL-Statement cannot be analyzed
	 * 12: I/O failure by reading the text file
	 */
	
	public void post(URL url, String content) throws IOException
	{
		urlConnection = url.openConnection();
		((HttpURLConnection)urlConnection).setRequestMethod("POST");
		urlConnection.setDoOutput(true);
		urlConnection.setUseCaches(false);
		urlConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		
		OutputStreamWriter writer = new OutputStreamWriter(urlConnection.getOutputStream());
	    writer.write(content);
	    writer.flush();
	    writer.close();
		
		inStream = new DataInputStream(urlConnection.getInputStream());
		reader = new BufferedReader(new InputStreamReader(inStream));
		String answer = reader.readLine();

		if(!answer.contains("Acknowledge"))
		{
			System.out.println("POST not acknowledged:\n" + "URL: " + url);
		}

		inStream.close();
	}
	
	
	public void postContent(String content, String workerid, String errorMessage, int mID_position)
	{	
		try {
			// Create connection
			url = new URL(adressFinish + "?workerid=" + workerid + "&&error=" + errorMessage + "&&messageID=" + messageID.get(mID_position));
			post(url,content);
		} catch (IOException e) {
			System.out.println("POST Exception: "+ e.toString());
		}	
		
	}
	
	public void postError(String workerid, String errorMessage, int mID_position)
	{
		try 
		{
			// Create connection
			url = new URL(adressFinish + "?workerid=" + workerid + "&&error=" + errorMessage + "&&messageID=" + messageID.get(mID_position));
			post(url,"");
		} catch(Exception e) {
			System.out.println("POST Exception: "+ e.toString());
		}
	}

	public void postError(String workerid, String errorMessage)
	{
		try 
		{
			// Create connection
			url = new URL(adressFinish + "?workerid=" + workerid + "&&error=" + errorMessage + "&&messageID=x");
			post(url, "");
		} catch(Exception e) {
			System.out.println("POST Exception: "+ e.toString());
		}		
	}

	
	public boolean isError()
	{
		if(errorID.contains("00"))
		{
			return false;
		}else return true;
	}
	
	public String getErrorID()
	{
		return errorID;
	}
	
	public boolean stopAnalyser()
	{
		if(stopAnalyser)
		{
			return true;
		}else return false;
	}
} 