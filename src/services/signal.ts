import Winston from './logger';

const logger = Winston.getInstance().getLogger();

async function onSignal() {
  logger.info('Server is shutting down...');
  // cleanup of resources, like database or file descriptors
}

export default onSignal;
