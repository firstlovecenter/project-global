/* eslint-disable*/
const concurrently = require('concurrently')
const { concurrentOpts } = require('./common')

const jobs = [
  {
    name: 'api',
    command: `cd functions && npm run serve`,
    prefixColor: 'green',
  },
  {
    name: 'api-build',
    command: `cd functions && npm run build:watch`,
    prefixColor: 'red',
  },
  {
    name: 'client',
    command: `doppler run vite`,
    prefixColor: 'blue',
  },
]

const { result } = concurrently(jobs, concurrentOpts)

result.catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e.message)
})
