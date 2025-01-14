import { getGroupDetail } from "@/apis/grouppost";
import Chat from "@/components/chat/Chat";
import Like from "@/components/common/like/Like";
import IsLoading from "@/components/common/loading/IsLoading";
import InnerLayout from "@/components/common/page/InnerLayout";
import Title from "@/components/common/read/Title";
import UserInfo from "@/components/common/read/UserInfo";
import { GroupPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ShareButton from "../../common/share/ShareButton";
import LabelInfo from "../common/LabelInfo";
import GroupContent from "./GroupContent";
import GroupDetailBtnList from "./GroupDetailBtnList";
import GroupEditBtnList from "./GroupEditBtnList";
import GroupPopularList from "./GroupPopularList";

type Props = {
  params: { id: string };
};

type TGroupPostDetail = {
  profiles: {
    nickname: string;
    profile_image_url: string;
  };
  group_applications: {}[];
} & GroupPost;

async function GroupDetail({ params }: Props) {
  const { id } = params;
  const data = await getGroupDetail(id);

  const {
    title,
    content,
    item,
    price,
    people_num,
    start_date,
    end_date,
    link,
    is_finished,
    img_url,
    group_applications,
    user_id,
    is_free,
    regular_price,
    profiles: { nickname, profile_image_url },
  } = data as TGroupPostDetail;

  const achievementRate = Math.round(
    (group_applications.length / people_num) * 100
  );

  return (
    <Suspense fallback={<IsLoading />}>
      <InnerLayout>
        <div>
          <Title title={title} />
          <UserInfo
            profile_image_url={profile_image_url}
            nickname={nickname}
            created_at={start_date}
          />
          <div className="relative overflow-hidden rounded-lg mb-[50px]">
            <Image
              src={img_url}
              alt="공구템 이미지"
              width={680}
              height={500}
              className={`border rounded-lg ${
                is_finished && "grayscale opacity-50"
              }`}
              priority
            />
            {link && (
              <a href={link} target="_blank" className="hidden md:block">
                <div className=" cursor-pointer flex justify-center items-center bg-black absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 hover:bg-opacity-50">
                  <p className="z-10 opacity-100 text-white">공구템 보러가기</p>
                  <Image
                    src="/img/icon-up-right.png"
                    alt="보러가기 버튼"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
              </a>
            )}

            <div className="absolute w-full bottom-5 px-5 flex justify-between items-center">
              {link && (
                <a href={link} target="_blank" className="md:hidden">
                  <button className="md:hidden border border-gray-1 bg-black text-gray-1 bg-opacity-30 h-[30px] px-[41px] rounded-full flex items-center">
                    <p>공구템 보러가기</p>
                    <Image
                      src="/img/icon-up-right.png"
                      alt="보러가기 버튼"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </button>
                </a>
              )}
            </div>
          </div>
          <LabelInfo
            peopleNum={people_num}
            application={group_applications}
            isFree={is_free}
          />
          <p className="mt-[10px] text-[14px] md:text-[16px] text-blue-6 font-[700]">
            마감일 {end_date} 까지
          </p>
          <div>
            <h5 className="font-[700] text-[22px] md:text-[26px] mt-[10px] text-gray-6">
              {title}
            </h5>
            <p className="mb-[13px] mt-[5px] text-[14px] md:text-[16px] text-gray-6">
              {item}
            </p>
            <p className="font-[700] text-gray-5">
              <span className="text-red-5">{regular_price}원</span>을{" "}
              <span className="text-red-5">{people_num}명</span>이 나눠서
            </p>
            <p
              className={`font-[700] text-[18px] md:text-[26px] mt-[10px] mb-[25px] text-gray-6 `}
            >
              {price.toLocaleString()}원
            </p>

            <div className="flex gap-2 justify-between md:justify-normal items-center w-full md:w-auto">
              {is_finished ? (
                <div className="text-gray-5 rounded-full w-full md:w-[280px] font-[700] text-[15px] flex items-center justify-center h-[35px] md:h-[32px] bg-gray-2">
                  종료된 공구입니다.
                </div>
              ) : (
                <>
                  <GroupDetailBtnList
                    userId={user_id}
                    id={id}
                    achievementRate={achievementRate}
                  />
                  {/* <ShareButton
                    postId={data.id}
                    title={title}
                    content={item}
                    imgUrl={img_url}
                  /> */}
                </>
              )}
            </div>
            <div className="mt-[24px] md:mt-10 border-y border-gray-2 py-10 mb-[59px] md:mb-[9px] text-gray-6">
              <GroupContent content={content} />
            </div>
            <div className="flex justify-end text-gray-4 mt-[10px] mb-[71px] items-center">
              <Like postId={id} /> ・
              <ShareButton
                postId={id}
                title={title}
                content={item}
                imgUrl={img_url}
              />
              <GroupEditBtnList userId={user_id} id={id} />
            </div>

            {!is_finished && (
              <Chat postId={id} userId={user_id} title={title} />
            )}
          </div>
        </div>
      </InnerLayout>
      <GroupPopularList id={id} />
      <div className="flex justify-center mt-[100px] mb-[77px] md:mb-0">
        <Link href={"/grouppost"}>
          <button className="border-main-7 text-sm border-[1px] rounded-full text-main-7 font-[700] py-[6px] px-[16px] flex items-center  h-[36px]">
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    </Suspense>
  );
}

export default GroupDetail;
