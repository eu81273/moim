package moim.meeting.model;

public class Membermeeting {

	private String memId;
	private String meeId;
	private String memmeeAdmin;


	private String memName;

	public Membermeeting(){}

	public String getMemId() {
		return memId;
	}

	public void setMemId(String memId) {
		this.memId = memId;
	}

	public String getMeeId() {
		return meeId;
	}

	public void setMeeId(String meeId) {
		this.meeId = meeId;
	}

	public String getMemmeeAdmin()
	{
		return memmeeAdmin;
	}

	public void setMemmeeAdmin(String memmeeAdmin)
	{
		this.memmeeAdmin = memmeeAdmin;
	}

	public String getMemName() {
		return memName;
	}

	public void setMemName(String memName) {
		this.memName = memName;
	}
}
