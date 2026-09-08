const pingTest = async (req, res) => {
  const start = process.hrtime.bigint();

  // Small async operation to measure server response timing
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

module.exports = {
  pingTest,
};