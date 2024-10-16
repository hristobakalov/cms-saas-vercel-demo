"use client";

import React, {
  useState,
  useEffect,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "@react-hook/window-size/throttled";

export type CarouselProps = PropsWithChildren<{
  itemCount: number;
  className?: string;
}>;

export const Carousel: FunctionComponent<CarouselProps> = ({
  itemCount,
  children,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = useWindowWidth({ fps: 2, initialWidth: 480 });
  const [itemWidth, setItemWidth] = useState(50);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === -1 ? -1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemCount - 2 ? itemCount - 2 : prevIndex + 1
    );
  };

  useEffect(() => {
    setItemWidth(windowWidth <= 900 ? 80 : 50);
  }, [windowWidth]);

  //console.log(windowWidth)
  //const itemWidth = windowWidth <= 900 ? 80 : 50

  return (
    <div
      className={`${
        className ? className + " " : ""
      }relative w-full my-24 flex flex-col carousel`}
    >
      <section
        role="navigation"
        className="flex justify-center gap-10 mt-16 order-last"
      >
        <button onClick={handlePrev}>
          <svg
            width="48"
            height="49"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(180deg)" }}
            className={`${
              currentIndex === itemCount - 2
                ? "text-mischka dark:text-light-grey"
                : "w-12 h-12"
            }`}
          >
            <g id="Lager_1-2" data-name="Lager_1">
              <path
                className="cls-1"
                d="M150,75C150,33.58,116.35,0,74.83,0,35.53,0,3.32,30.12,0,68.48h81.17c-10.9-9.57-17.82-23.54-17.82-39.13h13.07c0,21.58,17.59,39.13,39.22,39.13v13.04c-21.63,0-39.22,17.55-39.22,39.13h-13.07c0-15.57,6.87-29.56,17.74-39.13H0c3.32,38.36,35.53,68.48,74.83,68.48,41.51,0,75.17-33.58,75.17-75Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#080837", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#0136f5", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
          <span className="sr-only">Previous Slide</span>
        </button>
        <button onClick={handleNext}>
          <svg
            width="48"
            height="49"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              currentIndex === itemCount - 2
                ? "text-mischka dark:text-light-grey"
                : "w-12 h-12"
            }`}
          >
            <g id="Lager_1-2" data-name="Lager_1">
              <path
                className="cls-1"
                d="M150,75C150,33.58,116.35,0,74.83,0,35.53,0,3.32,30.12,0,68.48h81.17c-10.9-9.57-17.82-23.54-17.82-39.13h13.07c0,21.58,17.59,39.13,39.22,39.13v13.04c-21.63,0-39.22,17.55-39.22,39.13h-13.07c0-15.57,6.87-29.56,17.74-39.13H0c3.32,38.36,35.53,68.48,74.83,68.48,41.51,0,75.17-33.58,75.17-75Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#080837", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#0136f5", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>

          <span className="sr-only">Next Slide</span>
        </button>
      </section>
      <motion.div
        className="flex order-first pl-[50%]"
        style={{
          //@ts-expect-error Typescript doesn't know about the variables in use
          "--item-width": `${itemWidth}vw`,
          width: `calc(${itemCount * itemWidth}vw + ${(itemCount - 1) * 30}px)`,
          x: `${0.5 * itemWidth - (currentIndex + 2) * itemWidth}vw`,
          transition: "0.5s",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Carousel;
