// Popup script for Pinterest Link Opener

document.addEventListener('DOMContentLoaded', async () => {
  const pinCountElement = document.getElementById('pinCount');
  const openButton = document.getElementById('openButton');
  const errorElement = document.getElementById('error');

  // Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Check if we're on a Pinterest page
  if (!tab.url || (!tab.url.includes('pinterest.com'))) {
    showError('Please navigate to a Pinterest board to use this extension.');
    openButton.disabled = true;
    pinCountElement.textContent = '0';
    return;
  }

  // Get pin count from content script
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'getPinCount' });
    const count = response.count || 0;

    pinCountElement.textContent = count;

    if (count === 0) {
      openButton.disabled = true;
      showError('No pins found on this page. Make sure you are on a Pinterest board page.');
    } else {
      openButton.disabled = false;
    }
  } catch (error) {
    console.error('Error getting pin count:', error);
    showError('Error communicating with the page. Try refreshing the page.');
    openButton.disabled = true;
    pinCountElement.textContent = '0';
  }

  // Handle button click
  openButton.addEventListener('click', async () => {
    try {
      openButton.disabled = true;
      openButton.textContent = 'Opening...';

      await chrome.tabs.sendMessage(tab.id, { action: 'openAllPins' });

      // Close the popup after a short delay
      setTimeout(() => {
        window.close();
      }, 500);
    } catch (error) {
      console.error('Error opening pins:', error);
      showError('Error opening pins. Please try again.');
      openButton.disabled = false;
      openButton.textContent = 'Open All Pins';
    }
  });

  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
});
