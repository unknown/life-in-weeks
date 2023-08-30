interface Config {
  name: string;
  dob: Date;
  sex: string;
  country: string;
}

const config: Config = {
  name: "David",
  dob: new Date("2003-07-21"),
  sex: "male",
  country: "United States",
};

export default config;
