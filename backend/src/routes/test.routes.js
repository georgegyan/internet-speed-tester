const express = require("express");
const { pingTest } = require("../controllers/test.controller");

const router = express.Router();

router.get("/ping", pingTest);

module.exports = router;