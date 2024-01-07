"use client";

import { motion } from 'framer-motion';
import React, { useCallback,useEffect, useMemo, useRef, useState } from 'react';

import type { PieceQuery,PieceType } from '@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries';
import { useGlobalContext } from '@/src/context/global-context';

import { AllCategoryPieceType } from '../category-filter-slider/category-filter-slider.component';
import { Flex,FlexCol } from '../nextgen-core-ui';
import { PieceItem } from './piece-item.component';

interface PieceGridProps {
  pieces: PieceQuery[];
  activeCategory: PieceType;
}

export const PieceGrid: React.FC<PieceGridProps> = ({ pieces, activeCategory }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { globalData, setGlobalData } = useGlobalContext();
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef(pieces.map(() => React.createRef<HTMLDivElement>()));
  const [closestIndex, setClosestIndex] = useState<number>(-1); // State to track the closest column






  const filteredPieces = useMemo(() => {
    return activeCategory?.slug === AllCategoryPieceType.slug ? pieces : pieces.filter((piece) => piece.pieceType?.slug === activeCategory?.slug);
  }, [pieces, activeCategory]);

  const scrollToItem = useCallback((index: number) => {
    const itemElement = itemRefs.current[index]?.current;
    if (itemElement && ref.current) {
      // Calculate the position of the item relative to the scroll container
      const itemOffsetLeft = itemElement.offsetLeft;
      const containerScrollLeft = ref.current.scrollLeft;
      const containerWidth = ref.current.offsetWidth;
      const itemWidth = itemElement.offsetWidth;

      // Calculate the scroll position to center the item within the container
      const scrollLeft = itemOffsetLeft - containerScrollLeft - (containerWidth / 2 - itemWidth / 2) + containerScrollLeft;

      ref.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [itemRefs, ref]); // Updated dependencies

  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();


  const findClosestColumn = useCallback(() => {
    if (ref.current && itemRefs.current.length) {
      const centerPosition = ref.current.scrollLeft + ref.current.offsetWidth / 2;
      let closestIndexTemp = 0;
      let smallestDistance = Number.MAX_VALUE;

      itemRefs.current.forEach((itemRef, index) => {
        if (itemRef.current) {
          const itemCenter = itemRef.current.offsetLeft + itemRef.current.offsetWidth / 2;
          const distance = Math.abs(centerPosition - itemCenter);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndexTemp = index;
          }
        }
      });

      setClosestIndex(closestIndexTemp);
      return closestIndexTemp; // Return the closest index
    }
    return -1;
  }, [itemRefs, ref]); // Updated dependencies
  // Debounce function
  const debounce = (func: (...args: any[]) => void, delay: number): (() => void) => {
    let inDebounce: ReturnType<typeof setTimeout> | null;
    return function(...args: any[]) {
      if (inDebounce) clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func(...args), delay);
    };
  };

  // onVisibilityChange with debounce and type for entries
  const onVisibilityChange = debounce((entries: IntersectionObserverEntry[]) => {
    const newVisibleIndexes = new Set<number>();
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        newVisibleIndexes.add(idx);
      }
    });
    setVisibleIndexes(newVisibleIndexes);
  }, 0); // Adjust delay as needed

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(onVisibilityChange, {
        root: ref.current,
        threshold: [0.43], // Example of using an array of thresholds
        // rootMargin: '0px', // Adjust if needed
      });

      const nodes = ref.current.querySelectorAll('.piece-item');
      nodes.forEach(node => observer.current?.observe(node));
      return () => {
        observer.current?.disconnect();
      };
    }
  }, [ref, filteredPieces, onVisibilityChange]); // Added 'onVisibilityChange' to dependencies


  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.035 },
    }),
    exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const pieceGridData = globalData.pageData?.componentsData?.pieceGridData;
    if (pieceGridData && JSON.stringify(pieceGridData) !== JSON.stringify({ activeCategory, pieces })) {
      setGlobalData((prevData) => ({
        ...prevData,
        pageData: {
          ...prevData.pageData,
          componentsData: {
            ...prevData.pageData.componentsData,
            pieceGridData: { activeCategory, pieces },
          },
        },
      }));
    }
  }, [activeCategory, pieces, globalData.pageData?.componentsData, setGlobalData]);

  const visibleCols = useMemo(() => {
    return pieces.map((_, i) => (
      <div key={i} className="h-12 cursor-pointer" onClick={() => scrollToItem(i)}>
        <FlexCol
          className={`h-1 w-7 bg-lunnheim-pale-yellow transition-all duration-200  ${visibleIndexes.has(i) ? '!bg-lunnheim-olive' : ''}`}>

        </FlexCol>
      </div>
    ));
  }, [pieces, visibleIndexes, scrollToItem]); // Added 'scrollToItem' to dependencies

  // Unified event handler
  const handleInteraction = useCallback(() => {
    if (isMobileDevice()) {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        const closestColIndex = findClosestColumn();
        if (closestColIndex !== -1) {
          scrollToItem(closestColIndex);
        }
      }, 300);
    }
  }, [findClosestColumn, scrollToItem]);


  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleInteraction);
      currentRef.addEventListener('click', handleInteraction);

      return () => {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        currentRef.removeEventListener('scroll', handleInteraction);
        currentRef.removeEventListener('click', handleInteraction);
      };
    }
  }, [handleInteraction]);

  const isMobileDevice = () => {
    // Consider a device with width less than or equal to 768px as a mobile device
    return window.innerWidth <= 768;
  };






  return (
    <div
      ref={ref}
      className="animate-fadeIn cursor-grab flex-nowrap overflow-x-scroll py-12 scrollbar-hide"
      style={{
        paddingLeft: globalData.screenData.screenWidth > 620 ? globalData.screenData.defaultContainerMarginX : "0",

      }}
    >

      <div className="mr-12 grid grid-flow-col justify-start gap-[10px] gap-x-8 gap-y-10">
        <div className=" ml-[-50px] w-[50px] pl-[50px] md:hidden md:w-[300px]"></div>
        {filteredPieces.map((piece, idx) => (
          <motion.div
            key={idx}
            ref={itemRefs.current[idx]}
            custom={idx}
            className="piece-item"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <PieceItem piece={piece} isCentered={idx === closestIndex} />

          </motion.div>
        ))}
        <div className=" w-[50px] md:w-[300px]"></div>

      </div>
      <Flex className="sticky left-0 py-4 " >
        {visibleCols}
      </Flex>
    </div>
  );
};
