# Test Manager CLI

A command-line interface (CLI) tool designed to analyze and manage Playwright test suites, providing insights and statistics about your test files.

## About The Project

As test suites grow, managing them becomes a challenge. This tool aims to automate the tedious tasks of analyzing test files, counting test cases, identifying their status, and generating useful reports. It's built with Node.js and TypeScript, following functional programming principles.

This project is also a learning playground for building practical developer tools and mastering Playwright test automation.

## Key Features

-   [x] **File Scanner:** Recursively scans a directory to find all Playwright test files (`*.spec.ts`).
-   [x] **Basic Parser:** Analyzes file content to count `describe` blocks and `test` cases.
-   [ ] **CLI Interface:** Implements a professional command-line interface using `commander.js` to run the tool with commands and arguments (e.g., `test-manager scan <directory>`).
-   [ ] **Advanced Parser:** Detects tests marked as `.skip` or `.only` and identifies tags (e.g., `@smoke`).
-   [ ] **Reporting:** Generates clean console reports and structured JSON output summarizing the test suite.
-   [ ] **Project Configuration:** Allows defining project-specific settings (e.g., path aliases for different test suites) in a configuration file like `test-manager.config.json`.

## Tech Stack

-   [Node.js](https://nodejs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Commander.js](https://github.com/tj/commander.js/) - For building the CLI interface.
-   [Glob](https://github.com/isaacs/node-glob) - For pattern-based file searching.

## License

Distributed under the MIT License. See `LICENSE` for more information.
