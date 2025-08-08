"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels por frame

    // Duplica os itens para loop infinito
    container.innerHTML += container.innerHTML;

    function animate() {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0; // volta pro começo suavemente
      }
      container.scrollLeft = scrollPos;

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    // Pausa no hover
    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="my-8 px-5">
      <h2 className="mb-4 text-xl font-semibold">Marcas Parceiras</h2>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "none",
        }}
      >
        {partners.map(({ src, alt }, idx) => (
          <div
            key={idx}
            className="inline-block flex-shrink-0 flex flex-col items-center w-24"
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
      </div>
    </section>
  );
}
