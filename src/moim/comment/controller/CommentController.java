package moim.comment.controller;

import java.util.List;

import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciResponse;
import moim.comment.model.Comment;
import moim.comment.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CommentController {

	@Autowired
	private CommentService com_service;

	@RequestMapping("/comments/getComments")
	public void getComments(MciRequest request, MciResponse response)
	{
		Comment comment = new Comment();

		comment.setMeeId(request.getParam("meeId"));
		comment.setBoaNum(request.getParam("boaNum"));

		List<Comment> com_list = com_service.getCommentsList(comment);

		response.setList("COMMENTS", com_list);
	}

	@RequestMapping("/comments/deleteComments")
	public void deleteComments(MciRequest request, MciResponse response)
	{
		Comment comment = new Comment();
		comment.setMeeId(request.getParam("meeId"));
		comment.setComNum(request.getParam("comNum"));

		com_service.deleteComments(comment);

		response.addSuccessMessage("deleteComments OK");
	}

	@RequestMapping("/comments/insertComments")
	public void insertComments(MciRequest request, MciResponse response)
	{
		Comment comment = request.getParam(Comment.class);

		com_service.insertComments(comment);

		response.addSuccessMessage("insertComments OK");
	}

	@RequestMapping("/comments/updateComments")
	public void updateComments(MciRequest request, MciResponse response)
	{
		Comment comment = new Comment();
		comment.setComContent(request.getParam("comContent"));
		comment.setMeeId(request.getParam("meeId"));
		comment.setComNum(request.getParam("comNum"));

		System.out.println(request.getParam("comContent"));
		System.out.println(request.getParam("meeId"));
		System.out.println(request.getParam("comNum"));

		com_service.updateComments(comment);

		response.addSuccessMessage("updateComments OK");
	}


	@RequestMapping("/comments/dropComments")
	public void dropComments(MciRequest request, MciResponse response)
	{

	    String meeId = request.getParam("meeId");

	    com_service.dropComments(meeId);

		response.addSuccessMessage("dropComments OK");

	}

}
