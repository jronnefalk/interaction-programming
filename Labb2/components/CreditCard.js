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

  // Randomize background image
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const totalImages = 25;
    const randomImageNumber = Math.floor(Math.random() * totalImages) + 1;
    const randomImagePath = require(`../assets/${randomImageNumber}.jpeg`);
    setBackgroundImage(randomImagePath);
  }, []); // [] -> Happens only the first time (page refresh)

  // Animate card flip when 'isFlipped' is changed
  useEffect(() => {
    Animated.timing(flipAnim, {
      // 180 degrees for flip to back, 0 for front
      toValue: isFlipped ? 180 : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]); // [isFlipped] -> happens when isFlipped changes

  // Style for card flip animation
  const flipStyle = (isBack) => ({
    transform: [
      { perspective: 1000 }, // For 3D effect
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          // Making the back face visible after 180 degrees
          // and front visible from 0-180 degress
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
      <Animated.View style={flipStyle(false)}>
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
      <Animated.View style={flipStyle(true)}>
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
