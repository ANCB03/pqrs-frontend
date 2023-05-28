const express = require('express')
const cors = require(`cors`)
const app = express()
const port=3000;

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors())


app.get('/login', function (req, res) {
  res.send('Hello World')
})

app.post(`/login`,(req, res)=>{
    const {email,password} = req.body;
    const values = [email, password]

    if(email == `jaider`){
        res.send("shi")
    }
    console.log(email)
})


app.listen(port, ()=>{
    console.log(`Me estoy ejecutando en http://localhost:${port}`)
})