import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { WeekElement } from "@/components/week-element";
import config from "@/data/config";
import events from "@/data/events";
import { getDaysBetween, getUTCDateString, getYearsBetween } from "@/utils/date";
import { getRemainingLifeExpectancy } from "@/utils/population";

const { name, dob, country, sex } = config;

export default async function Home() {
  const today = new Date();
  const daysLived = getDaysBetween(dob, today);

  const remainingLifeExpectancy = await getRemainingLifeExpectancy({ dob, country, sex, today });
  const lifeExpectancyYears = getYearsBetween(dob, today) + remainingLifeExpectancy;
  const lifeExpectancyDays = lifeExpectancyYears * 365.25;

  return (
    <main className="mx-auto flex min-h-screen flex-col items-stretch gap-4 space-y-8 p-12">
      <section>
        <div className="mx-auto max-w-xl">
          <h1 className="text-4xl font-medium">{name}&apos;s Life in Weeks</h1>
          <p className="mt-1">
            A representation of my life in days, assuming a life expectancy of{" "}
            <a
              className="underline underline-offset-4"
              href="https://population.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lifeExpectancyYears.toFixed(2)} years
            </a>
            .
          </p>
          <div className="mt-6 space-y-2">
            <Progress className="w-full" value={daysLived} max={lifeExpectancyDays} />
            <p className="text-center">Today is day {daysLived}.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto grid max-w-xl gap-3 grid-auto-fit-[16px]">
          {Array.from({ length: lifeExpectancyDays / 7 }, (_, i) => {
            const week = i + 1;
            const weekStart = new Date(dob.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
            const weekEnd = new Date(dob.getTime() + week * 7 * 24 * 60 * 60 * 1000);

            const isPast = weekEnd.getTime() < today.getTime();
            const isFuture = today.getTime() < weekStart.getTime();

            const eventsThisWeek = events.filter(
              (event) =>
                weekStart.getTime() <= event.date.getTime() &&
                event.date.getTime() < weekEnd.getTime(),
            );

            return (
              <WeekElement
                key={week}
                variant={
                  isFuture
                    ? "disabled"
                    : eventsThisWeek.length > 0
                    ? "primary"
                    : isPast
                    ? "default"
                    : "active"
                }
                tooltipContent={
                  <div className="max-w-[16rem]">
                    <h2 className="text-center">
                      Week {week} ({getUTCDateString(weekStart)} - {getUTCDateString(weekEnd)})
                    </h2>
                    <div className="grid grid-cols-[max-content_1fr] gap-1">
                      {eventsThisWeek.map((event, index) => (
                        <React.Fragment key={index}>
                          <div key={index}>{getUTCDateString(event.date)}: </div>
                          <div>{event.name}</div>
                        </React.Fragment>
                      ))}
                    </div>
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
