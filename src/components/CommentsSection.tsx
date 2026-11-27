// import { useState, type FormEvent } from "react";
// import { useGetCommentsQuery, useCreateCommentMutation } from "../api/baseApi"
// import type { Comment } from '../types/comment';

// type PostCommentsProps = {
//   postId: number;
//   userId: number;
// };

// export function CommentItem(
//     {
//         comment
//     }: {
//         comment: Comment
//     }
// ){
//     const author = comment.author.email;

//     return (
//         <li>
//             <h3>{ author }</h3>

//             <div key={comment.id}>
//                 <p>{comment.content}</p>
//             </div>
//         </li>
//     )
// }



// export function CommentsSection({postId, userId}: PostCommentsProps) {
//     const {data: comments = [], isLoading, isError} = useGetCommentsQuery(postId);
//     const [CreateComment, {isLoading: isCreating}] = useCreateCommentMutation();
//     const [content, setContent] = useState('')


//     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         if (!userId || isCreating) return;

//         const trimmed = content.trim();
//         if (!trimmed) return;

//         await CreateComment({ postId, content: trimmed }).unwrap();
        
//     }

//     return (
//         <section className= "section-comments">
//             <div>
//                 {isLoading ? (
//                     <p>Завантажуємо коментарі...</p>
//                 ) : isError ? (
//                     <p>Не вдалося завантажити коментарі. Спробуйте пізніше.</p>
//                 ) : comments.length === 0 ? (
//                     <p>Коментарів поки нема</p>
//                 ) : (
//                     <ul>
//                     {comments.map((comment) => (
//                        <CommentItem
//                         key={comment.id}
//                         comment={comment}
//                        />
//                     ))}
//                     </ul>
//                 )}

//                 {userId ? (
//                     <form onSubmit={(e) => void handleSubmit(e)}>
//                         <textarea
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             placeholder="Напишіть коментар..."
//                         />
//                         <button type="submit" disabled={isCreating || !content.trim()}>
//                             {isCreating ? 'Надсилання...' : 'Надіслати'}
//                         </button>
//                     </form>
//                 ) : (
//                     <p>Увійдіть, щоб залишити коментар</p>
//                 )}
//             </div>
//         </section>
//     )
// }

import { type FormEvent, useState } from 'react';
import { useGetMeQuery } from '../api/baseApi'; 
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../api/baseApi';
import { CommentItem, type PostComment } from './CommentItem';

interface PostCommentsProps {
  postId: number;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as { data?: { message?: unknown } }).data?.message === 'string'
  ) {
    return (error as { data: { message: string } }).data.message;
  }

  return 'Сталася помилка. Спробуйте ще раз.';
}

export function CommentsSection({ postId }: PostCommentsProps) {
  const { data: user } = useGetMeQuery();
  const { data: comments = [], isLoading, isError } = useGetCommentsQuery(postId);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || isCreating) {
      return;
    }

    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length > 500) {
      setError('Коментар має містити від 1 до 500 символів.');
      return;
    }

    setError(null);
    try {
      await createComment({ postId, content: trimmedContent }).unwrap();
      setContent('');
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  async function handleDelete(commentId: number) {
    if (!user || isDeleting) {
      return;
    }

    setError(null);
    try {
      await deleteComment({ postId, commentId }).unwrap();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  return (
    <section className="section-comments">
      <div>
        {isLoading ? (
          <p>Завантажуємо коментарі...</p>
        ) : isError ? (
          <p>Не вдалося завантажити коментарі. Спробуйте пізніше.</p>
        ) : comments.length === 0 ? (
          <p>Коментарів поки нема</p>
        ) : (
          <ul>
            {comments.map((comment: PostComment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                isDeleting={isDeleting}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}

        {error && <p className="error-message">{error}</p>}

        {user ? (
          <form onSubmit={(e) => void handleSubmit(e)}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишіть коментар..."
              maxLength={500}
              disabled={isCreating}
            />
            <button type="submit" disabled={isCreating || !content.trim()}>
              {isCreating ? 'Надсилання...' : 'Надіслати'}
            </button>
          </form>
        ) : (
          <p>Увійдіть, щоб залишити коментар</p>
        )}
      </div>
    </section>
  );
}

