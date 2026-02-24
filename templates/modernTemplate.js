import PDFDocument from "pdfkit";

const modernTemplate = (resume, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  const safeName = (resume.name || "Resume").replace(/[^a-zA-Z0-9]/g, "_");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${safeName}_Resume.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  /* ================= HEADER ================= */
  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text(resume.name || "Amit Singh");

  doc
    .fontSize(14)
    .font("Helvetica")
    .text(resume.proffession || "Frontend Developer");

  doc
    .moveDown(0.3)
    .fontSize(10)
    .text(
      `${resume.email || "amit@email.com"} | ${resume.phone || "+91-XXXXXXXXXX"} | ${
        resume.github || "github.com/meet"
      } | ${resume.country || "India"}`
    );

  doc.moveDown(1);

  /* ================= SECTION TITLE HELPER ================= */
  const sectionTitle = (title) => {
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(title);
    doc
      .moveDown(0.2)
      .lineWidth(1)
      .moveTo(40, doc.y)
      .lineTo(555, doc.y)
      .stroke();
    doc.moveDown(0.5);
  };

  /* ================= SUMMARY ================= */
  sectionTitle("Professional Summary");
  doc
    .fontSize(11)
    .font("Helvetica")
    .text(
      resume.summary ||
        "Passionate Frontend Developer with experience in React and Tailwind CSS."
    );

  doc.moveDown(0.8);

  /* ================= SKILLS ================= */
  if (resume.skill?.length) {
    sectionTitle("Skills");

    const skills = resume.skill.map((s) => s.input);
    let x = 40;
    let y = doc.y;
    const columnWidth = 170;

    skills.forEach((skill, i) => {
      doc.fontSize(11).text("• " + skill, x, y);
      y += 15;

      if ((i + 1) % 3 === 0) {
        x = 40;
        y += 5;
      } else {
        x += columnWidth;
      }
    });

    doc.moveDown(2);
  }

  /* ================= LANGUAGES ================= */
  if (resume.language?.length) {
    sectionTitle("Languages");
    resume.language.forEach((lang) => {
      doc.fontSize(11).text("• " + lang.languageInput);
    });
    doc.moveDown(0.8);
  }

  /* ================= EXPERIENCE ================= */
  if (resume.jobTittle) {
    sectionTitle("Experience");

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(resume.jobTittle || "Frontend Developer");

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `${resume.companyName || "Company"} | ${resume.startEndDate || "2024 – Present"}`
      );

    doc.moveDown(0.3);
    doc.fontSize(11).text(resume.companyDescription || "");
    doc.moveDown(0.8);
  }

  /* ================= PROJECTS ================= */
  if (resume.projects?.length) {
    sectionTitle("Projects");

    resume.projects.forEach((project) => {
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(project.projectName || "Project Name");

      doc
        .fontSize(10)
        .font("Helvetica")
        .text(project.projectStartEndDate || "Jan – Mar");

      doc.moveDown(0.2);
      doc.fontSize(11).text(project.projectDescription || "");
      doc.moveDown(0.6);
    });
  }

  /* ================= EDUCATION ================= */
  if (resume.dgree) {
    sectionTitle("Education");

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(resume.dgree || "Bachelor’s Degree");

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `${resume.collageName || "University"} | ${resume.endDate || "2021 – 2024"}`
      );
  }

  doc.end();
};

export default modernTemplate;
