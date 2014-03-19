package Project;

//import java.util.Date;

public class Test {
		public static void main(String[] args) {
			
	//		long start = new Date().getTime();
			
			String text = args[0];
			//1st step: read entered text
			Read read = new Read();
			String enteredText = read.readData(text);
			
			//2nd step: doCalculations
			Calculator calc = new Calculator();
			if(!enteredText.isEmpty())
			{
				calc.doCalculations(enteredText);
			}else System.out.println("no text entered");
			
	//		long runningTime = new Date().getTime() - start;
	//		System.out.print("Zeit: " + runningTime);	
		}
}
