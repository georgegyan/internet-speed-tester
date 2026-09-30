const { getHighResolutionTime, calculateDurationMs } = require("../services/test.service");

const { getHighResolutionTime, calculateDurationMs } = require("../services/test.service");

const { createDownloadStream } = require("../services/download.service");

const pingTest = async (req, res) => {
  try {
    const start = getHighResolutionTime();

    await Promise.resolve();

    const end = getHighResolutionTime();

    const latency = calculateDurationMs(start, end);

    res.json({
      success: true,
      message: "Ping test completed",
      latency: Number(latency.toFixed(2)),
      unit: "ms",
    });
  } catch (error) {
    console.error("Ping test error:", error);

    res.status(500).json({
      success: false,
      message: "Ping test failed",
    });
  }
};

const downloadTest = (req, res) => {
  const sizeInMB =
    Number(req.query.size) || 10;

    if (
      Number.isNaN(sizeInMB) ||
      sizeInMB <= 0 ||
      sizeInMB > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Size must be between 1 and 100 MB",
      });
    }

  const totalBytes =
    sizeInMB * 1024 * 1024;

  res.set({
    "Content-Type":
      "application/octet-stream",

    "Content-Length": totalBytes,

    "Cache-Control": "no-store",
  });

  const stream =
    createDownloadStream(sizeInMB);

  stream.pipe(res);
};

const uploadTest = (req, res) => {
  let bytesReceived = 0;

  const start = getHighResolutionTime();

  req.on("data", (chunk) => {
    bytesReceived += chunk.length;
  });

  req.on("end", () => {
    const end = getHighResolutionTime();

    const durationMs = calculateDurationMs(start, end);
    const durationSeconds = durationMs / 1000;

    const megabytes = bytesReceived / (1024 * 1024);
    const megabits = megabytes * 8;

    const speedMbps =
      durationSeconds > 0
        ? megabits / durationSeconds
        : 0;

    res.json({
      success: true,
      message: "Upload test completed",
      bytesReceived,
      megabytes: Number(megabytes.toFixed(2)),
      durationMs: Number(durationMs.toFixed(2)),
      speedMbps: Number(speedMbps.toFixed(2)),
    });
  });

  req.on("error", (error) => {
    console.error("Upload test error:", error);

    res.status(500).json({
      success: false,
      message: "Upload test failed",
    });
  });
};

const getTestConfig = (req, res) => {
  res.json({
    success: true,
    config: {
      defaultDownloadSizeMB: 10,
      maxDownloadSizeMB: 100,
      uploadTestSizeMB: 10,
      pingAttempts: 5,
    },
  });
};

module.exports = {
  pingTest,
  downloadTest,
  uploadTest,
  getTestConfig
};
