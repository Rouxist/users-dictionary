const express = require('express');
const app = express();

const cors = require('cors');

const db = require('./backend/index');

const totalRouter = require('./backend/routes/router');


app.use('/', totalRouter);


const path = require('path');


app.use(express.static(path.join(__dirname + '/client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: false })) //받아온 데이터가 undefined로 보이는 것과 관련이 있다고

app.use(cors());

app.get('/*', async (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


//Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));
}

// app.listen(port, () => {
//     console.log('Server is running on port:'+port);
// });


//after learning socket.io

const http = require('http'); //뭐지?
const server = http.createServer(app);

module.exports = server;