package moim.board.model;

public class BoardPaging {

	private int meeId;
	private int boaStart;
	private int boaEnd;

	private String boaText;



	public String getBoaText() {
		return boaText;
	}
	public void setBoaText(String boaText) {
		this.boaText = boaText;
	}
	private String boaNum;


	public String getBoaNum() {
		return boaNum;
	}
	public void setBoaNum(String boaNum) {
		this.boaNum = boaNum;
	}
	public int getMeeId() {
		return meeId;
	}
	public void setMeeId(int meeId) {
		this.meeId = meeId;
	}
	public int getBoaStart() {
		return boaStart;
	}
	public void setBoaStart(int boaStart) {
		this.boaStart = boaStart;
	}
	public int getBoaEnd() {
		return boaEnd;
	}
	public void setBoaEnd(int boaEnd) {
		this.boaEnd = boaEnd;
	}


}
