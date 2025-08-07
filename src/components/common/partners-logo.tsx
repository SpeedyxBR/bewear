"use client";

import Image from "next/image";
import React from "react";

interface Partner {
  src: string;
  alt: string;
}

const partners: Partner[] = [
  { src: "/nike.png", alt: "Nike" },
  { src: "/adidas.png", alt: "Adidas" },
  { src: "/puma.png", alt: "Puma" },
  { src: "/newbalance.png", alt: "New Balance" },
  { src: "/converse.png", alt: "Converse" },
  { src: "/polo.png", alt: "Polo" },
  { src: "/zara.png", alt: "Zara" },
];

export default function PartnerCarousel(): JSX.Element {
  return (
    <section className="my-8 px-5">
      <h2 className="mb-4 text-xl font-semibold">Marcas Parceiras</h2>

      <div
        className="flex gap-4 overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        {partners.map(({ src, alt }, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 scroll-snap-align-start flex flex-col items-center w-24"
          >
            <div className="w-24 h-24 rounded-3xl border border-gray-200 p-4 bg-white dark:bg-gray-800 flex items-center justify-center">
              <Image
                src={src}
                alt={alt}
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {alt}
            </span>
          </div>
        ))}

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
