import app from './app';
import process from 'process';

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`);
});
