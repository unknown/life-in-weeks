export const getDaysBetween = function getDaysBetween(
  startDate: Date,
  endDate: Date,
  inclusive = true,
) {
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return inclusive ? Math.floor(days) + 1 : Math.floor(days);
};
