const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  blocklist: ['collapse'],
  theme: {
    extend: {
      colors: {
        main: '#3d405b',
      },
    },
  },
  plugins: [],
}
