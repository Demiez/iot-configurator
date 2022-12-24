import app from './app';
import process from 'process';
import { SDK, enums } from '~iotcon-sdk';
import { resolve } from 'path';

const { PORT, NODE_ENV } = process.env;

const logger = SDK._initializeLogger(
  enums.MetaContextEnum.API_GATEWAY,
  NODE_ENV === 'development' ? resolve(__dirname) : undefined
);

app.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port: ${PORT}`);
});
