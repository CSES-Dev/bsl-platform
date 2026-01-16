import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    webServer: {
        command: "npm run dev",
        port: 3000,
        reuseExistingServer: !process.env.CI,
    },
    fullyParallel: true,
    outputDir: "playwright-report",
    timeout: 4 * 60 * 1000, // 4 minutes
    workers: 10,
    reporter: "list",
    use: {
        actionTimeout: 0,
    },

    // For expect calls
    expect: {
        timeout: 0,
    },
};

export default config;
