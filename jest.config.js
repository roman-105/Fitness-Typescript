const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  cacheDirectory: '.jest/cache',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest.setup.js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': '<rootDir>/jest.fileMock.js'
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'BasicFitApp Unit & Integration tests',
        outputDirectory: './__tests__/.output',
        outputName: 'test-report.xml',
        ancestorSeparator: ' > ',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}'
      }
    ]
  ]
};
