const pdf = require("html-pdf");
const { faker } = require("@faker-js/faker");

const pdfGeneratorFromHtml = (req, res) => {
  //generating fake data
  const tableData = [];
  for (let i = 0; i < 30; i++) {
    tableData.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
    });
  }
  //creating normal html format table
  const htmlContent = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Fake User Data</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            ${tableData
              .map(
                (user) => `
              <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  //using the library to create this html into buffer
  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      return res.status(500).send("Error generating PDF");
    }
    //setting headers type in response
    res.setHeader("Content-Type", "application/pdf");
    // telling headers to how to behave like , attachment or inline
    res.setHeader(
      "Content-Disposition",
      "inline; filename=fake_data_table.pdf"
    );
    res.send(buffer);
  });
};

module.exports = pdfGeneratorFromHtml;
