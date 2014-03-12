package Project;

public class Test {
		public static void main(String[] args) {
			
			String text = args[0];
			//1st step: read entered text
			Read read = new Read();
			String enteredText = read.readData(text);
			
			//2nd step: doCalculations
			Calculator calc = new Calculator();
			calc.doCalculations(enteredText);
		}
}
