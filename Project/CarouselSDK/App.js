import React from "react";
import { View } from "react-native";
import Carousel from "../CarouselSDK/src/Carousel"; // Importera din Carousel-komponent
import { carouselData } from "../CarouselSDK/src/carouselUtils"; // Importera data för din karusell

const App = () => {
  return (
    <View>
      <Carousel items={carouselData} />
      {/* Anropa din Carousel-komponent här */}
    </View>
  );
};

export default App;
