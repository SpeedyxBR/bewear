import Image from "next/image";
import { Card } from "../ui/card";

const Brands = () => {
  const brands = [
    { name: "Nike", src: "/simple-icons_nike.png", width: 50 },
    { name: "Adidas", src: "/simple-icons_adidas.png", width: 50 },
    { name: "Puma", src: "/simple-icons_puma.png", width: 50 },
    { name: "New Balance", src: "/simple-icons_newbalance.png", width: 50 },
    { name: "Converse", src: "/simple-icons_converse.png", width: 50 },
    { name: "Polo", src: "/simple-icons_polo.png", width: 26 },
    { name: "Zara", src: "/simple-icons_zara.png", width: 50 },
  ];

  return (
    <div>
      <div className="px-5 py-6">
        <div className="text-2xl font-bold">Marcas Parceiras</div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid grid-cols-7 grid-rows-1 gap-4 px-5">
        {brands.map((brand) => (
          <div key={brand.name}>
            <Card className="flex min-h-32 items-center justify-center">
              <Image
                src={brand.src}
                alt={brand.name}
                height={50}
                width={brand.width}
                sizes="100vw"
              />
            </Card>
            <h3 className="py-2 text-center font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>

      {/* Mobile: Scroll horizontal */}
      <div className="md:hidden px-5">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {brands.map((brand) => (
            <div key={brand.name} className="flex-shrink-0 w-24">
              <Card className="flex h-24 w-24 items-center justify-center">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  height={40}
                  width={brand.width === 26 ? 20 : 40}
                  sizes="100vw"
                />
              </Card>
              <h3 className="py-2 text-center text-sm font-semibold">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
