import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCategory() {
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  const {
    data: mustCategories,
    isPending,
    isError,
  } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const handClickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // unmount 시점에 ALL로 셋팅
  useEffect(() => {
    return setSelectedCategory("ALL");
  }, []);

  return { mustCategories, isPending, isError, handClickCategory };
}
