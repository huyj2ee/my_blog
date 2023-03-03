const express = require('express')
const app = express()
const port = 3000

app.get('/trang-chu', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static("frontend/build"))
app.get("*", (req, res) => {
  res.sendFile("index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
