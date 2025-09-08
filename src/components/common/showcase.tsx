import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Showcase = () => {
  return (
    <div className="hidden py-6 md:block">
      <div className="relative grid grid-cols-5 grid-rows-2 gap-4">
        <div className="relative col-span-2 col-start-1 row-start-1 flex px-3">
          <p className="absolute px-4 sm:px-6 py-4 sm:py-6 text-3xl font-medium text-white">
            Nike Therma FIT Headed
          </p>
          <Image
            src="/Showcase-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
      <div className="absolute right-3 bottom-0 px-4 sm:px-5 py-3 sm:py-4">
            <Link href="product-variant/tnis-nike-panda-verde">
              <Button
                variant="outline"
        className="pointer-events-auto rounded-full px-4 sm:px-5 py-3 sm:py-5 text-xl font-bold"
              >
                Comprar
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative col-span-2 col-start-1 row-start-2 flex px-3">
          <p className="absolute px-4 sm:px-6 py-4 sm:py-6 text-3xl font-medium text-white">
            Nike Therma FIT Headed
          </p>
          <Image
            src="/Showcase-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
      <div className="absolute right-3 bottom-0 px-4 sm:px-5 py-3 sm:py-4">
            <Link href="/product-variant/tnis-nike-air-force-preto">
              <Button
                variant="outline"
        className="pointer-events-auto rounded-full px-4 sm:px-5 py-3 sm:py-5 text-xl font-bold"
              >
                Comprar
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-3 col-start-3 row-span-2 row-start-1 flex">
          <p className="absolute px-4 sm:px-6 py-4 sm:py-6 text-3xl font-medium text-white">
            Nike Therma FIT Headed
          </p>
          <Image
            src="/Showcase-03.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
      <div className="absolute right-4 bottom-0 px-4 sm:px-5 py-3 sm:py-4">
            <Link href="/product-variant/jaqueta-windrunner-azul">
              <Button
                variant="outline"
        className="pointer-events-auto rounded-full px-4 sm:px-5 py-3 sm:py-5 text-xl font-bold"
              >
                Comprar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
