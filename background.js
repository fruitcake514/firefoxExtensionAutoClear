// background.js
let inactivityTimer = null;
let timeoutInMinutes = 15; // Default timeout
let isEnabled = true;

// Initialize extension
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get(['timeout', 'enabled'], (result) => {
    if (result.timeout) timeoutInMinutes = result.timeout;
    if (result.enabled !== undefined) isEnabled = result.enabled;
    setupIdleListener();
  });
});

// Setup the idle listener
function setupIdleListener() {
  if (isEnabled) {
    // Convert minutes to seconds for the idle API
    browser.idle.setDetectionInterval(60);
    browser.idle.onStateChanged.addListener(handleStateChange);
  } else {
    browser.idle.onStateChanged.removeListener(handleStateChange);
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }
}

// Handle state changes (active, idle, locked)
function handleStateChange(state) {
  if (state === 'idle' || state === 'locked') {
    // User is inactive, start the timer
    if (!inactivityTimer) {
      inactivityTimer = setTimeout(() => {
        clearBrowsingData();
      }, timeoutInMinutes * 60 * 1000);
    }
  } else if (state === 'active') {
    // User is active again, clear the timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }
}

// Clear all browsing data
function clearBrowsingData() {
  browser.browsingData.remove({
    since: 0 // Clear everything
  }, {
    cache: true,
    cookies: true,
    passwords: true,
    history: true,
    formData: true
  }).then(() => {
    // Show notification
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Privacy Data Cleared',
      message: `All privacy data has been cleared after ${timeoutInMinutes} minutes of inactivity.`
    });
  });
}

// Listen for messages from popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    sendResponse({ timeout: timeoutInMinutes, enabled: isEnabled });
  } else if (message.action === 'updateSettings') {
    timeoutInMinutes = message.timeout;
    isEnabled = message.enabled;
    browser.storage.local.set({ timeout: timeoutInMinutes, enabled: isEnabled });
    setupIdleListener();
    sendResponse({ success: true });
  }
  return true;
});
