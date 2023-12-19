export const formatCardNumber = (number) => {
  let cleanedNumber = number.replace(/\s/g, ""); // Remove spaces

  if (cleanedNumber.startsWith("34") || cleanedNumber.startsWith("37")) {
    // American Express card format (15 digits)
    let middleSection = cleanedNumber.substring(4, 10).padEnd(6, "#");
    let lastSection = cleanedNumber
      .substring(10, 15)
      .padEnd(5, "#")
      .replace(/\d/g, (match, index) => (index < 2 ? "*" : match));

    let amexParts = [
      cleanedNumber.substring(0, 4),
      middleSection.replace(/\d/g, "*"),
      lastSection,
    ];
    return amexParts.join(" ");
  } else {
    // Other card format (16 digits)
    cleanedNumber = cleanedNumber.padEnd(16, "#");
    let parts = [
      cleanedNumber.substring(0, 4),
      cleanedNumber.substring(4, 8).replace(/\d/g, "*"),
      cleanedNumber.substring(8, 12).replace(/\d/g, "*"),
      cleanedNumber.substring(12, 16),
    ];
    return parts.join(" ");
  }
};

export const formatInputCardNumber = (number) => {
  return number
    .replace(/[^\d]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatCVVNumber = (text) => {
  return text.replace(/\D/g, "").substring(0, 4);
};

export const formatExpiryDate = (month, year) => {
  const formattedMonth = month || "MM";
  const formattedYear = year ? year.slice(-2) : "YY";
  return `${formattedMonth}/${formattedYear}`;
};

export const getCardTypeImage = (number) => {
  if (!number) return require("../assets/visa.png"); // Default image for undefined or null number

  if (number.startsWith("4")) {
    return require("../assets/visa.png"); // Visa
  } else if (/^5[1-5]/.test(number)) {
    return require("../assets/mastercard.png"); // MasterCard
  } else if (/^3[47]/.test(number)) {
    return require("../assets/amex.png"); // American Express
  } else if (/^6011/.test(number)) {
    return require("../assets/discover.png"); // Discover
  } else if (/^9792/.test(number)) {
    return require("../assets/troy.png"); // Troy
  }

  return require("../assets/visa.png"); // Default card image
};
