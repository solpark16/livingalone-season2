import { EditorProps } from "@toast-ui/react-editor";
import { Tables } from "./supabase";

export type Profile = Tables<"profiles">;
export type TProfile = Omit<Profile, "created_at" | "user_id">;

export type PostType = "must" | "group";
export type PostResponseType<T extends PostType> = T extends "must"
  ? MustPostResponse
  : GroupPostResponse;

export type BasePostData<ErrorType> = {
  title: string;
  imgUrl: string;
  editorRef: EditorProps;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
  link: string;
  price: number;
  item: string;
};

export type MustPost = Tables<"must_posts">;
export type MustWish = Tables<"must_wishes">;
export type MustComment = Tables<"must_comments">;
export type MustCategory = Tables<"must_categories">;

export type MustComments = Tables<"must_comments"> & {
  profiles: Pick<Profile, "nickname" | "profile_image_url">;
} & {
  must_post: Pick<MustPost, "id" | "user_id">;
};

export type TNewMustPost = Omit<MustPost, "created_at">;

export type TMainMustPost = Pick<MustPost, "id" | "title" | "item" | "img_url">;
export type TMustPostList = Pick<
  MustPost,
  "id" | "title" | "content" | "item" | "img_url"
>;

export type TMustWishData = { post_id: string; user_id: string };

export type MyWishMust = Pick<MustWish, "id" | "post_id"> & {
  must_posts: Pick<MustPost, "title" | "item" | "img_url">;
};

export type TMustError = Record<
  | "titleError"
  | "categoryError"
  | "itemNameError"
  | "companyError"
  | "priceError"
  | "imageUrlError",
  string
>;

export type MustPostData = BasePostData<TMustError> & {
  selectedCategoryId: string;
  company: string;
  itemName: string;
};

export type MustPostResponse = Omit<MustPost, "created_at">;
export type TProfileError = Record<
  "nicknameError" | "detailAddressError" | "imageUrlError",
  string
>;

export type GroupPost = Tables<"group_posts">;
export type GroupLike = Tables<"group_likes">;
export type GroupApplication = Tables<"group_applications">;
export type GroupApplyItems = GroupApplication & { group_posts: GroupPost };

export type TNewGroupPost = Omit<GroupPost, "created_at">;
export type TNewGroupApplication = Omit<GroupApplication, "created_at">;

export type TGroupApplication = Pick<GroupApplication, "id">;
export type TGroupApplications = {
  group_applications: GroupApplication[];
};

export type TMainGroupPost = Pick<
  GroupPost,
  | "id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
  | "item"
  | "regular_price"
  | "is_free"
> &
  TGroupApplications;

export type TGroupApplicationData = Pick<GroupApplication, "id" | "post_id"> & {
  group_posts: Pick<
    GroupPost,
    | "id"
    | "title"
    | "price"
    | "people_num"
    | "is_finished"
    | "img_url"
    | "start_date"
    | "end_date"
    | "item"
    | "regular_price"
    | "is_free"
  > & { group_applications: TGroupApplication[] };
};

export type TGroupLikeData = Omit<GroupLike, "created_at" | "id">;
export type TGroupLike = Pick<GroupLike, "id">;
export type TGroupApplicationsLikes = {
  group_applications: TGroupApplication[];
  group_likes: TGroupLike[];
};

export type TPopularGroupPost = Pick<
  GroupPost,
  | "id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
  | "item"
  | "regular_price"
  | "is_free"
> &
  TGroupApplicationsLikes;

export type TMyGroupPost = GroupPost & TGroupApplications;
export type TGroupLikeAndApplications = GroupPost & {
  group_applications: TGroupLike[];
};
export type TLikePosts = Tables<"group_likes"> & {
  group_posts: TGroupLikeAndApplications;
};

export type TGroupError = Record<
  | "titleError"
  | "endDateError"
  | "peopleNumError"
  | "itemError"
  | "priceError"
  | "regularPriceError"
  | "imageUrlError",
  string
>;

export type GroupPostData = BasePostData<TGroupError> & {
  endDate: string;
  peopleNum: number;
  regularPrice: number;
  checkBox: boolean;
  isFree: boolean;
};

export type GroupPostResponse = Omit<GroupPost, "created_at">;

export type Chat = Tables<"chat">;

export type Payment = Tables<"payments">;
export type TNewPayment = Omit<Payment, "created_at">;

export type Alarm = Tables<"alarms">;
export type TAddAlarm = {
  group_post_id: string | null;
  is_read: boolean;
  link: string;
  must_post_id: string | null;
  type: string;
  user_id: string;
};
export type TAlarm = Tables<"alarms"> & {
  group_posts: { title: string; img_url: string };
  must_posts: { title: string; img_url: string };
};
export type TEditAlarm = Pick<Alarm, "user_id" | "id" | "is_read">;
export type TDeleteAlarm = Pick<Alarm, "user_id" | "id">;

export type Comment = Tables<"must_comments">;

export type TPlayList = {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
  };
};

export type TVideoList = {
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    resourceId: {
      videoId: string;
    };
  };
};

export type TVideo = {
  playlistId: string;
  playlistTitle: string;
  playlistDescription: string;
  videos: {
    title: string;
    thumbnail: string;
    videoUrl: string;
    videoId: string;
  }[];
};
