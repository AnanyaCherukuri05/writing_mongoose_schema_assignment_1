const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
const { UserModel, ProfileModel, TrackingModel } = require('./schema');
const app = express();
const port = 8526;
const mongoDB = 'mongodb+srv://ananyacherukuri5:tG2aoHvSbZHusZ3e@cluster0.tjmvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB);
mongoose.connection.on('error', (err) => {
  console.error(err);
});

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/test-create-user', async (req, res) => {
  try {
    const newUser = new UserModel({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      roles: ['user']
    });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const newProfile = new ProfileModel({
      user: "67b571c1183fa1e5cb43afb9",
      firstname: "ananya",
      lastname: "cherukuri",
      age: 19
    });
    await newProfile.save();
    res.status(201).send("Profile created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const profile = await ProfileModel.find().populate('user');
    res.json(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});