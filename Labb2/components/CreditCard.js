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
  // useRef: to persist the flip animation value without causing re-renders
  // 0 = front of the card, 1 = back of the card
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Randomize background image on component mount
  useEffect(() => {
    const totalImages = 25;
    const randomImageNumber = Math.floor(Math.random() * totalImages) + 1;
    const randomImagePath = require(`../assets/${randomImageNumber}.jpeg`);
    setBackgroundImage(randomImagePath);
  }, []);

  // Animate card flip when 'isFlipped' changes
  useEffect(() => {
    Animated.timing(flipAnim, {
      // 180 degrees for flip to back, 0 for front
      toValue: isFlipped ? 180 : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  // Style for card flip animation
  const getFlipStyle = (isBack) => ({
    transform: [
      { perspective: 1000 }, // Perspective for 3D effect
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: isBack ? ["180deg", "360deg"] : ["0deg", "180deg"],
        }),
      },
    ],
    backfaceVisibility: "hidden",
    position: isBack ? "absolute" : "relative",
  });

  return (
    <View>
      {/* Front of the card */}
      <Animated.View style={getFlipStyle(false)}>
        <CreditCardFront
          number={number}
          name={name}
          cardMonth={cardMonth}
          cardYear={cardYear}
          focusField={focusField}
          setFocusedField={setFocusedField}
          backgroundImage={backgroundImage}
        />
      </Animated.View>

      {/* Back of the card */}
      <Animated.View style={getFlipStyle(true)}>
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
