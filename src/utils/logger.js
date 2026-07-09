const timestamp = () => {
    return new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
    });
};

const logger = {
    info: (message) => {
        console.log(`ℹ️  [${timestamp()}] ${message}`);
    },

    success: (message) => {
        console.log(`✅ [${timestamp()}] ${message}`);
    },

    warn: (message) => {
        console.warn(`⚠️  [${timestamp()}] ${message}`);
    },

    error: (message) => {
        console.error(`❌ [${timestamp()}] ${message}`);
    },
};

export default logger;