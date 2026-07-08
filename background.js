importScripts("shared.js");

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "check-all-checkboxes") {
    return;
  }

  try {
    // The shortcut mirrors CHECK ALL. Detailed counts still live in the popup.
    const summary = await etarExtension.runOnActiveTab({ scrollScan: false });

    await chrome.action.setBadgeBackgroundColor({ color: "#2167d5" });
    await chrome.action.setBadgeText({ text: String(Math.min(summary.checked, 999)) });
  } catch (error) {
    await chrome.action.setBadgeBackgroundColor({ color: "#f04337" });
    await chrome.action.setBadgeText({ text: "!" });
    console.error(error);
  }
});
