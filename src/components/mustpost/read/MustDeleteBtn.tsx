"use client";
import { usePostDelete } from "@/hooks/mustpost/usePostDelete";

function MustDeleteBtn({ id }: { id: string }) {
  const { handlePostDelete } = usePostDelete(id);
  return (
    <button className="" onClick={handlePostDelete}>
      삭제
    </button>
  );
}

export default MustDeleteBtn;
