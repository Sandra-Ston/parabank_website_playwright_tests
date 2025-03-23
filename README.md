# ParaBank Website Playwright Tests

This repository contains Playwright end-to-end tests for the [ParaBank website](https://parabank.parasoft.com/parabank/index.htm), a demo banking application used for testing purposes.

## Description

This project leverages [Playwright](https://playwright.dev/), a powerful end-to-end testing framework, to automate functional testing for the ParaBank demo site. The test suite covers key banking operations, including:

    ✔️ User authentication (login/logout)
    ✔️ Account creation
    ✔️ Funds transfers & bill payments
    ✔️ Other essential banking features

The goal is to ensure that the ParaBank website remains reliable, stable, and bug-free.

## Getting Started

### Prerequisites

Before running the tests, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (version 14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager) or [Yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/Sandra-Ston/parabank_website_playwright_tests.git
    cd parabank_website_playwright_tests
    ```
2.  Install the dependencies:

    ```
    npm install
    # or
    yarn install
    ```

### Configuration

No additional configuration is required. The default settings in `playwright.config.ts` specify the browser, timeout, and reporting options. If needed, you can modify it to customize test execution.

### Running the Tests

#### Run all tests

- To execute all test cases in the project, use:

    ```
    npm run test
    # or
    yarn test
    ```

#### Run a specific test file

- To run a specific test file (e.g., login.spec.ts):

    ```
    npx playwright test tests/login.spec.ts
    ```

#### Run tests in headed mode (with a UI)

- To execute tests with a visible browser window for debugging:

    ```
    npx playwright test --headed
    ```

#### Generate tests using Playwright’s codegen tool

- To automatically generate Playwright test scripts by recording browser interactions:

    ```
    npx playwright codegen https://parabank.parasoft.com
    ```

#### View Test Reports

- After test execution, generate and open an interactive HTML report:

    ```
    npx playwright show-report
    ```

## Project Structure

*   `.github/workflows`: Contains GitHub Actions workflows for continuous integration.
*   `tests`: Contains the test files (`.spec.ts` files).
*   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
*   `package-lock.json`: Records the exact versions of the dependencies.
*   `package.json`: Contains project metadata and dependencies.
*   `parabank_website_functions.txt`: Contains list of website functions.
*   `parabank_website_test_cases.txt`: Contains list of test cases.
*   `playwright.config.ts`: Playwright configuration file.

## Test Cases

The test cases for the ParaBank website are defined in `parabank_website_test_cases.txt`. The test implementations are located in the `tests/` directory.

## License

This project is licensed under the ISC License. See the [LICENSE](License) file for details.

## Author

Developed and maintained by [Sandra-Ston](https://github.com/Sandra-Ston)
