package moim.place.model;

public class PlaceUsed {

	private String usedId;
	private String meeId;
	private String plaId;
	private String usedDate;
	private String usedTime;
	private String plaName;
	private String plaMax;



	public String getPlaMax() {
		return plaMax;
	}
	public void setPlaMax(String plaMax) {
		this.plaMax = plaMax;
	}

	public String getPlaName() {
		return plaName;
	}
	public void setPlaName(String plaName) {
		this.plaName = plaName;
	}
	public String getMeeId() {
		return meeId;
	}
	public void setMeeId(String meeId) {
		this.meeId = meeId;
	}
	public String getUsedId() {
		return usedId;
	}
	public void setUsedId(String usedId) {
		this.usedId = usedId;
	}

	public String getPlaId() {
		return plaId;
	}
	public void setPlaId(String plaId) {
		this.plaId = plaId;
	}
	public String getUsedDate() {
		return usedDate;
	}
	public void setUsedDate(String usedDate) {
		this.usedDate = usedDate;
	}
	public String getUsedTime() {
		return usedTime;
	}
	public void setUsedTime(String usedTime) {
		this.usedTime = usedTime;
	}
}
