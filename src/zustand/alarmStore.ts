import { create } from "zustand";

interface alarmState {
  isUnread: boolean;
  setIsUnread: (isConfirm: boolean) => void;
}

export const useIsUnread = create<alarmState>((set) => ({
  isUnread: false,
  setIsUnread: (isConfirm) => set({ isUnread: isConfirm }),
}));
