import { useState } from "react";

const CarouselNavigation = (itemsLength, scrollToIndex) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const goToPrev = () => {
    const isFirstItem = activeIndex === 1;
    const newIndex = isFirstItem ? itemsLength - 2 : activeIndex - 1;
    setActiveIndex(newIndex);

    if (isFirstItem) {
      scrollToIndex(itemsLength - 1, false);

      setTimeout(() => scrollToIndex(newIndex, true), 0);
    } else {
      scrollToIndex(newIndex, true);
    }
  };

  const goToNext = () => {
    const isLastItem = activeIndex === itemsLength - 2;
    const newIndex = isLastItem ? 1 : activeIndex + 1;
    setActiveIndex(newIndex);

    if (isLastItem) {
      scrollToIndex(0, false);

      setTimeout(() => scrollToIndex(newIndex, true), 0);
    } else {
      scrollToIndex(newIndex, true);
    }
  };

  return { activeIndex, goToPrev, goToNext, setActiveIndex };
};

export default CarouselNavigation;
