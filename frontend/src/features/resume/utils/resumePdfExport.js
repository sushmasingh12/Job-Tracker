
/**
 * Fills a jsPDF document instance with resume data in a professional format.
 * Shared between Resume Optimization and Application Details pages.
 * 
 * @param {jsPDF} doc - jsPDF instance
 * @param {Object} sections - Resume sections object
 * @param {string} template - Template name ('modern', 'professional', 'minimal')
 */
export const fillPDFDoc = (doc, sections, template = "modern") => {
  if (!sections) return;

  const configs = {
    modern: {
      font: "helvetica",
      nameSize: 20,
      headerAlign: "left",
      headingLine: true,
      bullet: "•",
      primaryColor: [20, 20, 20],
      secondaryColor: [100, 100, 100],
      headingSize: 8,
    },
    professional: {
      font: "times",
      nameSize: 22,
      headerAlign: "center",
      headingLine: true,
      bullet: "•",
      uppercaseName: true,
      primaryColor: [0, 0, 0],
      secondaryColor: [80, 80, 80],
      headingSize: 10,
    },
    minimal: {
      font: "helvetica",
      nameSize: 24,
      headerAlign: "left",
      headingLine: false,
      bullet: "—",
      primaryColor: [30, 30, 30],
      secondaryColor: [120, 120, 120],
      headingSize: 11,
    }
  };

  const cfg = configs[template] || configs.modern;
  
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

  doc.setFont(cfg.font);

  const checkY = (needed = 30) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
      doc.setFont(cfg.font);
    }
  };

  const addSectionHeading = (heading) => {
    y += 12;
    checkY(28);
    doc.setFontSize(cfg.headingSize);
    doc.setFont(cfg.font, "bold");
    doc.setTextColor(...cfg.secondaryColor);
    
    const text = heading
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    
    const headingText = template === "professional" ? text.toUpperCase() : text;
    doc.text(headingText, margin, y);
    
    if (cfg.headingLine) {
      y += 4;
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, margin + contentWidth, y);
      y += 13;
    } else {
      y += 10;
    }
    doc.setTextColor(...cfg.primaryColor);
  };

  const renderSection = (key) => {
    const data = dynamicSections[key];
    if (!data) return;

    if (typeof data === "string") {
      addSectionHeading(key);
      doc.setFontSize(10);
      doc.setFont(cfg.font, "normal");
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
            doc.setFont(cfg.font, "bold");
            doc.text(category, margin, y);

            const categoryWidth = doc.getTextWidth(category) + 4;
            doc.setFont(cfg.font, "normal");

            const availableWidth = contentWidth - categoryWidth;
            const valueLines = doc.splitTextToSize(values, availableWidth);

            doc.text(valueLines, margin + categoryWidth, y);
            y += valueLines.length * 12;
          } else {
            const lines = doc.splitTextToSize(`${cfg.bullet} ${item}`, contentWidth);
            checkY(lines.length * 12);
            doc.setFont(cfg.font, "normal");
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
        doc.setFont(cfg.font, "bold");
        doc.setTextColor(...cfg.primaryColor);

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
          doc.setFont(cfg.font, "normal");
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
          doc.setFont(cfg.font, "normal");
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
              `${cfg.bullet}  ${bullet}`,
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

  // Header Rendering
  doc.setFontSize(cfg.nameSize);
  doc.setFont(cfg.font, "bold");
  doc.setTextColor(...cfg.primaryColor);
  
  const name = basics.name || "Your Name";
  const displayName = cfg.uppercaseName ? name.toUpperCase() : name;
  
  if (cfg.headerAlign === "center") {
    doc.text(displayName, pageWidth / 2, y, { align: "center" });
  } else {
    doc.text(displayName, margin, y);
  }
  y += 24;

  doc.setFontSize(11);
  doc.setFont(cfg.font, template === "professional" ? "italic" : "normal");
  doc.setTextColor(...cfg.secondaryColor);
  if (basics.title) {
    if (cfg.headerAlign === "center") {
      doc.text(basics.title, pageWidth / 2, y, { align: "center" });
    } else {
      doc.text(basics.title, margin, y);
    }
    y += 16;
  }

  const contact = [basics.email, basics.phone, basics.location]
    .filter(Boolean)
    .join(" • ");
  if (contact) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont(cfg.font, "normal");
    if (cfg.headerAlign === "center") {
      doc.text(contact, pageWidth / 2, y, { align: "center" });
    } else {
      doc.text(contact, margin, y);
    }
    y += 20;
  }

  // Draw line for Professional header
  if (template === "professional") {
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, y - 5, pageWidth - margin, y - 5);
    y += 10;
  }

  sectionOrder.forEach((key) => renderSection(key));
};

