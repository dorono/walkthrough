
## Changelog

### 2019-03-21: 3.1.6
- Bump version for release to Production.

### 2019-03-18: 3.1.6-rc3
- [EX-163] - Explorer throws Try Again error page when the primary key of the app is deleted
- [EX-162] - Refactored error page handling and fixed issue with error page not always taking up entire content area
- Reversed changes from the developer who shall not be named

### 2019-03-13: 3.1.6-rc2
- Responsive chain list with new created column

### 2019-03-1: 3.1.6-rc1
- [EX-160] - Upgrade your plan is pointing to a wrong url

### 2019-02-21: 3.1.5
- Bump version for release to Production.

### 2019-02-11: 3.1.5-rc1
- [EX-134] - External ID not displaying properly
- [EX-154] - Enable viewing hex and base64 encoded data even when valid UTF-8
- [EX-157] - Move explorer to app_id/app_key credentials for authentication against connect

### 2019-01-15: 3.1.4
- Bump version for release to Production.

### 2019-01-15: 3.1.4-rc5
- [EX-144] - Explorer Unit Testing Enhancements
- [EX-149] - Add Test for Global Custom Libraries
- [EX-148] - Add Test for Utils
- [EX-137] - Fix chain list hover regression

### 2019-01-09: 3.1.4-rc4
- [EX-153] - Changed color of active item in pagination and updated webpack package with vulnerability

### 2018-12-19: 3.1.4-rc3
- [EX-153] - Fix misc UI bugs

### 2018-12-19: 3.1.4-rc2
- [EX-79] Miscellaneous UI Fixes + Added Tests to Components in PR
- [EX-147] Add tests for pages.
- [EX-146] Add missing test files for components.
- [EX-145] Add Snapshot Testing Capability to One Component as POC.
- [EX-143] Delete Welcome Popup + Show Error message when custom credentials are not allowed.
- [EX-142] Fix text alignment on table header for IE11
- [EX-128] Tracking improvements using Google Tag Manager
- [EX-137] Improve fade on chains list.
- [EX-131] Fix NPM Warnings
- [EX-135] Landing Page UX improvements.

### 2018-12-04: 3.1.4-rc1
- [EX-132] Mobile improvements.
- [EX-133] Request plan change error fix.
- [EX-79] Implemented Pending Chains and Entries Display.
- [EX-138] Add polyfill for abort controller.
- [EX-142] IE 11 Support.
- [EX-141] Wrong error message when credentials boxes are empty.
- [EX-140] Branding updates.

### 2018-11-16: 3.1.3
- Bump version for release to Production.

### 2018-11-16: 3.1.3-rc2
- Add a waitingConfig state prop to the api context.
- Limit time to wait for remote configuration to 10 seconds.

### 2018-11-12: 3.1.3-rc1
- [EX-129] Accesing the Explorer from DevPortal with Shared Sandbox api Key, shows Public Factom data.
- [EX-125] Compress files on build
- Handle users entering in the Connect API URL.
- Fixed font size on
- Track error pages on google analytics.
- Fixed expand collapse functionality on entries content
- Update API Version on footer after setting credentials.
- Added out of requests error message.
- Show app name instead of app Id when receiving a remote config.

### 2018-10-17: 3.1.2-rc1
- Add missing parameter for request function on Search component.

### 2018-10-15: 3.1.1
- Bump version for release to Production.

### 2018-10-15: 3.1.1-rc1
- Improve string type validation.

### 2018-10-15: 3.1.0
- Bump version for release to Production.

### 2018-10-13: 3.1.0-rc5
- Fixed some css files.
- Changed isValid method and moved from api-config to api-context.

### 2018-10-13: 3.1.0-rc4
- Modify CircleCI config to pass new env vars to Docker build process.

### 2018-10-12: 3.1.0-rc3
- Change how we do environment variable substitution during container startup.

### 2018-10-12: 3.1.0-rc2
- Replace API URL and API TOKEN in the generated js file
- [EX-111] Use explorer with your app id, app key, and connect url

### 2018-10-12: 3.1.0-rc1
- [EX-123] Added Anchor handling
- [EX-109] JSON fix
- [EX-111] Added Popup for setup configuration to the API
- [EX-119] Added test files, improve some components

### 3.0.0
- Change HASH by KEYMR on factoid block page.

### 3.0.0-rc4
- Fix bug in Collapse/Expand button for Entry Content
- Removes @nest (css next feat.)

### 3.0.0-rc3
- Minor changes to fix component testing support.
- [EX-107] Fixed security vulnerabilities
- Delete post-cssnext and include postcss-preset-env and others.
- Install babel-preset-env to replace babel-es-2015.
- [EX-108] Keep entry viewer collapsed/expanded state when switching tabs
- Reduce duplication by generalizing in a Block Link component.
- [EX-66] Add "Parent Block" to Entries and Tx's
- Change HEX Strings to lowercase

### 3.0.0-rc2
- Copy package-lock.json in Dockerfile
- [EX-52] Handle different data encodings for entries content and external ids

### 3.0.0-rc1
- [EX-82] Timezone label shoud have UTC instead of GMT offset test
- [EX-105] Sorting transactions by date not working
- [EX-94] Search UX refinements
- [EX-76] Address page is not loading
