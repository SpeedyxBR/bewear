"use client";

import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  categoryId: string;
  markId: string | null;
  mark: {
    id: string;
    name: string;
    createdAt: Date;
    imageUrl: string;
  } | null;
  variants: Array<{
    id: string;
    name: string;
    createdAt: Date;
    slug: string;
    imageUrl: string;
    productId: string;
    color: string;
    priceInCents: number;
  }>;
}

interface CategoryFiltersProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
}

const CategoryFilters = ({
  products,
  onFilteredProducts,
}: CategoryFiltersProps) => {
  const [selectedMarks, setSelectedMarks] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const marks = useMemo(() => {
    const uniqueMarks = new Set<string>();
    products.forEach((product) => {
      if (product.mark?.name) {
        uniqueMarks.add(product.mark.name);
      }
    });
    return Array.from(uniqueMarks);
  }, [products]);

  const colors = useMemo(() => {
    const uniqueColors = new Set<string>();
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        uniqueColors.add(variant.color);
      });
    });
    return Array.from(uniqueColors);
  }, [products]);

  const minPrice = useMemo(() => {
    return Math.min(
      ...products.flatMap((p) => p.variants.map((v) => v.priceInCents)),
    );
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(
      ...products.flatMap((p) => p.variants.map((v) => v.priceInCents)),
    );
  }, [products]);

  useEffect(() => {
    if (products.length > 0 && minPrice !== maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const markMatch =
        selectedMarks.length === 0 ||
        (product.mark?.name && selectedMarks.includes(product.mark.name));

      const colorMatch =
        selectedColors.length === 0 ||
        product.variants.some((variant) =>
          selectedColors.includes(variant.color),
        );

      const priceMatch = product.variants.some(
        (variant) =>
          variant.priceInCents >= priceRange[0] &&
          variant.priceInCents <= priceRange[1],
      );

      return markMatch && colorMatch && priceMatch;
    });
  }, [products, selectedMarks, selectedColors, priceRange]);

  const handleMarkChange = (markName: string, checked: boolean) => {
    setSelectedMarks((prev) =>
      checked ? [...prev, markName] : prev.filter((m) => m !== markName),
    );
  };

  const handleColorChange = (color: string, checked: boolean) => {
    setSelectedColors((prev) =>
      checked ? [...prev, color] : prev.filter((c) => c !== color),
    );
  };

  const clearAllFilters = () => {
    setSelectedMarks([]);
    setSelectedColors([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters =
    selectedMarks.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filtros</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedMarks.length +
                selectedColors.length +
                (priceRange[0] !== minPrice || priceRange[1] !== maxPrice
                  ? 1
                  : 0)}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={16} className="mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-muted-foreground text-sm font-medium">Preço</h4>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              min={minPrice}
              max={maxPrice}
              step={1000}
              className="w-full"
            />
            <div className="text-muted-foreground flex justify-between text-sm">
              <span>R$ {(priceRange[0] / 100).toFixed(2)}</span>
              <span>R$ {(priceRange[1] / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-muted-foreground text-sm font-medium">Marcas</h4>
          <div className="space-y-3">
            {marks.map((mark) => (
              <div key={mark} className="flex items-center space-x-2">
                <Checkbox
                  id={mark}
                  checked={selectedMarks.includes(mark)}
                  onCheckedChange={(checked) =>
                    handleMarkChange(mark, checked as boolean)
                  }
                />
                <Label htmlFor={mark} className="text-sm font-normal">
                  {mark}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-muted-foreground text-sm font-medium">Cores</h4>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColors.includes(color) ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  handleColorChange(color, !selectedColors.includes(color))
                }
                className={`rounded-full transition-all duration-200 ${
                  selectedColors.includes(color)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted hover:border-primary/50"
                }`}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {hasActiveFilters && (
        <Card className="bg-muted/50 p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Filtros Ativos</h4>
            <div className="flex flex-wrap gap-2">
              {selectedMarks.map((mark) => (
                <Badge
                  key={mark}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {mark}
                  <span
                    className="hover:bg-destructive hover:text-destructive-foreground ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => handleMarkChange(mark, false)}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              ))}
              {selectedColors.map((color) => (
                <Badge
                  key={color}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {color}
                  <span
                    className="hover:bg-destructive hover:text-destructive-foreground ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => handleColorChange(color, false)}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              ))}
              {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  R$ {(priceRange[0] / 100).toFixed(2)} - R${" "}
                  {(priceRange[1] / 100).toFixed(2)}
                  <span
                    className="hover:bg-destructive hover:text-destructive-foreground ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block lg:w-80">
        <div className="sticky top-24">
          <FilterContent />
        </div>
      </div>

      <div className="lg:hidden">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter size={16} className="mr-2" />
              Filtros
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {selectedMarks.length +
                    selectedColors.length +
                    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice
                      ? 1
                      : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default CategoryFilters;
