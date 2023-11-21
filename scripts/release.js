/* eslint-disable*/
const concurrently = require('concurrently')
const { concurrentOpts } = require('./common')

const release = []
const deploy = [
  {
    name: 'deploy-dev',
    command: `npm run build && firebase deploy --project project-global-aa5ea`,
    prefixColor: 'green',
  },
]

switch (process.argv[2]) {
  case 'patch':
    release.push({
      name: 'release:patch',
      command: `git push origin`,
      prefixColor: 'yellow',
    })
    break
  case 'minor':
    release.push({
      name: 'release:minor',
      command: 'npm version minor && git push origin && git push origin --tags',
      prefixColor: 'yellow',
    })
    break
  case 'major':
    release.push({
      name: 'release:major',
      command: 'npm version major && git push origin && git push origin --tags',
      prefixColor: 'yellow',
    })
    break
  default:
    break
}

const { result } = concurrently(release, concurrentOpts)

result
  .then(() => concurrently(deploy, concurrentOpts))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e.message)
  })
