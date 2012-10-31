package moim.board.controller;

import java.util.List;
import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciResponse;
import moim.board.model.Board;
import moim.board.model.BoardPaging;
import moim.board.service.BoardService;
import moim.place.model.PlacePaging;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {

	@Autowired
	private BoardService boa_service;

	/**
	 * 게시판의 글을 새로 작성 할 때 사용하는 메소드
	 */
	@RequestMapping("/board/createBoard")
	public void createBoard(MciRequest request, MciResponse response)
	{
		Board board = request.getParam(Board.class);

		boa_service.insertBoard(board);

		response.addSuccessMessage("CREATEBOARD SUCCESS");
	}

	/**
	 * 글을 삭제할 때 사용하는 메소드
	 */
	@RequestMapping("/board/deleteBoard")
	public void deleteBoard(MciRequest request, MciResponse response)
	{
		Board board = new Board();
		board.setBoaNum(request.getParam("boaNum"));
		board.setMeeId(request.getParam("meeId"));


		boa_service.deleteBoard(board);

		response.addSuccessMessage("deleteBoard OK");
	}

	/**
	 * 작성 글을 수정할 때 사용하는 메소드
	 */
	@RequestMapping("/board/updateBoard")
	public void updateBoard(MciRequest request, MciResponse response)
	{
		Board board = request.getParam(Board.class);
		boa_service.updateBoard(board);
		response.addSuccessMessage("글이수정됨");
	}

	/**
	 * 글목록 조회할 때 사용하는 메소드
	 */
	@RequestMapping("/board/getBoard")
	public void getBoard(MciRequest request, MciResponse response)
	{
		final int ARTICLESPERPAGE = 5;

		String page = request.getParam("page");
		String meeId = request.getParam("meeId");
		String boaText = request.getParam("searchKeyword");

		int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
		int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

		BoardPaging paging = new BoardPaging();
		paging.setBoaStart(startNo);
		paging.setBoaEnd(endNo);
		paging.setMeeId(Integer.parseInt(meeId));
		paging.setBoaText(boaText);

		List<Board> board_list = boa_service.getBoard(paging);

		response.setList("BOARD", board_list);
	}

	/**
	 * 글 상세보기 했을 경우
	 */
	@RequestMapping("/board/getDetailBoard")
	public void getDetailBoard(MciRequest request, MciResponse response)
	{
		Board board = new Board();
		board.setMeeId(request.getParam("meeId"));
		board.setBoaNum(request.getParam("boaNum"));

		boa_service.addClickNum(board);
		Board board2 = boa_service.getDetailBoard(board);

		response.set("BOARD", board2);
	}

	/**
	 * 모임이 삭제될 경우 게시판 테이블 DROP
	 */

	@RequestMapping("/board/dropBoard")
	public void dropBoard(MciRequest request, MciResponse response)
	{

	    String meeId = request.getParam("meeId");

	    boa_service.dropBoard(meeId);

		response.addSuccessMessage("dropBoard OK");

	}
}
