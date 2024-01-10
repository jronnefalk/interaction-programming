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
import { placeholderData } from "./placeholderData";

// To set the size of carousel elements
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Gets itemps as a prop (array to display)
const Carousel = ({ items, arrowColor = "#fff" }) => {
  const carouselItems = items && items.length > 0 ? items : placeholderData;
  const isSingleItem = carouselItems.length === 1;

  const extendedItems = isSingleItem
    ? carouselItems
    : [
        carouselItems[carouselItems.length - 1], // last item to the beginnig
        ...carouselItems, // all items in carouselItems
        carouselItems[0], //first item to the end
      ];
  const scrollViewRef = useRef(null);

  // Function that controlls the scroll position of the ScrollView
  // bestämmer om animated ska vara smooth eller instant
  const scrollToIndex = (index, animated = true) => {
    scrollViewRef.current.scrollTo({
      x: index * windowWidth,
      animated: animated,
    });
  };

  // Use the CarouselNavigation hook and pass the scrollToIndex function
  const { activeIndex, goToPrev, goToNext } = CarouselNavigation(
    extendedItems.length,
    scrollToIndex
  );

  // Adjust the initial scroll position of the ScrollView to show the first actual item
  // Scrolls by the width of one window
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
        ref={scrollViewRef} // kallar på scrollView.current.scrollTo()
        horizontal
        pagingEnabled // show one item at a time
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scrolling
      >
        {extendedItems.map(
          (
            item,
            index // Iterates over each item in the array
          ) => (
            <View
              key={index}
              style={{ width: windowWidth, height: windowHeight }}
            >
              <CarouselElement item={item} />
            </View>
          )
        )}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {carouselItems.map((_, index) => (
          <Dot key={index} isActive={index + 1 === activeIndex} />
        ))}
      </View>

      <Pressable
        style={[styles.arrow, styles.arrowLeft]}
        onPress={isSingleItem ? null : goToPrev}
      >
        <Text style={[styles.arrowText, { color: arrowColor }]}>&lt;</Text>
      </Pressable>
      <Pressable
        style={[styles.arrow, styles.arrowRight]}
        onPress={isSingleItem ? null : goToNext}
      >
        <Text style={[styles.arrowText, { color: arrowColor }]}>&gt;</Text>
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
