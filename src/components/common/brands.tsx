"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const brands = [
  { name: "Nike", image: "/simple-icons_nike.png" },
  { name: "Adidas", image: "/simple-icons_adidas.png" },
  { name: "Puma", image: "/simple-icons_puma.png" },
  { name: "New Balance", image: "/simple-icons_newbalance.png" },
  { name: "Converse", image: "/simple-icons_converse.png" },
  { name: "Polo", image: "/simple-icons_polo.png" },
  { name: "Zara", image: "/simple-icons_zara.png" },
];

const Brands = () => {
  return (
    <>
      {/* Versão Desktop */}
      <div className="hidden md:block">
        <div className="px-5 py-6">
          <div className="text-2xl font-bold">Marcas Parceiras</div>
        </div>
        <div className="grid grid-cols-7 grid-rows-1 gap-4 px-5">
          {brands.map((brand) => (
            <div key={brand.name}>
              <Card className="flex min-h-32 items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  height={40}
                  width={37.5}
                  sizes="100vw"
                  className=""
                />
              </Card>
              <h3 className="py-2 text-center font-semibold">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Versão Mobile com Carousel */}
      <div className="block md:hidden">
        <div className="px-5 py-6">
          <div className="text-xl font-bold">Marcas Parceiras</div>
        </div>
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          className="w-full px-5"
        >
          <CarouselContent className="-ml-2">
            {brands.map((brand) => (
              <CarouselItem key={brand.name} className="basis-1/3 pl-2">
                <div className="p-1">
                  <Card className="flex min-h-24 items-center justify-center">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      height={brand.name === "Polo" ? 21 : 40}
                      width={brand.name === "Polo" ? 23 : 40}
                      sizes="100vw"
                      className="object-contain"
                    />
                  </Card>
                  <h3 className="py-2 text-center text-sm font-semibold">
                    {brand.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Brands;
