import React from "react";
import { View } from "react-native";
import Carousel from "../CarouselSDK/src/Carousel";
import { carouselData } from "./src/carouselData";

const App = () => {
  return (
    <View>
      <Carousel items={carouselData} />
    </View>
  );
};

export default App;
