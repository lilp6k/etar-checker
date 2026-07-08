# Security Notes

E-TAR CHECKER is a local browser extension for the Job Corps E-TAR page.

## What It Can Do

- Run only after the user clicks the extension, presses the shortcut, or opens the popup.
- Inject `content.js` into the active tab.
- Click enabled controls found under the **Acknowledge / Comment** column on the E-TAR page.

## What It Should Not Do

- Save or submit an E-TAR.
- Send data to a server.
- Store portal data.
- Read cookies, history, downloads, or passwords.
- Run on unrelated websites.

## Reporting A Problem

Open a GitHub issue if the extension clicks the wrong thing, stops working, or asks for more permissions than expected.

Do not post screenshots that show names, student IDs, comments, or other private portal information.
