import Image from "next/image";
import React from "react";
import NoticeDot from "../../common/NoticeDot";

function GroupPostNotice({
  checkBox,
  setCheckBox,
}: {
  checkBox: boolean;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="border border-gray-3 rounded-lg p-[10px] md:px-[20px] md:py-[17px] text-[13px] text-gray-6">
      <div className="mb-[10px]">
        <p className="leading-5">
          안녕하세요, 혼자살때 공구 게시판을 이용해주셔서 감사합니다.
          <br />
          공구 진행 시 꼭 참고해 주세요:
        </p>
        <ul>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">
              혼자살때에서는 공동 구매(공구) 결제가 이루어지지 않습니다. 저희는
              공구를 할 수 있는 게시판만 제공해 드립니다.
              <br />
              공구자는 공구를 열고 신청자를 받아 이후 과정을 직접 진행해 주셔야
              합니다.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">
              공구 참여 인원은 최대 30명 이하로 제한됩니다.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">
              상품 링크는 선택 사항입니다. 아이템의 상세 페이지를 보여주고
              싶다면 링크를 추가해 주세요.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">상품 이미지는 반드시 올려주셔야 합니다.</p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">
              혼자살때에서는 공구 진행과 관련된 책임을 지지 않습니다.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-5">
              공구자는 신청자의 개인정보를 물건 발송 이후 즉시 모두 삭제해
              주시기 바랍니다.
            </p>
          </li>
        </ul>
        <p className="leading-5">
          위 내용을 잘 숙지하시어 원활한 공구 진행을 부탁드립니다. 감사합니다.
        </p>
      </div>
      <div className="flex items-center gap-1">
        <input
          id="checkBox"
          type="checkbox"
          onChange={() => {
            setCheckBox(!checkBox);
          }}
          className="hidden"
        />
        <label
          htmlFor="checkBox"
          className={`cursor-pointer flex items-center gap-1 font-bold text-[13px] ${
            checkBox ? "text-main-8" : "text-red-6"
          }`}
        >
          {checkBox ? (
            <Image
              src="/img/icon-checkbox-green.png"
              alt="체크박스"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/img/icon-checkbox-red.png"
              alt="체크된 체크박스"
              width={20}
              height={20}
            />
          )}
          위의 내용을 확인하셨나요?
        </label>
      </div>
    </div>
  );
}

export default GroupPostNotice;
