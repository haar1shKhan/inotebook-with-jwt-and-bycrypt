const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


const port = 5000
app.get('/', (req, res) => {
    res.send('Hello haarish')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})