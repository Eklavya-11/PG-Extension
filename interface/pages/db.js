/* Saving the settings to the localStorage to access them in modules */

// Themes.html
document.addEventListener('DOMContentLoaded', function () {

var dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach(function(item) {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    var theme = this.getAttribute('data-theme');
    saveTheme(theme);
  });
});

function saveTheme(themeName){
    chrome.storage.local.set({ 'theme': themeName});
}
// Team.html - custom teams layouts


}, false);
