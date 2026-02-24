import PDFDocument from "pdfkit";

const classicTemplate = (resume, res) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text(resume.name || "Amit singh");

  doc
    .fontSize(14)
    .font("Helvetica")
    .text(resume.proffession || "Frontend Developer");

  doc
    .moveDown(0.5)
    .fontSize(10)
    .text(
      `${resume.email || "amit@email.com"} | ${
        resume.phone || "+91-XXXXXXXXXX"
      } | ${resume.github || "github.com/meet"} | ${
        resume.country || "India"
      }`
    );

  doc.moveDown();

  // =========================
  // PROFESSIONAL SUMMARY
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Professional Summary", { underline: true });

  doc
    .moveDown(0.5)
    .fontSize(11)
    .font("Helvetica")
    .text(
      resume.summary ||
        "Passionate Frontend Web Developer with hands-on experience in building responsive and modern web applications using React and Tailwind CSS. Strong focus on clean UI, performance, and user experience.",
      { align: "left" }
    );

  doc.moveDown();

  // =========================
  // SKILLS
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Skills", { underline: true });

  doc.moveDown(0.5);
  resume.skill?.forEach((item) => {
    doc
      .fontSize(11)
      .font("Helvetica")
      .text(`• ${item.input}`);
  });

  doc.moveDown();

  // =========================
  // LANGUAGE
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Language", { underline: true });

  doc.moveDown(0.5);
  resume.language?.forEach((item) => {
    doc
      .fontSize(11)
      .font("Helvetica")
      .text(`• ${item.languageInput}`);
  });

  doc.moveDown();

  // =========================
  // EXPERIENCE
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Experience", { underline: true });

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(resume.jobTittle || "Frontend Developer");

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      `${resume.companyName || "Flipkart"} | ${
        resume.startEndDate || "2024 – Present"
      }`
    );

  doc
    .moveDown(0.3)
    .fontSize(11)
    .text(
      resume.companyDescription ||
        "Worked on building scalable UI components and improving performance."
    );

  doc.moveDown();

  // =========================
  // PROJECTS
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Projects", { underline: true });

  doc.moveDown(0.5);

  resume.projects?.forEach((project) => {
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(project.projectName || "Project Name");

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(project.projectStartEndDate || "Jan – Mar");

    doc
      .moveDown(0.3)
      .fontSize(11)
      .text(
        project.projectDescription ||
          "Built a modern web application using React and Tailwind CSS."
      );

    doc.moveDown();
  });

  // =========================
  // EDUCATION
  // =========================
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Education", { underline: true });

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(resume.dgree || "Bachelor’s Degree in Computer Science");

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      `${resume.collageName || "University Name"} | ${
        resume.endDate || "2021 – 2024"
      }`
    );

  doc.end();
}

export default classicTemplate;