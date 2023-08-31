import config from "@/data/config";
import { getDaysBetween } from "@/utils/date";
import { getLifeExpectancy } from "@/utils/population";

const { name, dob, country, sex } = config;

export default async function Home() {
  const today = new Date();
  const lifeExpectancyYears = await getLifeExpectancy(dob, country, sex);
  const lifeExpectancy = lifeExpectancyYears * 365;
  const daysLived = getDaysBetween(dob, today);

  return (
    <main className="flex min-h-screen flex-col items-stretch gap-4 p-24">
      <section>
        <h1 className="text-4xl font-medium">{name}'s Life in Weeks</h1>
        <p>
          A representation of my life in days, assuming a life expectancy of{" "}
          <a className="underline underline-offset-4" href="https://population.io/">
            {lifeExpectancyYears.toFixed(2)} years
          </a>
          .
        </p>
        <div>
          <progress className="w-full" value={daysLived} max={lifeExpectancy} />
          <p className="text-center">
            Today is day <span className="tabular-nums">{daysLived}</span>.
          </p>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: lifeExpectancy / 7 }, (_, i) => {
            const week = i + 1;
            const lowerBound = dob.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000;
            const upperBound = dob.getTime() + week * 7 * 24 * 60 * 60 * 1000;
            const nearestBirthday = new Date(dob).setFullYear(
              Math.max(new Date(lowerBound).getFullYear(), new Date(upperBound).getFullYear()),
            );

            const isBirthdayWeek = lowerBound <= nearestBirthday && nearestBirthday < upperBound;
            const isPast = upperBound < today.getTime();
            const isPresent = lowerBound <= today.getTime() && today.getTime() < upperBound;
            const isFuture = today.getTime() < lowerBound;

            return (
              <div
                key={week}
                title={`Week ${week}`}
                className={`col-span-1 h-4 rounded-sm ${
                  isPresent
                    ? "bg-blue-400"
                    : isFuture
                    ? "bg-zinc-100"
                    : isBirthdayWeek
                    ? "bg-zinc-800"
                    : isPast
                    ? "bg-zinc-300"
                    : ""
                }`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
