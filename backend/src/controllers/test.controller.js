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