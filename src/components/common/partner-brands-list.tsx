"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import PartnerBrandsItem from "./partner-brands-item";

interface PartnerBrandsListProps {
  title: string;
}

const PartnerBrandsList = ({ title }: PartnerBrandsListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold min-sm:text-lg min-lg:text-2xl">
        {title}
      </h3>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 35,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/nike.svg"
            altImg="Nike"
            brandName="Nike"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/adidas.svg"
            altImg="Adidas"
            brandName="Adidas"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/puma.svg"
            altImg="Puma"
            brandName="Puma"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/new-balance.svg"
            altImg="New Balance"
            brandName="New Balance"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/converse.svg"
            altImg="Converse Logo"
            brandName="Converse"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/polo.svg"
            altImg="Polo Logo"
            brandName="Polo"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/zara.svg"
            altImg="Zara logo"
            brandName="Zara"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PartnerBrandsList;
