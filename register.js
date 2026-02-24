import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import UserData from "./schema_temp/authschema.js";
import Resume from "./schema_temp/resuSchema.js";

import { jwtAutherMiddleware, generateToken } from "./Jwt/jwt.js";
import modernTemp from "./templates/modernTemplate.js";
import classicTemp from "./templates/classicTemplate.js";
import professionalTemp from "./templates/professionalTemplate.js";

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

{/*Sign Up */ }
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

{/*Login*/ }
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const matchLogin = await UserData.findOne({ email, password });

    if (!matchLogin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: matchLogin.id,
      userName: matchLogin.userName
    }
    const token = generateToken(payload);
    console.log(token);
    res.status(200).json({ matchLogin: matchLogin, token: token });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ err })
  }
});

//Save Resume Data
app.post('/resumeData', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const saveData = await resume.save();

    res.status(201).json({
      message: "Successful",
      data: saveData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
});

app.get('/download/:id/:template', async (req, res) => {
  try {
    const { id, template } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    const alltemplates = {
      modern: modernTemp,
      classic: classicTemp,
      professional: professionalTemp,
    };
    console.log(template);
    const selectedTemplate = alltemplates[template];
    console.log(selectedTemplate);

    if (!selectedTemplate) {
      return res.status(400).json({ message: "Invalid template name" });
    }

    selectedTemplate(resume, res)

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
})


app.listen(PORT);