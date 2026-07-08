(function attachEtarPageChecker(global) {
  const ACKNOWLEDGE_HEADER = /Acknowledge\s*\/?\s*Comment/i;
  const CHECKBOX_CONTROL = ".v-simple-checkbox, [role='checkbox']";

  function makeSummary() {
    return {
      pageMatched: false,
      checked: 0,
      alreadyChecked: 0,
      skippedDisabled: 0,
      skippedUnchanged: 0,
      totalSeen: 0
    };
  }

  async function runEtarChecker(options) {
    const settings = Object.assign({ scrollScan: false }, options || {});
    const summary = makeSummary();

    if (!isEtarPage()) {
      return summary;
    }

    summary.pageMatched = true;

    const seenThisRun = new WeakSet();
    const checkVisibleRows = () => checkAcknowledgementControls(summary, seenThisRun);

    if (settings.scrollScan) {
      await scanPage(checkVisibleRows);
    } else {
      await checkVisibleRows();
    }

    return summary;
  }

  // The portal is a routed app, so page checks use both the URL and E-TAR table markers.
  function isEtarPage() {
    if (location.hostname !== "studentportal.jobcorps.org") {
      return false;
    }

    return (
      location.pathname.startsWith("/e-tar") ||
      document.title.includes("EtarTable") ||
      Boolean(document.querySelector(".etarTabs"))
    );
  }

  // Each control is processed once per run. Scan mode may pass the same row more than once.
  async function checkAcknowledgementControls(summary, seenThisRun) {
    for (const control of collectAcknowledgementControls()) {
      if (seenThisRun.has(control)) {
        continue;
      }

      seenThisRun.add(control);
      summary.totalSeen += 1;

      if (isDisabled(control)) {
        summary.skippedDisabled += 1;
        continue;
      }

      if (isChecked(control)) {
        summary.alreadyChecked += 1;
        continue;
      }

      await clickControl(control, summary);
    }
  }

  // The table has a desktop layout and a stacked mobile layout. Handle both shapes.
  function collectAcknowledgementControls() {
    const controls = [];
    const seen = new Set();

    const addFrom = (container) => {
      if (!container) {
        return;
      }

      container.querySelectorAll(CHECKBOX_CONTROL).forEach((control) => {
        if (!seen.has(control)) {
          seen.add(control);
          controls.push(control);
        }
      });
    };

    addDesktopTableControls(addFrom);
    addMobileRowControls(addFrom);

    return controls;
  }

  function addDesktopTableControls(addFrom) {
    document.querySelectorAll(".v-data-table table").forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th"));
      const acknowledgeIndex = headers.findIndex((header) => ACKNOWLEDGE_HEADER.test(header.textContent || ""));

      if (acknowledgeIndex < 0) {
        return;
      }

      table.querySelectorAll("tbody tr").forEach((row) => {
        const cells = Array.from(row.children).filter((child) => child.tagName === "TD");
        addFrom(cells[acknowledgeIndex]);
      });
    });
  }

  function addMobileRowControls(addFrom) {
    document.querySelectorAll(".v-data-table__mobile-row").forEach((row) => {
      const header = row.querySelector(".v-data-table__mobile-row__header");
      if (header && ACKNOWLEDGE_HEADER.test(header.textContent || "")) {
        addFrom(row.querySelector(".v-data-table__mobile-row__cell") || row);
      }
    });
  }

  // Vuetify can mark disabled controls on the control itself or a parent wrapper.
  function isDisabled(control) {
    return Boolean(
      control.disabled ||
      control.getAttribute("aria-disabled") === "true" ||
      control.classList.contains("v-simple-checkbox--disabled") ||
      control.classList.contains("v-input--is-disabled") ||
      control.closest("[aria-disabled='true'], fieldset[disabled], .v-simple-checkbox--disabled, .v-input--is-disabled")
    );
  }

  // Some rows expose aria state, some expose a hidden input, and some only expose an icon.
  function isChecked(control) {
    const ariaChecked = control.getAttribute("aria-checked") ||
      control.querySelector("[aria-checked]")?.getAttribute("aria-checked");

    if (ariaChecked) {
      return ariaChecked === "true" || ariaChecked === "mixed";
    }

    const input = control.matches("input[type='checkbox']")
      ? control
      : control.querySelector("input[type='checkbox']");

    if (input) {
      return input.checked || input.getAttribute("aria-checked") === "true";
    }

    const icon = control.querySelector(".v-icon, i, svg");
    const marker = [
      control.className,
      control.textContent,
      icon && icon.className,
      icon && icon.textContent
    ].filter(Boolean).join(" ");

    return /mdi-checkbox-marked|mdi-check-box|mdi-check-bold|\$checkboxOn|fa-check-square/i.test(marker);
  }

  // Click the visible Vuetify wrapper so the app receives the same event a person would send.
  function getClickTarget(control) {
    return (
      control.querySelector("[role='checkbox']") ||
      control.querySelector(".v-input--selection-controls__input") ||
      control.querySelector(".v-simple-checkbox") ||
      control
    );
  }

  async function clickControl(control, summary) {
    const target = getClickTarget(control);
    target.scrollIntoView({ block: "center", inline: "nearest" });
    target.click();

    // Vuetify updates the visual state on the next tick.
    await wait(20);

    if (isChecked(control)) {
      summary.checked += 1;
    } else {
      summary.skippedUnchanged += 1;
    }
  }

  // Long E-TAR tables may lazy-load while scrolling. Scan mode walks the page in view-sized steps.
  async function scanPage(checkVisibleRows) {
    const scrollingElement = document.scrollingElement || document.documentElement;
    const originalLeft = window.scrollX;
    const originalTop = window.scrollY;
    const step = Math.max(260, Math.floor(window.innerHeight * 0.82));
    const maxPasses = Math.min(80, Math.ceil(scrollingElement.scrollHeight / step) + 2);

    window.scrollTo(0, 0);
    await wait(80);

    for (let passIndex = 0; passIndex < maxPasses; passIndex += 1) {
      await checkVisibleRows();

      const nextTop = Math.min(scrollingElement.scrollHeight, window.scrollY + step);
      const reachedBottom = nextTop === window.scrollY &&
        window.scrollY + window.innerHeight >= scrollingElement.scrollHeight - 2;

      if (reachedBottom) {
        break;
      }

      window.scrollTo(0, nextTop);
      await wait(90);
    }

    await checkVisibleRows();
    window.scrollTo(originalLeft, originalTop);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  global.etarCheckerRun = runEtarChecker;
})(globalThis);
