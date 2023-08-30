export const getDaysBetween = function getDaysBetween(
  startDate: Date,
  endDate: Date,
  inclusive = true,
) {
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return Math.floor(days) + (inclusive ? 1 : 0);
};

export const getWeeksBetween = function getWeeksBetween(
  startDate: Date,
  endDate: Date,
  inclusive = true,
) {
  const days = getDaysBetween(startDate, endDate, inclusive);
  return Math.floor(days / 7);
};
