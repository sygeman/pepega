/**
 * 3000 -> 3 000
 */
export const humanNumbers = (value: number, separator = " "): string => {
  return value.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * 3000 -> 3K
 */
export const shortNumbers = (value: number): string => {
  let temporaryValue = value;

  if (value < 0) {
    temporaryValue = value * -1;
  }

  let result =
    temporaryValue > 9999
      ? (temporaryValue / 1000).toFixed(1) + "K"
      : humanNumbers(temporaryValue);

  if (value < 0) {
    result = `-${result}`;
  }

  return result;
};
