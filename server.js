const express = require("express")
const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("WORKINGGG!!")
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))
