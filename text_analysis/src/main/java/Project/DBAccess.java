package Project;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBAccess {
	private Connection c = null;
	private String errorID = "00";
	
	public void establishConnection(String path)
	{
		try {
			Class.forName("org.sqlite.JDBC");
			//for Server  
			c = DriverManager.getConnection("jdbc:sqlite:/"+path+"/thesaurusDBnew.db");
			
			//for Windows-Testing		c = DriverManager.getConnection("jdbc:sqlite:thesaurusDBnew.db");
		} catch ( Exception e ) {
			errorID = "08";
		}
	}
	
	public int[] checkToken(int[] category_counter, String token)
	{
		Statement stat = null;
		ResultSet rs = null;
		try { 
			stat = c.createStatement();
			rs = stat.executeQuery(	"SELECT category_name " +
									"FROM cat_groups " +
									"WHERE word LIKE '" + token + "'");
		} catch (SQLException e) {
			errorID = "10";
		}
		
		if(errorID.contains("00"))
		{
			try {
				while (rs.next())
				{
					if (rs.getString("category_name").contains("Physik")) category_counter[0]++;
					if (rs.getString("category_name").contains("Medizin")) category_counter[1]++;
					if (rs.getString("category_name").contains("Botanik")) category_counter[2]++;
					if (rs.getString("category_name").contains("Zoologie")) category_counter[3]++;
					if (rs.getString("category_name").contains("Anatomie")) category_counter[4]++;
					if (rs.getString("category_name").contains("Computer")) category_counter[5]++;
					if (rs.getString("category_name").contains("Biology")) category_counter[6]++;
					if (rs.getString("category_name").contains("Musik")) category_counter[7]++;
					if (rs.getString("category_name").contains("Sport")) category_counter[8]++;
					if (rs.getString("category_name").contains("Technik")) category_counter[9]++;
					if (rs.getString("category_name").contains("Chemie")) category_counter[10]++;
					if (rs.getString("category_name").contains("Jura")) category_counter[11]++;
					if (rs.getString("category_name").contains("Astronomie")) category_counter[12]++;
					if (rs.getString("category_name").contains("Elektrizität")) category_counter[13]++;
					if (rs.getString("category_name").contains("Religion")) category_counter[14]++;
					if (rs.getString("category_name").contains("Mathematik")) category_counter[15]++;
					if (rs.getString("category_name").contains("Militär")) category_counter[16]++;
					if (rs.getString("category_name").contains("Ökonomie")) category_counter[17]++;
					if (rs.getString("category_name").contains("Automobil")) category_counter[18]++;
					if (rs.getString("category_name").contains("Gastronomie")) category_counter[19]++;
					if (rs.getString("category_name").contains("Schifffahrt")) category_counter[20]++;
					if (rs.getString("category_name").contains("Biochemie")) category_counter[21]++;
					if (rs.getString("category_name").contains("Geschichte")) category_counter[22]++;
					if (rs.getString("category_name").contains("Politik")) category_counter[23]++;
					if (rs.getString("category_name").contains("Geologie")) category_counter[24]++;
					if (rs.getString("category_name").contains("Eisenbahn")) category_counter[25]++;
					if (rs.getString("category_name").contains("Linguistik/Sprache")) category_counter[26]++;
					if (rs.getString("category_name").contains("Kunst")) category_counter[27]++;
					if (rs.getString("category_name").contains("Geographie")) category_counter[28]++;
					if (rs.getString("category_name").contains("Luftfahrt")) category_counter[29]++;
					if (rs.getString("category_name").contains("Psychologie")) category_counter[30]++;					
					if (rs.getString("category_name").contains("Terrorismus")) category_counter[31]++;
					if (rs.getString("category_name").contains("Emotionen")) category_counter[32]++;
					if (rs.getString("category_name").contains("Farben")) category_counter[33]++;
					rs.close();
				}
			} catch (SQLException e) {
				errorID = "11";
			}	
		}
		return category_counter;
	}
	
	public void closeConnection()
	{
		if(errorID!="08")
		{
			try {
				c.close();
			} catch (SQLException e) {
				errorID = "09";
			}
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
