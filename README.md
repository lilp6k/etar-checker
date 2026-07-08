# E-TAR CHECKER

E-TAR CHECKER is a small Edge and Chrome extension for the Job Corps student portal.

It checks enabled acknowledgement boxes on the E-TAR page. It does not save, submit, navigate, or click **Save Changes**. You still review the page and save it yourself.

## Browser Support

Use one of these:

- Microsoft Edge on a desktop or laptop.
- Google Chrome on a desktop or laptop.
- Another Chromium desktop browser that supports unpacked Manifest V3 extensions.

Do not expect it to work everywhere.

- It is not built for mobile Chrome or mobile Edge.
- It is not packaged for Firefox.
- It is not packaged for Safari.
- It is not a normal website or phone app.

If you are helping someone install it, use Edge or Chrome on Windows first. That is the supported path.

## Install

Use these steps if you are installing from GitHub for the first time.

1. Click the green **Code** button on this GitHub page.
2. Click **Download ZIP**.
3. Open your Downloads folder.
4. Right-click the ZIP file and choose **Extract All**.
5. Open Microsoft Edge or Google Chrome.
6. Go to `edge://extensions` or `chrome://extensions`.
7. Turn on **Developer mode**.
8. Click **Load unpacked**.
9. Select the extracted folder that contains `manifest.json`.
10. Pin **E-TAR CHECKER** to your browser toolbar if you want quick access.

If you do not see `manifest.json`, you picked the wrong folder. Open the extracted folder and choose the inner extension folder instead.

## Use

1. Open the Job Corps student portal.
2. Go to the E-TAR page.
3. Click the **E-TAR CHECKER** extension icon.
4. Click **CHECK ALL**.
5. Look over the E-TAR page.
6. Save the page yourself if everything looks right.

Use **SCAN PAGE** when the E-TAR table is long or rows load while you scroll. Scan mode walks down the page, checks acknowledgement boxes as they appear, and returns you near where you started.

Keyboard shortcut: `Alt+Shift+C`.

## What The Numbers Mean

- **Checked**: boxes the extension turned on.
- **Already**: boxes that were already checked before it ran.
- **Skipped**: disabled boxes or boxes the page refused to change.

## What It Will Not Do

- It will not click **Save Changes**.
- It will not submit your E-TAR.
- It will not fill comments.
- It will not work on random websites.
- It will not send your portal data anywhere.

## Troubleshooting

**The extension says "Open the E-TAR page, then try again."**  
You are on the wrong tab, the wrong page, or the portal changed its E-TAR route. Open the actual E-TAR page and try again.

**The extension says "No acknowledgement boxes were found."**  
The E-TAR table may not be loaded yet. Wait a few seconds, scroll the table once, then click **SCAN PAGE**.

**Nothing changed.**  
Refresh the E-TAR page, then run it again. If the portal logged you out, log back in first.

**The extension disappeared after downloading a new version.**  
Go back to `edge://extensions` or `chrome://extensions`, find **E-TAR CHECKER**, and click the reload button on its card.

**Edge or Chrome says Developer mode is required.**  
That is normal for an unpacked extension. Turn on Developer mode on the extensions page.

## Privacy And Safety

This extension is intentionally narrow.

- It only runs when you click the popup button or use the keyboard shortcut.
- It exits unless the active tab is `studentportal.jobcorps.org` and the page looks like E-TAR.
- It only clicks boxes found under the **Acknowledge / Comment** column.
- If it cannot find that column, it stops instead of guessing.
- It asks for `activeTab` and `scripting`, not permanent access to every website.
- It does not use cookies, browser storage, downloads, history, web requests, or remote servers.
- It does not call `fetch`, `XMLHttpRequest`, `eval`, or `innerHTML`.
- The popup counters stay inside the popup and are not saved.

Chrome's `activeTab` permission gives an extension temporary access only after a user gesture, such as clicking the extension action or using a keyboard shortcut. The `scripting` permission is what lets the extension run its checker on that active tab.

## Remaining Risk

No browser extension is risk-free.

- The portal can change its table markup. If that happens, the extension may stop finding the right boxes.
- The extension clicks acknowledgement controls. Always review the page before saving.
- The bundled Toony font is part of the design and remains in the repo. It keeps its own font metadata. Confirm you are allowed to share that font publicly before publishing this repository.

## For Maintainers

- `manifest.json` declares the extension name, popup, icons, shortcut, and permissions.
- `content.js` finds the E-TAR acknowledgement column and clicks enabled controls.
- `shared.js` injects the checker into the active tab.
- `popup.js` runs the checker and updates the status and counters.
- `popup.css` controls the red, blue, black-outline cartoon style.
- `background.js` supports the `Alt+Shift+C` shortcut.

Before sharing a new version, run:

```powershell
Get-Content .\manifest.json | ConvertFrom-Json | Out-Null
node --check .\content.js
node --check .\shared.js
node --check .\popup.js
node --check .\background.js
```
