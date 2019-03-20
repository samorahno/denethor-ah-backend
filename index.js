import swagger from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';
import socketIO from 'socket.io';
import http from 'http';
import sessionManagement from './server/config/session';
import swaggerDocument from './server/docs/swagger';
import auth from './server/api/middlewares/authentication/authenticate';
import userRoute from './server/api/routes/user';
import articleRoute from './server/api/routes/article';
import bookmarkRoutes from './server/api/routes/bookmark';
import tagsRoute from './server/api/routes/tags';
import handleSocket from './server/config/socket';

dotenv.config();

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

const port = process.env.PORT || process.env.LOCAL_PORT;
// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
sessionManagement(app);

app.use(express.static(`${__dirname}/public`));
app.use(auth.initialize());
app.use('/api/users', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/tags', tagsRoute);
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Author Haven!',
}));

app.get('*', (req, res) => res.status(200).send({
  status: 'fail',
  message: 'Route not found',
}));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => { handleSocket(socket); });

server.listen(port, function serverListner() {
  logger.debug(`Server running on port ${chalk.blue(port)}`);
});

export default app;
