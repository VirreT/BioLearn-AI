// textDisplay.js
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get('response');
    document.getElementById('responseContainer').textContent = response ? decodeURIComponent(response) : 'No response available.';
});
