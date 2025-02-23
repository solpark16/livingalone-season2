"use client";

import { deleteGroupPost } from "@/apis/grouppost";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";

function GroupDeleteBtn({ id }: { id: string }) {
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: deleteGroupPost,
    onSuccess: () => {
      router.push("/grouppost");
    },
  });

  const deleteGroupPostHandler = async () => {
    Confirm.show(
      "혼자살때",
      "정말로 삭제하시겠습니까?",
      "네",
      "아니오",
      () => {
        deleteMutation.mutate(id);
      },
      () => {
        return;
      }
    );
  };

  return <button onClick={deleteGroupPostHandler}>삭제</button>;
}

export default GroupDeleteBtn;
