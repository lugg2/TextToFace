package Project;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Read {
	public String readData(String name) {
		
		String ausgabe="";
		Scanner scanner = null;
		File file = new File(name);
		
		try{
			scanner = new Scanner(file);
		}catch(FileNotFoundException e){
			System.out.println("no access to text file");
		}
		
		while (scanner.hasNextLine()){
			ausgabe=ausgabe+scanner.nextLine();
		}
		return ausgabe;
	}
}
