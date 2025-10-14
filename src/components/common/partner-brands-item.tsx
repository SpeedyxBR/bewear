import Image from "next/image";

interface PartnerBrandsItemProps {
  srcImg: string;
  altImg: string;
  brandName: string;
}

const PartnerBrandsItem = ({
  srcImg,
  altImg,
  brandName,
}: PartnerBrandsItemProps) => {
  return (
    <>
      <div className="mx-2 flex flex-col items-center justify-center rounded-3xl border border-[#F1F1F1] px-6 py-8">
        <div className="flex h-12 w-12 items-center justify-center">
          <Image
            src={srcImg}
            alt={altImg}
            width={48}
            height={48}
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="truncate text-sm font-medium">{brandName}</p>
      </div>
    </>
  );
};

export default PartnerBrandsItem;
