import mammoth from "mammoth";
import path from "path";
import { PDFParse } from "pdf-parse";

const parseResume = async (buffer, originalname) => {
  const ext = path.extname(originalname).toLowerCase();

  if (ext === ".pdf") {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const text = result?.text || "";

    await parser.destroy?.();

    if (!text || text.trim().length < 50) {
      throw new Error(
        "Could not extract text from PDF. Try a text-based PDF (not scanned)."
      );
    }

    return text;
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer });
    const text = result?.value || "";

    if (!text || text.trim().length < 50) {
      throw new Error(
        "Could not extract text from DOCX. Please check the file."
      );
    }

    return text;
  }

  throw new Error("Unsupported file format. Please upload PDF or DOCX only.");
};

export default parseResume;