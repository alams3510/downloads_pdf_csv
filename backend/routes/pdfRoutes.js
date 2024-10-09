const router = require("express").Router();
const pdfGenerator = require("../controller/pdfGenerator");
const pdfGeneratorFromHtml = require("../controller/pdfGeneratorFromHtml");

router.get("/pdf-lib", pdfGenerator);
router.get("/html-pdf", pdfGeneratorFromHtml);

module.exports = router;
