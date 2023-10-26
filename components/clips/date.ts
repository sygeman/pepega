import formatDistanceToNow from "date-fns/formatDistanceToNow";
import locale from "date-fns/locale/ru";

export const dateDistanceInWordsToNow = (date: any) => {
  let numberDate;

  if (Number.isInteger(date)) {
    numberDate = date;
  } else if (typeof date === "string") {
    const parsedDate = Number.parseInt(date, 10);

    numberDate =
      Number.isFinite(parsedDate) &&
      parsedDate.toString().length === date.length
        ? parsedDate
        : new Date(date);
  }

  if (!numberDate) return "";

  return formatDistanceToNow(numberDate, { addSuffix: true, locale });
};
