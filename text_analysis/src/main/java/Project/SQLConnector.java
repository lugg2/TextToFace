package Project;

import java.sql.Connection; 
import java.sql.DriverManager; 
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SQLConnector {
	Connection con;
	PreparedStatement stmt;
	ResultSet rs;

	SQLConnector()
	{
	    try{

	        Class.forName("com.mysql.jdbc.Driver");
	        con=DriverManager.getConnection("https://NAMEHIDDEN.soi.city.ac.uk:5454/~kdhy546","root","");

	                    stmt=con.prepareStatement("select * from staff where username=? and password=?");
	                    }

	    catch (Exception e) 
	    {
	        System.out.println(e);
	    }
	}
}
