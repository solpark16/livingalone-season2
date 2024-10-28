import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import { useQuery } from "@tanstack/react-query";

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

  return { mustCategories, isPending, isError, handClickCategory };
}
