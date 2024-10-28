"use client";
import Button from "@/components/common/button/Button";
import Error from "@/components/common/error/Error";
import { useCategory } from "@/hooks/mustpost/useCategory";
import type { MustCategory } from "@/types/types";
import { useCategoryStore } from "@/zustand/mustStore";
import SkeletonCategory from "./SkeletonCategory";

function MustCategory() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const { mustCategories, isPending, isError, handClickCategory } = useCategory();

  const activeStyle = (categoryId: string) => ({
    bgColor: selectedCategory === categoryId ? "bg-main-7" : "bg-white",
    textColor: selectedCategory === categoryId ? "text-white" : "text-main-7",
    outline: selectedCategory === categoryId ? "" : "border-main-7",
  });

  if (isPending) return <SkeletonCategory />;

  if (isError) return <Error />;

  return (
    <div className="my-[50px]">
      <ul className="flex flex-row gap-[10px] flex-wrap justify-between">
        <li>
          <Button {...activeStyle("ALL")} content="All" onClick={() => handClickCategory("ALL")} />
        </li>
        {mustCategories?.map((category) => (
          <li key={category.id}>
            <Button
              {...activeStyle(category.id)}
              content={`${category.name}`}
              onClick={() => handClickCategory(category.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MustCategory;
