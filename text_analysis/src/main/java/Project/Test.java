package Project;

public class Test {
		public static void main(String[] args) {
			
			//1st step: read entered text
			Read read = new Read();
			String enteredText = read.readData("Test1.txt");
			
			//2nd step: doCalculations
			Calculator calc = new Calculator();
			calc.doCalculations(enteredText);
		}
}
