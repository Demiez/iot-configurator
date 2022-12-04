import app from './app';
import process from 'process';
import SDK from '~iotcon-sdk';

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
  SDK.utils.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`);
});
