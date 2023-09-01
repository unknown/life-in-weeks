interface Config {
  dob: Date;
  sex: string;
  country: string;
  lifeExpectancy?: number;
}

const config: Config = {
  dob: new Date("2003-07-21"),
  // Used to calculate life expectancy using the population.io API
  sex: "male",
  country: "United States",
  // Alternatively, you can hardcode a life expectancy
  // lifeExpectancy: 80,
};

export default config;
