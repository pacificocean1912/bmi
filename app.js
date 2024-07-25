const express = require('express');
const app = express();
const port = 3000;
//const connectDB = require('./config/database');

require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB;

console.log('Starting server...');

console.log('Database connected');

const User = require('./models/user');

// Set EJS as the view engine
app.set('view engine', 'ejs');
console.log('Set view engine');

// Serve static files from the 'public' folder
app.use(express.static('public'));
console.log('Serving static files');

// Route for the homepage
app.get('/', (req, res) => {
  console.log('Homepage accessed');
  res.render('index', { title: 'BMI Calculator' });
});

app.post('/calculate-bmi', async (req, res) => {
  console.log('BMI calculation requested');
  const { weight, height } = req.body;
  const bmi = weight / (height * height);
  console.log(`BMI calculated: ${bmi}`);

  const user = new User({
    height,
    weight,
    bmi,
    date: new Date()
  });

  await user.save();
  console.log('User saved');

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


