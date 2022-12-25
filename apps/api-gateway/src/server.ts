import app from './app';
import process from 'process';
import { SDK, enums } from '~iotcon-sdk';
import { resolve } from 'path';

const { NODE_ENV, PORT_API_GATEWAY } = process.env;

const logger = SDK._initializeLogger(
  enums.MetaContextEnum.API_GATEWAY,
  NODE_ENV === 'development' ? resolve(process.cwd()) : undefined
);

app.listen(PORT_API_GATEWAY, () => {
  logger.info(
    `Server running in ${NODE_ENV} mode on port: ${PORT_API_GATEWAY}`
  );
});
