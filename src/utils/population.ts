import { getDaysBetween, getISODateString } from "@/utils/date";

interface RemainingLifeExpectancyResult {
  date: string;
  country: string;
  age: string;
  remaining_life_expectancy: number;
  sex: string;
}

interface RemainingLifeExpectancyOptions {
  dob: Date;
  country: string;
  sex: string;
  today?: Date;
}

export const getRemainingLifeExpectancy = async function getRemainingLifeExpectancy({
  dob,
  country,
  sex,
  today = new Date(),
}: RemainingLifeExpectancyOptions): Promise<number> {
  const daysAlive = getDaysBetween(dob, today);
  const formattedToday = getISODateString(today);
  const response = await fetch(
    `https://d6wn6bmjj722w.population.io/1.0/life-expectancy/remaining/${sex}/${country}/${formattedToday}/${daysAlive}d/`,
  );
  const { remaining_life_expectancy } = (await response.json()) as RemainingLifeExpectancyResult;
  return remaining_life_expectancy;
};
