import React, { useState, useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import CreditCardFront from "./CreditCardFront";
import CreditCardBack from "./CreditCardBack";

const CreditCard = ({
  number,
  name,
  cardMonth,
  cardYear,
  cardCvv,
  isFlipped,
  focusField,
  setFocusedField,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current; // 0 is unflipped, 180 is flipped
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    // Assuming you have images from 1.jpeg to 5.jpeg for example
    const totalImages = 25;
    const randomImageNumber = Math.floor(Math.random() * totalImages) + 1; // Generate a random number between 1 and totalImages
    const randomImagePath = require(`../assets/${randomImageNumber}.jpeg`);

    setBackgroundImage(randomImagePath);
  }, []);

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 1 : 0, // Range from 0 to 1 for flipping
      duration: 700, // Increase duration for slower flip
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "90deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["180deg", "270deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
  };

  return (
    <View>
      <Animated.View
        style={[frontAnimatedStyle, { backfaceVisibility: "hidden" }]}
      >
        <CreditCardFront
          number={number}
          name={name}
          cardMonth={cardMonth}
          cardYear={cardYear} /* other props */
          focusField={focusField}
          setFocusedField={setFocusedField}
          backgroundImage={backgroundImage}
        />
      </Animated.View>

      <Animated.View
        style={[
          backAnimatedStyle,
          { backfaceVisibility: "hidden", position: "absolute", top: 0 },
        ]}
      >
        <CreditCardBack
          cardCvv={cardCvv}
          number={number}
          backgroundImage={backgroundImage}
        />
      </Animated.View>
    </View>
  );
};

export default CreditCard;
