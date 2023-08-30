const getDateString = function getISO8601DateString(date: Date) {
  return date.toISOString().split("T")[0];
};

interface PopulationLifeExpectancyResult {
  dob: string;
  country: string;
  total_life_expectancy: number;
  sex: string;
}

export const getLifeExpectancy = async function getPopulationLifeExpectancy(
  dob: Date,
  country: string,
  sex: string,
): Promise<number> {
  const formattedDate = getDateString(dob);
  const response = await fetch(
    `https://d6wn6bmjj722w.population.io/1.0/life-expectancy/total/${sex}/${country}/${formattedDate}/`,
  );
  const { total_life_expectancy } = (await response.json()) as PopulationLifeExpectancyResult;
  return total_life_expectancy;
};
