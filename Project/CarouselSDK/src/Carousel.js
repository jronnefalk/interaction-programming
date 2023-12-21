import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import CarouselElement from "./CarouselElement";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the transition to the new index
    Animated.spring(scrollX, {
      toValue: activeIndex * windowWidth,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Calculate the total width based on the number of items
  const totalWidth = items.length * windowWidth;

  return (
    <View style={styles.carouselContainer}>
      <Animated.View
        style={[
          styles.scrollViewStyle,
          {
            width: totalWidth, // Use the totalWidth for the dynamic style
            transform: [{ translateX: Animated.multiply(scrollX, -1) }],
          },
        ]}
      >
        {items.map((item, index) => (
          <CarouselElement
            key={index}
            item={item}
            style={{ width: windowWidth, height: windowHeight }}
          />
        ))}
      </Animated.View>

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
    overflow: "hidden", // Hide the overflowed content
    backgroundColor: "black",
  },
  scrollViewStyle: {
    flexDirection: "row", // Arrange items in a row
    // Remove the width property from here
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
    left: 200,
  },
  arrowRight: {
    right: 200,
  },
  arrowText: {
    fontSize: 24,
    color: "#fff",
  },
  // ... other styles ...
});

export default Carousel;
