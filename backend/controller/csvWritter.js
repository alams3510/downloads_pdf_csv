const { stringify } = require("csv-stringify");
const csvGenerator = (req, res) => {
  const records = [
    { name: "John Doe", age: 30, country: "USA" },
    { name: "Jane Smith", age: 25, country: "Canada" },
    { name: "Mark Stone", age: 40, country: "UK" },
  ];

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "inline; filename=sample.csv");

  stringify(records, { header: true }, (err, output) => {
    if (err) {
      return res.status(500).send("Error generating CSV");
    }
    res.send(output); // Send the generated CSV string
  });
};

module.exports = csvGenerator;
