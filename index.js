const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const users=require('./routes/user')
const app = express();
const authi=require('./routes/authi')

app.use(express.json());

mongoose.connect('mongodb://localhost/url_shortener', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('Connected to database successfully'))
  .catch((error) => console.error('Error in connecting to database:', error));

app.use('/', urlRoutes);
app.use('/api/users',users)
app.use('/api/authi',authi)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});