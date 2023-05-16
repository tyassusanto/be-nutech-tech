const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')

app.use(cors());
app.use(express.json());

app.use('/users', userRoute)
app.use('/product', productRoute)

app.use('/file', express.static('./upload'));

const PORT = process.env.PORT || 3300;



app.listen(PORT, () => {
    console.log(`server is running port : ${PORT}`)
});