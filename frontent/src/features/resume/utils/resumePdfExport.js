
/**
 * Fills a jsPDF document instance with resume data in a professional format.
 * Shared between Resume Optimization and Application Details pages.
 * 
 * @param {jsPDF} doc - jsPDF instance
 * @param {Object} sections - Resume sections object
 */
export const fillPDFDoc = (doc, sections) => {
  if (!sections) return;

  const basics = sections?.basics || {};
  const dynamicSections = sections?.sections || {};
  const sectionOrder =
    sections?.sectionOrder?.length > 0
      ? sections.sectionOrder
      : Object.keys(dynamicSections);

  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkY = (needed = 30) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addSectionHeading = (heading) => {
    y += 8;
    checkY(28);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    const text = heading
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    doc.text(text.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, margin + contentWidth, y);
    y += 13;
    doc.setTextColor(20, 20, 20);
  };

  const renderSection = (key) => {
    const data = dynamicSections[key];
    if (!data) return;

    if (typeof data === "string") {
      addSectionHeading(key);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      const lines = doc.splitTextToSize(data, contentWidth);
      checkY(lines.length * 14);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 8;
      return;
    }

    if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0] === "string") {
        addSectionHeading(key);
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);

        data.forEach((item) => {
          const colonIdx = item.indexOf(":");
          if (colonIdx !== -1) {
            const category = item.substring(0, colonIdx).trim() + ":";
            const values = item.substring(colonIdx + 1).trim();

            checkY(14);
            doc.setFont("helvetica", "bold");
            doc.text(category, margin, y);
            
            const categoryWidth = doc.getTextWidth(category) + 4;
            doc.setFont("helvetica", "normal");
            
            const availableWidth = contentWidth - categoryWidth;
            const valueLines = doc.splitTextToSize(values, availableWidth);
            
            doc.text(valueLines, margin + categoryWidth, y);
            y += valueLines.length * 12;
          } else {
            const lines = doc.splitTextToSize(`• ${item}`, contentWidth);
            checkY(lines.length * 12);
            doc.setFont("helvetica", "normal");
            doc.text(lines, margin, y);
            y += lines.length * 12;
          }
        });
        y += 8;
        return;
      }

      addSectionHeading(key);
      data.forEach((item) => {
        checkY(40);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(20, 20, 20);

        const title =
          item.role ||
          item.name ||
          item.degree ||
          item.title ||
          (typeof item === "object" && Object.keys(item).length > 0
            ? item[Object.keys(item)[0]]
            : "") ||
          "";
        doc.text(title || "", margin, y);

        const date = item.duration || item.year || item.date || "";
        if (date) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(120, 120, 120);
          doc.text(String(date), pageWidth - margin, y, { align: "right" });
        }
        y += 14;

        const subtitleFields = [
          "company",
          "school",
          "org",
          "issuer",
          "location",
        ];
        const subtitle = subtitleFields
          .map((f) => item[f])
          .filter(Boolean)
          .join(" · ");
        const desc = item.description || item.grade || item.summary || "";
        const combinedSub = [subtitle, desc].filter(Boolean).join(" - ");

        if (combinedSub) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);

          const lines = doc.splitTextToSize(combinedSub, contentWidth);
          doc.text(lines, margin, y);
          y += lines.length * 14;
        }

        const bullets = Array.isArray(item.bullets)
          ? item.bullets
          : Array.isArray(item.achievements)
            ? item.achievements
            : [];
        if (bullets.length > 0) {
          doc.setTextColor(50, 50, 50);
          bullets.forEach((bullet) => {
            const bLines = doc.splitTextToSize(
              `•  ${bullet}`,
              contentWidth - 10,
            );
            checkY(bLines.length * 12);
            doc.text(bLines, margin + 6, y);
            y += bLines.length * 12 + 2;
          });
        }

        const tags = Array.isArray(item.tech)
          ? item.tech
          : Array.isArray(item.skills)
            ? item.skills
            : [];
        if (tags.length > 0) {
          doc.setTextColor(100, 100, 100);
          doc.setFontSize(8);
          const tagLines = doc.splitTextToSize(
            `Tags: ${tags.join(", ")}`,
            contentWidth,
          );
          doc.text(tagLines, margin, y);
          y += tagLines.length * 12 + 2;
        }

        y += 6;
      });
    }
  };

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 20);
  doc.text(basics.name || "Your Name", margin, y);
  y += 24;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  if (basics.title) {
    doc.text(basics.title, margin, y);
    y += 16;
  }

  const contact = [basics.email, basics.phone, basics.location]
    .filter(Boolean)
    .join(" • ");
  if (contact) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(contact, margin, y);
    y += 20;
  }

  sectionOrder.forEach((key) => renderSection(key));
};
