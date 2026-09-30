const { v4: uuidv4 } = require("uuid");

const createTestSession = () => {
  return {
    testId: uuidv4(),
    startedAt: new Date().toISOString(),
    server: {
      name: "Internet Speed Tester",
      location: "Local Server",
    },
    config: {
      pingAttempts: 5,
      downloadSizeMB: 10,
      uploadSizeMB: 10,
    },
  };
};

module.exports = {
  createTestSession,
};