/*
 * Autor: Melanie Hammerschmidt
 * Reviewer: Lukas, Patrick
 * 
 * Description: AnalyserException
 * personal exception
 * 
 */

package Project;

public class AnalyserException extends Exception{
	private static final long serialVersionUID = 1L;
	private String errorID;
	private int messageID = -1;
	
	AnalyserException(String errorID, int messageID)
	{
		this.errorID = errorID;
		this.messageID = messageID;
	}
	
	AnalyserException(String errorID)
	{
		this.errorID = errorID;
	}
	
	public String getErrorID()
	{
		return errorID;
	}
	
	public int getMessageID()
	{
		return messageID;
	}
	
	public boolean MID_set()
	{
		if(messageID==-1)
		{
			return false;
		}else return true;
	}
}