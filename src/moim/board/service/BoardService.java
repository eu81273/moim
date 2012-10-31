package moim.board.service;

import java.util.List;

import moim.board.model.Board;
import moim.board.model.BoardPaging;

public interface BoardService {

	public void insertBoard(Board board);

	public void deleteBoard(Board board);

	public void updateBoard(Board board);

	public List<Board> getBoard(BoardPaging paging);

	public void addClickNum(Board board);

	public Board getDetailBoard(Board board);

	public void dropBoard(String meeId);
}
