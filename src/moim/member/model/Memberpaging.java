package moim.member.model;

public class Memberpaging {

	private int memStart;
	private int memEnd;


	private String memEmail;
	private String memName;
	private String memCategoryid;


	public String getMemEmail() {
		return memEmail;
	}
	public void setMemEmail(String memEmail) {
		this.memEmail = memEmail;
	}
	public String getMemName() {
		return memName;
	}
	public void setMemName(String memName) {
		this.memName = memName;
	}
	public String getMemCategoryid() {
		return memCategoryid;
	}
	public void setMemCategoryid(String memCategoryid) {
		this.memCategoryid = memCategoryid;
	}

	public int getMemStart() {
		return memStart;
	}
	public void setMemStart(int memStart) {
		this.memStart = memStart;
	}
	public int getMemEnd() {
		return memEnd;
	}
	public void setMemEnd(int memEnd) {
		this.memEnd = memEnd;
	}


}
