# Playwright MCP - Automation Testing Framework

A comprehensive browser automation and testing framework powered by **Playwright CLI** and the Model Context Protocol (MCP). This project enables you to build, run, and manage automation tests for web applications with an organized, scalable structure.

## 📋 Overview

This framework provides:
- **Interactive Browser Automation**: Use Playwright CLI to interact with web pages, take snapshots, and generate test code
- **Organized File Structure**: Automatically organize generated snapshots, tests, screenshots, and reports
- **Test Scenario Management**: Structure test cases by feature or functionality
- **Page Snapshots**: Capture page state with accessibility-aware snapshots in YAML format
- **Configuration Management**: Browser settings, network policies, and timeouts defined in `playwright-cli.json`

## 🚀 Quick Start

### Prerequisites
- **Playwright CLI** installed globally (or `npx playwright-cli` for local usage)
- **Bash/Zsh** terminal
- Modern browser (Chrome, Firefox, WebKit, or Edge)

### Installation

If Playwright CLI is not installed globally:

```bash
npm install -g @playwright/cli@latest
```

Or use locally:

```bash
npx playwright-cli --version
```

### Basic Usage

```bash
# Open a browser and navigate to a website
playwright-cli open https://automationexercise.com/

# Take a snapshot (accessibility snapshot in YAML format)
playwright-cli snapshot --filename=generated/snapshots/page-name.yml

# Interact with elements using refs from the snapshot
playwright-cli click e14
playwright-cli fill e1 "user@example.com"
playwright-cli press Enter

# Close the browser
playwright-cli close
```

## 📁 Project Structure

```
playwright-mcp/
├── generated/                 # Auto-organized output files
│   ├── snapshots/            # YAML page snapshots (accessibility-aware)
│   ├── tests/                # Generated TypeScript test files
│   ├── screenshots/          # Screenshots from test runs
│   ├── reports/              # Test execution reports
│   └── logs/                 # Console logs and debug information
├── test_scenarios/           # Test case definitions by feature
│   └── user_register/        # Example: User registration tests
├── .claude/                  # Claude/AI Assistant configuration
│   └── skills/
│       └── playwright-cli/   # Playwright CLI skill documentation
├── playwright-cli.json       # Playwright configuration (browser, timeouts, etc.)
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## ⚙️ Configuration

The `playwright-cli.json` file controls Playwright behavior:

```json
{
  "browser": {
    "browserName": "chromium",
    "launchOptions": { "headless": true, "channel": "chrome" }
  },
  "network": {
    "allowedOrigins": ["https://your-app.com"],
    "blockedOrigins": []
  },
  "timeouts": {
    "action": 5000,
    "navigation": 60000
  },
  "outputDir": "./test-output",
  "testIdAttribute": "data-testid"
}
```

**Customization:**
- **browserName**: `chromium`, `firefox`, `webkit`, or `msedge`
- **headless**: Run without UI (`true`) or with UI (`false`)
- **timeouts**: Action timeout (ms) and navigation timeout (ms)
- **allowedOrigins**: Whitelist domains for network requests
- **testIdAttribute**: Attribute used for element identification

## 🎯 Common Tasks

### 1. **Open a Website and Explore**

```bash
playwright-cli open https://demo.playwright.dev/todomvc
playwright-cli snapshot
```

The snapshot will be automatically saved to `.playwright-cli/` with a timestamp. Then organize it:

```bash
mv .playwright-cli/page-*.yml generated/snapshots/todomvc-home.yml
```

### 2. **Generate Test Code from User Actions**

Playwright CLI automatically generates test code for each action:

```bash
# Take snapshot to see available elements
playwright-cli snapshot

# Interact with elements - code is automatically generated
playwright-cli fill e1 "user@example.com"
playwright-cli fill e2 "password123"
playwright-cli click e3

# Copy the generated code into your test file
```

### 3. **Take Screenshots**

```bash
# Full page screenshot
playwright-cli screenshot --filename=generated/screenshots/page.png

# Screenshot of a specific element
playwright-cli screenshot e5 --filename=generated/screenshots/element.png
```

### 4. **Debug with Console & Network**

```bash
# View console messages and errors
playwright-cli console

# Monitor network requests
playwright-cli network
```

### 5. **Record Video (Advanced)**

```bash
playwright-cli video-start recording.webm
# perform actions
playwright-cli click e5
playwright-cli video-stop
```

## 📊 Working with Snapshots

Snapshots are YAML files containing a hierarchical accessibility tree of the page:

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "Home" [ref=e14] [cursor=pointer]:
      - /url: /
      - text: Home
    - link "Products" [ref=e17] [cursor=pointer]:
      - /url: /products
      - text: Products
```

**Element Refs**: Use `e1`, `e2`, etc., to target elements in CLI commands:

```bash
playwright-cli click e14          # Click the Home link
playwright-cli fill e1 "text"     # Fill element e1
playwright-cli hover e5           # Hover over element e5
```

## 🔄 Workflow Example: Testing a Registration Form

```bash
# 1. Open the application
playwright-cli open https://automationexercise.com/login

# 2. Take a snapshot to see all form fields
playwright-cli snapshot --filename=generated/snapshots/registration-form.yml

# 3. Interact with the form (generates test code automatically)
playwright-cli fill e1 "John Doe"
playwright-cli fill e2 "john@example.com"
playwright-cli fill e3 "password123"
playwright-cli click e4  # Submit button

# 4. Take a snapshot after submission to verify success
playwright-cli snapshot --filename=generated/snapshots/registration-success.yml

# 5. Review generated code in terminal output and copy to test file
playwright-cli close
```

## 🛠️ Browser Sessions

Manage multiple browser sessions simultaneously:

```bash
# Create a persistent session named "session1"
playwright-cli -s=session1 open https://example.com --persistent

# Create another session
playwright-cli -s=session2 open https://example.com --persistent

# List all active sessions
playwright-cli list

# Work with specific sessions
playwright-cli -s=session1 click e5
playwright-cli -s=session2 fill e1 "text"

# Close a specific session
playwright-cli -s=session1 close

# Close all sessions
playwright-cli close-all
```

## 🔐 Storage Management

### Cookies
```bash
playwright-cli cookie-list
playwright-cli cookie-set session_id abc123 --secure --httpOnly
playwright-cli cookie-get session_id
playwright-cli cookie-delete session_id
```

### LocalStorage
```bash
playwright-cli localstorage-list
playwright-cli localstorage-set theme dark
playwright-cli localstorage-get theme
```

### Session State
```bash
# Save authentication state
playwright-cli state-save auth.json

# Load authentication state in a new session
playwright-cli open https://app.com --persistent
playwright-cli state-load auth.json
```

## 📈 File Organization Best Practices

Always use the `--filename` flag to organize generated files properly:

```bash
# ✅ Good - Organized
playwright-cli snapshot --filename=generated/snapshots/feature-name.yml
playwright-cli screenshot --filename=generated/screenshots/feature-name.png

# ❌ Avoid - Disorganized
playwright-cli snapshot
```

Cleanup temporary files:
```bash
rm -rf .playwright-cli/
```

## 🐛 Troubleshooting

### Playwright CLI not found
```bash
# Install globally
npm install -g @playwright/cli@latest

# Or use npx
npx playwright-cli open https://example.com
```

### Browser won't launch
- Check `browserName` in `playwright-cli.json`
- Ensure the browser is installed: `npx playwright install chromium`
- Try disabling headless mode: `"headless": false`

### Elements not found in snapshot
- Take a fresh snapshot after navigation: `playwright-cli snapshot`
- Verify the element ref (e1, e2, etc.) exists in the snapshot
- Use CSS selectors as fallback: `playwright-cli click "#button-id"`

### Network requests blocked
- Check `allowedOrigins` in configuration
- Clear blocked origins if needed: `"blockedOrigins": []`

## 📚 Advanced Features

### Request Mocking
```bash
playwright-cli route "**/*.jpg" --status=404
playwright-cli route "https://api.example.com/**" --body='{"mock": true}'
```

### Tracing (for debugging)
```bash
playwright-cli tracing-start
playwright-cli click e5
playwright-cli fill e1 "test"
playwright-cli tracing-stop
```

### Running Code
```bash
playwright-cli run-code "async (page) => { return page.title(); }"
```

## 📖 Additional Resources

- **Skill Documentation**: See `.claude/skills/playwright-cli/SKILL.md` for comprehensive CLI reference
- **Playwright Official Docs**: https://playwright.dev
- **TodoMVC Demo**: https://demo.playwright.dev/todomvc (great for testing)

## 🤝 Contributing

To extend this framework:

1. Add new test scenarios to `test_scenarios/`
2. Generate snapshots with descriptive names in `generated/snapshots/`
3. Document test cases and findings
4. Keep configuration in `playwright-cli.json` for consistency

## 📝 License

This project is part of the Playwright automation testing ecosystem.

---

**Quick Links:**
- [Playwright Documentation](https://playwright.dev)
- [Playwright CLI Repository](https://github.com/microsoft/playwright/tree/main/packages/playwright)
- [Automation Exercise](https://automationexercise.com/) - Practice website for testing
