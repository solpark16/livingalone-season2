import { deleteLike, getMyLike, insertLike } from "@/apis/grouppost";
import { GroupLike, TGroupLikeData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Confirm } from "notiflix";
import { useEffect, useState } from "react";

export default function useLike(postId: string) {
  const queryClient = useQueryClient();
  const [isLike, setIsLike] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const {
    data: myLike,
    isPending,
    isError,
  } = useQuery<GroupLike>({
    queryKey: ["like", postId, userId],
    queryFn: () => getMyLike(postId, userId),
    enabled: !!user,
  });

  useEffect(() => {
    if (myLike && myLike.post_id === postId) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [myLike, postId]);

  const { mutate: addLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => insertLike(likeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => deleteLike(likeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const handleToggleLike = () => {
    if (user) {
      const likeData: TGroupLikeData = {
        post_id: postId,
        user_id: user.id,
      };
      setIsLike((prev) => !prev);
      isLike ? removeLike(likeData) : addLike(likeData);
    } else {
      Confirm.show(
        "로그인 후 이용 가능",
        "로그인하러 가시겠습니까?",
        "로그인 하기",
        "취소",
        () => {
          router.push("/login");
        },
        () => {
          return;
        }
      );
    }
  };

  return { isLike, handleToggleLike, isPending, isError, user };
}
