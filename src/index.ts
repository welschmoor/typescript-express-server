
import express from "express"
const app = express()


const first = 1
const second = 2


app.get("/", (req, res) => {
  console.log(req, res)
  res.send(`${first} + ${second} is ${first + second}`)
})
 

app.listen(3003)