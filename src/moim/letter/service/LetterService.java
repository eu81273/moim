package moim.letter.service;


import java.util.List;
import moim.letter.model.Letter;
import moim.letter.model.LetterPaging;


public interface LetterService {

	public void insertLetter(Letter letter);

	public void deleteLetter(String id);

	public List<Letter> getLetter(Letter letter);

	public void updateLetter(String id);

	public List<Letter> getPageLetter(LetterPaging paging);

	public int getNoreadLetter(String id);
}
