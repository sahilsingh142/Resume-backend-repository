import PDFDocument from "pdfkit";

const professionalTemplate = (resume, path) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  // =========================
  // HEADER
  // =========================
  doc.font("Helvetica-Bold").fontSize(20)
     .text(resume.name || "Your Name", { align: "center" });

  doc.moveDown(0.3);

  doc.font("Helvetica").fontSize(12)
     .text(resume.proffession || "Frontend Developer", { align: "center" });

  doc.moveDown(0.3);

  doc.fontSize(11).text(
    `${resume.email || "email@example.com"} | ${
      resume.phone || "0000000000"
    } | ${resume.github || "github.com/username"} | ${
      resume.country || "India"
    }`,
    { align: "center" }
  );

  doc.moveDown();

  // =========================
  // PROFESSIONAL SUMMARY
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14)
     .text("PROFESSIONAL SUMMARY");

  doc.moveDown(0.3);

  doc.font("Helvetica").fontSize(11)
     .text(
       resume.summary ||
         "Motivated developer with experience building responsive and scalable web applications using modern technologies."
     );

  doc.moveDown();

  // =========================
  // SKILLS
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14).text("SKILLS");
  doc.moveDown(0.3);

  if (resume.skill?.length > 0) {
    resume.skill.forEach((item) => {
      doc.font("Helvetica").fontSize(11).text(`• ${item.input}`);
    });
  } else {
    doc.font("Helvetica").fontSize(11).fillColor("gray")
       .text("• Add your skills")
       .fillColor("black");
  }

  doc.moveDown();

  // =========================
  // LANGUAGES
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14).text("LANGUAGES");
  doc.moveDown(0.3);

  if (resume.language?.length > 0) {
    resume.language.forEach((item) => {
      doc.font("Helvetica").fontSize(11).text(`• ${item.languageInput}`);
    });
  } else {
    doc.font("Helvetica").fontSize(11).fillColor("gray")
       .text("• Add languages")
       .fillColor("black");
  }

  doc.moveDown();

  // =========================
  // EXPERIENCE
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14).text("EXPERIENCE");
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(12)
     .text(resume.jobTittle || "Job Title");

  doc.font("Helvetica").fontSize(11)
     .text(
       `${resume.companyName || "Company Name"} | ${
         resume.startEndDate || "2024 - Present"
       } | ${resume.location || "Location"}`
     );

  doc.moveDown(0.3);

  doc.font("Helvetica").fontSize(11)
     .text(
       resume.companyDescription ||
         "Describe your responsibilities and achievements here."
     );

  doc.moveDown();

  // =========================
  // PROJECTS
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14).text("PROJECTS");
  doc.moveDown(0.5);

  if (resume.projects?.length > 0) {
    resume.projects.forEach((project) => {
      doc.font("Helvetica-Bold").fontSize(12)
         .text(project.projectName || "Project Name");

      doc.font("Helvetica").fontSize(11)
         .text(project.projectStartEndDate || "Jan - Mar");

      doc.moveDown(0.3);

      doc.font("Helvetica").fontSize(11)
         .text(
           project.projectDescription ||
             "Short project description with technologies used."
         );

      doc.moveDown();
    });
  } else {
    doc.font("Helvetica").fontSize(11).fillColor("gray")
       .text("Add your projects")
       .fillColor("black");
  }

  doc.moveDown();

  // =========================
  // EDUCATION
  // =========================
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(14).text("EDUCATION");
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").fontSize(12)
     .text(resume.dgree || "Bachelor's Degree");

  doc.font("Helvetica").fontSize(11)
     .text(
       `${resume.collageName || "University Name"} | ${
         resume.endDate || "2026"
       } | ${resume.collageLocation || "Location"}`
     );

  doc.end();
};

export default professionalTemplate;