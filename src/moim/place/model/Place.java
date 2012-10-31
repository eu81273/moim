package moim.place.model;

public class Place {
	private String plaId;
	private String plaName;
	private String plaPhone;
	private String plaPrice;
	private String plaAddr;
	private String plaPhoto;
	private String plaMax;
	private String plaExplain;


	public Place(){}

	public Place(String plaId, String plaName, String plaPhone, String plaPrice, String plaAddr,
			String plaPhoto, String plaMax, String plaExplain)
	{
		this.plaId = plaId;
		this.plaName = plaName;
		this.plaPhone = plaPhone;
		this.plaPrice = plaPrice;
		this.plaAddr = plaAddr;
		this.plaPhoto = plaPhoto;
		this.plaMax = plaMax;
		this.plaExplain = plaExplain;


	}

	public String getPlaId() {
		return plaId;
	}

	public void setPlaId(String plaId) {
		this.plaId = plaId;
	}

	public String getPlaName() {
		return plaName;
	}

	public void setPlaName(String plaName) {
		this.plaName = plaName;
	}

	public String getPlaPhone() {
		return plaPhone;
	}

	public void setPlaPhone(String plaPhone) {
		this.plaPhone = plaPhone;
	}

	public String getPlaPrice() {
		return plaPrice;
	}

	public void setPlaPrice(String plaPrice) {
		this.plaPrice = plaPrice;
	}

	public String getPlaAddr() {
		return plaAddr;
	}

	public void setPlaAddr(String plaAddr) {
		this.plaAddr = plaAddr;
	}

	public String getPlaPhoto() {
		return plaPhoto;
	}

	public void setPlaPhoto(String plaPhoto) {
		this.plaPhoto = plaPhoto;
	}

	public String getPlaMax() {
		return plaMax;
	}

	public void setPlaMax(String plaMax) {
		this.plaMax = plaMax;
	}

	public String getPlaExplain() {
		return plaExplain;
	}

	public void setPlaExplain(String plaExplain) {
		this.plaExplain = plaExplain;
	}


}
