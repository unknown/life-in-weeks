import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WeekElement } from "@/components/week-element";
import config from "@/data/config";
import events from "@/data/events";
import { getDaysBetween, getUTCDateString, getYearsBetween } from "@/utils/date";
import { getRemainingLifeExpectancy } from "@/utils/population";

const { dob, country, sex } = config;

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
          <h1 className="text-4xl font-medium">Life in Weeks</h1>
          <p className="mt-2">
            A representation of my life in weeks, assuming a life expectancy of{" "}
            <a
              className="underline underline-offset-4"
              href="https://population.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lifeExpectancyYears.toFixed(2)} years
            </a>
            . This draws heavy inspiration from{" "}
            <a
              className="underline underline-offset-4"
              href="https://days.rory.codes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Day by Day
            </a>{" "}
            by Rory Flint. You can create your own version of this by forking{" "}
            <a
              className="underline underline-offset-4"
              href="https://github.com/unknown/week-by-week"
              target="_blank"
              rel="noopener noreferrer"
            >
              this repository
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
          <TooltipProvider delayDuration={200}>
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
                <Tooltip key={week}>
                  <TooltipTrigger asChild>
                    <WeekElement
                      variant={
                        isFuture
                          ? "disabled"
                          : eventsThisWeek.length > 0
                          ? "primary"
                          : isPast
                          ? "default"
                          : "active"
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent>
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
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </section>
    </main>
  );
}
