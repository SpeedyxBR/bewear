"use client";

import ModernCategoryFilter from "@/components/common/modern-category-filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import FilterCheckbox from "./filter-checkbox";

interface FilterContentProps {
  marks: any[];
  categories: any[];
  filters: {
    marks: string[];
    categories: string[];
  };
  onFilterChange: (
    filterType: "marks" | "categories",
    itemName: string,
    checked: boolean,
  ) => void;
}

const FilterContent = ({
  marks,
  categories,
  filters,
  onFilterChange,
}: FilterContentProps) => {
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    onFilterChange("categories", categoryName, checked);
  };

  const handleClearAllCategories = () => {
    filters.categories.forEach((category) => {
      onFilterChange("categories", category, false);
    });
  };

  return (
    <div className="flex flex-col gap-6 max-sm:gap-0">
      <Accordion type="single" collapsible defaultValue="mark">
        <AccordionItem value="mark">
          <AccordionTrigger className="items-center p-0 pb-5 text-lg font-medium hover:no-underline max-sm:text-[1rem]">
            Marcas
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {marks?.map((mark) => (
              <FilterCheckbox
                key={mark.id}
                id={mark.id}
                name={mark.name}
                selectedItems={filters.marks}
                onItemChange={(itemName, checked) =>
                  onFilterChange("marks", itemName, checked)
                }
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <ModernCategoryFilter
        categories={categories}
        selectedCategories={filters.categories}
        onCategoryChange={handleCategoryChange}
        onClearAll={handleClearAllCategories}
      />
    </div>
  );
};

export default FilterContent;
