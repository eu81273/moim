package moim.comment.service;

import java.util.List;
import moim.comment.model.Comment;

public interface CommentService {

	public List<Comment> getCommentsList(Comment comment);

	public void deleteComments(Comment comment);

	public void insertComments(Comment comment);

	public void updateComments(Comment comment);

	public void dropComments(String	meeId);

}
