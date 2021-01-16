import type { Config } from "@jest/types"
import { defaults } from "jest-config"
import { pathsToModuleNameMapper } from "ts-jest/utils"

// cf. https://www.typescriptlang.org/ja/tsconfig#resolveJsonModule
// cf. https://www.typescriptlang.org/ja/tsconfig#moduleResolution
import { compilerOptions } from "./tsconfig.json"

// const paths: Array<string> =

// Configuration: cf. https://jestjs.io/docs/ja/configuration
const config = (): Config.InitialOptions => {
  return {
    verbose: true,
    preset: "ts-jest",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    testMatch: [...defaults.testMatch, "**/test/**/*.[jt]s?(x)"],
    globals: {
      "ts-jest": {
        // ts-jest configuration goes here
        useESM: true
      }
    }
  }
}

export default config
