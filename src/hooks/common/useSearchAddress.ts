import { MouseEvent, useState } from "react";

export function useSearchAddress(setAddress: (address: string) => void) {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const handleOpenAddressModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPostModalOpen(true);
  };
  const handleCompleteAddress = (data: { address: string }) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };
  return {
    isPostModalOpen,
    setIsPostModalOpen,
    handleOpenAddressModal,
    handleCompleteAddress,
  };
}
