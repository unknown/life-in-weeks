interface Config {
  dob: Date;
  sex: string;
  country: string;
}

// Used to calculate life expectancy using the population.io API
const config: Config = {
  dob: new Date("2003-07-21"),
  sex: "male",
  country: "United States",
};

export default config;
