import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * Converts plain-text content to a formatted PDF buffer.
 * @param {string} content  plain text content
 * @returns {Promise<Buffer>}
 */
export const generatePDFBuffer = (content) => {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      const doc = new PDFDocument({
        margins: { top: 72, bottom: 72, left: 72, right: 72 },
        size: "A4",
      });

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ── Styling ────────────────────────────────────────────────────────────
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#1a1a1a");

      // Split into paragraphs and render each with spacing
      const paragraphs = content.split(/\n\n+/);
      paragraphs.forEach((para, i) => {
        const lines = para.split("\n").join(" ").trim();
        doc.text(lines, { align: "left", lineGap: 4 });
        if (i < paragraphs.length - 1) doc.moveDown(0.8);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Converts plain-text content to a .docx buffer.
 * @param {string} content  plain text content
 * @returns {Promise<Buffer>}
 */
export const generateDOCXBuffer = async (content) => {
  const paragraphs = content
    .split(/\n\n+/)
    .flatMap((block) => {
      const lines = block.split("\n");
      return [
        ...lines.map(
          (line) =>
            new Paragraph({
              children: [new TextRun({ text: line.trim(), size: 22 })], // 11pt
              spacing: { after: 0 },
            })
        ),
        // Empty paragraph between blocks
        new Paragraph({ children: [new TextRun("")], spacing: { after: 160 } }),
      ];
    });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch = 1440 twips
          },
        },
        children: paragraphs,
      },
    ],
  });

  return Packer.toBuffer(doc);
};
