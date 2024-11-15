"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function Carousel2({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleItemClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
    imgRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <section className="pt-4">
      <div className="flex snap-x snap-mandatory space-x-4 overflow-x-auto">
        {images.map((image, index) => (
          <Image
            key={uuidv4()}
            width={320}
            height={400}
            ref={(el) => (imgRefs.current[index] = el)}
            className={`relative  h-[400px] cursor-pointer rounded-xl bg-cover bg-center transition-all duration-300 ease-in-out 
              ${activeIndex === index ? "w-[500px] shadow-xl" : "w-[320px]"}
              ${images?.length === 1 ? "h-auto w-auto mb-4" : "mb-10"}`}
            src={image}
            alt="thread feature"
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
