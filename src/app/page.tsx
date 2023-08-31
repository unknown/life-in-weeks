import { Progress } from "@/components/ui/progress";
import { WeekElement } from "@/components/week-element";
import config from "@/data/config";
import { getDaysBetween, getYearsBetween } from "@/utils/date";
import { getRemainingLifeExpectancy } from "@/utils/population";

const { name, dob, country, sex } = config;

export default async function Home() {
  const today = new Date();
  const daysLived = getDaysBetween(dob, today);

  const remainingLifeExpectancy = await getRemainingLifeExpectancy({ dob, country, sex, today });
  const lifeExpectancyYears = getYearsBetween(dob, today) + remainingLifeExpectancy;
  const lifeExpectancyDays = lifeExpectancyYears * 365.25;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-stretch gap-4 p-24">
      <section>
        <h1 className="text-4xl font-medium">{name}'s Life in Weeks</h1>
        <p className="mt-1">
          A representation of my life in days, assuming a life expectancy of{" "}
          <a className="underline underline-offset-4" href="https://population.io/">
            {lifeExpectancyYears.toFixed(2)} years
          </a>
          .
        </p>
        <div className="mt-6 space-y-2">
          <Progress className="w-full" value={daysLived} max={lifeExpectancyDays} />
          <p className="text-center">Today is day {daysLived}.</p>
        </div>
      </section>
      <section>
        <div className="grid-auto-fit-[16px] grid gap-3">
          {Array.from({ length: lifeExpectancyDays / 7 }, (_, i) => {
            const week = i + 1;
            const weekStart = new Date(dob.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
            const weekEnd = new Date(dob.getTime() + week * 7 * 24 * 60 * 60 * 1000);
            // TODO: this is a bit hacky, but it works for now
            const nearestBirthday = new Date(dob).setFullYear(
              Math.max(new Date(weekStart).getFullYear(), new Date(weekEnd).getFullYear()),
            );

            const isBirthdayWeek =
              weekStart.getTime() <= nearestBirthday && nearestBirthday < weekEnd.getTime();
            const isPast = weekEnd.getTime() < today.getTime();
            const isFuture = today.getTime() < weekStart.getTime();

            return (
              <WeekElement
                key={week}
                variant={
                  isFuture ? "future" : isBirthdayWeek ? "birthday" : isPast ? "past" : "present"
                }
                tooltipContent={
                  <div className="text-center">
                    <h2>
                      Week {week} ({weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
                      )
                    </h2>
                    {isBirthdayWeek ? <p>Birthday! 🎉</p> : null}
                  </div>
                }
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
