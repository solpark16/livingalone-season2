"use client";
import { deleteMustPost } from "@/apis/mustpost";
import { useCategoryStore } from "@/zustand/mustStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";

function MustDeleteBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) => deleteMustPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mustPosts", selectedCategory],
      });
      router.push("/mustpost");
    },
  });

  const handlePostDelete = () => {
    Confirm.show(
      "혼자살때",
      "정말로 삭제하시겠습니까?",
      "네",
      "아니오",
      () => {
        deletePost(id);
      },
      () => {
        return;
      }
    );
  };
  return (
    <button className="" onClick={handlePostDelete}>
      삭제
    </button>
  );
}

export default MustDeleteBtn;
