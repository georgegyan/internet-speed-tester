const express = require("express");

const {
  pingTest,
  downloadTest,
  uploadTest,
} = require("../controllers/test.controller");

const router = express.Router();

router.get("/ping", pingTest);

router.get("/download", downloadTest);

router.post("/upload", uploadTest)

module.exports = router;