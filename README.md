# Pinterest Link Opener

A Chrome extension that opens all pins from a Pinterest board in new tabs with a single click.

## Features

- Automatically detects pins on Pinterest board pages
- Shows the count of pins found on the current page
- Opens all pins in new tabs with a single click
- Filters out product recommendations and shopping links
- Adds a small delay between opening tabs to prevent browser throttling

## Installation

### Option 1: Load Unpacked Extension (For Development/Testing)

1. Clone or download this repository to your local machine

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" by toggling the switch in the top-right corner

4. Click "Load unpacked" button

5. Select the `plinkterest` directory (the folder containing `manifest.json`)

6. The extension should now appear in your Chrome toolbar

### Option 2: Create a .crx Package (For Distribution)

1. Follow steps 1-4 from Option 1
2. Click "Pack extension" button
3. Select the `plinkterest` directory
4. Chrome will create a `.crx` file that can be shared

## Usage

1. Navigate to any Pinterest board page (e.g., `https://www.pinterest.com/username/board-name/`)

2. Click the Pinterest Link Opener extension icon in your Chrome toolbar

3. The popup will show how many pins were found on the current page

4. Click the "Open All Pins" button

5. All pins will open in new tabs with a small delay between each one

## How It Works

The extension consists of three main components:

- **manifest.json**: Defines the extension configuration, permissions, and resources
- **content.js**: Content script that runs on Pinterest pages to find and extract pin links
- **popup.html/popup.js**: User interface that displays pin count and triggers the opening action

The extension:
1. Searches for all links containing `/pin/` in their URL
2. Removes duplicates
3. Opens each unique pin URL in a new tab with a 100ms delay between each

## Permissions

The extension requires the following permissions:

- `activeTab`: To interact with the current Pinterest page
- `scripting`: To inject the content script
- `host_permissions` for `pinterest.com`: To access Pinterest pages

## Browser Compatibility

This extension is built for Chrome using Manifest V3. It should also work in other Chromium-based browsers like:
- Microsoft Edge
- Brave
- Opera

## Troubleshooting

### No pins found

- Make sure you're on a Pinterest board page (not the home feed or search results)
- Try scrolling down the page to load more pins, then click the extension again
- Refresh the page and try again

### Extension icon not showing

- Check that the extension is enabled in `chrome://extensions/`
- Make sure you've created the icon files or removed icon references from `manifest.json`

### Tabs not opening

- Check your browser's popup blocker settings
- Make sure you confirmed the action in the dialog box

## License

See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
