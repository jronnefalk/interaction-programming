// Carousel.js
import React, { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import CarouselElement from "./CarouselElement";
import CarouselNavigation from "./CarouselNavigation";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Carousel = ({ items }) => {
  const extendedItems = [items[items.length - 1], ...items, items[0]];
  const scrollViewRef = useRef(null);

  const scrollToIndex = (index, animated = true) => {
    scrollViewRef.current.scrollTo({
      x: index * windowWidth,
      animated: animated,
    });
  };

  // Use the CarouselNavigation hook and pass the scrollToIndex function
  const { activeIndex, goToPrev, goToNext, setActiveIndex } =
    CarouselNavigation(extendedItems.length, scrollToIndex);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: windowWidth, animated: false });
  }, []);

  const Dot = ({ isActive }) => (
    <View
      style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scrolling
        onMomentumScrollEnd={(e) => {
          const scrolledIndex = Math.floor(
            e.nativeEvent.contentOffset.x / windowWidth
          );
          if (
            scrolledIndex === 0 ||
            scrolledIndex === extendedItems.length - 1
          ) {
            const correctIndex =
              scrolledIndex === 0 ? extendedItems.length - 2 : 1;
            setActiveIndex(correctIndex);
            scrollToIndex(correctIndex, false);
          } else {
            setActiveIndex(scrolledIndex);
          }
        }}
      >
        {extendedItems.map((item, index) => (
          <View
            key={index}
            style={{ width: windowWidth, height: windowHeight }}
          >
            <CarouselElement item={item} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {items.map((_, index) => (
          <Dot key={index} isActive={index + 1 === activeIndex} />
        ))}
      </View>

      <Pressable style={[styles.arrow, styles.arrowLeft]} onPress={goToPrev}>
        <Text style={styles.arrowText}>{"<"}</Text>
      </Pressable>
      <Pressable style={[styles.arrow, styles.arrowRight]} onPress={goToNext}>
        <Text style={styles.arrowText}>{">"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: windowWidth,
    height: windowHeight,
    overflow: "hidden",
    backgroundColor: "black",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    backgroundColor: "rgba(169, 169, 169, 0.2)",
    padding: 10,
    borderRadius: 50,
  },
  arrowLeft: {
    left: "10%",
  },
  arrowRight: {
    right: "10%",
  },
  arrowText: {
    fontSize: 24,
    color: "#fff",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: windowWidth,
    bottom: 40,
    left: 0,
  },
  dot: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});

export default Carousel;
