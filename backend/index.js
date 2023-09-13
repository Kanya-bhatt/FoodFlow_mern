const express = require('express')
const app = express()
const port = 3000
const mongoDB = require('./db')
mongoDB();
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
//as we have to make multiple use for login signup and many more
app.use('/api', require('./Routes/CreateUser'));//if there exists a unique request -> if user wants to check the its history 
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//jwt -> the user doesnt have to login again and again as tje server knows the current user is secure.
