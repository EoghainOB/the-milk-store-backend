import app from './index';

const port = 8080;

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});