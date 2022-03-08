import convict from 'convict';

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  host: {
    doc: 'The host to bind.',
    format: '*',
    default: 'localhost',
  },
  session: {
    name: {
      doc: 'The name of the cookie.',
      format: String,
      default: 'session',
    },
    keys: {
      doc: 'The keys of the cookie.',
      format: Array,
      default: ['Key1', 'key2'],
    },
    secret: {
      doc: 'The secret of the cookie.',
      format: String,
      default: 'secret',
      sensitive: true,
    },
  },
});

const env = config.get('env');
config.loadFile(`./appsettings/appsettings.${env}.json`);

config.validate({ allowed: 'strict' });

export default config;
