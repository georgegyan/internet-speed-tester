const express = require("express");

const {
  pingTest,
  downloadTest,
} = require("../controllers/test.controller");

const router = express.Router();

router.get("/ping", pingTest);

router.get("/download", downloadTest);

module.exports = router;