const express = require("express");

const {
  pingTest,
  downloadTest,
  uploadTest,
  getTestConfig,
} = require("../controllers/test.controller");

const router = express.Router();

router.get("/ping", pingTest);

router.get("/download", downloadTest);

router.post("/upload", uploadTest);

router.get("/config", getTestConfig);

module.exports = router;