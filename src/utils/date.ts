export const getDaysBetween = function getDaysBetween(
  startDate: Date,
  endDate: Date,
  inclusive = true,
) {
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return inclusive ? Math.floor(days) + 1 : Math.floor(days);
};

export const getYearsBetween = function getYearsBetween(
  startDate: Date,
  endDate: Date,
  inclusive = true,
) {
  const days = getDaysBetween(startDate, endDate, inclusive);
  return days / 365.25;
};

export const getISODateString = function getISO8601DateString(date: Date) {
  return date.toISOString().split("T")[0];
};

export const getUTCDateString = function getUTCDateString(date: Date) {
  return date.toLocaleDateString(undefined, { timeZone: "UTC" });
};
