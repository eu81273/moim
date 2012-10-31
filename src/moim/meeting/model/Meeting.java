package moim.meeting.model;

public class Meeting {

	private String meeId;
	private String meeName;
	private String meeKeyword;
	private String meeExplain;
	private String meeOpen;
	private String meeStartdate;
	private String meeMaxpeople;
	private String meeJoinpossible;
	private String meePhoto;
	private String meeCategoryid;
	private String meeCurrentpeople;

	private String meeAdminid;//데이터베이스로 연결해서
	//검색을 위한 변수
	private String meeText; //검색할때 입력되는 text
	private String meeSelect;// 이름으로 검색인지 키워드로 검색인지 저장하는 변수

	public Meeting(){}

	public Meeting(String meeName, String meeKeyword, String meeExplain, String meeOpen,
			String meeStartdate, String meeMaxpeople, String meePhoto, String meeCategoryid,
			 String meeCurrentpeople, String meeAdminid, String meeText, String meeSelect){

		this.meeName = meeName;
		this.meeKeyword = meeKeyword;
		this.meeExplain = meeExplain;
		this.meeOpen = meeOpen;
		this.meeStartdate = meeStartdate;
		this.meeMaxpeople = meeMaxpeople;
		this.meePhoto = meePhoto;
		this.meeCategoryid = meeCategoryid;
		this.meeCurrentpeople = meeCurrentpeople;
		this.meeAdminid = meeAdminid;
		this.meeText = meeText;
		this.meeSelect = meeSelect;

	}

	public String getMeeId() {
		return meeId;
	}

	public void setMeeId(String meeId) {
		this.meeId = meeId;
	}

	public String getMeeName() {
		return meeName;
	}

	public void setMeeName(String meeName) {
		this.meeName = meeName;
	}

	public String getMeeKeyword() {
		return meeKeyword;
	}

	public void setMeeKeyword(String meeKeyword) {
		this.meeKeyword = meeKeyword;
	}

	public String getMeeExplain() {
		return meeExplain;
	}

	public void setMeeExplain(String meeExplain) {
		this.meeExplain = meeExplain;
	}

	public String getMeeOpen() {
		return meeOpen;
	}

	public void setMeeOpen(String meeOpen) {
		this.meeOpen = meeOpen;
	}

	public String getMeeStartdate() {
		return meeStartdate;
	}

	public void setMeeStartdate(String meeStartdate) {
		this.meeStartdate = meeStartdate;
	}

	public String getMeeMaxpeople() {
		return meeMaxpeople;
	}

	public void setMeeMaxpeople(String meeMaxpeople) {
		this.meeMaxpeople = meeMaxpeople;
	}

	public String getMeeJoinpossible() {
		return meeJoinpossible;
	}

	public void setMeeJoinpossible(String meeJoinpossible) {
		this.meeJoinpossible = meeJoinpossible;
	}

	public String getMeePhoto() {
		return meePhoto;
	}

	public void setMeePhoto(String meePhoto) {
		this.meePhoto = meePhoto;
	}

	public String getMeeCategoryid() {
		return meeCategoryid;
	}

	public void setMeeCategoryid(String meeCategoryid) {
		this.meeCategoryid = meeCategoryid;
	}

	public String getMeeCurrentpeople() {
		return meeCurrentpeople;
	}

	public void setMeeCurrentpeople(String meeCurrentpeople) {
		this.meeCurrentpeople = meeCurrentpeople;
	}

	public String getMeeAdminid() {
		return meeAdminid;
	}

	public void setMeeAdminid(String meeAdminid) {
		this.meeAdminid = meeAdminid;
	}

	public String getMeeText() {
		return meeText;
	}

	public void setMeeText(String meeText) {
		this.meeText = meeText;
	}

	public String getMeeSelect() {
		return meeSelect;
	}

	public void setMeeSelect(String meeSelect) {
		this.meeSelect = meeSelect;
	}





}

