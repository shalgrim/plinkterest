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

    // Skip if no href or already in list
    if (!href || !href.includes('/pin/') || links.includes(href)) {
      return;
    }

    // Skip product/shopping links (have tracking parameters)
    if (href.includes('?mt=') || href.includes('&mt=') || href.includes('/shop/')) {
      return;
    }

    // Skip if element is in a "products" or "ideas" section
    const parentText = element.closest('[data-test-id]')?.getAttribute('data-test-id') || '';
    if (parentText.includes('product') || parentText.includes('shop')) {
      return;
    }

    // Check if any parent has text indicating it's a product section
    let parent = element.parentElement;
    let skipCount = 0;
    while (parent && skipCount < 10) {
      const ariaLabel = parent.getAttribute('aria-label') || '';
      if (ariaLabel.toLowerCase().includes('product') ||
          ariaLabel.toLowerCase().includes('shop') ||
          ariaLabel.toLowerCase().includes('inspired')) {
        return;
      }
      parent = parent.parentElement;
      skipCount++;
    }

    // Skip product pins - they have images with object-fit: contain style
    const img = element.querySelector('img');
    if (img) {
      const style = img.getAttribute('style') || '';
      if (style.includes('object-fit: contain')) {
        return;
      }
    }

    links.push(href);
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
