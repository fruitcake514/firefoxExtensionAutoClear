# Firefox Auto Clear Privacy Data

A Firefox extension that automatically clears your browsing data (cache, cookies, passwords, history, and form data) after a user-defined period of inactivity.

## Features

- **Customizable Inactivity Timer:** Set how long the browser should wait (1-120 minutes) before clearing data
- **Toggle On/Off:** Easily enable or disable the auto-clearing functionality
- **Comprehensive Privacy Protection:** Clears browsing history, cookies, cache, saved passwords, and form data
- **Notification System:** Displays a notification when your data has been cleared
- **Simple Interface:** User-friendly popup menu for adjusting settings

## Installation

### From Firefox Add-ons (Recommended)
*Coming soon*

### Manual Installation (Development)

1. Clone this repository or download the source code
```
git clone https://github.com/fruitcake514/firefoxExtensionAutoClear.git
```

2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" on the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select the `manifest.json` file

Note: This method is only for testing. The extension will be removed when Firefox is closed.

## Usage

1. Click the extension icon in the toolbar to open the settings popup
2. Use the toggle switch to enable/disable the auto-clearing functionality
3. Adjust the slider to set your preferred inactivity timeout (in minutes)
4. Click "Save Settings" to apply your changes

The extension will now monitor your browser activity and clear your privacy data after the specified period of inactivity.

## How It Works

The extension uses Firefox's idle detection API to monitor user activity. When the browser detects that you've been inactive for the specified period, it automatically clears the selected browsing data using the browsingData API. A notification will appear when your data has been cleared.

## Permissions

This extension requires the following permissions:

- `tabs`: To detect when tabs are active
- `idle`: To monitor browser activity state
- `browsingData`: To clear browsing data
- `storage`: To save your settings
- `notifications`: To display notifications when data is cleared

## Privacy Statement

This extension operates entirely on your local machine. No data is sent to remote servers, and all clearing operations happen directly within your browser. Your privacy settings and preferences are stored locally using Firefox's storage API.

## Development

### Project Structure
```
firefox-auto-clear/
├── manifest.json       # Extension manifest
├── background.js       # Background script for monitoring and clearing
├── popup.html          # Popup UI
├── popup.js            # Popup logic
└── icon.jpg          # Extension icon
```

### Building from Source

1. Make any desired code changes
2. Test using the temporary installation method described above
3. For distribution, package the extension using web-ext:
```
npm install -g web-ext
web-ext build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Firefox Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/)
- [Mozilla Extension Workshop](https://extensionworkshop.com/)
