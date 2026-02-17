import PDFDocument from "pdfkit";

export const pdfGenerator = (resume, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${resume.name}_Resume.pdf`
  );

  doc.pipe(res);

  doc.fontSize(22).text(resume.name);
  doc.fontSize(14).text(resume.profession);
  doc.moveDown();

  doc.fontSize(16).text("Summary");
  doc.fontSize(12).text(resume.summary);
  doc.moveDown();

  doc.fontSize(16).text("Skills");
  resume.skills.forEach(skill => {
    doc.text(`• ${skill}`);
  });

  doc.moveDown();
  doc.fontSize(16).text("Experience");
  doc.fontSize(12).text(resume.experience);

  doc.end();
};
