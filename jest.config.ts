const { getJestProjects } = require('@nrwl/jest')

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/ui',
    '<rootDir>/libs/feature',
    '<rootDir>/libs/data-access/hyfaa',
  ],
}
