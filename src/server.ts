import { app } from './app';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 3232;

export const startServer = async () => {
  app.listen(PORT, () => {
    console.log('App is running on port ' + PORT);
  });

  process.on('UncaughtException', async (error) => {
    console.log(error);
    process.exit(1);
  });
};

startServer().then(() => {
  console.log('Server started');
});
