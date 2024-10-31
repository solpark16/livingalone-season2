import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function Comments({ postId, userId }: { postId: string; userId: string }) {
  return (
    <div className="w-full md:w-[640px]">
      <h6 className="font-bold text-[14px] md:text-[18px] mt-[15px] md:mt-[52px] mb-[10px]">
        댓글
      </h6>
      <CommentForm postId={postId} userId={userId} />
      <CommentsList postId={postId} />
    </div>
  );
}

export default Comments;
