import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import config from 'config';
import dotenv from 'dotenv';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import Winston from './services/logger';
import onHealthCheck from './services/health-check';
import onSignal from './services/signal';

const app = express();
const logger = Winston.getInstance().getLogger();

dotenv.config();

app.use(timeout('15s'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(
  cookieSession({
    name: config.get('session.name'),
    keys: config.get('session.keys'),
    secret: config.get('session.secret'),
    maxAge: 24 * 60 * 60 * 1000, // 24hrs
  })
);

const server = http.createServer(app);

createTerminus(server, {
  signals: ['SIGINT', 'SIGTERM'],
  healthChecks: { '/health': onHealthCheck },
  onSignal,
});

server.listen(config.get('port'));
logger.info(`Server started on port ${config.get('port')}`);
