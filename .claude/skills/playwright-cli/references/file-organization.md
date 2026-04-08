# File Organization

After generating any files, ALWAYS organize generated files strictly follow this structure:

generated/
├── snapshots/          # YAML page snapshots 
├── tests/              # Generated TypeScript test files 
├── screenshots/        # Image files captured during sessions or tests
├── reports/            # Test reports
└── logs/               # Console logs
<!-- 
src/
├── pages/                   # Page Object Model classes
│   ├── base.page.ts         # Base class with shared methods
│   ├── login.page.ts
│   └── components/          # Reusable UI components (Navbar, Sidebar)
├── tests/                   # Test files (specs)
│   ├── auth/                # Categorized by feature or module
│   │   └── login.spec.ts
│   ├── features/
│   │   └── create.spec.ts
│   └── fixtures/            # Custom fixtures to extend Playwright
│       └── base-test.ts     # Merges POMs into a single test object
└── playwright.config.ts     # Main Playwright configuration

tests/
  fixtures.ts              # Custom test with POM fixtures
  auth.spec.ts             # Test files at top level or in feature folders
  dashboard.spec.ts
  pages/                   # One file per page
    login.page.ts
    dashboard.page.ts
    settings.page.ts
    users.page.ts
  components/              # Reusable UI components
    navbar.component.ts
    modal.component.ts
    sidebar.component.ts
    data-table.component.ts
``` -->

