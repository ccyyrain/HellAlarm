
console.log(`loading configuration (dev mode=${__DEV__})`);

const config = {
  // TODO: domain name of your heroku app, e.g.:
  //   API_BASE: 'https://foo-bar-baz.herokuapp.com',
  API_BASE: 'https://cryptic-waters-64842.herokuapp.com',

  // can use same client/api id as in module 3 project
  AUTH0_DOMAIN: 'raphael9312.auth0.com',
  AUTH0_CLIENT_ID: '07uBzEYGzNzv2iReguXdO4ingt8nQ4J9',
  AUTH0_API_ID: 'https://raphael9312.auth0.com/api/v2/',
}

const devModeOverrides = {
  // TODO: in some expo modes, you need to set this to the IP address of your
  //   computer, rather than just 'localhost'. E.g.:
  //   API_BASE: 'http://192.168.2.12:3000'
  // API_BASE: 'http://localhost:3000',
  //API_BASE: 'http://10.155.181.200:3000'
  //API_BASE: 'http://10.128.30.113:3000',
}

if (__DEV__) {
  Object.assign(config, devModeOverrides)
}

console.log('config:', config)

export default config;
