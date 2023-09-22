import { compareAsc } from "date-fns";

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Boolean for whether the start date is before the end date */
export const validateDateOrder = (
  dateStart: Date | string,
  dateEnd: Date | string
) => {
  if (typeof dateStart === "string") dateStart = new Date(dateStart);
  if (typeof dateEnd === "string") dateEnd = new Date(dateEnd);
  return compareAsc(dateStart, dateEnd) === -1;
};
