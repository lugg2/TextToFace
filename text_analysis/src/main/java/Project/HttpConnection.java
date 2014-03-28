package Project;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
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
	
	HttpConnection()
	{
		files = new ArrayList<String>();
		messageID = new ArrayList<String>();
	}
	
	public void initializeLists()
	{
		errorID = "00";
		
		files.clear();
		files.add(0, " ");
		
		messageID.clear();
		messageID.add(0, "x");
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

		p = Pattern.compile("([0-9]+): ([a-zA-ZüäöÜÄÖ0-9]+)");
		if(input!=null)
		{
			m = p.matcher(input);
		}else m = p.matcher("2: message6; 3: message7");
		
		while (m.find())
		{
			messageID.add(m.group(1));
			files.add(m.group(2));
		}		
		return files;
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
	 * 08: no access to Thesaurus DB
	 * 09: Thesaurus DB close problem
	 * 10: SQL statement failure
	 * 11: ResultSet of SQL-Statement cannot be analyzed
	 */
	
	public void postContent(String content, String workerid, String errorMessage, int mID_position)
	{
		try {
			URL urlConnect = new URL(adressFinish + "?workerid=" + workerid + "&&error=" + errorMessage + "&&messageID=" + messageID.get(mID_position));						
			HttpURLConnection connectionPOST = (HttpURLConnection) urlConnect.openConnection();
			connectionPOST.setRequestMethod("POST");
			connectionPOST.setDoOutput(true);
			OutputStream out = connectionPOST.getOutputStream();
			out.write(content.getBytes("utf-8"));
			out.close();
			connectionPOST.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
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
}