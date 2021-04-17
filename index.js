const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const userRoute = require('./routes/users.route');
// const roomRoute = require('./routes/room.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', userRoute);
// app.use('/api/rooms', roomRoute);


app.listen(port, () => {
    console.log(`application start at ${port}`)
})