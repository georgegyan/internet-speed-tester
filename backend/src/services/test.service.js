const getHighResolutionTime = () => {
  return process.hrtime.bigint();
};

const calculateDurationMs = (start, end) => {
  return Number(end - start) / 1_000_000;
};

const calculateAverage = (values) => {
  if (!values.length) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  return total / values.length;
};

const calculateJitter = (latencies) => {
  if (latencies.length < 2) {
    return 0;
  }

  const differences = [];

  for (let i = 1; i < latencies.length; i += 1) {
    differences.push(
      Math.abs(latencies[i] - latencies[i - 1])
    );
  }

  return calculateAverage(differences);
};

module.exports = {
  getHighResolutionTime,
  calculateDurationMs,
  calculateAverage,
  calculateJitter,
};