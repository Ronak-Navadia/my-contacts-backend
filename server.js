console.log('I am in express project');

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const contactRouter = require('./routes/myContactRoutes');
const userRouter = require('./routes/userRoutes');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const PORT = process.env.PORT || 9900;

app.use(express.json());
app.use('/api/contact', contactRouter)
app.use('/api/user', userRouter)
app.use(errorHandler)


app.listen(PORT, function () {
  console.log('Express server listening on port: ' + PORT)
})