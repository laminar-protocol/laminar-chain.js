module.exports = {
  moduleNameMapper: {
    '@laminar/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@laminar/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@laminar/type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build',
  ],
};
