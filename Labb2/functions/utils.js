export const formatCardNumber = (number) => {
  let cleanedNumber = number.replace(/\s/g, ""); // Remove any spaces
  let formattedNumber = cleanedNumber.padEnd(16, "#"); // Pad with # up to 16 characters

  let parts = [
    formattedNumber.substring(0, 4), // First 4 digits
    formattedNumber.substring(4, 8).replace(/\d/g, "*"), // Replace digits 5-12 with *
    formattedNumber.substring(8, 12).replace(/\d/g, "*"), // Replace digits 5-12 with *
    formattedNumber.substring(12, 16), // Last 4 digits
  ];

  return parts.join(" "); // Join with spaces
};

export const formatInputCardNumber = (number) => {
  return number
    .replace(/[^\d]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatCVVNumber = (text) => {
  // Remove non-digits and limit to 4 characters
  return text.replace(/./g, "*").substring(0, 4);
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
  } else if (/^6(?:011|5)/.test(number)) {
    return require("../assets/discover.png"); // Discover
  }

  return require("../assets/visa.png"); // Default card image
};
