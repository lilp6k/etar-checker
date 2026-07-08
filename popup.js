const statusEl = document.getElementById("status");
const checkAllButton = document.getElementById("checkAll");
const scanPageButton = document.getElementById("scanPage");
const checkedCountEl = document.getElementById("checkedCount");
const alreadyCountEl = document.getElementById("alreadyCount");
const skippedCountEl = document.getElementById("skippedCount");

// The popup has only two running states: ready or busy.
function setBusy(isBusy) {
  checkAllButton.disabled = isBusy;
  scanPageButton.disabled = isBusy;
}

function updateCounters(summary) {
  setCounter(checkedCountEl, summary.checked);
  setCounter(alreadyCountEl, summary.alreadyChecked);
  setCounter(skippedCountEl, summary.skippedDisabled + summary.skippedUnchanged);
}

// The data attribute feeds the black angled layer drawn in CSS.
function setCounter(element, value) {
  const text = String(value);
  element.textContent = text;
  element.dataset.value = text;
  element.dataset.digits = String(Math.min(text.length, 4));
}

// Keep messages short enough to fit inside the status card.
function writeResult(summary) {
  if (!summary.pageMatched) {
    statusEl.textContent = "Open the E-TAR page, then try again.";
    return;
  }

  if (summary.totalSeen === 0) {
    statusEl.textContent = "No acknowledgement boxes were found.";
    return;
  }

  const skipped = summary.skippedDisabled + summary.skippedUnchanged;
  const parts = [`Checked ${summary.checked}`];

  if (summary.alreadyChecked) {
    parts.push(`${summary.alreadyChecked} already on`);
  }

  if (skipped) {
    parts.push(`${skipped} skipped`);
  }

  statusEl.textContent = `${parts.join(", ")}.`;
}

// Both buttons use the same checker. Scan mode just scrolls between passes.
async function runChecker(scrollScan) {
  setBusy(true);
  statusEl.textContent = scrollScan ? "Scanning the E-TAR page..." : "Checking E-TAR boxes...";

  try {
    const summary = await etarExtension.runOnActiveTab({ scrollScan });
    updateCounters(summary);
    writeResult(summary);
  } catch (error) {
    statusEl.textContent = "Refresh the E-TAR page, then try again.";
    console.error(error);
  } finally {
    setBusy(false);
  }
}

checkAllButton.addEventListener("click", () => runChecker(false));
scanPageButton.addEventListener("click", () => runChecker(true));
