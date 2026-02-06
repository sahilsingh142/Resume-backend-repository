import express from 'express';
import mongoose from "mongoose"
import UserData from './schema.js';
import cors from "cors";
import dotenv from "dotenv";
import { jwtAutherMiddleware, generateToken } from './Jwt/jwt.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = process.env.MONGO_URL;
await mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected")
  })

  {/*Sign Up */}
app.post('/signup', async (req, res) => {
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

{/*Login*/}
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try{
    const matchLogin = await UserData.findOne({ email, password });

   if (!matchLogin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (matchLogin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  {/*When any one can sign up than give jwt Token*/}
  const payload = {
    id: matchLogin.id,
    userName: matchLogin.userName
  }
  const token = generateToken (payload);
  res.status(200).json({matchLogin:matchLogin,token:token});
  }
  catch(err){
    return res.status(500).json({err})
  }
});


app.listen(PORT);