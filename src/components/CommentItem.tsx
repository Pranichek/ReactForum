export interface PostComment {
  id: number;
  postId?: number;
  content: string;
  authorId?: number;
  authorName?: string;
  createdAt?: string;
}

interface CommentItemProps {
  comment: PostComment;
  currentUserId?: number;
  isDeleting?: boolean;
  onDelete?: (commentId: number) => void;
}

export function CommentItem({
  comment,
  currentUserId,
  isDeleting = false,
  onDelete,
}: CommentItemProps) {
  const canDelete =
    Boolean(onDelete) &&
    currentUserId !== undefined &&
    comment.authorId !== undefined &&
    comment.authorId === currentUserId;

  return (
    <li className="comment-item">
      <div className="comment-header">
        <strong>{comment.authorName ?? 'Користувач'}</strong>
        {comment.createdAt && <span>{comment.createdAt}</span>}
      </div>

      <p>{comment.content}</p>

      {canDelete && (
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete?.(comment.id)}
        >
          {isDeleting ? 'Видалення...' : 'Видалити'}
        </button>
      )}
    </li>
  );
}