import fs from 'fs'

const envDefault = {
  API_BASE_URL: 'http://domain.com',
  API_SOCIETY_URL: 'http://domain.com',
  WS_BASE_URL: 'ws://domain.com'
}

const envDefaultJSON = JSON.stringify(envDefault, null, ' '.repeat(4))

if (!fs.existsSync('./env.js')) {
  fs.writeFileSync('./env.js',
    `export default ${envDefaultJSON}\n`)
}
