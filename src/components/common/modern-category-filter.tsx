"use client";

import { Filter,X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ModernCategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  selectedCategories: string[];
  onCategoryChange: (categoryName: string, checked: boolean) => void;
  onClearAll: () => void;
}

const ModernCategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearAll,
}: ModernCategoryFilterProps) => {
  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filtros</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={16} className="mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-medium">
            Categorias
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.name);
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category.name, !isSelected)}
                  className={`rounded-full transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted hover:border-primary/50"
                  }`}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {hasActiveFilters && (
        <Card className="bg-muted/50 p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Filtros Ativos</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryName) => (
                <Badge
                  key={categoryName}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {categoryName}
                  <span
                    className="hover:bg-destructive hover:text-destructive-foreground ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => onCategoryChange(categoryName, false)}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ModernCategoryFilter;
