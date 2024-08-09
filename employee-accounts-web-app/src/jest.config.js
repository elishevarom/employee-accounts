module.exports = {
  preset: 'babel-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    "/node_modules/(?!bootstrap)/",
  ]
  };

  