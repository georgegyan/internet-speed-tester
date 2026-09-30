const { Readable } = require("stream");

const createDownloadStream =  (sizeInMB) => {
    const totalBytes = sizeInMB * 1024 * 1024;

    let byteSent = 0;

    return new Readable({
        read() {
            const chunkSize = 64 * 1024; // 64KB

            if (bytesSent >= totalBytes) {
                this.push(null)
                return;
            }
            const remainigBytes = toatalBytes - bytesSent;
            const currentChunkSize = Math.min(chunkSize, remainigBytes);
            
            bytesSent += currentChunkSize;

            this.push(Buffer.alloc(currentChunkSize, "A"));
        },
    });
};

module.exports = { createDownloadStream };