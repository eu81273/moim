package moim.member.model;

public class Member {

	private String memEmail;
	private String memId;
	private String memName;
	private String memPhone;
	private String memPassword;
	private String memPhoto;
	private String memCategoryid;
	private String catName;


	private String memmeeAdmin;


	public Member(){

	}
	public Member(String memEmail,String memName, String memPhone, String memPassword,
			String memPhoto, String memCategoryid){
		this.memEmail = memEmail;
		this.memName = memName;
		this.memPhone = memPhone;
		this.memPassword = memPassword;
		this.memPhoto = memPhoto;
		this.memCategoryid = memCategoryid;
	}


	public String getMemmeeAdmin() {
		return memmeeAdmin;
	}
	public void setMemmeeAdmin(String memmeeAdmin) {
		this.memmeeAdmin = memmeeAdmin;
	}
	public String getMemEmail() {
		return memEmail;
	}
	public void setMemEmail(String memEmail) {
		this.memEmail = memEmail;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public String getMemName() {
		return memName;
	}
	public void setMemName(String memName) {
		this.memName = memName;
	}
	public String getMemPhone() {
		return memPhone;
	}
	public void setMemPhone(String memPhone) {
		this.memPhone = memPhone;
	}
	public String getMemPassword() {
		return memPassword;
	}
	public void setMemPassword(String memPassword) {
		this.memPassword = memPassword;
	}
	public String getMemPhoto() {
		return memPhoto;
	}
	public void setMemPhoto(String memPhoto) {
		this.memPhoto = memPhoto;
	}
	public String getMemCategoryid() {
		return memCategoryid;
	}
	public void setMemCategoryid(String memCategoryid) {
		this.memCategoryid = memCategoryid;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}

}
