import type { Config } from "@jest/types";

const neutrino = require("neutrino");
process.env.NODE_ENV = process.env.NODE_ENV || "test";

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return neutrino().jest();
};
