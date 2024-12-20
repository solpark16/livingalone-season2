import { GroupApplication, TProfile } from "@/types/types";

export async function getMyProfile(id: string) {
  const response = await fetch(`/api/auth/profile/${id}`);
  const data = await response.json();
  return data;
}

export async function editMyProfile(id: string, newProfile: TProfile) {
  const response = await fetch(`/api/auth/profile/${id}`, {
    method: "PUT",
    body: JSON.stringify(newProfile),
  });
  const data = await response.json();
  return data;
}

export async function uploadImage(formData: FormData) {
  const response = await fetch("/api/auth/profile/image", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export async function getMyGroupPosts(userId: string) {
  const response = await fetch(`/api/grouppost/user/${userId}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function editMyGroupApply(
  id: string,
  newGroupApply: GroupApplication
) {
  const response = await fetch(`/api/applygroup/${id}`, {
    method: "PUT",
    body: JSON.stringify(newGroupApply),
  });
  const data = await response.json();
  return data;
}

export async function getMyWishMust(userId: string) {
  const response = await fetch(`/api/mypage/must-post/wish/${userId}`);
  const data = await response.json();
  return data;
}

export async function getMyMustPosts(page = 0, userId: string) {
  const response = await fetch(`/api/mypage/must-post/${userId}?page=${page}`);
  const data = await response.json();
  return {
    posts: data.data,
    total: data.count,
  };
}

export async function getMyLikeGroup(userId: string) {
  const response = await fetch(`/api/mypage/group-post/like/${userId}`);
  const data = await response.json();
  return data;
}

export async function getMyGroup(userId: string) {
  const response = await fetch(`/api/mypage/group-post/${userId}`);
  const data = await response.json();
  return data;
}

export async function getMyApplyGroup(userId: string) {
  const response = await fetch(`/api/mypage/group-post/apply/${userId}`);
  const data = await response.json();
  return data;
}
