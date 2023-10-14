import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const jsonBodyParser = bodyParser.json();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening port: ${port}`);
});
