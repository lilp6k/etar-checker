# E-TAR CHECKER

<p align="center">
  <img src="assets/checkbox.png" alt="E-TAR CHECKER mascot" width="220">
</p>

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

The extension only runs when you click it or use its keyboard shortcut. It is built for the E-TAR page and does not save, store, or send your portal information anywhere.
