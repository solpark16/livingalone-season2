"use client";

import { useCategoryStore } from "@/zustand/mustStore";
import { useEffect } from "react";
import MustCategory from "./MustCategory";
import MustPostList from "./MustPostList";
import Title from "./Title";

function MustList() {
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  // unmount 시점에 ALL로 셋팅
  useEffect(() => {
    return setSelectedCategory("ALL");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Title />
      <MustCategory />
      <MustPostList />
    </div>
  );
}
export default MustList;
