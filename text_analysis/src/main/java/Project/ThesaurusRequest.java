package Project;

import java.io.BufferedReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.simple.*;

class ThesaurusRequest {
	  final String endpoint = "http://thesaurus.altervista.org/thesaurus/v1";
	  
	  private String searchWord = "";
	  private String searchLanguage = "";
	  private String searchKey = "";
	  private String searchOutput = "";
	  private String message = "";
	  
	  public ThesaurusRequest(String word, String language, String key, String output) {
		  searchWord = word;
		  searchLanguage = language;
		  searchKey = key;
		  searchOutput = output;
	  }
	  
	  public String getList()
	  {
	    try {
	      URL serverAddress = new URL(endpoint + "?word="+URLEncoder.encode(searchWord, "UTF-8")+"&language="+searchLanguage+"&key="+searchKey+"&output="+searchOutput);
	      HttpURLConnection connection = (HttpURLConnection)serverAddress.openConnection();
	      connection.connect();
	      int rc = connection.getResponseCode();
	      if (rc == 200) {
	        String line = null;
	        BufferedReader br = new BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
	        StringBuilder sb = new StringBuilder();
	        while ((line = br.readLine()) != null) sb.append(line + '\n');
	        JSONObject obj = (JSONObject) JSONValue.parse(sb.toString());
	        JSONArray array = (JSONArray)obj.get("response");
	        for (int i=0; i < array.size(); i++) {
	          JSONObject list = (JSONObject) ((JSONObject)array.get(i)).get("list");
	          System.out.println("Kategorie " + list.get("category")+": "+list.get("synonyms"));
	          message = list.values().toString();
	        }
	      } else
	      message =  "HTTP error:"+rc;
	      connection.disconnect();
	    } catch (java.net.MalformedURLException e) {
	      e.printStackTrace();
	    } catch (java.net.ProtocolException e) {
	      e.printStackTrace();
	    } catch (java.io.IOException e) {
	      e.printStackTrace();
	    }
		return message;
	  }
} // end of SendRequest