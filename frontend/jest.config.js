module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "esbuild-jest",
  },
  setupFiles: ["./setupTest.js"],
}
