(function attachEtarExtensionApi(global) {
  function makeEmptySummary() {
    return {
      pageMatched: false,
      checked: 0,
      alreadyChecked: 0,
      skippedDisabled: 0,
      skippedUnchanged: 0,
      totalSeen: 0
    };
  }

  // executeScript returns an array even when it only ran in the main frame.
  function readScriptResult(results) {
    return results?.[0]?.result || makeEmptySummary();
  }

  // Popup buttons and the keyboard shortcut both enter through this function.
  async function runOnActiveTab(options) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs && tabs[0];

    if (!tab || typeof tab.id !== "number") {
      throw new Error("No active tab found.");
    }

    const target = { tabId: tab.id };

    // Keep the content script explicit so a reload always uses the latest code.
    await chrome.scripting.executeScript({
      target,
      files: ["content.js"]
    });

    const results = await chrome.scripting.executeScript({
      target,
      func: (runOptions) => globalThis.etarCheckerRun(runOptions),
      args: [options || {}]
    });

    return readScriptResult(results);
  }

  global.etarExtension = {
    runOnActiveTab
  };
})(globalThis);
