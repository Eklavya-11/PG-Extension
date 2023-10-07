
// Function to execute the selected option
function executeOption() {
  const selectedOption = $('#command-palette').val();
  switch (selectedOption) {
    case 'hideChat':
      // Code to delete chat
      console.log("Fixing the battle screen");
      fixBattle();
      break;
    case 'fixScreen':
      // Code to fix frozen screen
      console.log("Fixing the frozen screen");
      fixScreen();
      break;
    case 'resetPosition':
      // Code to reset
      console.log("Rsetting the position");
      resetPosition();
      break;
    default:
      // Handle error case
      break;
  }
}

function fixScreen() {
  var keepAliveRequest = null;
  scriptTick1 = 1;
  keepAliveRequest = new XMLHttpRequest();
  keepAliveRequest.open("POST", "https://pokemongods.com/game/xml/utility?rand=" + (Math.random() * 1000000), true);
  keepAliveRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  keepAliveRequest.onload = function () {
    console.log(keepAliveRequest.responseText);
  };
  //keepAliveRequest.send(4);
  keepAliveRequest.send();
}

function fixBattle() {
  var xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", "/game/xml/battle?" + "args" + "&rand=" + (Math.random() * 1000000), true);
  xmlHttpReq.onreadystatechange = "No arbitary access";
  xmlHttpReq.send();
}
function resetPosition() {
  const formData = new FormData();
  formData.append('action', 'resetPosition');
  formData.append('args', '');

  fetch('https://pokemongods.com/game/profile', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      alert("Refresh the page!")
      // Handle the response here
    })
    .catch(error => {
      // Handle errors here
    });
}
