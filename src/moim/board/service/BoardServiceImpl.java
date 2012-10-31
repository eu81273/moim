package moim.board.service;

import java.util.List;

import jcf.query.core.QueryExecutor;

import moim.board.model.Board;
import moim.board.model.BoardPaging;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private QueryExecutor queryExecutor;

	@Override
	public void insertBoard(Board board) {
		queryExecutor.update("board.insertBoard", board);
	}

	@Override
	public void deleteBoard(Board board) {
		queryExecutor.update("board.deleteBoard", board);
	}


	@Override
	public void updateBoard(Board board) {
		queryExecutor.update("board.updateBoard", board);
	}


	@Override
	public List<Board> getBoard(BoardPaging paging) {
		return  queryExecutor.queryForList("board.selectBoard", paging , Board.class);
	}

	@Override
	public void addClickNum(Board board) {
		queryExecutor.update("board.updateClicknum", board);
	}

	@Override
	public Board getDetailBoard(Board board) {
		return queryExecutor.queryForObject("board.selectBoardDetail", board , Board.class);
	}


	@Override
	public void dropBoard(String meeId) {
		queryExecutor.update("board.dropBoard", meeId);
	}
}
