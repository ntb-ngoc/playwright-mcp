#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../"

# Playwright-CLI registration scenario for http://automationexercise.com
# Source scenario: test_scenarios/user_register

npx playwright-cli open http://automationexercise.com
npx playwright-cli snapshot
npx playwright-cli click e23
npx playwright-cli snapshot

npx playwright-cli fill e53 TestUser
npx playwright-cli fill e54 testuser+cli@example.com
npx playwright-cli click e55
npx playwright-cli snapshot

npx playwright-cli fill e65 Password123!

npx playwright-cli select e71 1
npx playwright-cli select e74 January
npx playwright-cli select e77 1990

npx playwright-cli check e79
npx playwright-cli check e81

npx playwright-cli fill e86 Test
npx playwright-cli fill e90 User
npx playwright-cli fill e93 TestCompany
npx playwright-cli fill e97 123TestStreet
npx playwright-cli fill e100 Suite100
npx playwright-cli select e104 United
npx playwright-cli fill e108 TestState
npx playwright-cli fill e112 TestCity
npx playwright-cli fill e116 12345
npx playwright-cli fill e120 +11234567890

npx playwright-cli click e121
npx playwright-cli snapshot

npx playwright-cli click e45
npx playwright-cli snapshot

npx playwright-cli close
