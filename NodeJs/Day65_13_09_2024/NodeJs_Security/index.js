const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const app = express();
const postRoutes = require('./routes/posts');

app.use(bodyParser.json());


app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
