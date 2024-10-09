const router = require("express").Router();
const csvGenerator = require("../controller/csvWritter");

router.get("/csv-writter", csvGenerator);

module.exports = router;
