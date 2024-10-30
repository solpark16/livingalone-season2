import { WishButton } from "./WishButton";
import { WishCount } from "./WishCount";

interface WishProps {
  postId: string;
}

export default function Wish({ postId }: WishProps) {
  return (
    <div>
      <WishButton postId={postId} />
      <WishCount postId={postId} />
    </div>
  );
}
