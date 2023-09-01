type CalendarEvent = {
  date: Date;
  name: string;
};

const events: CalendarEvent[] = [
  {
    date: new Date("2003-07-21"),
    name: "Hello world",
  },
  {
    date: new Date("2019-11-10"),
    name: "Attended and won my first hackathon",
  },
  {
    date: new Date("2020-05-13"),
    name: "The world goes into lockdown",
  },
  {
    date: new Date("2021-06-24"),
    name: "Graduate from high school",
  },
  {
    date: new Date("2021-09-02"),
    name: "Begin my first semester at NYU",
  },
  {
    date: new Date("2022-05-23"),
    name: "Start an intership at Moore Capital Management",
  },
  {
    date: new Date("2022-06-29"),
    name: "Start an internship at Chariot",
  },
  {
    date: new Date("2022-01-02"),
    name: "Go on a ski trip to Vermont with friends",
  },
  {
    date: new Date("2023-05-13"),
    name: "Travel to China and visit family",
  },
  {
    date: new Date("2023-08-25"),
    name: "Travel to California to watch VCT 2023 and visit family",
  },
  {
    date: new Date("2023-08-31"),
    name: "Launch this project",
  },
];

export default events;
