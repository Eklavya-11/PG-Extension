// Giving the username
chrome.storage.local.get('username', function (data) {
  document.getElementById('welcome-msg').textContent = `Welcome ${data.username}!`;
});


/* ---------------- */
// global variables
var myModal;
document.addEventListener('DOMContentLoaded', function () {

  // User custom setting else default
  const encounterBgCheckbox = document.getElementById('encounterBg');
  encounterBgCheckbox.addEventListener('change', () => {
    if (encounterBgCheckbox.checked) {
      chrome.storage.local.set({ 'encounterBg': "true"});
    }else{
      chrome.storage.local.set({ 'encounterBg': "false"});
    }
  });



  /*--- Modal events ----*/

  var checkPageButton = document.getElementById('btnHuntAdd');
  var huntList = document.getElementById('huntList');
  // Load the hunting list from Chrome storage if it exists
  chrome.storage.local.get('pokemonHuntList', function (result) {
    if (result.pokemonHuntList) {
      huntList.innerHTML = result.pokemonHuntList;
    }
  });

  checkPageButton.addEventListener('click', function () {
    var inputElement = document.getElementById('toHuntInput');
    var pokemonName = inputElement.value.trim();
    if (pokemonName !== '') {
      // Check if the Pokemon name is already in the hunting list
      var pokemonInList = huntList.querySelector('li[data-pokemon="' + pokemonName + '"]');
      if (pokemonInList) {
        alert(pokemonName + " is already in the hunting list!");
      } else {
        alert(pokemonName + " added to hunting list!");
        var newListItem = document.createElement('li');
        newListItem.dataset.pokemon = pokemonName;
        newListItem.textContent = pokemonName; // Use textContent instead of innerHTML
        huntList.appendChild(newListItem);

        // Store the updated hunting list in Chrome storage
        chrome.storage.local.set({ 'pokemonHuntList': huntList.innerHTML.toLowerCase() });

        inputElement.value = '';
      }
    } else {
      alert("Please enter a Pokemon name!");
    }
  }, false);


  var viewListButton = document.getElementById('btnHuntList');
  viewListButton.addEventListener('click', function () {
    var modalBody = document.getElementById('huntListModalBody');
    modalBody.innerHTML = huntList.innerHTML;
    myModal = new bootstrap.Modal(document.getElementById('huntListModal'), {});
    myModal.show();
  }, false);

  var clearListButton = document.getElementById('btnClearHuntList');
  clearListButton.addEventListener('click', function () {
    huntList.innerHTML = '';
    chrome.storage.local.remove('pokemonHuntList', function () {
      myModal.hide();
      alert("Hunt list cleared!");
    });
  });
}, false);
