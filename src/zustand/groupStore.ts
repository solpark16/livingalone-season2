import { create } from "zustand";

type IsFinishedState = {
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
};

export const useIsFinished = create<IsFinishedState>((set) => ({
  isFinished: false,
  setIsFinished: (isFinished) => set({ isFinished: isFinished }),
}));
