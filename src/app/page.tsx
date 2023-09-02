import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WeekElement } from "@/components/week-element";
import config from "@/data/config";
import events from "@/data/events";
import { getDaysBetween, getUTCDateString, getYearsBetween } from "@/utils/date";
import { getRemainingLifeExpectancy } from "@/utils/population";

export default async function Home() {
  // make an uncached fetch as a hacky way to opt out of Full Route Cache
  const worldTimeResult = (await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", {
    cache: "no-store",
  }).then((response) => response.json())) as { utc_datetime: string };
  const today = new Date(worldTimeResult.utc_datetime);

  const lifeExpectancyYears =
    config.lifeExpectancy ??
    getYearsBetween(config.dob, today) + (await getRemainingLifeExpectancy({ ...config, today }));
  const lifeExpectancyDays = lifeExpectancyYears * 365.25;
  const daysLived = getDaysBetween(config.dob, today);

  return (
    <main className="mx-auto flex min-h-screen flex-col items-stretch gap-4 space-y-8 p-12">
      <section>
        <div className="mx-auto max-w-xl">
          <h1 className="text-4xl font-medium">Life in Weeks</h1>
          <p className="mt-4">
            A representation of my life in weeks, assuming a life expectancy of{" "}
            <a
              className="underline underline-offset-4"
              href="https://population.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lifeExpectancyYears.toFixed(2)} years
            </a>
            . Each square illustrates a week of my life and can be expanded by clicking on it. Black
            squares signify important weeks. This draws heavy inspiration from{" "}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Progress className="w-full" value={daysLived} max={lifeExpectancyDays} />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    {((daysLived / lifeExpectancyDays) * 100).toFixed(2)}% complete
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-center">Today is day {daysLived}.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto grid max-w-xl gap-3 grid-auto-fit-[16px]">
          {Array.from({ length: lifeExpectancyDays / 7 }, (_, i) => {
            const week = i + 1;

            const weekDuration = 7 * 24 * 60 * 60 * 1000;
            const weekStart = new Date(config.dob.getTime() + (week - 1) * weekDuration);
            const weekEnd = new Date(config.dob.getTime() + week * weekDuration);

            const isPast = weekEnd.getTime() < today.getTime();
            const isFuture = today.getTime() < weekStart.getTime();

            const eventsThisWeek = events.filter(
              (event) =>
                weekStart.getTime() <= event.date.getTime() &&
                event.date.getTime() < weekEnd.getTime(),
            );

            return (
              <Popover key={week}>
                <PopoverTrigger asChild>
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
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[16rem] text-xs">
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
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </section>
    </main>
  );
}
