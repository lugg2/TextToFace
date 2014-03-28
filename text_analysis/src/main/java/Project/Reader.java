package Project;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import sun.io.*;

public class Reader {
	private String errorID = "00";
	
	public void initializeEID()
	{
		errorID = "00";
	}

	@SuppressWarnings({ "restriction", "deprecation" })
	public String readData(String name) throws IOException
	{	
		String ausgabe = "";
		File file = new File(name);
		 
		// inputstream to read from file 
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			DataInputStream dis = new DataInputStream(fis);
			ByteToCharUTF8 converter = new ByteToCharUTF8();

			// get length of testfile
			int size = (int) file.length();
			// create buffer to store testfile
			byte[] data = new byte[size];
			
			// read data into buffer
			dis.read(data);
			
			// convert from byte-array to string
			ausgabe = new String(converter.convertAll(data));
			data = null;
			
			// close testfile
			dis.close();
			fis.close();
			converter.reset();
			converter = null;
			file = null;
			
			return ausgabe;
		} catch (FileNotFoundException e) {
			errorID = "03";
			return "";
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