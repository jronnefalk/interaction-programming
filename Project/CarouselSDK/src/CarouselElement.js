import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CarouselElement = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.imageSource} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: windowWidth * 0.9, // Adjust width as needed
    height: windowHeight * 0.8, // Adjust height as needed
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%", // Use 100% of the imageContainer
    height: "100%", // Use 100% of the imageContainer
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
});

export default CarouselElement;
