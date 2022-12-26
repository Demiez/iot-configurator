import app from './app';
import process from 'process';
import { IotconLogger } from '~iotcon-sdk';
import Container from 'typedi';

const { NODE_ENV, PORT_API_GATEWAY } = process.env;

const logger = Container.get(IotconLogger);

app.listen(PORT_API_GATEWAY, () => {
  logger.log(`Server running in ${NODE_ENV} mode on port: ${PORT_API_GATEWAY}`);
});
