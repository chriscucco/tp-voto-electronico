const express = require('express')
const app = express();

const { createUser } = require('./controllers/users/users');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/create_user', createUser)

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
