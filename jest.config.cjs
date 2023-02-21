const fs = require('fs');
const config = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));
const cwd = global.process.cwd();

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/mocks/**',
  ],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ['./config/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': [
      'jest-chain-transform',
      {
        transformers: [
          `${cwd}/config/jest/importMetaEnvTransformer.cjs`,
          ['@swc/jest', { ...config }],
        ],
      },
    ],
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.cjs',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.cjs',
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    // Jest 공식 문서에 따라 tsx와 ts를 가장 왼쪽에 배치
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true,
};
