// if no themes selected then console.log: none.

// fetch the prefered theme stored in localstorage api and assign the theme/wanted.css to page

// options available in commandPalette and then save the setting.

//console.log("theme injected")

var themePage;

chrome.storage.local.get('theme', function(data) {
  themePage = data.theme;
  applyTheme(themePage);
});

chrome.storage.onChanged.addListener(function(changes, area) {
  if (area == "local" && changes.theme) {
    themePage = changes.theme.newValue;
    applyTheme(themePage);
  }
});

function applyTheme(themePage) {
  const themes = {
    "BlackRed": "BlackRedTheme",
    "BlueTheme": "BlueTheme",
    "CoffeeTheme": "CoffeeTheme",
    "ElitePizani": "DarkTheme",
    "GreenTheme": "GreenTheme",
    "LightTheme": "LightTheme",
    "PinkTheme": "PinkTheme",
    "EliteCamckee": "PurpleTheme",
  };
  
  if (!themePage || themePage === "None") {
    console.log("NO custom theme picked");
  } else if (themes[themePage]) { 
    setTheme(themes[themePage]);
    console.log("you have chosen: "+ themes[themePage])
  }
}

function setTheme(themeName) {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.runtime.getURL(`/css/themes/${themeName}.css`);
  document.head.appendChild(style);
}
