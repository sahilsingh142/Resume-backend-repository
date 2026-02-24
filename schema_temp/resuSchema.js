import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectStartEndDate: String,
  projectDescription: String,
});

const resumeSchema = new mongoose.Schema({
  name: String,
  proffession: String,
  email: String,
  phone: String,
  github: String,
  country: String,

  summary: String,

  skill: [{ input: { type: String } }],
  language: [{ languageInput: { type: String } }],

  jobTittle: String,
  companyName: String,
  startEndDate: String,
  location: String,
  companyDescription: String,

  projects: [projectSchema],

  dgree: String,
  collageName: String,
  collageLocation: String,
  endDate: String,
}, { timestamps: true });

const resuSchema = mongoose.model("Resume", resumeSchema);
export default resuSchema;