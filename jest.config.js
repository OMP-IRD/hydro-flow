const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/ui',
    '<rootDir>/libs/feature',
    '<rootDir>/libs/data-access/hyfaa',
  ],
}
