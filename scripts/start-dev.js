import concurrently from 'concurrently'

const jobs = [
  {
    name: 'api',
    command: `cd functions && firebase emulators:start --only functions`,
    prefixColor: 'green',
  },
  {
    name: 'client',
    command: `doppler run vite`,
    prefixColor: 'blue',
  },
]

const concurrentOpts = {
  restartTries: 3,
  prefix: '{time} {name} |',
  timestampFormat: 'HH:mm:ss',
}

const { result } = concurrently(jobs, concurrentOpts)

result.catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e.message)
})
