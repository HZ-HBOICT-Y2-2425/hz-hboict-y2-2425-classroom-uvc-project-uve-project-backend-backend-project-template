import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Add this line
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Add this line

app.use('/', indexRouter);

app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
