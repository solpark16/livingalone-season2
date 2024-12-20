import Input from "@/components/auth/common/Input";
import { useSearchAddress } from "@/hooks/common/useSearchAddress";
import { Profile } from "@/types/types";
import DaumPostcode from "react-daum-postcode";

function SearchAddress({
  prevProfile,
  address,
  setAddress,
  detailAddress,
  onChangeInput,
  error,
}: {
  prevProfile: Profile;
  address: string | null;
  setAddress: (address: string) => void;
  detailAddress: string;
  onChangeInput: (e: any) => void;
  error: {
    detailAddressError: string;
  };
}) {
  const {
    isPostModalOpen,
    setIsPostModalOpen,
    handleOpenAddressModal,
    handleCompleteAddress,
  } = useSearchAddress(setAddress);

  return (
    <div className="relative flex flex-col gap-[10px]">
      <label className="block font-semibold text-xs md:text-[14px] text-gray-5">
        주소
      </label>
      <button
        className="px-5 py-2 text-white bg-gray-6 rounded-full text-[14px] w-fit"
        onClick={handleOpenAddressModal}
      >
        주소검색
      </button>
      {isPostModalOpen && (
        <div className="z-20 absolute left-0 top-[60px] border border-black">
          <div
            onClick={() => setIsPostModalOpen(false)}
            className="fixed inset-0 "
          ></div>
          <DaumPostcode onComplete={handleCompleteAddress}></DaumPostcode>
        </div>
      )}
      <Input
        name="address"
        variantLabel="default"
        variantForm="col"
        variantInput="default"
        placeholder="00시 00구 00동"
        value={address || ""}
        readOnly
      />
      <Input
        name="detailAddress"
        variantLabel="default"
        variantForm="col"
        variantInput="default"
        placeholder="00호"
        value={detailAddress || ""}
        onChange={onChangeInput}
        error={error.detailAddressError}
      />
    </div>
  );
}

export default SearchAddress;
