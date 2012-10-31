package moim.letter.model;

public class Letter {


	private String letId;
	private String letTitle;
	private String letContent;
	private String letCheck;
	private String letDate;
	private String letTomem;
	private String letFrommemname;


	private String meeId;


	public Letter() {

	}

	public Letter( String title, String content,String toMem, String frommemname,String meeId){
		this.letTitle = title;
		this.letContent = content;
		this.letTomem = toMem;
		this.letFrommemname = frommemname;
		this.meeId = meeId;
	}


	public String getMeeId() {
		return meeId;
	}

	public void setMeeId(String meeId) {
		this.meeId = meeId;
	}

	public String getLetId()
	{
		return letId;
	}
	public void setLetId(String letId)
	{
		this.letId = letId;
	}
	public String getLetTitle()
	{
		return letTitle;
	}
	public void setLetTitle(String letTitle)
	{
		this.letTitle = letTitle;
	}
	public String getLetContent()
	{
		return letContent;
	}
	public void setLetContent(String letContent)
	{
		this.letContent = letContent;
	}
	public String getLetCheck()
	{
		return letCheck;
	}
	public void setLetCheck(String letCheck)
	{
		this.letCheck = letCheck;
	}
	public String getLetDate()
	{
		return letDate;
	}
	public void setLetDate(String letDate)
	{
		this.letDate = letDate;
	}
	public String getLetTomem()
	{
		return letTomem;
	}
	public void setLetTomem(String letTomem)
	{
		this.letTomem = letTomem;
	}
	public String getLetFrommemname()
	{
		return letFrommemname;
	}
	public void setLetFrommemname(String letFrommemname)
	{
		this.letFrommemname = letFrommemname;
	}
}
