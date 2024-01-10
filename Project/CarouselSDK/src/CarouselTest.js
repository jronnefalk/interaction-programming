// TestCarousel.js
import React from "react";
import { View } from "react-native";
import Carousel from "./Carousel";

const carouselData = [
  {
    title: "My image 1",
    imageSource: require("../assets/4.jpg"),
  },
  {
    title: "My image 2",
    imageSource: require("../assets/5.jpg"),
  },
  {
    title: "My image 3",
    imageSource: require("../assets/6.jpg"),
  },
  {
    title: "My image 4",
    imageSource: require("../assets/7.jpg"),
  },
];
const CarouselTest = () => {
  return (
    <View>
      <Carousel items={carouselData} arrowColor="red" />
    </View>
  );
};

export default CarouselTest;
