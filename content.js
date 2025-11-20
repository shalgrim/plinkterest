// Content script for Pinterest Link Opener

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPinCount') {
    const pinCount = getPinLinks().length;
    sendResponse({ count: pinCount });
  } else if (request.action === 'openAllPins') {
    openAllPins();
    sendResponse({ success: true });
  }
  return true;
});

// Function to get all pin links on the current page
function getPinLinks() {
  const links = [];

  // Pinterest uses different selectors depending on the page layout
  // Look for pin links - these typically go to /pin/ URLs
  const pinElements = document.querySelectorAll('a[href*="/pin/"]');

  pinElements.forEach(element => {
    const href = element.href;
    // Make sure it's a valid pin URL and not a duplicate
    if (href && href.includes('/pin/') && !links.includes(href)) {
      links.push(href);
    }
  });

  return links;
}

// Function to open all pins in new tabs
function openAllPins() {
  const links = getPinLinks();

  if (links.length === 0) {
    return;
  }

  // Open each link in a new tab
  // Add a small delay between opening tabs to avoid browser throttling
  links.forEach((link, index) => {
    setTimeout(() => {
      window.open(link, '_blank');
    }, index * 100); // 100ms delay between each tab
  });
}
