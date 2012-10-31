package moim.comment.service;

import java.util.List;

import jcf.query.core.QueryExecutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moim.comment.model.Comment;

@Service
public class CommentServiceImpl implements CommentService{

	@Autowired
	private QueryExecutor queryExecutor;


	@Override
	public List<Comment> getCommentsList(Comment comment)
	{
		return queryExecutor.queryForList("comments.selectComments", comment, Comment.class);
	}


	@Override
	public void deleteComments(Comment comment) {
		queryExecutor.update("comments.deleteComments", comment);

	}


	@Override
	public void insertComments(Comment comment) {
		queryExecutor.update("comments.insertComments", comment);
	}


	@Override
	public void updateComments(Comment comment) {
		queryExecutor.update("comments.updateComments", comment);

	}


	@Override
	public void dropComments(String	meeId) {
		queryExecutor.update("comments.dropComments", meeId);
	}



}
