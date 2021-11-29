const express = require('express')
require("./db/mongoose")
const app = express()
const users = require("./routes/users.route");
const profiles = require("./routes/user_profile.route");

const port = process.env.PORT || 5001

app.use(express.json())

app.use(users)
app.use(profiles)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})