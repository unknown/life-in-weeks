export const getOrdinalSuffix = function getOrdinalSuffix(num: number) {
  if (num > 3 && num < 21) return "th";
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const ordinalize = function ordinalize(num: number) {
  return `${num}${getOrdinalSuffix(num)}`;
};
