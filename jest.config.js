module.exports = {
    projects: [
      /**
       * Server-related tests such as services or middlewares
       */
      {
        displayName: 'services',
        testMatch: ['<rootDir>/tests/unit/**/*.spec.js'],
        testEnvironment: 'node',
      },
    ],
  };
  