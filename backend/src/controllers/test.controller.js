const pingTest = async (req, res) => {
  const start = process.hrtime.bigint();

  await Promise.resolve();

  const end = process.hrtime.bigint();

  const latency = Number(end - start) / 1_000_000;

  res.json({
    success: true,
    message: "Ping test completed",
    latency: Number(latency.toFixed(2)),
    unit: "ms",
  });
};

const downloadTest = (req, res) => {
  const sizeInMB = Number(req.query.size) || 10;

  const buffer = Buffer.alloc(sizeInMB * 1024 * 1024, "A");

  res.set({
    "Content-Type": "application/octet-stream",
    "Content-Length": buffer.length,
    "Cache-Control": "no-store",
  });

  res.send(buffer);
};

module.exports = {
  pingTest,
  downloadTest,
};

const uploadTest = (req, res) => {
    let bytesReceived = 0;

    const start = process.hrtime.bigint();

    req.on("data", (chunk) => {
        bytesReceived += chunk.length;
    });

    req.on("end", () => {
        const end = process.hrtime.bigint();
        const duration = Number(end - start) / 1_000_000; // Convert to milliseconds
        const durationSeconds = duration / 1000;
        const megabytes = bytesReceived / (1024 * 1024);
        const megabits = megabytes * 8;
        const speedMbps = durationSeconds > 0 ? megabits / durationSeconds : 0;

        res.json({
            success: true,
            message: "Upload test completed",
            bytesReceived,
            megabytes: Number(megabytes.toFixed(2)),
            durationMs: Number(duration.toFixed(2)),
            speedMbps: Number(speedMbps.toFixed(2)),
        });
    });
};