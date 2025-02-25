document.addEventListener('DOMContentLoaded', function() {
  const timeoutSlider = document.getElementById('timeout');
  const timeoutValue = document.getElementById('timeout-value');
  const enabledToggle = document.getElementById('enabled');
  const saveButton = document.getElementById('save');
  
  // Load current settings
  browser.runtime.sendMessage({ action: 'getSettings' }).then((response) => {
    if (response) {
      timeoutSlider.value = response.timeout;
      timeoutValue.textContent = `${response.timeout} minutes`;
      enabledToggle.checked = response.enabled;
    }
  });
  
  // Update displayed value when slider changes
  timeoutSlider.addEventListener('input', function() {
    timeoutValue.textContent = `${this.value} minutes`;
  });
  
  // Save settings when button is clicked
  saveButton.addEventListener('click', function() {
    browser.runtime.sendMessage({
      action: 'updateSettings',
      timeout: parseInt(timeoutSlider.value),
      enabled: enabledToggle.checked
    }).then((response) => {
      if (response && response.success) {
        // Provide visual feedback
        saveButton.textContent = 'Saved!';
        setTimeout(() => {
          saveButton.textContent = 'Save Settings';
        }, 2000);
      }
    });
  });
});
