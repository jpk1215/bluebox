import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';

const app = express();
const port = process.env.HTTP_PORT || 9000;
app.use(morgan('dev'));
app.use(favicon(`${__dirname}/bluebox.ico`));

app.get('*', (req, res) => {
  res.end('Hello World');
});

app.listen(port, () => {
  console.info(`${new Date()} Listening on port ${port}`);
});
