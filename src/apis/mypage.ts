import { TProfile } from "@/types/types";

export async function getMyProfile(id: string) {
  const response = await fetch(`/api/auth/profile/${id}`);
  const data = await response.json();
  return data;
}

export async function insetMyProfile(id: string, newProfile: TProfile) {
  const response = await fetch(`/api/auth/profile/${id}`, {
    method: "PUT",
    body: JSON.stringify(newProfile),
  });
  const data = await response.json();
  return data;
}
