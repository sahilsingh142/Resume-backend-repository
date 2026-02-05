import express from 'express';
import mongoose from "mongoose"
import UserData from './schema.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = "mongodb://localhost:27017/resumeData";
await mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected")
  })

app.post('/signup', async (req, res) => {
  const data = req.body;
  try {
    const userData = new UserData(req.body);
    const saveData = await userData.save();
    res.status(201).json({ message: "Signup successful", data: saveData });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Server error"
    });
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const matchLogin = await UserData.findOne({ email, password });

  if (matchLogin) {
    res.json({ message: "Login successful" });
  } else {
    res.json({ message: "Invalid email or password" });
  }
});


app.listen(3500);