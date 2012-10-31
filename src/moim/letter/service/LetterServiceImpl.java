package moim.letter.service;


import java.util.List;

import jcf.query.core.QueryExecutor;
import moim.letter.model.Letter;
import moim.letter.model.LetterPaging;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LetterServiceImpl implements LetterService{

	@Autowired
	private QueryExecutor queryExecutor;


	@Override
	public void insertLetter(Letter letter) {
		queryExecutor.update("letter.insertLetter", letter);
	}

	@Override
	public void deleteLetter(String id) {
		queryExecutor.update("letter.deleteLetter", id);
	}

	@Override
	public List<Letter> getLetter(Letter letter) {

		return queryExecutor.queryForList("letter.selectLetter", letter , Letter.class);
	}

	@Override
	public void updateLetter(String id)
	{
		queryExecutor.update("letter.updateLetter", id);

	}

	@Override
	public List<Letter> getPageLetter(LetterPaging paging) {
		return queryExecutor.queryForList("letter.selectPageletter", paging, Letter.class);
	}

	@Override
	public int getNoreadLetter(String id) {
		return queryExecutor.queryForInt("letter.selectNoread", id);
	}
}
