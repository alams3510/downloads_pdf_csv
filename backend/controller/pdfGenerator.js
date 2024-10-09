const { faker } = require("@faker-js/faker");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs").promises;

const pdfGenerator = async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([792, 792]);
    const x = 50,
      y = 750;
    const reportname = "DEMO";
    //generating fake data
    const tableData = [];
    for (let i = 0; i < 30; i++) {
      tableData.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
      });
    }
    const headers = ["name", "email", "address"];
    page.drawText(reportname, { x, y, size: 15, color: rgb(0, 0, 0) });

    addTableHeaders(page, headers);
    addTableData(page, tableData, headers);

    const pdfBytes = await pdfDoc.save();

    // await fs.writeFile("a4_example_with_margins.pdf", pdfBytes);
    // in node js direct pdfBytes may not work in some cases so we convert it into buffer and then send to frontend.
    const pdfBuffer = Buffer.from(pdfBytes);
    // this line set headers of response
    res.setHeader("Content-Type", "application/pdf");
    // this line below is used to show the pdf inline in browser and can be download also
    res.setHeader(
      "Content-Disposition",
      "inline; filename=a4_example_with_margins.pdf"
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

const addTableHeaders = (page, headers) => {
  const tableWidth = 700;
  const cellPadding_x = 10;
  const cellPadding_y = 5;
  const fontSize = 12;
  const cellWidth = tableWidth / headers.length;
  const cellHeight = 5;

  let y = page.getHeight() - 100;
  let x = 50;
  headers.forEach((header, index) => {
    page.drawRectangle({
      x,
      y,
      width: cellWidth,
      height: cellHeight + fontSize + 2 * cellPadding_y,
      borderColor: rgb(0, 0, 0),
      borderWidth: 0.5,
      color: rgb(1, 1, 1),
    });
    page.drawText(header, {
      x: x + cellPadding_x,
      y: y + cellPadding_y,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    x += cellWidth;
  });
};

const addTableData = (page, tableData, headers) => {
  const tableWidth = 700;
  const tableHeight = 300;
  const cellPadding = 3;
  const fontSize = 10;

  const cellWidth = tableWidth / headers.length;
  const cellHeight = 5;
  let y = page.getHeight() - 125;

  for (let i = 0; i < tableData.length; i++) {
    let x = 50;
    for (let j = 0; j < headers.length; j++) {
      const cellRecord = tableData[i][headers[j]]
        ? String(tableData[i][headers[j]])
        : "";

      page.drawRectangle({
        x,
        y,
        width: cellWidth,
        height: cellHeight + fontSize + 2 * cellPadding,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.5,
        color: rgb(1, 1, 1),
      });
      page.drawText(cellRecord, {
        x: x + cellPadding,
        y: y + cellPadding,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      x += cellWidth;
    }

    y -= cellHeight + fontSize + 2 * cellPadding;
    if (y <= 50) {
      break;
    }
  }
};

module.exports = pdfGenerator;
